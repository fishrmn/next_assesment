import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { TextElement, type TextElementConfig } from "./text-element"

describe("TextElement", () => {
  it("renders the configured text at the configured level", () => {
    const config: TextElementConfig = {
      type: "text",
      text: "Hello, builder",
      level: "h1",
      align: "center",
    }

    render(<TextElement config={config} />)

    const heading = screen.getByRole("heading", { level: 1 })
    expect(heading.textContent).toBe("Hello, builder")
    expect(heading.className).toContain("text-center")
  })

  it("applies a custom color as an inline style", () => {
    render(
      <TextElement
        config={{
          type: "text",
          text: "Colored",
          level: "p",
          align: "left",
          color: "rgb(255, 0, 0)",
        }}
      />
    )

    const paragraph = screen.getByText("Colored")
    expect(paragraph.style.color).toBe("rgb(255, 0, 0)")
  })
})
