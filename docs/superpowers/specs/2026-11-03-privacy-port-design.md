# Privacy policy port — design

Branch `redesign/prova-1` (experimental: local commits only, never push or merge to main without explicit owner OK).

## Intent

`/it/privacy-policy` is still the legacy page (`pages/it/privacy-policy.vue`: full-width photo with a text-shadow title, plain `#cookie-policy-text` section, legacy fonts). Home, Esplora and Regolamento are already redesigned. Port the privacy page the same way as Regolamento (`docs/superpowers/specs/2026-11-03-regolamento-port-design.md`) so the Italian site reads as one. The owner asked for exactly that: "fai come regolamento".

## Goals

- `/it/privacy-policy` renders inside `main.redesign` with the redesign header, footer, dock: add `'/it/privacy-policy'` and `'/it/privacy-policy/'` to `redesignedRoutes` in `layouts/default.vue`.
- Split hero like Regolamento, 6 section cards in 2 columns.
- Every legacy text kept word for word.
- Two owner-approved additions: a "Preferenze cookie" button and a mailto link (below).

## Non-goals

- No port of `/en/privacy-policy` or any EN page; no change to `/it/prenota`.
- No new copy: no lead, intro, subtitles, captions, closing line.
- No change to home, Esplora, Regolamento, header, menu, footer, dock, cookie banner, `useCookieConsent` beyond the route switch.
- `useHead` stays as is.

## Anti-goals

- Inventing facts, a photo credit, or rewording the owners' text.
- Two adjacent sections with the same background.
- `width`/`height` attributes on `<img>`; any NuxtLink without `no-prefetch`.
- Committing `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `.playwright-mcp/`.

## Constraints (from the ported pages, already decided)

- Headings Mountains of Christmas, all other text Montserrat (`var(--sub)`, never `var(--body)`), font-size only via `--step-*`, `--page-max` 1440, split-band text padding `max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))`.
- Long paragraphs and list items: `max-width:68ch`, `text-align:justify`, `hyphens:auto`, `text-align:left` at `<=520px`.
- Backgrounds: forest `.band`, champagne, linen (page). Footer is forest-deep.
- `useReveal(root)` + `data-reveal` as in Regolamento.
- Text written in the template, not `v-html` (scoped CSS does not reach `v-html` nodes). The legacy page already writes it in the template.
- Legacy `<style scope>` (a typo: it is unscoped) goes entirely; the new page uses `<style scoped>`.

## Page structure (top to bottom)

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Hero | forest band | Same as Regolamento `.rules-hero`: text half with h1 "COOKIES PRIVACY POLICY" (legacy, UPPERCASE as written) and nothing else; photo half bleeding to the page edge. Phone: photo first (4:3), text below. Same desktop height as Regolamento (340px at 1440). |
| 2 | Policy cards | linen | 6 cards in legacy order, one per legacy `h3`: h2 title (as written, sentence case) + its paragraphs/lists. 2 columns on desktop (`>=901px`), 1 below. 6 cards = 3 full rows. |

Sequence: forest, linen, footer forest-deep: no adjacent pair alike. No champagne closing (the legacy page has no closing line). The card grid needs bottom space before the footer (reuse `--section-gap`).

## Hero

- Photo: keep the legacy import `~/assets/images/cookies.webp` (2560x1709 WebP, 98 KB, gingerbread house and house-shaped biscuits). No resize needed. No credit (none known, invent none).
- Drop `loading="lazy"` (the hero is above the fold), drop `width`/`height`, `data-object-fit`, the legacy dim `<span>`.
- Alt text: legacy alt "panorama" is wrong for this photo. Draft for owner approval: "Casetta di pan di zenzero e biscotti a forma di casa". Until approved, use the draft (it is not page copy) and list it in the report.
- h1 at `--step-display` with a scoped `color:var(--on-forest)`, as Regolamento.

## Policy cards

- Card style exactly as Regolamento `.rule`: `border-top:3px solid var(--meadow)`, `padding-top:16px`, h2 in the display font at `--step-title`, `--forest`; `align-items:start`. Reuse the same rules (copy them into the scoped CSS; do not refactor Regolamento into a shared component).
- The 6 cards, legacy text verbatim:
  1. "Cookie Policy di Cuore di Bosco": one paragraph (`<strong>cuoredibosco.it</strong>` kept).
  2. "Cosa sono i cookie": one paragraph.
  3. "Tipologie di cookie utilizzati": numbered list (`<ol>`, decimal numbers, `padding-left` as the `ul`), each item with its `<strong>` lead kept.
  4. "Cookie usati su questo sito": "Il sito può utilizzare:" + disc list of 3.
  5. "Come gestire i cookie": paragraph + disc list of the 4 browser links + the "Preferenze cookie" button (below).
  6. "Titolare del trattamento": "**Cuore di Bosco – B&B**", line break, "Email: " + mailto link (below).
- Links: `target="_blank" rel="noopener"` kept; underlined, `--forest`.

## Owner-approved additions (2026-11-03)

- Layout: cards in 2 columns, like Regolamento.
- "Come gestire i cookie" gets a pill button labelled "Preferenze cookie" (same label as the footer control, so no new copy) at the end of the card, after the browser list. It calls `openPreferences` from `useCookieConsent()`, exactly as `components/site/footer.vue` does: the banner reopens and focus moves to Accetta. Style: a pill like the redesign buttons (e.g. the lime Prenota pill); builder picks the closest existing one and states which.
- "Titolare del trattamento": the email becomes `<a href="mailto:info@cuoredibosco.it">`; the visible text stays `info@cuoredibosco.it` (keep the `<em>` inside the link).

## Calls made by me (not owner-decided)

- Hero alt draft; hero identical in size to Regolamento's.
- Legacy photo kept as an assets import (already a small WebP).
- Card titles become h2 (legacy h3), as Regolamento; numbered list style.
- Button placement at the end of the card; button style left to the builder within the pill family.

## Open points (flag, do not fix)

- Hero alt draft needs owner approval.

## Left to the builder

- Exact gaps and margins (reuse Regolamento's).
- Hero `object-position` (keep the gingerbread house in view).
- Which existing pill style the button reuses.

## Tests

Owner decision (2026-11-03): simple static page, no new tests. Only update the existing tests the port would break:

- `tests/explore-page.nuxt.test.ts` route test: `/it/privacy-policy` and `/it/privacy-policy/` now in `redesignedRoutes`; `'privacy'` leaves the `not.toContain` loop (prenota stays).
- `tests/legacy-css.nuxt.test.ts`: remove the `pages/it/privacy-policy.vue` row from `unscopedPageFiles` (its legacy style block goes); keep the `pages/en/privacy-policy.vue` row (EN has its own copy of the style).

## Done when

- `/it/privacy-policy` in redesign style with the structure above; all legacy text present; button and mailto work.
- Gate green via gate-runner (lint, typecheck, full tests, generate).
- Browser PASS at 1440/1024/390: no horizontal overflow, hero photo loads, no adjacent same backgrounds, 2/2/1 card columns, "Preferenze cookie" reopens the banner with focus on Accetta, mailto href correct.
- No legacy page touched (EN pages, `/it/prenota`).
- Local commits only.
