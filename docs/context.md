# NAoHR — project context

Working notes for anyone (human or agent) picking this repo up cold.
Last updated: 2026-09-03.

## What this is

The source of **https://naohr.vercel.app/** — Najmi's personal portfolio / CV
site plus a blog. Deployed on Vercel from `main`.

Astro owns the document and routing. The site is **two very different things
under one build**:

- **`/` — the portfolio.** The original React + Mantine components, mounted as a
  single hydrated island (`client:load`). Prerendered to static HTML, then
  hydrated. Ships ~390 KB JS and Mantine's 233 KB stylesheet.
- **`/blog` — the posts.** Pure Astro and MDX. **Zero JavaScript and zero
  external CSS** — a post is one ~8 KB HTML file. Verified: blog pages reference
  no `/_astro/` assets at all.

It is a personal site, not a product. No backend, no database, no auth, no
analytics, no CI. All content is committed to the repo as JSON and MDX.

## Stack

| | |
| --- | --- |
| Framework | Astro 7 (`astro.config.mjs`), static output |
| Portfolio island | React 19.2 + Mantine 9 via `@astrojs/react` |
| Content | `@astrojs/mdx` + content collections, Zod-validated frontmatter |
| Highlighting | Shiki at build time, dual `github-light` / `github-dark` |
| Language | TypeScript, `astro/tsconfigs/strict` |
| Icons | `@tabler/icons-react` for UI, `simple-icons` for brand marks |
| Tests | Vitest + Testing Library (jsdom), `vitest.config.ts` |
| Deploy | Vercel, pinned by `vercel.json` (framework `astro`, output `dist`) |

