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
  description: "Warm and serene — ivory, soft gold, spa-like calm.",
  config: [
    {
      type: "hero",
      heading: "Elevate Your Style, Define Your Confidence",
      subheading:
        "Experience personalized spa and wellness care that nurtures your body, mind, and spirit.",
      align: "center",
      backgroundColor: "#faf7f0",
      textColor: "#3f3528",
      ctaLabel: "Book an appointment",
      ctaHref: "#contact",
    },
    {
      type: "text",
      text: "Trusted by over 1.5M happy clients — quality care should be more than a service. It should be a seamless part of your daily life, from A to Z.",
      level: "p",
      align: "center",
      color: "#8c7c64",
    },
    {
      type: "services",
      title: "Choose your plan",
      columns: 3,
      accentColor: "#b3854d",
      items: [
        {
          name: "Salon services",
          price: "from $45",
          description: "Precision cuts, color, and styling — 8 services available.",
        },
        {
          name: "Spa services",
          price: "from $60",
          description: "Massage, aromatherapy, and full-body rituals to restore you.",
        },
        {
          name: "Beauty parlour",
          price: "from $35",
          description: "Skincare, brows, and bridal looks for every occasion.",
        },
      ],
    },
    {
      type: "gallery",
      title: "Your daily care",
      columns: 4,
      rounded: true,
      images: [
        { src: "https://picsum.photos/seed/elegance1/600/600", alt: "Relaxing scalp treatment" },
        { src: "https://picsum.photos/seed/elegance2/600/600", alt: "Spa oils and warm towels" },
        { src: "https://picsum.photos/seed/elegance3/600/600", alt: "Skin brightening facial" },
        { src: "https://picsum.photos/seed/elegance4/600/600", alt: "Body massage session" },
      ],
    },
    {
      type: "text",
      text: "“I had an absolutely wonderful experience at this spa and salon. From the moment I walked in, the atmosphere was calm, clean, and welcoming.” — Nikulas B.",
      level: "h3",
      align: "center",
      color: "#5c5142",
    },
    {
      type: "cta",
      label: "Book an appointment",
      href: "#contact",
      align: "center",
      size: "lg",
      backgroundColor: "#b3854d",
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
  description: "Editorial dusty rose — soft, warm, magazine-like.",
  config: [
    {
      type: "hero",
      heading: "Welcome to Salon Moderna",
      subheading:
        "A fresh take on hair — cuts, color, and care from the city's top stylists.",
      align: "left",
      backgroundColor: "#dca291",
      textColor: "#2e211b",
      ctaLabel: "Book appointment",
      ctaHref: "#contact",
    },
    {
      type: "text",
      text: "Our commitment to quality keeps our clients happy. With years of experience and continuing education, our dedicated team is ready to serve your beauty needs — and help you decide the best look.",
      level: "p",
      align: "left",
      color: "#6e5a4e",
    },
    {
      type: "services",
      title: "Our services",
      columns: 2,
      accentColor: "#bd7861",
      items: [
        {
          name: "Haircuts & styling",
          price: "$120",
          description: "Consultation, shaping, and a finished style.",
        },
        {
          name: "Color correction",
          price: "$180",
          description: "Even, dimensional color that wears beautifully.",
        },
        {
          name: "Curly perms",
          price: "$150",
          description: "Soft, lasting waves tailored to your hair.",
        },
        {
          name: "Hair treatments",
          price: "$250",
          description: "Repair and shine for over-worked hair.",
        },
      ],
    },
    {
      type: "gallery",
      title: "The team & the salon",
      columns: 3,
      rounded: true,
      images: [
        { src: "https://picsum.photos/seed/moderna1/600/800", alt: "The city's top stylists" },
        { src: "https://picsum.photos/seed/moderna2/600/800", alt: "Make yourself at home" },
        { src: "https://picsum.photos/seed/moderna3/600/800", alt: "Fresh blowout styling" },
      ],
    },
    {
      type: "cta",
      label: "Book appointment",
      href: "#contact",
      align: "left",
      size: "lg",
      backgroundColor: "#2e211b",
      textColor: "#f5eee6",
    },
    {
      type: "contact",
      title: "Visit the salon",
      address: "3222 Blackwell Street, Fairbanks, AK 99701",
      phone: "+070 6754 78684",
      email: "support@salonmoderna.test",
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
