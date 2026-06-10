import type {
  ElementConfig,
  ElementType,
  PageConfig,
} from "@/components/builder/types"

export type EditorAction =
  | { type: "update"; id: string; patch: Partial<ElementConfig> }
  | { type: "move"; id: string; direction: "up" | "down" }
  | { type: "remove"; id: string }
  | { type: "add"; element: ElementConfig }
  | { type: "replace"; config: PageConfig }

/** Stored configs may lack ids — assign one so selection and reorder work. */
export function normalizeConfig(config: PageConfig): PageConfig {
  return config.map((element) =>
    element.id ? element : { ...element, id: crypto.randomUUID() }
  )
}

export function editorReducer(
  config: PageConfig,
  action: EditorAction
): PageConfig {
  switch (action.type) {
    case "update":
      return config.map((element) =>
        element.id === action.id
          ? ({ ...element, ...action.patch } as ElementConfig)
          : element
      )
    case "move": {
      const index = config.findIndex((element) => element.id === action.id)
      const target = action.direction === "up" ? index - 1 : index + 1
      if (index === -1 || target < 0 || target >= config.length) return config
      const next = [...config]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    }
    case "remove":
      return config.filter((element) => element.id !== action.id)
    case "add":
      return [...config, action.element]
    case "replace":
      return action.config
  }
}

export function defaultElementConfig(type: ElementType): ElementConfig {
  const id = crypto.randomUUID()
  switch (type) {
    case "text":
      return { id, type: "text", text: "New text", level: "p", align: "left" }
    case "hero":
      return {
        id,
        type: "hero",
        heading: "New section heading",
        subheading: "A short tagline goes here.",
        align: "center",
      }
    case "services":
      return {
        id,
        type: "services",
        title: "Services",
        columns: 2,
        items: [{ name: "New service", price: "$0" }],
      }
    case "gallery":
      return {
        id,
        type: "gallery",
        title: "Gallery",
        columns: 3,
        rounded: true,
        images: [
          { src: "https://picsum.photos/seed/new/600/600", alt: "New image" },
        ],
      }
    case "cta":
      return { id, type: "cta", label: "Call to action", href: "#", align: "center", size: "md" }
    case "contact":
      return {
        id,
        type: "contact",
        title: "Contact",
        address: "123 Street, City",
        phone: "+1 555 0000",
        align: "left",
        hours: [],
      }
  }
}