There is **no router library**. Astro's file-based routing replaced
react-router; a link out of the island is a plain `<a href>`.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check && astro build -> dist/
npm run preview
npm test           # vitest run
npm run typecheck  # astro check
npx astro sync     # regenerate content types after schema changes
```

## Layout

```
astro.config.mjs            integrations, site URL, Shiki themes
src/content.config.ts       blog collection schema (Zod)
src/content/blog/*.mdx      the posts
src/pages/index.astro       portfolio: mounts the React island
src/pages/blog/index.astro  post list
src/pages/blog/[...id].astro  one post
src/pages/404.astro         random poem from poet.json
src/layouts/BaseLayout.astro  <head>, meta, pre-paint colour-scheme script
src/layouts/BlogLayout.astro  blog chrome + theme toggle
src/app/Portfolio.tsx       island root: MantineProvider + sections
src/theme.ts                Mantine theme + the shared GRADIENT constant
src/styles/index.css        global CSS (.gradient, .gradient-text, .wave, .breathe)
src/styles/blog.css         blog tokens + typography (no Mantine)
src/components/             section components (React)
src/components/misc/        Underline, Quotes, BrandIcon, ProfileMark
src/hooks/                  useScrolledPast, useActiveSection, useScrollProgress
src/utils/*.json            portfolio content
public/                     favicon, profile.jpg, hermes-agent.png, manifest, robots
```

**`src/pages/` is Astro's route table.** Never put a `.tsx` component there —
Astro would turn it into a page. React lives in `src/app/` and
`src/components/`.

**All content lives in `src/utils/`.** To add a project or a stack entry, edit
the JSON — no component changes needed.

- `projects.json` — `{ title, link, description, image, tag[] }`, the
  **Personal** tab of the projects section
- `experience.json` — `{ title, company, role, period, description, image,
  highlights[], tag[] }`, the **Professional** tab. Transcribed from Najmi's CV
  (`Najmi - Software Engineer- Q2 2026.pdf`), reverse-chronological. The covers
  are **decorative Unsplash stock, not screenshots** — these are client banking
  systems and no real screenshot could be published. Each is chosen to match
  the engagement's subject (network imagery for middleware, a payment terminal
  for the payment rail, a shopfront for SME Suites)
- `stack.json` — `{ name, icon }` where `icon` is a **simple-icons slug**
  (e.g. `openjdk`, `nextdotjs`, `nodedotjs`), not a URL
- `quotes.json` — 104 `{ quote, author }` entries; one is picked at random per
  page load and typed out in the blockquote inside `Greetings`
- `poet.json` — short poems, one shown at random on the 404 page

Adding a stack entry with a new slug also requires registering the icon in
`src/components/misc/BrandIcon.tsx` — the import is explicit so the bundle only
carries the icons actually used. That file has two maps and a fallback:

- `ICONS` — simple-icons marks, tinted with the brand hex
- `IMAGE_ICONS` — tools with no simple-icons entry, pointing at a file
  **self-hosted in `public/assets/`**. Download the logo into the repo; never
  hot-link a CDN, which is the thing this whole setup exists to avoid.
- anything unmatched renders a neutral wrench glyph, so a missing mark degrades
  instead of vanishing

Note simple-icons *does* ship a `hermes`, but it is the German parcel courier
(`myhermes.de`) — deliberately not wired up.

## History

Built Dec 2022 – Oct 2023 with Create React App + Mantine 5, then untouched.
Rebuilt in place on **2026-09-02**: CRA → Vite, Mantine 5 → 9, React 18 → 19.
The component structure and the visual design were deliberately kept; only the
foundation was replaced.

Before that migration the repo had ~1500 packages and **74 npm vulnerabilities
(5 critical)**, all transitive through the deprecated `react-scripts@5.0.1`.
It is now 147 packages and 0.

## Decisions worth knowing

**Mantine 9 pins React 19.2.** They had to move together; that is why the React
major bump happened as part of a build-tool migration.

**No colour-scheme context.** An earlier `ThemeContexts.tsx` hand-rolled a
dark/light context. Mantine 9's `useMantineColorScheme` replaces it, persists
to `localStorage` under `mantine-color-scheme-value`, and honours the OS
setting via `defaultColorScheme="auto"`. The inline script at the bottom of
`index.html` applies the stored value before first paint to avoid a flash — it
must stay in sync with that localStorage key.

**Brand icons ship with the bundle.** They used to be hot-linked from
seeklogo, iconfinder, a Crunchbase Cloudinary URL and — genuinely — another
developer's Vercel deployment. `simple-icons` tree-shakes, so only the ~11
icons in the `ICONS` map end up in `dist`. `BrandIcon` falls back to
`currentColor` when a brand colour would be invisible against the current
background (OpenJDK, Next.js and Express are all near-black).

**Java uses the OpenJDK mark.** simple-icons has no Java icon for trademark
reasons; `openjdk` is the standard substitute.

**Scroll spy is an IntersectionObserver.** The old version attached a `scroll`
listener that was never removed and closed over stale state, so its
"has the active section changed" guard always compared against the initial
`null`. See `src/hooks/useActiveSection.ts`.

**`Underline` animates via React state, not direct DOM mutation.** The old one
started a `setInterval` per instance and never cleared it — roughly seven
leaked timers per page load. It now cleans up and short-circuits under
`prefers-reduced-motion`.

**SPA, so metadata is static.** There is no server rendering; crawlers and
link-preview scrapers read the tags baked into `index.html`. Anything
per-route would need a different approach (this was weighed against migrating
to Next.js and deferred — see below).

**The quote hero was removed on 2026-09-02, but `Quotes` survives.** The site
used to open with a full-viewport panel that typed out a random quote and had
a shuffle button. The panel and the shuffle button are gone and the page now
opens directly on the intro (`pt={110}` on the main container clears the fixed
header). `Quotes` itself moved into `Greetings`, where it replaced a
hard-coded blockquote. It reads `quotes.json` and types the quote out letter by
letter at 50ms, then holds for 5s and advances to another one on its own — the
manual shuffle button is gone. Both timings are the `LETTER_MS` and `HOLD_MS`
constants at the top of the file. Under `prefers-reduced-motion` it renders the
quote instantly and does not cycle at all, since content should not swap
without the reader asking. It is `w="100%"` because inside the
`align="flex-start"` column it would otherwise shrink to its content.

## Section shapes

`Projects.tsx` is a Mantine `Tabs` with two panels — **Professional**
(`experience.json`, cover + role/company/period + highlight list, no link) and
**Personal** (`projects.json`, cover + repo link). Professional leads and
is the default tab: this is a CV site, so the client work is the headline and
the side projects are supporting evidence. Both render
through the same `Timeline`; the bullet icon differs (`IconCode` vs
`IconBriefcase`). Mantine keeps inactive panels mounted, so both are in the DOM
regardless of the selected tab — worth knowing when writing queries against it.

`Quotes` is no longer a full-screen hero. It sits inside `Greetings` in place
of the old static blockquote, types a quote out letter by letter, holds for
`HOLD_MS`, then moves to the next. Under `prefers-reduced-motion` it renders
the quote whole and does not auto-advance.

`Intro` is a full-screen entry curtain over the whole site, dismissed by
click or keyboard. The page renders underneath it the entire time, so
dismissing only fades the curtain — nothing mounts late, and the content is in
the DOM for crawlers and tests from the first paint. It shows on **every load**;
gate it on `sessionStorage` if that becomes annoying.

`ProfileMark` is a vector trace of `public/assets/profile.jpg`, generated by
thresholding at 110 with a 3px blur and simplifying the contours to four closed
loops (even-odd fill keeps the eyes and mouth open). Path data lives in
`profileMarkPath.ts`. It carries the site gradient on dark and solid black on
light — the gradient washes out on a white ground. The trace is a **stylised
interpretation, not a reproduction**: the source is fine white tracery on black,
and no threshold keeps that filigree without fusing it into solid shapes.

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

A malformed post **fails the build** rather than shipping broken — that is the
point of the schema. Code fences are highlighted by Shiki at build time, so no
highlighter ships to the browser; `blog.css` swaps the light/dark token sets.
MDX means a React component can be imported into a post when one is genuinely
needed, but a post that is only prose and code should stay plain so the page
keeps shipping no JS.

After changing the schema, run `npx astro sync` to regenerate content types.

## Conventions

- Section wrappers carry the `id` used by the nav: `me`, `stack`, `projects`.
  `SECTIONS` in `NavbarComponents.tsx` is the source of truth for the nav.
- The pink → indigo gradient (`#E64980` → `#4C6EF5`) is the site's signature.
  Use `GRADIENT` from `src/theme.ts` for Mantine `gradient` props, the
  `.gradient` class for fills, `.gradient-text` for text.
- External links always get `target="_blank" rel="noopener noreferrer"`.
- Interactive elements need an accessible name — the icon-only controls all
  carry `aria-label`.
- `100dvh`, not `100vh` (mobile browser chrome).

## Known open items

- **Not visually verified.** The Mantine 5 → 9 migration was checked with
  typecheck, Vitest (jsdom) and a dev-server smoke test, but nobody has looked
  at the rendered page in a browser. Mantine 9 replaced the styling engine
  wholesale, so a visual pass in both themes is the first thing to do.
- **The portfolio island is still heavy** — ~390 kB JS plus Mantine's 233 kB
  stylesheet, loaded only on `/`. Astro fixed the *prerendering* problem, not
  the payload one; that would take rewriting the portfolio as `.astro` with
  plain CSS, which was considered on 2026-09-03 and deliberately deferred.
  The blog already ships nothing.
- **The CV is a Google Drive link** (`CV_URL` in `Greetings.tsx`). Not
  indexable and it rots if the file moves.
- **No work-experience section.** For a CV site this is the biggest content
  gap; the site currently shows projects only.
- **`Spring Boot` was added to `stack.json`** during the 2026-09 pass because
  the site's own copy and a project already referenced it. Unconfirmed with
  Najmi — remove if wrong.
- **Project cover images are generic Unsplash photos**, dimmed by an overlay.
  Real screenshots would serve the site better.
- **`src/content/blog/iso-8583-and-json-apis.mdx` is `draft: true`.** It was
  written by Claude as a pipeline demo, not by Najmi — review, rewrite or
  delete it before publishing. `hello.mdx` is published.
- **Deferred: Next.js.** Considered 2026-09-02, turned down for modernising in
  place; Astro (2026-09-03) covered the same need for the blog with less
  disruption, since the React components carried over unchanged.
