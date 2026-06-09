# Page Builder Assessment

Welcome! This assessment asks you to build a small **website page builder** — think a stripped-down Squarespace. A user picks a template, tweaks the design, previews the result live, and saves their work.

We are testing your ability to **build quickly and well**. Use whatever AI tools, editors, and workflows make you fastest — Cursor, Copilot, Claude, ChatGPT, or none at all. There are no restrictions on tooling. We care about the result and the decisions you made along the way.

## Getting started

```bash
git clone <this-repo>
cd next_assesment
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page summarizes this brief and is yours to replace as the app takes shape.

## What you're building

An interactive page builder where a user can:

1. **Choose one of three templates** — three distinct page layouts to start from.
2. **Adjust design elements** — each element on the page exposes configuration (e.g. text content, colors, alignment). What is configurable, and how it's exposed in the editor, is up to you.
3. **See changes immediately** — the preview updates live as the user edits.
4. **Toggle preview size** — support a partial (editor side-by-side) view and a full-screen preview of the page.
5. **Save their work** — selections persist to the local SQLite database and reload on revisit.

The app must work on **mobile and desktop**.

## Your decisions

This is intentionally open-ended. You will need to decide:

- **Templating** — how templates are defined, stored, and rendered.
- **Configuration** — how each element declares what is configurable, and how the editor exposes those controls.
- **Component model** — build the base components a page is composed of. An example `TextElement` component is provided in `src/components/builder/` as a rendering reference; the rest are yours to design.
- **Editor UX** — how editing, previewing, and saving fit together.

We'd rather see a small set of elements done well than many done poorly.

## AI editor

Add an **AI-assisted editing** feature: the user describes a change in natural language (e.g. "make the hero darker and the headline bigger") and the page configuration updates accordingly.

We will provide an OpenAI API key with your invite. Put it in `.env.local`:

```bash
OPENAI_API_KEY=<provided-key>
```

> The key is temporary and will be revoked after the assessment. Never commit it.

## What's provided

| Provided | Where |
|----------|-------|
| Next.js (App Router) + TypeScript | `src/app/` |
| Tailwind CSS v4 + shadcn/ui | `src/components/ui/`, `components.json` |
| Example builder component | `src/components/builder/` |
| SQLite (local DB) | see below |

### Database

Use SQLite so everything stays local — no external services to set up. Wire it up with the lightweight tooling of your choice (e.g. `better-sqlite3`, Drizzle, or Prisma with a SQLite datasource). The schema design is part of the assessment.

## What we evaluate

- **Speed to working software** — does the core loop (pick template → edit → preview → save) work?
- **Decision quality** — sensible data model, component boundaries, and editor architecture.
- **UX polish** — immediate preview, mobile + desktop, full-screen toggle.
- **Code clarity** — could another engineer pick this up tomorrow?

## Submitting

1. Push your work to a fork or a fresh repo and send us the link.
2. Include a short note (in the README or a `NOTES.md`) covering the decisions you made, trade-offs, and what you'd do next with more time.
