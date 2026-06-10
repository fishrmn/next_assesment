"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import type { PageConfig } from "@/components/builder/types"
import { createPage, updatePage, type Page } from "@/db"
import { getTemplate } from "@/lib/templates"

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export async function createPageAction(input: {
  name: string
  templateId: string
}): Promise<ActionResult<never>> {
  const name = input.name.trim()
  if (!name) {
    return { ok: false, error: "Give your page a name." }
  }
  const template = getTemplate(input.templateId)
  if (!template) {
    return { ok: false, error: "Unknown template." }
  }

  let page: Page
  try {
    page = await createPage({
      name,
      template: template.id,
      config: template.config,
    })
  } catch (error) {
    console.error("createPageAction failed:", error)
    return {
      ok: false,
      error: "Could not create the page. Check your Supabase setup and try again.",
    }
  }

  revalidatePath("/")
  redirect(`/builder/${page.id}`)
}

export async function savePageAction(
  id: string,
  input: { name?: string; config: PageConfig }
): Promise<ActionResult<Page>> {
  try {
    const page = await updatePage(id, input)
    revalidatePath("/")
    revalidatePath(`/builder/${id}`)
    revalidatePath(`/preview/${id}`)
    return { ok: true, data: page }
  } catch (error) {
    console.error("savePageAction failed:", error)
    return { ok: false, error: "Could not save your changes. Please try again." }
  }
}
