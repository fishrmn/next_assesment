import "server-only"

import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"

import type { PageConfig } from "@/components/builder/types"

import { dispatchTool, editorTools } from "./tools"

const DEFAULT_MODEL = "gpt-4o-mini"
const MAX_ITERATIONS = 6

/**
 * Lazy client, same pattern as getSupabase(): importing the module never
 * requires credentials — only actually running the agent does.
 */
let client: OpenAI | null = null

function getOpenAI(): OpenAI {
  if (client) return client
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY. Add it to .env.local.")
  }
  client = new OpenAI({ apiKey })
  return client
}

const SYSTEM_PROMPT = `You are a page editor agent for a salon website builder.
The user gives you a page config (a JSON array of elements, each with an "id")
and an instruction in plain language. Apply the instruction by calling tools —
never reply with JSON, only with tool calls and a final summary.

Element types and their fields ("?" = optional):
- text: text, level ("h1"|"h2"|"h3"|"p"), align, color?
- hero: heading, subheading?, align, backgroundColor?, textColor?, ctaLabel?, ctaHref?, imageUrl?
- services: title, items [{ name, price, description? }], columns (1|2|3), accentColor?
- gallery: title?, images [{ src, alt }], columns (2|3|4), rounded? (boolean)
- cta: label, href, align, backgroundColor?, textColor?, size ("sm"|"md"|"lg")
- contact: title, address, phone, email?, hours [{ days, hours }], align

Shared: align is "left" | "center" | "right". Color fields take any valid CSS
color (e.g. "#1a1a1a"). Strings except colors/hrefs are visible page copy.

Rules:
- Reference elements by their "id" from the provided config.
- With update_element, include only the fields that change.
- If a tool returns an error, fix the arguments and retry.
- Interpret intent: "darker" means darker background with readable text;
  "bigger headline" on a text element means a higher level (e.g. p → h2 → h1).
- If the instruction doesn't apply to this page, make no tool calls and say why.
- When done, reply with a one-or-two-sentence summary of what you changed.`

export type AgentResult = {
  config: PageConfig
  summary: string
  changed: boolean
}

/**
 * Small tool-calling agent: the model edits a working copy of the config via
 * the same reducer the editor UI uses, each call validated before applying.
 * Returns the edited config — persisting it is the caller's (user's) decision.
 */
export async function runEditAgent(
  config: PageConfig,
  instruction: string,
  openai: OpenAI = getOpenAI()
): Promise<AgentResult> {
  const model = process.env.OPENAI_MODEL ?? DEFAULT_MODEL
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Page config:\n${JSON.stringify(config)}\n\nInstruction: ${instruction}`,
    },
  ]

  let working = config
  let changed = false

  for (let round = 0; round < MAX_ITERATIONS; round++) {
    const response = await openai.chat.completions.create({
      model,
      messages,
      tools: editorTools,
    })
    const message = response.choices[0]?.message
    if (!message) break

    const toolCalls = (message.tool_calls ?? []).filter(
      (call) => call.type === "function"
    )
    if (toolCalls.length === 0) {
      return {
        config: working,
        summary: message.content?.trim() || (changed ? "Applied the requested changes." : "No changes made."),
        changed,
      }
    }

    messages.push(message)
    for (const call of toolCalls) {
      let args: unknown
      let outcome
      try {
        args = JSON.parse(call.function.arguments)
        outcome = dispatchTool(working, call.function.name, args)
      } catch {
        outcome = { config: working, result: "Error: arguments are not valid JSON", mutated: false }
      }
      working = outcome.config
      changed ||= outcome.mutated
      messages.push({ role: "tool", tool_call_id: call.id, content: outcome.result })
    }
  }

  // Iteration cap reached — return whatever validated changes were applied.
  return {
    config: working,
    summary: changed ? "Applied the requested changes." : "No changes made.",
    changed,
  }
}
