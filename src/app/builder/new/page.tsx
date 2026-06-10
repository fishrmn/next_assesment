import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { TemplatePicker } from "@/components/editor/template-picker"
import { Button } from "@/components/ui/button"

export default function NewPagePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:py-16">
      <header>
        <Button variant="ghost" size="sm" render={<Link href="/" />}>
          <ArrowLeft data-icon="inline-start" />
          Back to pages
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Choose a template
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Three distinct starting points — every element stays fully editable.
        </p>
      </header>
      <TemplatePicker />
    </main>
  )
}
