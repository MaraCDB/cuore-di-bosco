# Regolamento port — design

Branch `redesign/prova-1` (experimental: local commits only, never push or merge to main without explicit owner OK).

## Intent

`/it/regolamento` is still the legacy page (`pages/it/regolamento.vue`: full-width photo with text-shadow title, white `.rule-box` cards with shadows, Segoe UI). The home and Esplora are already redesigned. Port Regolamento to the same style so the three Italian pages read as one site.

## Goals

- `/it/regolamento` renders inside `main.redesign` with the redesign header, footer, dock: add `'/it/regolamento'` and `'/it/regolamento/'` to `redesignedRoutes` in `layouts/default.vue`.
- Split hero like the home, 13 rule cards, closing line.
- Every legacy text kept word for word, except the owner-approved changes below.

## Non-goals

- No port of `/en/rules` or any EN page; no change to `/it/prenota`, `/it/privacy-policy`.
- No new copy: no lead, intro, subtitles or captions beyond what is listed here.
- No change to the home, Esplora, header, menu, footer, dock beyond the route switch.
- No links added inside the rule texts (e.g. "sezione prenota" stays plain text).
- `useHead` stays as is.

## Anti-goals

- Inventing facts, a photo credit, or rewording the owners' text.
- Touching the POLITICHE DI CANCELLAZIONE text (see Open points).
- Two adjacent sections with the same background.
- `width`/`height` attributes on `<img>`; any NuxtLink without `no-prefetch`.
- Committing `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`.

## Constraints (from the home and Esplora, already decided)

- Headings Mountains of Christmas, all other text Montserrat (`var(--sub)`, never `var(--body)`), font-size only via `--step-*`, `--page-max` 1440, split-band text padding `max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))`.
- Long paragraphs: `max-width:68ch`, `text-align:justify`, `hyphens:auto`, `text-align:left` at `<=520px`.
- Backgrounds: forest `.band`, champagne, linen (page). Footer is forest-deep.
- `useReveal(root)` + `data-reveal` as in the home.

## Page structure (top to bottom)

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Hero | forest band | Split like the home `.hero`: text half with h1 "Regolamento" (legacy, as is) and nothing else; photo half `regole-scaled.jpg`, bleeding to the page edge. Phone: photo first (4:3), text below, as the home. No logo, no buttons, no lead. |
| 2 | Rules | linen | 13 cards, legacy order, one per legacy section: h2 title (UPPERCASE, as is) + its paragraphs/lists. 2 columns on desktop (`>=901px`), 1 below. |
| 3 | Closing | champagne | "Auguriamo a tutti un soggiorno indimenticabile tra le nostre montagne!" (legacy, italic), mirroring the home `.story` (`index.vue` `.story`: champagne background, `margin-top:var(--section-gap)`, `padding:var(--band-pad) var(--margin)`, centred). Not `class="band"`: `.redesign .band` forces forest. Italic via a scoped `font-style:italic` (legacy `.italic`, `.text-center`, `.text-white` do nothing inside `.redesign`). The legacy `<hr>` goes. |

Sequence: forest, linen, champagne, footer forest-deep: no adjacent pair alike. If the build shows a conflict, stop and propose options; do not change colors unilaterally.

## Hero

- Photo: `public/images/altervista/regole-scaled.jpg` (2560x1424, board game with pawns and dice). Owner: keep it, no credit (none known).
- Serve a resized WebP, run from the cuore-di-bosco root (the script writes to a relative path): `node ../cdb-tools/apt-resize.mjs public/images/altervista/regole-scaled.jpg regole 1440` -> `public/images/home/regole-1440.webp`. The JPG stays in the repo untouched.
- Alt text: legacy alt "bosco" is wrong for this photo. Draft for owner approval: "Pedine e dadi su un gioco da tavolo". Until approved, use the draft (it is not page copy) and list it in the report.
- Hero height: the text half holds only the h1, so the desktop hero is shorter than the home's (builder picks, about 300-360px at 1440); h1 at `--step-display` with an explicit scoped `color:var(--on-forest)` (global `.redesign h1` is `--forest`; `.band` recolours only h2/h3), as the home `.hero h1`.

## Rule cards

