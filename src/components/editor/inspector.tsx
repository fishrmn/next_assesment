"use client"

import {
  ChevronDown,
  ChevronUp,
  Contact,
  Image as ImageIcon,
  LayoutTemplate,
  MousePointerClick,
  Scissors,
  Trash2,
  Type,
} from "lucide-react"

import type {
  ElementConfig,
  ElementType,
  PageConfig,
} from "@/components/builder/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

import { ElementForm } from "./element-forms"

const elementIcons: Record<ElementType, typeof Type> = {
  text: Type,
  hero: LayoutTemplate,
  services: Scissors,
  gallery: ImageIcon,
  cta: MousePointerClick,
  contact: Contact,
}

const elementNames: Record<ElementType, string> = {
  text: "Text",
  hero: "Hero",
  services: "Services",
  gallery: "Gallery",
  cta: "Button",
  contact: "Contact",
}

function elementLabel(element: ElementConfig): string {
  switch (element.type) {
    case "text":
      return element.text
    case "hero":
      return element.heading
    case "services":
    case "contact":
      return element.title
    case "gallery":
      return element.title ?? "Gallery"
    case "cta":
      return element.label
  }
}

export function Inspector({
  config,
  selectedId,
  onSelect,
  onUpdate,
  onMove,
  onRemove,
  onAdd,
}: {
  config: PageConfig
  selectedId: string | null
  onSelect: (id: string) => void
  onUpdate: (id: string, patch: Partial<ElementConfig>) => void
  onMove: (id: string, direction: "up" | "down") => void
  onRemove: (id: string) => void
  onAdd: (type: ElementType) => void
}) {
  const selected = config.find((element) => element.id === selectedId) ?? null

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1">
        <h2 className="px-1 text-sm font-semibold">Elements</h2>
        <ul className="flex flex-col gap-1">
          {config.map((element, index) => {
            const Icon = elementIcons[element.type]
            return (
              <li key={element.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelect(element.id!)}
                  className={cn(
                    "flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                    element.id === selectedId
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="size-4 shrink-0 opacity-60" />
                  <span className="truncate">{elementLabel(element)}</span>
                  <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                    {elementNames[element.type]}
                  </span>
                </button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move ${elementNames[element.type]} up`}
                  disabled={index === 0}
                  onClick={() => onMove(element.id!, "up")}
                >
                  <ChevronUp />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Move ${elementNames[element.type]} down`}
                  disabled={index === config.length - 1}
                  onClick={() => onMove(element.id!, "down")}
                >
                  <ChevronDown />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={`Remove ${elementNames[element.type]}`}
                  onClick={() => onRemove(element.id!)}
                >
                  <Trash2 />
                </Button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="px-1 text-sm font-semibold">Add element</h2>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(elementNames) as ElementType[]).map((type) => {
            const Icon = elementIcons[type]
            return (
              <Button
                key={type}
                variant="outline"
                size="sm"
                onClick={() => onAdd(type)}
              >
                <Icon data-icon="inline-start" />
                {elementNames[type]}
              </Button>
            )
          })}
        </div>
      </div>

      <Separator />

      {selected ? (
        <div className="flex flex-col gap-4 pb-8">
          <h2 className="px-1 text-sm font-semibold">
            {elementNames[selected.type]} settings
          </h2>
          <ElementForm
            config={selected}
            onChange={(patch) => onUpdate(selected.id!, patch)}
          />
        </div>
      ) : (
        <p className="px-1 text-sm text-muted-foreground">
          Select an element in the list or click it in the preview to edit its
          settings.
        </p>
      )}
    </div>
  )
}
