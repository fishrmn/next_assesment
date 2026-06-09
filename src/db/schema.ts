import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

/**
 * Example schema — a starting point, not a requirement.
 *
 * One table is provided to show the pattern: define tables here in
 * TypeScript, then run `npm run db:push` to sync them to `local.db`.
 * Extend or replace this schema however your design needs.
 *
 * The `config` column stores the page's element configuration as JSON —
 * the same serializable shape that components like `TextElement` render.
 */
export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  /** Which of the three templates this page is based on. */
  template: text("template").notNull(),
  /** Arbitrary JSON — type it more strictly as your element model takes shape. */
  config: text("config", { mode: "json" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type Page = typeof pages.$inferSelect
export type NewPage = typeof pages.$inferInsert
