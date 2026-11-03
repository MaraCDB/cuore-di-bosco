# Esplora port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `/it/esplora` from the legacy layout to the redesign style, with an 8-place photo grid and every legacy text kept.

**Architecture:** `layouts/default.vue` turns `main.redesign` on for `/it/esplora` too. `pages/it/esplora.vue` is rewritten in place: same `useHead`, new template of 8 sections, scoped styles mirroring `pages/it/index.vue`, `useReveal(root)`. Redesign globals (`.band`, `.wrap`, `.lead`, tokens) already live in `assets/css/global.css` under `.redesign`.

**Tech Stack:** Nuxt 3.17, Vue SFC, vitest + `@nuxt/test-utils` (`mountSuspended`), plain CSS.

**Spec:** `docs/superpowers/specs/2026-11-03-esplora-port-design.md` (read it: section table, tile table, typo list, calls).

## Global Constraints

- Branch `redesign/prova-1`, local commits only, never push, never merge. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `public/images/00-Monte-Altissimo-*.jpg`, `public/images/Gamme 2026-20261103T122719Z-1-003.zip`. Stage files by name, never `git add -A`/`.`.
- Owners' text word for word. Only changes: "Castello di Ala" -> "Castello di Avio"; the 4 typo fixes in the spec. No new headings, captions or sentences.
- No `width`/`height` attributes on `<img>`. Every NuxtLink has `no-prefetch` (the page has none today; external links stay `<a>`).
- `font-size` only as `var(--step-*)`. Text font Montserrat (`var(--sub)`), headings display font; never `var(--body)`.
- Long paragraphs: `max-width:68ch;text-align:justify;hyphens:auto`, `text-align:left` at `max-width:520px`.
- Credit text: `Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di <autore>`; APT-only credit (no author) = `Archivio Fotografico APT Rovereto Vallagarina Monte Baldo`.
- No two adjacent sections with the same background. On conflict stop and report; never change colors on your own.
- No code comments. English identifiers.
- Node: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`, then `npx -y pnpm@10.10.0 <script>`. Targeted tests only inside a task: `npx -y pnpm@10.10.0 vitest run <files>`.

## Review Focus

1. Phone width 390: long external URLs or the PDF link text overflow horizontally. Expect no horizontal scroll (`overflow-wrap:anywhere` on links if needed). Pinned by browser check; CSS test in Task 1 step 1 (`breaks long links`).
2. A hotlinked visitrovereto.it image fails to load: the row must keep its credit and not collapse the layout. Each `img` has `alt` and `loading="lazy"`; test asserts alts present.
3. Credits on the forest band unreadable: test asserts `.explore-flower .photo-credit` uses `var(--on-forest-soft)`.
4. Legacy text silently dropped or reworded while restyling: fixture-based verbatim test (Task 1).
5. Route switch leaks redesign onto legacy pages (`/it/prenota`, `/it/regolamento`): test asserts `isRedesignedRoute` is false there.

---

### Task 1: Redesigned `/it/esplora`

**Files:**
- Modify: `layouts/default.vue:21` (route match)
- Rewrite: `pages/it/esplora.vue` (template + scoped style; `useHead` kept, keyword "Castello di Ala" -> "Castello di Avio")
- Add: `public/images/logo-parco-monte-baldo.svg` (owner's file, already on disk, untracked)
- Create: `tests/fixtures/esplora-legacy-text.json`
- Create: `tests/explore-page.nuxt.test.ts`
- Modify: `tests/desktop-scale.nuxt.test.ts` (add esplora source to `redesignSources` and to the font-size list)
- Modify: `tests/site-no-prefetch.nuxt.test.ts` (add a case for the esplora page that does not require `links.length > 0`)

**Interfaces:**
- Produces (class names the tests and the browser check rely on): sections in order `.explore-intro` (inside `.band`), `.places`, `.explore-nature`, `.explore-around`, `.explore-flower` (inside `.band`), `.explore-garden`, `.seasons`, `.explore-note`; tiles `ul.places > li.place > figure > img + figcaption > .place-name + .photo-credit`; season cards `.season`; photo row `.photo-row > figure > img + figcaption .photo-credit`; logo `img.park-logo`.

- [ ] **Step 1: Freeze the legacy text as a fixture (before touching the page)**

Mount the current legacy `pages/it/esplora.vue` in a throwaway vitest file, collect `textContent` of every `h1, h2, h3, p` inside it, normalize (`\u00a0` -> space, collapse whitespace, trim), drop empties, apply exactly these replacements, and write the array to `tests/fixtures/esplora-legacy-text.json`; then delete the throwaway file.

```
"Castello di Ala"                -> "Castello di Avio"
"località scistiche"             -> "località sciistiche"
"e in nostri consigli"           -> "e i nostri consigli"
"un evento dedicata al"          -> "un evento dedicato al"
"Canyon della Sorna ,"           -> "Canyon della Sorna,"
"ESPLORA I DINTORNI"             -> "Esplora i dintorni"
```

Check: the JSON has the h1, the 2 h2, the 5 h3 (PDF guide + 4 seasons) and every paragraph; no entry still contains "Ala", "scistiche", "in nostri", "dedicata al".

- [ ] **Step 2: Write the failing tests** in `tests/explore-page.nuxt.test.ts` (mount helper as in `tests/home-page.nuxt.test.ts`; text normalized the same way as the fixture)

```ts
it('keeps every legacy heading and paragraph word for word', ...)
  // every fixture string is a substring of the normalized page text
