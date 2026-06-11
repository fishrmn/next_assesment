import { ArrowLeft, LayoutTemplate, Sparkles } from "lucide-react"
import Link from "next/link"

import { BrandChat } from "@/components/brand/brand-chat"
import { TemplatePicker } from "@/components/editor/template-picker"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function NewPagePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:py-16">
      <header>
        <Button variant="ghost" size="sm" render={<Link href="/" />}>
          <ArrowLeft data-icon="inline-start" />
          Back to pages
        </Button>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Create a page
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Start from a template, or let the brand assistant design one around
          your salon&apos;s identity.
        </p>
      </header>

      <Tabs defaultValue="templates">
        <TabsList>
          <TabsTrigger value="templates">
            <LayoutTemplate data-icon="inline-start" />
            Pick a template
          </TabsTrigger>
          <TabsTrigger value="brand">
            <Sparkles data-icon="inline-start" />
            Brand assistant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="pt-4">
          <TemplatePicker />
        </TabsContent>
        <TabsContent value="brand" className="pt-4">
          <BrandChat />
        </TabsContent>
      </Tabs>
    </main>
  )
}