- Card style as Esplora `.season`: `border-top:3px solid var(--meadow)`, `padding-top:16px`, no box, no shadow, no radius. Titles are h2 (global `.redesign h2` sets `--step-head`), so a scoped rule on the card h2 sets the display font at `--step-title`, `--forest`; UPPERCASE as written (no `text-transform`).
- Grid row by row (reading order = legacy order), `align-items:start`; the 13th card sits alone in the left column.
- Lists (`REGOLE DELLA CASA`, `NORME COMPORTAMENTALI`): disc bullets, `padding-left:1.1em` as the home lists, Montserrat, same size as paragraphs; `li` justified with hyphens like paragraphs, left at `<=520px`.
- `<strong>`/`<b>` kept as in the legacy (`IMPORTANTE:`, `Check-in`, `Check-out`, "sala colazioni dalle 7:30 alle 9:30", "vietato fumare negli ambienti interni ed esterni della struttura").
- The text moves from the `sections` array + `v-html` into the template (13 `<section class="rule">` written out), so scoped CSS reaches it (scoped rules do not match `v-html` nodes). Text identical; the array goes.

## Owner-approved text changes (IT only)

- COLAZIONE: drop the picnic part. The sentence becomes "Inoltre possiamo preparare una colazione da consumare in camera (a richiesta)" (no full stop, as the legacy).
- REGOLE DELLA CASA: "Vi invitiamo inoltre di fare" -> "Vi invitiamo inoltre a fare".
- PULIZIE E MANUTENZIONE: "Saranno a vs disposizione" -> "Saranno a vostra disposizione".
- NORME COMPORTAMENTALI: "Spegnere luci e finestre quando uscite" -> "Spegnere le luci e chiudere le finestre quando uscite".

Nothing else in the text changes, including "Pulizie o cambi biancheria straordinari … costo aggiuntivo" (a rule, not an advertised extra).

## Calls made by me (not owner-decided)

- Hero alt draft (above) and the shorter hero.
- Card style borrowed from `.season`; 2 columns row by row; 13th card alone.
- Closing line centred on champagne, `<hr>` dropped.
- Rule text moved out of `v-html` into the template; list indent and justified `li` as above.

## Open points (flag, do not fix)

- POLITICHE DI CANCELLAZIONE conflicts with beb.it (Regolamento: full deposit refund up to the 15th day, none in the last 7, days 8-14 undefined; beb.it: free cancellation up to 7 days and "Nessun anticipo", wrong because a 35% deposit is always taken). Owners pick the rule and write the text; the port keeps it verbatim.

## Left to the builder

- Exact gaps and margins (reuse `--section-gap`, `--band-pad`, Esplora `.seasons` gaps).
- Hero WebP width(s) and `object-position`.
- Scoped CSS in `regolamento.vue`, mirroring `esplora.vue`.

## Tests

- New `tests/regolamento-page.nuxt.test.ts`: every legacy text present verbatim (fixture `tests/fixtures/regolamento-legacy-text.json`, with the 4 changes applied; compare after whitespace normalisation, reusing `normalize()` from `explore-page.nuxt.test.ts`, since legacy COLAZIONE has a newline mid-paragraph), picnic text and the 3 old typos absent, 13 h2 in order, hero photo without width/height, closing line present, justify/hyphens and phone left-align rules (selectors as written in the scoped CSS).
- `tests/explore-page.nuxt.test.ts` route test: `/it/regolamento` and `/it/regolamento/` now in `redesignedRoutes`; `'regolamento'` leaves the `not.toContain` loop (prenota and privacy stay); rename the test (it no longer says "explore page only").
- `tests/desktop-scale.nuxt.test.ts`: add `pages/it/regolamento.vue` to both hand-written lists (the Montserrat/`var(--body)` sources and the font-size style blocks); add an assertion that its styles contain no `zoom` (the existing zoom check reads only global.css).
- `tests/site-no-prefetch.nuxt.test.ts`: import and mount `regolamento.vue` in its own `describe`, copied from Esplora's (no `length>0` assertion, so zero NuxtLinks pass).

## Done when

- `/it/regolamento` in redesign style with the structure above; all legacy text present except the 4 approved changes.
- Gate green via gate-runner (lint, typecheck, full tests, generate).
- Browser PASS at 1440/1024/390: no horizontal overflow, hero photo loads, no adjacent same backgrounds, 2/2/1 card columns.
- No legacy page touched (EN pages, `/it/prenota`, `/it/privacy-policy`).
- Local commits only.
