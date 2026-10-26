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
src/components/SignalField.astro   the hero illustration (inline SVG, CSS motion only)
src/components/Route.astro    the miniature of that diagram under each role/project
src/pages/index.astro         portfolio: hero, work, side projects, tools, writing
src/pages/blog/index.astro    post list (empty state when nothing is published)
src/pages/blog/[...id].astro  one post
src/pages/404.astro           not-found page with a random line from poet.json
src/content.config.ts         blog collection schema (Zod)
src/content/blog/*.mdx        the posts
src/utils/content.ts          parses + validates the JSON below
src/utils/links.ts            email, social links (hero shows the first three), availability badge
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
  route[], wins[], highlights[], tag[] }`, reverse-chronological, transcribed
  from Najmi's CV. `company` must match an employer `name` (the build fails
  otherwise). `headline` says what the work achieved and is the visible
  heading; `title` is the project's own name, shown under it. `wins` are 1–3
  short results shown without opening anything; `description` + `highlights`
  are the full write-up behind Details. A role whose `period` ends in
  "Present" is current and gets a card; the rest go in the "Earlier" log.
  `route` is the chain of systems the engagement connected, in message order.
  Headlines, wins and routes were written from the CV — Najmi should correct
  any that are off.
- `projects.json` — `{ featured[], earlier[] }`. Featured: `{ title, year,
  note?, link?, route[], description, tag[] }`, shown like work rows (no link
  for private repos; `note` says why). Earlier: `{ title, link, summary }`,
  one line each.
- `stack.json` — `{ name, group }`; `group` must be one of `STACK_GROUPS` in
  `content.ts`, which also sets the display order
- `now.json` — `[{ label, text }]`, 1–4 items: the facts strip under the hero
  ("Now", "Since 2023", "Currently tackling")
- `poet.json` — short lines, one picked at build time for the 404 page

The availability badge text and its mailto link are `AVAILABILITY` in
`links.ts`; delete the badge markup in `index.astro` when not taking side work.

## Design

Redesigned 2026-10-26 ("direction A"). The site is about one idea, taken from
Najmi's own line: *a message leaves one system, crosses three more, and still
balances at the end.*

- **First screen** (`.first` in `index.astro`): an availability badge, then a
  two-column hero (text left, illustration right) and the "Now" facts strip,
  together filling the viewport. Text is left-aligned on purpose: a 13-word
  headline plus a paragraph reads faster from a fixed left edge; the second
  column is what balances the layout.
- **Illustration** (`SignalField.astro`): eight named source systems (mobile
  app, web checkout, QR scan, partner API, SWIFT, RTGS, batch file, Kafka
  event) whose threads converge on one ledger reading `Δ 0.00`, with a single
  settled line running off to the window edge. Generic on purpose: no specific
  payment rail or message format.
- **Backdrop** behind the first screen: a ledger-ruled grid faded around the
  illustration, thin beams of light running along it, a soft accent glow and
  fine grain. On narrow screens the beams are dropped and the grid/glow move
  down to sit around the illustration.
- **Lower sections** keep the box-and-line motif: each work role and featured
  project has a small route (`Route.astro`); the employer ladder reuses it.
  No stock photos, no icon chips.
- **Work** is grouped by employer. Current roles are cards side by side
  (headline, project + role, route, wins visible, Details for the full
  write-up). Earlier roles are an "Earlier at …" log: one line each (date +
  headline); the whole row opens in place to the full detail, and any number
  of rows can be open at once. Recruiters skim (~7 s, Ladders 2018), so the
  recent results are never hidden; older detail is a click away (NN/g on
  accordions).
- **Parallax** (Work only): a faded grid + glow layer behind the section
  drifts slower than the content, and on wide screens the two cards rise at
  different speeds as they scroll in. CSS scroll-driven animations
  (`animation-timeline: view()`); browsers without them and reduced motion
  get the static layout. Keep these as longhands in `site.css`: the minifier
  turns a shorthand + timeline into `animation: … view()`, which browsers
  reject.
- **Palette** (`site.css` `:root`): cheque-ink navy on cool paper, and one
  cobalt accent (`#2F5BD3` light / `#7FA2FF` dark) for things that move or
  settle: pulses, the ledger, links' hover, Details toggles, focus rings.
  Green was retired as too generic; it survives only as `--status`, the
  "available" dot, because green-means-online is a convention worth keeping.
- **Type:** IBM Plex Sans for everything; IBM Plex Mono only for machine
  text (source names, the ledger delta), never for page labels.
- **Motion:** one load moment — threads draw in (~1.4 s, staggered), then
  labels, halo and pulses fade in — after which pulses, the ledger ring,
  backdrop beams and the status dot loop quietly. The only user-triggered
  motion is the Details chevron. Under `prefers-reduced-motion` everything
  renders finished and still, and the beams are hidden.

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

**The header is sticky.** It stays transparent at the top so the hero
backdrop shows through; after the first few pixels of scroll a small script in
`Header.astro` sets `data-scrolled`, which fades in a full-width frosted bar
with a hairline. `scroll-padding-top` matches its height so nav jumps
(`/#work`, `/#projects`) land below it.

**The illustration is one inline SVG in a 560×440 viewBox.** It scales with
its column, so phones get the same picture, smaller. Thread geometry, source
names and pulse timings are computed in the component's frontmatter; colours
are CSS variables, so it follows the theme. The settled line is drawn to
x=1600 and `html { overflow-x: clip }` cuts it at the window edge without a
horizontal scrollbar.

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
- **Headlines, wins and routes in `experience.json`, and the Indivara
  summary in `employers.json`, need Najmi's check** (written from the CV).
- **naohr-lab copy in `projects.json` describes the plan**, not a running
  tunnel; update it once the Cloudflare Tunnel is live.
- **Telminder's repo is private**, so its entry has no link.
- **`Spring Boot` in `stack.json`** was added during the 2026-09 pass because
  the site's own copy already referenced it. Unconfirmed with Najmi.
