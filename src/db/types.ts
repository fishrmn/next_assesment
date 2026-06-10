import type { PageConfig } from "@/components/builder/types"

/**
 * Hand-written row types for the two Supabase tables (see supabase/schema.sql).
 * If the schema grows, switch to generated types:
 * `supabase gen types typescript --project-id <ref>`.
 */
export type User = {
  id: string
  name: string
  email: string | null
  created_at: string
}

export type Page = {
  id: string
  user_id: string
  name: string
  template: string
  config: PageConfig
  created_at: string
  updated_at: string
}
