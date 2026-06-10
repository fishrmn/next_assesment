import { Eye, Pencil, Plus } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { listPages } from "@/db"
import { getTemplate } from "@/lib/templates"

export const dynamic = "force-dynamic"

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
})

export default async function Home() {
  const pages = await listPages()

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12 sm:py-16">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your pages</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick up where you left off, or start from a template.
          </p>
        </div>
        <Button render={<Link href="/builder/new" />}>
          <Plus data-icon="inline-start" />
          New page
        </Button>
      </header>

      {pages.length === 0 ? (
        <Card className="items-center py-16 text-center">
          <CardHeader>
            <CardTitle>No pages yet</CardTitle>
            <CardDescription>
              Create your first salon page from one of three templates.
            </CardDescription>
          </CardHeader>
          <Button render={<Link href="/builder/new" />}>
            <Plus data-icon="inline-start" />
            Create a page
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {pages.map((page) => (
            <Card key={page.id} size="sm">
              <CardHeader>
                <div className="flex items-center justify-between gap-2">
                  <CardTitle className="truncate">{page.name}</CardTitle>
                  <Badge variant="secondary">
                    {getTemplate(page.template)?.name ?? page.template}
                  </Badge>
                </div>
                <CardDescription>
                  Updated {dateFormat.format(new Date(page.updated_at))}
                </CardDescription>
              </CardHeader>
              <CardFooter className="gap-2">
                <Button size="sm" render={<Link href={`/builder/${page.id}`} />}>
                  <Pencil data-icon="inline-start" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  render={<Link href={`/preview/${page.id}`} />}
                >
                  <Eye data-icon="inline-start" />
                  Preview
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
