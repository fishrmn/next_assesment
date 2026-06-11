import "server-only"

import type OpenAI from "openai"
import type {
  ChatCompletionContentPart,
  ChatCompletionMessageParam,
} from "openai/resources/chat/completions"

import type { PageConfig } from "@/components/builder/types"
import { normalizeConfig } from "@/components/editor/editor-reducer"
import { getTemplate } from "@/lib/templates"

import { getOpenAI, runEditAgent } from "./agent"
import { brandTools, dispatchBrandTool } from "./brand-tools"
import type {
  BrandChatMessage,
  BrandState,
  BrandTurnResult,
} from "./brand-types"

const DEFAULT_MODEL = "gpt-4o-mini"
const MAX_ITERATIONS = 4

const SYSTEM_PROMPT = `You are a friendly branding consultant for salon owners
using a website builder. Your job is to help them discover their digital brand
identity before their website is built — you are a consultant, not a form.

Interview (adapt to what the user volunteers; never re-ask answered questions;
ask 1–2 questions per message, warm and conversational):
- Salon name and the services they offer
- Who their ideal clients are
- Whether they have a logo (invite them to attach it) or an Instagram/website
- Salons or brands that inspire them
- Their brand in about three words

Logo analysis: when the user attaches an image, read its dominant colors,
visual style (modern vs classic), and positioning (luxury vs approachable),
and explain your read in plain language. Derive the palette from it.

Milestones (use the tools; never paste JSON into chat):
1. After roughly 4–7 exchanges, when you have enough signal, call
   set_brand_profile exactly once. Derive hex colors for the palette — from
   the logo when provided, otherwise from the conversation. Then present the
   profile conversationally and explain why the palette fits their business.
2. Next, call propose_directions with exactly 3 distinct directions tailored
   to this salon. Anchor each to a base template:
   - "elegance": warm ivory & gold, serene spa-like, centered, serif feel
   - "moderna": editorial dusty rose, left-aligned, magazine-like
   - "lush": playful, colorful, photo-heavy, friendly
   Name directions from the user's brand (e.g. "Luxury Spa Retreat"), not
   from the template names. Then ask the user to choose one.
3. When the user picks a direction, call generate_page. The
   rebrandInstruction MUST demand finished, professional content — checklist:
   - hero: the salon's real name + a tagline matching the vibe words
   - services: the owner's actual services with realistic prices and
     one-line descriptions
   - intro/about text: written for their ideal clients, in their tone
   - CTA labels matching the brand register (luxury vs friendly)
   - contact: real details if shared, otherwise plausible placeholders
   - every color field mapped to the brand palette (hex values)
   - no template copy may survive; batch updates across elements
After generate_page succeeds your job is done.

The current brand state is provided each turn — treat it as the source of
truth for what has already been decided.`

export type { BrandTurnResult }

function toOpenAIMessages(
  messages: BrandChatMessage[],
  state: BrandState
): ChatCompletionMessageParam[] {
  const lastImageIndex = messages.reduce(
    (last, message, index) => (message.imageDataUrl ? index : last),
    -1
  )

  const history: ChatCompletionMessageParam[] = messages.map((message, index) => {
    if (message.role === "assistant") {
      return { role: "assistant", content: message.text }
    }
    if (message.imageDataUrl && index === lastImageIndex) {
      const parts: ChatCompletionContentPart[] = [
        { type: "text", text: message.text || "Here is my logo." },
        { type: "image_url", image_url: { url: message.imageDataUrl } },
      ]
      return { role: "user", content: parts }
    }
    return {
      role: "user",
      content: message.imageDataUrl
        ? `${message.text} [logo image was attached]`
        : message.text,
    }
  })

  return [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "system",
      content: `Current brand state:\n${JSON.stringify({
        profile: state.profile ?? null,
        directions: state.directions ?? null,
      })}`,
    },
    ...history,
  ]
}

/**
 * One conversational turn of the brand consultant. Stateless: the client owns
 * the transcript and the accumulated BrandState. generate_page short-circuits
 * into the existing edit agent, which rebrands the chosen base template
 * through the validated tool pipeline.
 */
export async function runBrandAgent(
  messages: BrandChatMessage[],
  state: BrandState,
  openai: OpenAI = getOpenAI()
): Promise<BrandTurnResult> {
  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL
  const conversation = toOpenAIMessages(messages, state)

  let working = state
  const result: BrandTurnResult = { message: "", state }

  for (let round = 0; round < MAX_ITERATIONS; round++) {
    const response = await openai.chat.completions.create({
      model,
      messages: conversation,
      tools: brandTools,
    })
    const message = response.choices[0]?.message
    if (!message) break

    const toolCalls = (message.tool_calls ?? []).filter(
      (call) => call.type === "function"
    )
    if (toolCalls.length === 0) {
      return {
        ...result,
        message: message.content?.trim() || "Could you tell me a bit more?",
        state: working,
      }
    }

    conversation.push(message)
    for (const call of toolCalls) {
      let args: unknown
      try {
        args = JSON.parse(call.function.arguments)
      } catch {
        conversation.push({
          role: "tool",
          tool_call_id: call.id,
          content: "Error: arguments are not valid JSON",
        })
        continue
      }

      if (call.function.name === "generate_page") {
        const outcome = await generatePage(working, args, openai)
        if ("error" in outcome) {
          conversation.push({
            role: "tool",
            tool_call_id: call.id,
            content: `Error: ${outcome.error}`,
          })
          continue
        }
        // Terminal: the page is ready — no need to ask the model to narrate it.
        return {
          message: outcome.page.summary,
          state: working,
          page: outcome.page,
        }
      }

      const outcome = dispatchBrandTool(working, call.function.name, args)
      working = outcome.state
      if (outcome.artifact?.kind === "profile") {
        result.profile = outcome.artifact.profile
      }
      if (outcome.artifact?.kind === "directions") {
        result.directions = outcome.artifact.directions
      }
      conversation.push({
        role: "tool",
        tool_call_id: call.id,
        content: outcome.result,
      })
    }
  }

  return {
    ...result,
    message:
      result.message ||
      "I've noted that — anything else you'd like to share about your salon?",
    state: working,
  }
}

async function generatePage(
  state: BrandState,
  args: unknown,
  openai: OpenAI
): Promise<{ page: { config: PageConfig; summary: string } } | { error: string }> {
  if (typeof args !== "object" || args === null) {
    return { error: "arguments must be a JSON object" }
  }
  const { directionId, rebrandInstruction } = args as Record<string, unknown>
  if (typeof rebrandInstruction !== "string" || !rebrandInstruction.trim()) {
    return { error: '"rebrandInstruction" must be a non-empty string' }
  }
  const direction = state.directions?.find((d) => d.id === directionId)
  if (!direction) {
    return {
      error: `no proposed direction with id "${directionId}" — call propose_directions first`,
    }
  }
  const template = getTemplate(direction.baseTemplateId)
  if (!template) {
    return { error: `unknown base template "${direction.baseTemplateId}"` }
  }

  const baseConfig = normalizeConfig(structuredClone(template.config))
  const rebranded = await runEditAgent(baseConfig, rebrandInstruction, openai)
  return {
    page: {
      config: rebranded.config,
      summary: `Your "${direction.name}" website is ready — review the preview below, then create the page to fine-tune it in the editor.`,
    },
  }
}