it('lists the eight places in order with their photos and credits', ...)
  // .place-name texts == ['Brentonico','Monte Baldo','Canyon della Sorna','Lago di Garda','Rovereto','Castello di Avio','Polsa e San Valentino','Cammino di San Rocco']
  // img src == /images/home/ + ['palazzo-eccheli-baisi-1280','trekking-baldo-1280','forra-sorna-1280','monte-altissimo-1200','castello-rovereto-700','castello-avio-1280','inverno-brentonico-1280','cammino-san-rocco-960'] + '.webp'
  // .photo-credit per tile == [APT+'Luca Matassoni', APT+'Tommaso Prugnola', APT+'Tommaso Prugnola', '360gardalife. Foto di Angela Trawoeger', APT+'Luca Matassoni', APT+'Martina Vanzo', APT+'Tommaso Prugnola', none]
  // no tile named 'Lago di Loppio'
it('shows the flower of Baldo photos as a credited row', ...)
  // .explore-flower .photo-row img src == the 5 legacy Carousel URLs in legacy order, alts == legacy alts
  // credits == APT + ['Valentino Azzolini','Luca Matassoni','Luca Matassoni','Tommaso Prugnola','Graziano Galvagni']
it('credits the Brentonico panorama to the APT archive', ...)
  // figure with img src '/images/altervista/apt_brentonico.jpg' has credit 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo'
it('links the park logo from the local file', ...)
  // a[href='https://www.parcomontebaldo.tn.it/it'] img.park-logo src '/images/logo-parco-monte-baldo.svg', alt 'Logo Parco Naturale Monte Baldo'
it('keeps every legacy link', ...)
  // set of hrefs on the page ⊇ the 24 distinct hrefs of the legacy page (list them in the test)
it('never sets width or height attributes or inline styles on images', ...)
it('orders the sections so no two neighbours share a background', ...)
  // top-level section classes in order == spec order; .explore-intro and .explore-flower inside .band;
  // scoped CSS (readFileSync) gives .explore-nature, .explore-garden, .explore-note background:var(--champagne); .places, .explore-around, .seasons no background
it('uses the light credit colour on the forest band', ...)
  // CSS: .explore-flower .photo-credit{...color:var(--on-forest-soft)
it('lays the places out four across on desktop and two on phones', ...)
  // CSS: .places base grid-template-columns:repeat(2,minmax(0,1fr)); inside @media (min-width:901px) repeat(4,minmax(0,1fr))
it('justifies long paragraphs and breaks long links', ...)
  // CSS: 68ch + justify + hyphens:auto on the text sections' p; left at max-width:520px; overflow-wrap on links
it('turns the redesign on for the explore page only among the inner italian pages', ...)
  // layouts/default.vue source: match includes '/it/esplora' and '/it/esplora/', not prenota/regolamento/privacy
it('names the castle of Avio in the SEO keywords', ...)
  // useHead keywords contain 'Castello di Avio', not 'Castello di Ala' (readFileSync the page)
