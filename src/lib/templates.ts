import type { PageConfig } from "@/components/builder/types"

/**
 * The three salon starting templates. Each is just a `PageConfig` preset —
 * distinctness comes from element order, copy, colors, and alignment, so the
 * same renderer and editor work for all of them.
 */
export type TemplateId = "elegance" | "moderna" | "lush"

export type Template = {
  id: TemplateId
  name: string
  description: string
  config: PageConfig
}

const elegance: Template = {
  id: "elegance",
  name: "Elegance",
  description: "Classic and refined — cream, charcoal, and gold.",
  config: [
    {
      type: "hero",
      heading: "Maison Élégance",
      subheading: "Timeless hair artistry in the heart of the city.",
      align: "center",
      backgroundColor: "#f7f3ec",
      textColor: "#2b2622",
      ctaLabel: "Reserve your visit",
      ctaHref: "#contact",
    },
    {
      type: "text",
      text: "An intimate salon where every appointment is a private ritual — unhurried, precise, and tailored to you.",
      level: "p",
      align: "center",
      color: "#6b6258",
    },
    {
      type: "services",
      title: "Signature services",
      columns: 2,
      accentColor: "#b08d3f",
      items: [
        { name: "Couture cut", price: "$85", description: "Consultation, precision cut & finish." },
        { name: "Gloss & tone", price: "$70", description: "Dimensional shine, zero brass." },
        { name: "Silk blowout", price: "$55", description: "Soft volume that lasts for days." },
        { name: "Bridal updo", price: "$120", description: "Trial session included." },
      ],
    },
    {
      type: "cta",
      label: "Book an appointment",
      href: "#contact",
      align: "center",
      size: "md",
      backgroundColor: "#b08d3f",
      textColor: "#ffffff",
    },
    {
      type: "contact",
      title: "Visit us",
      address: "12 Rue Belle, Old Town",
      phone: "+1 555 0182",
      email: "hello@maison-elegance.test",
      align: "center",
      hours: [
        { days: "Tue – Fri", hours: "10am – 7pm" },
        { days: "Sat", hours: "9am – 5pm" },
      ],
    },
  ],
}

const moderna: Template = {
  id: "moderna",
  name: "Moderna",
  description: "Bold and minimal — high contrast, sharp lines.",
  config: [
    {
      type: "hero",
      heading: "MODERNA STUDIO",
      subheading: "Cuts and color for people who set the tone.",
      align: "left",
      backgroundColor: "#101012",
      textColor: "#fafafa",
      ctaLabel: "Book now",
      ctaHref: "#contact",
    },
    {
      type: "services",
      title: "Menu",
      columns: 3,
      accentColor: "#e11d48",
      items: [
        { name: "Precision cut", price: "$60" },
        { name: "Full color", price: "$110" },
        { name: "Balayage", price: "$160" },
        { name: "Toner", price: "$40" },
        { name: "Style", price: "$35" },
        { name: "Treatment", price: "$50" },
      ],
    },
    {
      type: "gallery",
      title: "Selected work",
      columns: 4,
      rounded: false,
      images: [
        { src: "https://picsum.photos/seed/moderna1/600/600", alt: "Sharp bob haircut" },
        { src: "https://picsum.photos/seed/moderna2/600/600", alt: "Platinum color work" },
        { src: "https://picsum.photos/seed/moderna3/600/600", alt: "Editorial styling" },
        { src: "https://picsum.photos/seed/moderna4/600/600", alt: "Texture detail" },
      ],
    },
    {
      type: "cta",
      label: "BOOK NOW",
      href: "#contact",
      align: "left",
      size: "lg",
      backgroundColor: "#e11d48",
      textColor: "#ffffff",
    },
    {
      type: "contact",
      title: "Find the studio",
      address: "404 Concrete Ave, Unit 2",
      phone: "+1 555 0143",
      email: "studio@moderna.test",
      align: "left",
      hours: [
        { days: "Mon – Sat", hours: "11am – 8pm" },
      ],
    },
  ],
}

const lush: Template = {
  id: "lush",
  name: "Lush",
  description: "Colorful and playful — pink, violet, and plenty of photos.",
  config: [
    {
      type: "hero",
      heading: "Lush & Lovely",
      subheading: "Good hair days, every day. Walk-ins welcome!",
      align: "center",
      backgroundColor: "#fdf2f8",
      textColor: "#86198f",
      ctaLabel: "Come say hi",
      ctaHref: "#contact",
    },
    {
      type: "gallery",
      title: "Fresh from the chair",
      columns: 3,
      rounded: true,
      images: [
        { src: "https://picsum.photos/seed/lush1/600/600", alt: "Pastel pink waves" },
        { src: "https://picsum.photos/seed/lush2/600/600", alt: "Glitter braid set" },
        { src: "https://picsum.photos/seed/lush3/600/600", alt: "Curly cut transformation" },
        { src: "https://picsum.photos/seed/lush4/600/600", alt: "Vivid violet color" },
        { src: "https://picsum.photos/seed/lush5/600/600", alt: "Beach waves" },
        { src: "https://picsum.photos/seed/lush6/600/600", alt: "Nail art close-up" },
      ],
    },
    {
      type: "services",
      title: "Treat yourself",
      columns: 3,
      accentColor: "#db2777",
      items: [
        { name: "Color pop", price: "$95", description: "Vivids, pastels, rainbows." },
        { name: "Curly cut", price: "$65", description: "Cut dry, shaped for your curls." },
        { name: "Mani + pedi", price: "$58", description: "With art, always." },
      ],
    },
    {
      type: "text",
      text: "Bring your playlist, leave with your dream hair. 💖",
      level: "h3",
      align: "center",
      color: "#db2777",
    },
    {
      type: "cta",
      label: "Book a chair",
      href: "#contact",
      align: "center",
      size: "md",
      backgroundColor: "#db2777",
      textColor: "#ffffff",
    },
    {
      type: "contact",
      title: "Say hello",
      address: "7 Peach Lane, Sunnyside",
      phone: "+1 555 0177",
      email: "hi@lushlovely.test",
      align: "center",
      hours: [
        { days: "Mon – Fri", hours: "9am – 6pm" },
        { days: "Sat – Sun", hours: "10am – 4pm" },
      ],
    },
  ],
}

export const templates: Record<TemplateId, Template> = {
  elegance,
  moderna,
  lush,
}

export const templateList: Template[] = [elegance, moderna, lush]

export function getTemplate(id: string): Template | null {
  return id in templates ? templates[id as TemplateId] : null
}
