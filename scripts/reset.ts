/**
 * Deletes the SQLite database files. `npm run db:reset` chains this with
 * `db:push` and `db:seed` to rebuild a fresh database.
 */
import { existsSync, unlinkSync } from "node:fs"

for (const file of ["local.db", "local.db-wal", "local.db-shm"]) {
  if (existsSync(file)) {
    unlinkSync(file)
    console.log(`Deleted ${file}`)
  }
}
