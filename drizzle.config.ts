import { defineConfig } from "drizzle-kit"

import { getDatabasePath } from "./src/db/path"

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: getDatabasePath(),
  },
})
