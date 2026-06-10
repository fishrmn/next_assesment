"use client"

import { Minimize, Pencil, Eye } from "lucide-react"
import { useEffect, useReducer, useState, useTransition } from "react"

import { savePageAction } from "@/app/actions"
import { ElementRenderer } from "@/components/builder/element-renderer"
import type { ElementConfig, ElementType } from "@/components/builder/types"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { Page } from "@/db/types"
import { cn } from "@/lib/utils"

import { AiAssist } from "./ai-assist"
import {
  defaultElementConfig,
  editorReducer,
  normalizeConfig,
} from "./editor-reducer"
import { EditorToolbar, type ViewMode } from "./editor-toolbar"
import { Inspector } from "./inspector"

export function Editor({ initialPage }: { initialPage: Page }) {
  const [config, dispatch] = useReducer(
    editorReducer,
    initialPage.config,
    normalizeConfig
  )
  const [name, setName] = useState(initialPage.name)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("split")
  const [mobilePane, setMobilePane] = useState<"edit" | "preview">("edit")
  const [dirty, setDirty] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const apply = (action: Parameters<typeof editorReducer>[1]) => {
    dispatch(action)
    setDirty(true)
  }

  function handleSave() {
    setError(null)
    startTransition(async () => {
      const result = await savePageAction(initialPage.id, { name, config })
      if (result.ok) {
        setDirty(false)
      } else {
        setError(result.error)
      }
    })
  }

  useEffect(() => {
    if (!dirty) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  useEffect(() => {
    if (viewMode !== "fullscreen") return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewMode("split")
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [viewMode])

  const showInspector = viewMode === "split"

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <EditorToolbar
        name={name}
        onNameChange={(value) => {
          setName(value)
          setDirty(true)
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        dirty={dirty}
        isPending={isPending}
        onSave={handleSave}
      />

      {error ? (
        <p role="alert" className="border-b bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {showInspector ? (
        <div className="flex gap-2 border-b px-3 py-2 lg:hidden">
          <Button
            variant={mobilePane === "edit" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMobilePane("edit")}
          >
            <Pencil data-icon="inline-start" />
            Edit
          </Button>
          <Button
            variant={mobilePane === "preview" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMobilePane("preview")}
          >
            <Eye data-icon="inline-start" />
            Preview
          </Button>
        </div>
      ) : null}

      <div
        className={cn(
          "flex-1",
          showInspector && "lg:grid lg:grid-cols-[360px_minmax(0,1fr)]"
        )}
      >
        {showInspector ? (
          <aside
            className={cn(
              "border-r lg:block lg:h-[calc(100dvh-49px)] lg:overflow-y-auto",
              mobilePane === "edit" ? "block" : "hidden"
            )}
          >
            <div className="p-4 pb-0">
              <AiAssist
                config={config}
                onReplace={(next) => apply({ type: "replace", config: next })}
              />
              <Separator className="mt-4" />
            </div>
            <Inspector
              config={config}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onUpdate={(id, patch) => apply({ type: "update", id, patch })}
              onMove={(id, direction) => apply({ type: "move", id, direction })}
              onRemove={(id) => {
                apply({ type: "remove", id })
                if (id === selectedId) setSelectedId(null)
              }}
              onAdd={(type: ElementType) => {
                const element = defaultElementConfig(type)
                apply({ type: "add", element })
                setSelectedId(element.id!)
              }}
            />
          </aside>
        ) : null}

        <div
          className={cn(
            "lg:h-[calc(100dvh-49px)] lg:overflow-y-auto",
            showInspector && mobilePane === "edit" ? "hidden lg:block" : "block"
          )}
        >
          <div className="bg-background text-foreground">
            {config.map((element: ElementConfig) => (
              <div
                key={element.id}
                onClick={() => setSelectedId(element.id!)}
                className={cn(
                  "cursor-pointer ring-inset transition-shadow",
                  element.id === selectedId
                    ? "ring-2 ring-primary"
                    : "hover:ring-2 hover:ring-primary/30"
                )}
              >
                <ElementRenderer config={element} />
              </div>
            ))}
            {config.length === 0 ? (
              <p className="px-6 py-16 text-center text-sm text-muted-foreground">
                This page is empty — add an element from the panel.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {viewMode === "fullscreen" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-background">
          <div className="bg-background text-foreground">
            {config.map((element) => (
              <ElementRenderer key={element.id} config={element} />
            ))}
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="fixed right-4 top-4 shadow-lg"
            onClick={() => setViewMode("split")}
          >
            <Minimize data-icon="inline-start" />
            Exit full screen
          </Button>
        </div>
      ) : null}
    </div>
  )
}
