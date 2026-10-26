# NAoHR — project context

Working notes for anyone (human or agent) picking this repo up cold.
Last updated: 2026-10-26.

## What this is

The source of **https://naohr.site/** — Najmi's personal portfolio / CV
site plus a blog. Deployed on Cloudflare (Workers static assets); see
`docs/deployment.md`.

Everything is static Astro with plain CSS. No UI framework, no client-side
rendering, no analytics. The only JavaScript shipped is the theme toggle
(a few lines, inlined by Astro). All content is committed to the repo as JSON
and MDX.

## Stack

| | |
| --- | --- |
| Framework | Astro 7 (`astro.config.mjs`), static output |
| Styling | Plain CSS: `src/styles/site.css` (everything), `src/styles/prose.css` (blog posts) |
| Fonts | IBM Plex Sans + IBM Plex Mono, self-hosted via `@fontsource/*` (Latin subset) |
| Content | JSON in `src/utils/`, validated by Zod in `src/utils/content.ts`; blog via MDX content collection |
| Highlighting | Shiki at build time, dual `github-light` / `github-dark` |
| Language | TypeScript, `astro/tsconfigs/strict` |
| Deploy | Cloudflare Workers static assets, `wrangler.jsonc` (serves `dist`, custom domain `naohr.site`); Node pinned by `.node-version`. How-to: `docs/deployment.md` |

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check && astro build -> dist/
npm run preview
npm run typecheck  # astro check
npm run deploy     # build + wrangler deploy
npx astro sync     # regenerate content types after schema changes
```

There are no unit tests. The content guarantees that matter (every role has a
route, links are URLs, no stray fields) are enforced by the Zod schemas at
build time, and `astro check` type-checks every page.

## Layout

```
astro.config.mjs              integrations, site URL, Shiki themes
src/layouts/BaseLayout.astro  <head>, meta, theme bootstrap, header + footer
src/components/Header.astro   name, nav, theme toggle (+ its script)
src/components/Footer.astro   contact links
src/components/MessageRoute.astro  the hero diagram
src/components/Route.astro    the per-role miniature of that diagram
src/pages/index.astro         portfolio: hero, work, side projects, tools, writing
src/pages/blog/index.astro    post list (empty state when nothing is published)
src/pages/blog/[...id].astro  one post
src/pages/404.astro           not-found page with a random line from poet.json
src/content.config.ts         blog collection schema (Zod)
src/content/blog/*.mdx        the posts
src/utils/content.ts          parses + validates the JSON below
src/utils/links.ts            email + social links (hero shows the first three)
src/utils/*.json              portfolio content
public/cv.pdf                 the public CV (redacted, see below)
public/assets/profile.jpg     favicon + link-preview image
```

**All portfolio content lives in `src/utils/`.** To add a role, project or
tool, edit the JSON; `content.ts` rejects anything malformed.

- `experience.json` — `{ title, company, role, period, description, route[],
  highlights[], tag[] }`, reverse-chronological, transcribed from Najmi's CV.
  `route` is the chain of systems the engagement connected, in message order;
  it renders as the small box-and-line diagram under each role. The routes
  were written by reading the CV — Najmi should correct any that are off.
- `projects.json` — `{ title, link, description, tag[] }`, the side projects
- `stack.json` — `{ name, group }`; `group` must be one of `STACK_GROUPS` in
  `content.ts`, which also sets the display order
- `poet.json` — short lines, one picked at build time for the 404 page

## Design

Redesigned 2026-10-26 ("direction A"). The site is about one idea, taken from
Najmi's own line: *a message leaves one system, crosses three more, and still
balances at the end.*

- **Hero:** that sentence as the H1, then `MessageRoute` draws it: a Rp150.000
  transfer going Mobile app → API gateway → Switch → Core banking, the payload
  changing format on the way (JSON, then ISO 8583), ending with the 0210
  response and a balanced debit/credit. The wire data is real ISO 8583:1987
  (MTI 0200/0210, DE3 400000 = transfer, DE4 in minor units, DE39 00 =
  approved).
- **One motif:** outlined boxes joined by lines. The hero uses it large; each
  role in Work repeats it small (`Route.astro`). Nothing else is decorated —
  no cards, no stock photos, no icon chips.
- **Palette** (`site.css` `:root`): cheque-ink navy on cool paper, and one
  "settled" green used only for things that moved or completed (the message
  trace, the "What I did" toggles, focus rings, "balanced").
- **Type:** IBM Plex Sans for everything; IBM Plex Mono only for real wire
  data (message fields), never for labels.
- **Motion:** exactly one orchestrated moment — the hero trip plays once on
  load (~4 s). The only other motion is the details chevron rotating when
  clicked. Under `prefers-reduced-motion` the trip renders finished.

Things that were deliberately dropped in the redesign: the full-screen intro
curtain, the pink → indigo gradient, the typed-out random quotes
(`quotes.json`), the traced-face `ProfileMark`, brand icons, React, Mantine
and the Vitest/Testing Library suite that tested the React components.

## Decisions worth knowing

**Theme.** Colours are `light-dark()` pairs and `:root` sets
`color-scheme: light dark`, so with no saved choice the page follows the OS
without any JavaScript. The toggle writes `data-theme` on `<html>` (which pins
`color-scheme`) and stores it in `localStorage` under `theme`; an inline
script in `BaseLayout` re-applies it before first paint.

**The hero animation uses layout properties, not transforms.** The trace grows
by animating `right`/`bottom`, the packet moves by `left`/`top` and shows via
`visibility`. Every element's resting style is its final state and the
animations only use `backwards` fill, so if animations are off, unsupported
or reduced, the finished diagram is what renders.

**Shiki colours.** `defaultColor: false` makes Shiki emit both themes as CSS
variables only; `prose.css` picks one with `light-dark()`, so code blocks
follow the toggle too.

**The CV is `public/cv.pdf`.** It is a redacted copy of
`Najmi - Software Engineer- Q2 2026.pdf`: the phone number and street address
were removed from the PDF (text deleted, not covered) and the contact line was
rewritten with email, LinkedIn and `naohr.site`, each a working link. When the
CV changes, redact the new one the same way before replacing the file.

**The Writing nav link and home section only appear when a post is
published.** `/blog/` itself always exists and shows an empty state.

**External links** get `target="_blank" rel="noopener noreferrer"`;
`mailto:` links don't.

## Writing a post

Drop an `.mdx` (or `.md`) file in `src/content/blog/`. The filename becomes the
URL slug. Frontmatter is validated by the Zod schema in `src/content.config.ts`:

```yaml
---
title: "Post title"
description: "Shown in the list and as the meta/OG description."
date: 2026-09-03
tags: ["payments", "java"]
draft: true          # omitted from the build entirely
---
```

A malformed post **fails the build** rather than shipping broken. A post that
is only prose and code ships no JavaScript.

## Known open items

- **`src/content/blog/iso-8583-and-json-apis.mdx` is `draft: true`** (unpublished
  2026-10-26). It was written by Claude as a pipeline demo, not by Najmi —
  rewrite or delete it before publishing.
- **Routes in `experience.json` need Najmi's check** (see above).
- **`Spring Boot` in `stack.json`** was added during the 2026-09 pass because
  the site's own copy already referenced it. Unconfirmed with Najmi.
- **Favicon is the profile photo.** A purpose-made icon would read better at
  16 px.
