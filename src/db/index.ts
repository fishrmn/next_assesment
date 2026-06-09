import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

import * as schema from "./schema"

/**
 * Shared database client. Import `db` from server code only
 * (Server Components, Route Handlers, Server Actions).
 *
 * If `local.db` doesn't exist yet, run `npm run db:reset` first.
 */
const sqlite = new Database("local.db")
sqlite.pragma("journal_mode = WAL")

export const db = drizzle(sqlite, { schema })