```

Also: `desktop-scale` — add `exploreSource` (readFileSync `pages/it/esplora.vue`) to both lists; `site-no-prefetch` — case `it('never prefetch pages from the explore page')` mounting the page and asserting every NuxtLink (possibly zero) has `noPrefetch`.

- [ ] **Step 3: Run them, expect FAIL**

Run: `npx -y pnpm@10.10.0 vitest run tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts`
Expected: explore-page cases FAIL (legacy markup), others may already pass.

- [ ] **Step 4: Implement**

- `layouts/default.vue`: `isRedesignedRoute` true for `/it`, `/it/`, `/it/esplora`, `/it/esplora/` (a small set, not a prefix match).
- `pages/it/esplora.vue`: template per the spec's section table, text copied from the fixture/legacy markup with its `<strong>`, links and attributes (`target`, `rel`) unchanged; remove `bosco` import and the `Carousel` usage; tile alts from the home (`pages/it/index.vue` garden/pilgrims alts). Script: keep `useHead` (only the keyword fix), add `const root = ref<HTMLElement | null>(null); useReveal(root)`, `data-reveal` on section heads/tiles like the home. Style: scoped, compact one-rule-per-line like `index.vue`; reuse home values (`--section-gap`, `--band-pad`, `.photo-row` rules adapted from `index.vue:351-358`); tile photo `aspect-ratio:1/1;object-fit:cover;width:100%`; `.place-name` font display, `var(--step-title)`, color forest; seasons 2x2 from 901px, 1 column below; `.park-logo{width:132px;height:auto}`.
- `git add public/images/logo-parco-monte-baldo.svg` with the page.

- [ ] **Step 5: Run the tests, expect PASS**

Same command as step 3, plus `npx -y pnpm@10.10.0 eslint pages/it/esplora.vue layouts/default.vue tests/explore-page.nuxt.test.ts`. Expected: all PASS, 0 lint errors.

- [ ] **Step 6: Commit**

```bash
git add layouts/default.vue pages/it/esplora.vue public/images/logo-parco-monte-baldo.svg tests/fixtures/esplora-legacy-text.json tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts docs/superpowers/specs/2026-11-03-esplora-port-design.md docs/superpowers/plans/2026-11-03-esplora-port.md
git commit -m "feat: port the explore page to the redesign with the places grid"
```

### Task 2: Castle of Avio on the English explore page

**Files:**
- Modify: `pages/en/explore.vue:72`
- Test: `tests/explore-page.nuxt.test.ts`

- [ ] **Step 1: Failing test** `it('names the castle of Avio on the english explore page')`: readFileSync `pages/en/explore.vue` contains `<strong>Castello di Avio</strong>` and not `Castello di Ala`.
- [ ] **Step 2: Run, expect FAIL.** `npx -y pnpm@10.10.0 vitest run tests/explore-page.nuxt.test.ts`
- [ ] **Step 3: Replace** "Castello di Ala" with "Castello di Avio" in that line only.
- [ ] **Step 4: Run, expect PASS.**
- [ ] **Step 5: Commit** `git add pages/en/explore.vue tests/explore-page.nuxt.test.ts` + `git commit -m "fix: place the castle in Avio on the english explore page"`

### Verification (controller, after both tasks)

1. Gate via `gate-runner` (lint, typecheck, full tests, `generate`), verdict written to `C:\Users\Mara\AppData\Local\Temp\measure\gate-verdict.txt`. Expected: all green, 24 routes.
2. Serve `node .superpowers/sdd/2026-11-01-home-redesign-port/serve.mjs .output/public 4196`; `browser` agent (playwright-core + system Chrome, scripts in `Temp\measure`, scroll for reveal/lazy) at 1440/1024/390 on `/it/esplora`: no horizontal overflow; all images loaded (8 tiles, 5 row, panorama, logo); grid 4/4/2 columns; credits visible and readable; section backgrounds in spec order with no adjacent pair alike; header/footer/dock are the redesign ones; `/it` and `/it/prenota` unchanged. Screenshots `compare/esplora/`.
3. Final whole-branch review of the two commits; fix round if needed; re-gate.
4. Archivist + MEMORY.md update, then report.
