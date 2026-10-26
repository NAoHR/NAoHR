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
src/components/MessageRoute.astro  the hero diagram + rail picker (+ its script)
src/components/Route.astro    the miniature of that diagram under each role/project
src/pages/index.astro         portfolio: hero, work, side projects, tools, writing
src/pages/blog/index.astro    post list (empty state when nothing is published)
src/pages/blog/[...id].astro  one post
src/pages/404.astro           not-found page with a random line from poet.json
src/content.config.ts         blog collection schema (Zod)
src/content/blog/*.mdx        the posts
src/utils/content.ts          parses + validates the JSON below
src/utils/rails.ts            the hero's three trips (transfer, QRIS, SWIFT)
src/utils/links.ts            email + social links (hero shows the first three)
src/utils/*.json              portfolio content
scripts/brand/og-card.html    source for og.png and the PNG app icons
public/cv.pdf                 the public CV (redacted, see below)
public/favicon.svg|.ico       the mark; SVG follows the browser's colour scheme
public/og.png                 1200x630 link-preview card
public/icon-*.png, apple-touch-icon.png   app / home-screen icons
```

**All portfolio content lives in `src/utils/`.** To add a role, project or
tool, edit the JSON; `content.ts` rejects anything malformed.

- `employers.json` — `{ name, place, period, summary, ladder[{ title, since }] }`.
  Work is grouped under these; the ladder is the job titles held there.
- `experience.json` — `{ headline, title, company, role, period, description,
  route[], impact, highlights[], tag[] }`, reverse-chronological, transcribed
  from Najmi's CV. `company` must match an employer `name` (the build fails
  otherwise). `headline` says what the work achieved and is the visible
  heading; `title` is the project's own name, shown under it. `impact` is the
  one result shown without opening Details. `route` is the chain of systems
  the engagement connected, in message order. Headlines, impacts and routes
  were written from the CV — Najmi should correct any that are off.
- `projects.json` — `{ featured[], earlier[] }`. Featured: `{ title, year,
  note?, link?, route[], description, tag[] }`, shown like work rows (no link
  for private repos; `note` says why). Earlier: `{ title, link, summary }`,
  one line each.
- `stack.json` — `{ name, group }`; `group` must be one of `STACK_GROUPS` in
  `content.ts`, which also sets the display order
- `poet.json` — short lines, one picked at build time for the 404 page

## Design

Redesigned 2026-10-26 ("direction A"). The site is about one idea, taken from
Najmi's own line: *a message leaves one system, crosses three more, and still
balances at the end.*

- **Hero:** that sentence as the H1, then `MessageRoute` draws it. Three rails
  (`src/utils/rails.ts`), picked above the diagram: a Rp150.000 bank transfer
  (SNAP JSON → ISO 8583), a QRIS payment (EMVCo QR → ISO 8583) and a
  cross-border SWIFT MT103 ending in an MT910 credit confirmation. Field
  formats are real; values are illustrative, not client configuration.
- **One motif:** outlined boxes joined by lines. The hero uses it large; each
  work role and featured project repeats it small (`Route.astro`); the
  employer's job-title ladder and the favicon reuse it too. Nothing else is
  decorated — no cards, no stock photos, no icon chips.
- **Work** is grouped by employer, then one row per engagement: outcome
  headline, project name + role, route, one visible result, Details for the
  rest.
- **Palette** (`site.css` `:root`): cheque-ink navy on cool paper, and one
  "settled" green used only for things that moved or completed (the message
  trace, the selected rail, Details toggles, focus rings, "balanced").
- **Type:** IBM Plex Sans for everything; IBM Plex Mono only for real wire
  data (message fields), never for labels.
- **Motion:** one orchestrated moment — the hero trip plays once on load
  (~4 s) and again when a visitor picks a rail or clicks "Send again" (then it
  starts after 0.15 s instead of 0.7 s). The only other motion is the Details
  chevron. Under `prefers-reduced-motion` the trip renders finished.

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

**Rail switching needs no animation code.** All three trips are in the HTML;
all but one carry `hidden`. CSS animations restart when an element goes from
`display: none` to rendered, so the script just hides every trip, forces a
reflow and unhides the chosen one. Without JavaScript the picker and "Send
again" stay hidden and the bank-transfer trip shows. Trip labels reserve
three lines of height so switching rails doesn't shift the page.

**Shiki colours.** `defaultColor: false` makes Shiki emit both themes as CSS
variables only; `prose.css` picks one with `light-dark()`, so code blocks
follow the toggle too.

**Brand images are static exports.** `og.png`, `icon-192/512.png` and
`apple-touch-icon.png` were screenshotted from `scripts/brand/og-card.html`
at device scale 1; `favicon.ico` is `favicon.svg` rasterised (16/32/48).
When the headline or the mark changes, re-export them as that file
describes.

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
- **Headlines, impacts and routes in `experience.json`, and the Indivara
  summary in `employers.json`, need Najmi's check** (written from the CV).
- **naohr-lab copy in `projects.json` describes the plan**, not a running
  tunnel; update it once the Cloudflare Tunnel is live.
- **Telminder's repo is private**, so its entry has no link.
- **`Spring Boot` in `stack.json`** was added during the 2026-09 pass because
  the site's own copy already referenced it. Unconfirmed with Najmi.
