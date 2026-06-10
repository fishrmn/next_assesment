import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HeroElement, type HeroElementConfig } from "./hero-element"

describe("HeroElement", () => {
  it("renders heading, subheading, and CTA link", () => {
    const config: HeroElementConfig = {
      type: "hero",
      heading: "Salon Naira",
      subheading: "Hair, nails & glow",
      align: "center",
      ctaLabel: "Book now",
      ctaHref: "#contact",
    }

    render(<HeroElement config={config} />)

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Salon Naira")
    expect(screen.getByText("Hair, nails & glow")).toBeDefined()
    const cta = screen.getByRole("link", { name: "Book now" })
    expect(cta.getAttribute("href")).toBe("#contact")
  })

  it("applies background and text colors as inline styles", () => {
    render(
      <HeroElement
        config={{
          type: "hero",
          heading: "Colored",
          align: "left",
          backgroundColor: "rgb(10, 10, 10)",
          textColor: "rgb(255, 255, 255)",
        }}
      />
    )

    const heading = screen.getByRole("heading", { level: 1 })
    const section = heading.closest("section")
    expect(section?.style.backgroundColor).toBe("rgb(10, 10, 10)")
    expect((heading.parentElement as HTMLElement).style.color).toBe("rgb(255, 255, 255)")
  })

  it("omits subheading and CTA when not configured", () => {
    render(<HeroElement config={{ type: "hero", heading: "Bare", align: "left" }} />)

    expect(screen.queryByRole("link")).toBeNull()
  })
})
