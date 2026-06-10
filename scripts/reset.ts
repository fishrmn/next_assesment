/**
 * Deletes the SQLite database files. `npm run db:reset` chains this with
 * `db:push` and `db:seed` to rebuild a fresh database.
 */
import { existsSync, unlinkSync } from "node:fs"

import { getDatabaseFiles } from "../src/db/path"

for (const file of getDatabaseFiles()) {
  if (existsSync(file)) {
    unlinkSync(file)
    console.log(`Deleted ${file}`)
  }
}
