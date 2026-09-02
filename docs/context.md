# NAoHR — project context

Working notes for anyone (human or agent) picking this repo up cold.
Last updated: 2026-09-02.

## What this is

The source of **https://naohr.vercel.app/** — Najmi's personal portfolio / CV
site. A single-page site: an intro, a tech stack, a project timeline and a
footer. Deployed on Vercel from `main`.

It is a personal site, not a product. There is no backend, no database, no
auth, no analytics and no CI. All content is static JSON committed to the repo.

## Stack

| | |
| --- | --- |
| Build | Vite 8 (`vite.config.ts`) |
| UI | React 19.2 + Mantine 9 |
| Language | TypeScript 5.9, `strict` + `noUnusedLocals`/`noUnusedParameters` |
| Routing | react-router-dom 7 (`createBrowserRouter`) |
| Icons | `@tabler/icons-react` for UI, `simple-icons` for brand marks |
| Tests | Vitest + Testing Library (jsdom) |
| Deploy | Vercel, pinned by `vercel.json` (framework `vite`, output `dist`) |

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build  -> dist/
npm run preview
npm test           # vitest run
npm run typecheck
```

## Layout

```
index.html                  page metadata: title, description, OG, JSON-LD,
                            and the pre-paint colour-scheme script
src/main.tsx                entry: MantineProvider + router
src/theme.ts                Mantine theme + the shared GRADIENT constant
src/index.css               global CSS (.gradient, .gradient-text, .skip-link)
src/pages/App.tsx           the one real page
src/pages/NotFound.tsx      404, prints a random poem from poet.json
src/components/             section components
src/components/misc/        Underline, Quotes, BrandIcon
src/hooks/                  useScrolledPast, useActiveSection
src/utils/*.json            ALL page content
public/                     favicon, profile.jpg, manifest, robots, sitemap
```

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

Adding a stack entry with a new slug also requires registering the icon in the
`ICONS` map in `src/components/misc/BrandIcon.tsx` — the import is explicit so
the bundle only carries the icons actually used.

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
- **Bundle size.** `dist` is 452 kB JS (146 kB gzip) plus a separate 235 kB CSS
  file (34 kB gzip) that is almost entirely `@mantine/core/styles.css`.
  Importing only the per-component styles actually used would cut the CSS a
  lot.
- **The CV is a Google Drive link** (`CV_URL` in `Greetings.tsx`). Not
  indexable and it rots if the file moves.
- **No work-experience section.** For a CV site this is the biggest content
  gap; the site currently shows projects only.
- **The intro copy promises a blog** that does not exist.
- **`Spring Boot` was added to `stack.json`** during the 2026-09 pass because
  the site's own copy and a project already referenced it. Unconfirmed with
  Najmi — remove if wrong.
- **Project cover images are generic Unsplash photos**, dimmed by an overlay.
  Real screenshots would serve the site better.
- **Deferred: migrating to Next.js.** Considered on 2026-09-02 and explicitly
  turned down in favour of modernising in place. It remains the option that
  would buy server-rendered per-page metadata and MDX blog support if the blog
  ever happens.
