/**
 * Seeds the database with one example page (only if the table is empty,
 * so it's safe to run repeatedly). Run with `npm run db:seed`.
 */
import { db } from "../src/db"
import { pages } from "../src/db/schema"

const existing = db.select({ id: pages.id }).from(pages).all()

if (existing.length > 0) {
  console.log(`Database already has ${existing.length} page(s) — skipping seed.`)
} else {
  db.insert(pages)
    .values({
      name: "Example page",
      template: "starter",
      config: [
        {
          type: "text",
          text: "Hello from the database",
          level: "h1",
          align: "center",
        },
        {
          type: "text",
          text: "This element config was read from local.db and rendered by TextElement.",
          level: "p",
          align: "center",
        },
      ],
    })
    .run()

  console.log("Seeded 1 example page.")
}
