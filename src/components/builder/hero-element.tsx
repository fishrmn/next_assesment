import { cn } from "@/lib/utils"

export type HeroElementConfig = {
  type: "hero"
  heading: string
  subheading?: string
  align: "left" | "center" | "right"
  /** Any valid CSS color for the section background. */
  backgroundColor?: string
  /** Any valid CSS color for the heading/subheading text. */
  textColor?: string
  ctaLabel?: string
  ctaHref?: string
  /** Optional background image URL, shown behind a dark overlay. */
  imageUrl?: string
}

const alignStyles: Record<HeroElementConfig["align"], string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
}

export function HeroElement({ config }: { config: HeroElementConfig }) {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundColor: config.backgroundColor,
        backgroundImage: config.imageUrl ? `url(${config.imageUrl})` : undefined,
      }}
    >
      {config.imageUrl ? (
        <div aria-hidden className="absolute inset-0 bg-black/50" />
      ) : null}
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-4xl flex-col gap-4 px-6 py-20 sm:py-28",
          alignStyles[config.align]
        )}
        style={config.textColor ? { color: config.textColor } : undefined}
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {config.heading}
        </h1>
        {config.subheading ? (
          <p className="max-w-2xl text-lg opacity-90 sm:text-xl">
            {config.subheading}
          </p>
        ) : null}
        {config.ctaLabel ? (
          <a
            href={config.ctaHref ?? "#"}
            className="mt-2 inline-flex w-fit items-center rounded-full border border-current px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
          >
            {config.ctaLabel}
          </a>
        ) : null}
      </div>
    </section>
  )
}
