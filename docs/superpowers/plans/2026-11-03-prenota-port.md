# Prenota port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `/it/prenota` from the legacy layout to the redesign style (carousel, lime PRENOTA strip with the unchanged widget, welcome texts, room cards with lightbox, icon panel, three service columns), keeping every legacy text except the owner-approved changes.

**Architecture:** `layouts/default.vue` turns `main.redesign` on for `/it/prenota` too. `pages/it/prenota.vue` is rewritten in place: same `useHead`, same widget init `onMounted`, the legacy unscoped `<style>` replaced by `<style scoped>` that copies the needed rules from `pages/it/index.vue` (`.room`, `.rooms-family`) and `pages/it/regolamento.vue` (`.rule` card border), `useReveal(root)`. The carousel is the existing `components/site/photo-carousel.vue`, untouched. The lightbox stays a `<Teleport to="body">` whose root carries the class `redesign`.

**Tech Stack:** Nuxt 3.17, Vue SFC, vitest + `@nuxt/test-utils` (`mountSuspended`), plain CSS.

**Spec:** `docs/superpowers/specs/2026-11-03-prenota-port-design.md` (read it: Page structure table, sections 1-6, Owner decisions, Tests).

## Global Constraints

- Branch `redesign/prova-1`, local commits only, never push, never merge. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `.playwright-mcp/`, `.superpowers/`, `public/images/FOTO MIE BB E DINTORNI/`. Stage files by name, never `git add -A`/`.`.
- Owners' text word for word. Only changes: "troverei" -> "troverai"; "attrezzato (in realizzazione)." -> "attrezzato."; captions "SERVIZIO LAVANDERIA" -> "LAVANDERIA", "SERVIZIO PIC-NIC" -> "PIC-NIC"; heading case "Lampone", "Mirtillo", "I nostri servizi", pill "Da 2 a 4 posti letto adulti". No other new text except the carousel `label` "Fotografie delle camere e della casa". "PIC NIC DAY … (servizio a pagamento)" and "lavanderia express … (a pagamento)" stay verbatim (open point).
- No payment or cancellation conditions on the page.
- Widget container markup identical: `<div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit" data-tipo="widget" data-lingua="it" data-action="https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002" data-colore="green" data-wl="true">`. `useHead` and the widget `onMounted` init loop unchanged.
- No `width`/`height` attributes on `<img>`. Any NuxtLink gets `no-prefetch` (the page needs none).
- `font-size` only as `var(--step-*)`. Text font Montserrat (`var(--sub)`), headings display font; never `var(--body)`. No `zoom`. No `v-html`. Only `<style scoped>`.
- Long paragraphs: `max-width:68ch;text-align:justify;hyphens:auto`, `text-align:left` inside `@media (max-width:520px)`.
- Backgrounds in order: carousel forest (`.band`), booking strip lime, welcome linen (page), rooms champagne, services forest (`.band`), service texts linen, footer. Coloured sections touch each other: vertical spacing is padding (`var(--band-pad)`), never a margin that shows linen between two coloured sections. On any colour conflict stop and report, never change colours.
- No legacy page touched: `pages/en/*`. No change to home, Esplora, Regolamento, Privacy, header, menu, footer, dock, cookie banner, `components/site/photo-carousel.vue`.
- No code comments. English identifiers (the legacy Italian comments in the script go).
- Node: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`, then `npx -y pnpm@10.10.0 <script>`. Inside a task run only targeted tests: `npx -y pnpm@10.10.0 vitest run <files>`.
- Browser checks: never port 4173 (old legacy server). The legacy look on 4173 may be used as the "before" reference for the widget.

## Review Focus

1. Widget injected inside `main.redesign` picks up the redesign globals (`.redesign *` box-sizing, `.redesign img{display:block}`, `p`/`h3` margins and fonts, `a` colour) and its date fields or search button break. Expect the widget to look and work as on the legacy page (dates open, search goes to bed-and-breakfast.it). Pinned by the browser check in Task 3; any containment lives in scoped CSS on the container.
2. Lightbox hit by legacy CSS or hidden under fixed UI: it is teleported outside `main.redesign`, and the dock (z-index 50) and cookie banner (9999) are fixed. Expect the lightbox root to have class `redesign` and to sit above the cookie banner. Pinned by `lightbox root carries the redesign class` (Task 2) and the browser check.
3. Keyboard on a closed lightbox: Esc/arrows must do nothing while closed, and the listener must go on unmount. Pinned by `ignores the arrow keys while the lightbox is closed` (Task 2).
4. Phone 390: the long icon captions ("DOTAZIONI DI CORTESIA PER GLI OSPITI", "ASCIUGAMANI E BIANCHERIA INCLUSI") or "PRENOTA" at `--step-display` overflow horizontally. Expect no horizontal scroll; captions wrap (`overflow-wrap:anywhere` on figcaption). Pinned by the browser check (Task 3).
5. `<br>` line lists lose their word boundaries: legacy `Vallagarina</strong>,<br>sull’…` has no whitespace around the `<br>`, so a plain `textContent` glues words. Expect the fixture and the page text to read `<br>` as a space. Pinned by `blockTexts()` in Task 1, used for both the fixture and the page.

---

### Task 1: Redesigned `/it/prenota` (structure, texts, widget, rooms, icons, columns)

**Files:**
- Modify: `layouts/default.vue:21` (add `'/it/prenota'`, `'/it/prenota/'`)
- Rewrite: `pages/it/prenota.vue` (template + script + `<style scoped>`; `useHead` and widget init unchanged; lightbox template and script left as they are, restyled in Task 2)
- Create: `tests/fixtures/prenota-legacy-text.json`
- Create: `tests/prenota-page.nuxt.test.ts`
- Modify: `tests/explore-page.nuxt.test.ts:228-238` (route test)
- Modify: `tests/legacy-css.nuxt.test.ts:26` (drop the `pages/it/prenota.vue` row; keep `bookingSelectors` and the EN row)
- Modify: `tests/desktop-scale.nuxt.test.ts` (booking source in both source lists + no-zoom test)

**Interfaces:**
- Produces (DOM the tests and Task 2/3 rely on), inside root `div ref="root"`:
  - `div.band.booking-carousel` > `SitePhotoCarousel` with `label="Fotografie delle camere e della casa"`.
  - `section.booking-strip` (lime) > `h1` "PRENOTA" + the widget container (optionally inside one `div.booking-panel`).
  - `section.wrap.booking-intro` > 4 `p`.
  - `section.booking-rooms` (champagne) > `div.wrap` > `div.rooms-head` (`h2` + 3 `p`), `article.room#lampone`, `article.room#mirtillo`, `p.rooms-family`.
  - each `article.room` > `div.room-photos` (4 × `img` keeping the legacy `@click="openLightbox(…, i)"` in Task 1; Task 2 wraps each in `button.room-photo`) + `div.room-text` (`h3`, `p.lead`, 2 `p`, `p.beds`).
  - `section.band.services` > `div.wrap` > `h2` + `div.service-icons` > 15 × `figure` (`img` + `figcaption`).
  - `section.wrap.service-texts` > 3 × `div.service-column` (`h3` + `p`…).
- Produces (script): `lamponePhotos`, `mirtilloPhotos` (`string[]`, unchanged values), `carouselPhotos: { src: string, alt: string }[]`.

- [ ] **Step 1: Freeze the legacy text as a fixture (before touching the page)**

In a throwaway vitest file mount the current legacy `pages/it/prenota.vue`, take `blockTexts(wrapper.element, 'p, figcaption')` (helper below), drop empties, replace exactly these entries/substrings, write the array to `tests/fixtures/prenota-legacy-text.json` (2-space JSON), delete the throwaway file.

```ts
function normalize(text: string): string {
  return text.replace(/ /g, ' ').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map((node) => {
    const copy = node.cloneNode(true) as Element
    copy.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '))
    return normalize(copy.textContent ?? '')
  })
}
```

```
"troverei"                                -> "troverai"
"attrezzato (in realizzazione)."          -> "attrezzato."
"SERVIZIO LAVANDERIA" (whole entry)       -> "LAVANDERIA"
"SERVIZIO PIC-NIC" (whole entry)          -> "PIC-NIC"
```

Check: 39 entries (4 welcome, 3 rooms intro, 3 per room, 15 captions, 6 "Servizi per famiglie" incl. its title, 3 "Servizi in camera", 2 "Altri servizi per te!"); the first reads "Benvenuti al B&B Cuore di Bosco, un rifugio immerso nella natura della Vallagarina, sull’Altopiano di Brentonico, il giardino d’Europa. Circondati da rigogliose montagne, il tempo rallenta e la tranquillità regna sovrana."; no entry contains "troverei", "(in realizzazione)", "SERVIZIO LAVANDERIA", "SERVIZIO PIC-NIC".

- [ ] **Step 2: Write the failing tests** in `tests/prenota-page.nuxt.test.ts` (setup as `tests/regolamento-page.nuxt.test.ts:1-31`: `pageSource`, `pageStyles`, fixture, `mountBooking()`, `ruleBody()`, plus `normalize`/`blockTexts` from Step 1)

```ts
const iconCaptions = ['FREE WIFI', 'ASCIUGAMANI E BIANCHERIA INCLUSI', 'DOTAZIONI DI CORTESIA PER GLI OSPITI', 'DOCCIA E BAGNO PRIVATI', 'COLAZIONE DOLCE E SALATA', 'SET BOLLITORE', 'LAVANDERIA', 'BICICLETTE A DISPOSIZIONE', 'GIOCHI PER BAMBINI', 'DOTAZIONI PER BAMBINI', 'CULLA PER BAMBINI', 'MATERIALI PER BAMBINI', 'SUPPORTI PER PORTARE', 'LIBRERIA PER ADULTI E BAMBINI', 'PIC-NIC']
const carouselSources = ['/images/home/casa-1600.webp', '/images/lampone/1.webp', '/images/lampone/2.webp', '/images/lampone/3.webp', '/images/lampone/4.webp', '/images/lampone/5.webp', '/images/home/lampone-balcone-1200.webp', '/images/mirtillo/1.webp', '/images/mirtillo/2.webp', '/images/mirtillo/3.webp', '/images/mirtillo/4.webp', '/images/home/colazione-1280.webp']

it('keeps every legacy text word for word')
  // legacyTexts.length === 39; every entry is a substring of blockTexts(page, 'h1, h2, h3, p, figcaption').join(' ')
it('applies the owners\' text fixes and drops the paid-service captions')
  // page text has none of: 'troverei', '(in realizzazione)', 'SERVIZIO LAVANDERIA', 'SERVIZIO PIC-NIC' (case-sensitive)
  // contains 'Nell’apposito stand inoltre troverai tutte le mappe' and 'libreria ed angolo giochi attrezzato.'
it('shows no payment or cancellation conditions')
  // page text has none of: 'acconto', 'cancellazion', 'rimbors', 'caparra'
it('titles the page and its sections')
  // h1 texts === ['PRENOTA']; h2 === ['Scopri le nostre camere', 'I nostri servizi']; h3 === ['Lampone', 'Mirtillo', 'Servizi per famiglie', 'Servizi in camera', 'Altri servizi per te!']
it('opens with the photo carousel on the forest band')
  // first element child of root is '.band.booking-carousel'; its '.carousel' aria-label === 'Fotografie delle camere e della casa'
  // first 12 img srcs in it === carouselSources; alts: [0] 'La casa in pietra del B&B Cuore di Bosco a Prada', [1..5] 'Camera Lampone foto 1..5', [6] 'Il Monte Baldo innevato visto dal balcone della camera Lampone', [7..10] 'Camera Mirtillo foto 1..4', [11] 'La colazione con la torta fatta in casa'
it('keeps the booking widget container exactly as before')
  // '.booking-strip .js-booking-engine-container' has class 'booking-widget' and data-idstruttura '68002', data-tipostruttura 'bbit', data-tipo 'widget', data-lingua 'it', data-action 'https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002', data-colore 'green', data-wl 'true'
  // ruleBody('.booking-strip') contains 'background:var(--lime)'; '.booking-strip h1' text 'PRENOTA'; no [data-reveal] on or inside .booking-carousel and .booking-strip
it.each(['lampone', 'mirtillo'])('gives the %s card its anchor, texts and four photos')
  // article.room#<id> exists; its .room-photos img srcs === /images/<id>/1-4.webp; alts 'Camera Lampone foto N' / 'Camera Mirtillo foto N'
  // its p.beds text 'Da 2 a 4 posti letto adulti'
it('puts the family line under the two room cards')
  // '.booking-rooms p.rooms-family' text 'Culla gratis · 1° bambino gratis · 2° bambino al 50% · <12 anni'; #mirtillo.compareDocumentPosition(familyLine) & DOCUMENT_POSITION_FOLLOWING
  // ruleBody('.booking-rooms') contains 'background:var(--champagne)'
it('shows the fifteen service icons in one panel')
  // '.services.band .service-icons > figure' figcaptions === iconCaptions; each img alt === its caption
  // desktop block (min-width:901px) contains '.service-icons{grid-template-columns:repeat(8,minmax(0,1fr))'
it('sets the service texts in three columns with a meadow top border')
  // '.service-texts > .service-column' count 3, h3 texts the last three of the h3 list above
  // ruleBody('.service-column') contains 'border-top:3px solid var(--meadow)'; desktop block contains '.service-texts{grid-template-columns:repeat(3,minmax(0,1fr))'
it('never sets width or height on images and drops the legacy heroes')
  // no img with width/height; no img src containing 'camere', 'colazioni' or 'separator'; pageSource has no 'v-html' and no '<style>' without 'scoped'
it('justifies the long paragraphs within 68ch and aligns them left on phones')
  // pageStyles matches /\.booking-intro p,\.rooms-head p,\.room-text p,\.service-column p\{max-width:68ch;text-align:justify;hyphens:auto\}/
  // the max-width:520px block contains '.booking-intro p,.rooms-head p,.room-text p,.service-column p{text-align:left}'
```

- [ ] **Step 3: Update the shared tests**

- `tests/explore-page.nuxt.test.ts` route test: rename to `'turns the redesign on for every inner italian page'`; add `toContain("'/it/prenota'")` and `toContain("'/it/prenota/'")`; delete the `not.toContain` loop.
- `tests/legacy-css.nuxt.test.ts`: delete the `['pages/it/prenota.vue', bookingSelectors]` row only.
- `tests/desktop-scale.nuxt.test.ts`: `const bookingSource = readFileSync('pages/it/prenota.vue', 'utf8')`; add it to `redesignSources` and to the style-block list; new `it('never zooms the booking page')` asserting `extractStyleBlocks(bookingSource)` has no `zoom`.

- [ ] **Step 4: Run the tests to verify they fail**

Run: `npx -y pnpm@10.10.0 vitest run tests/prenota-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/home-page.nuxt.test.ts`
Expected: the new prenota tests (except possibly the fixture one), the route test and the desktop-scale font-size test FAIL; legacy-css and home-page PASS.

- [ ] **Step 5: Implement**

- `layouts/default.vue:21`: add the two routes to the Set.
- Template per Interfaces, sections in spec order, texts from the fixture with the legacy inline markup (`<strong>`, `<em>`), manual `<br>` dropped in the welcome texts, `<strong>Altopiano di Brentonico</strong>` fixed, `<br>` kept in the two line lists. Rooms: h3 name, `p.lead` = legacy `.room-short`, the 2 legacy paragraphs, `p.beds`; no fruit icons, no buttons. Service column titles become `h3` (not `<p><b>`); the empty `<p></p>` goes. `data-reveal` on the welcome, rooms, services and service-text blocks only.
- Script: `const root = ref<HTMLElement | null>(null)`, `useReveal(root)`; `carouselPhotos` in the `carouselSources` order with the alts from the test; imports of `camere`, `colazioni`, `separator` removed (files stay: EN uses them); lightbox code, `useHead`, widget init untouched.
- Scoped CSS: delete the whole legacy `<style>`. `.booking-carousel` = `padding:var(--band-pad) 0` + `--carousel-control:var(--on-forest);--carousel-control-ink:var(--forest)` (as `.explore-flower` in `pages/it/esplora.vue:425`). `.booking-strip{background:var(--lime);…}`, `.booking-strip h1{font-size:var(--step-display);line-height:1;color:var(--forest-deep);text-align:center}`; widget container centred, width and spacing only; add a `.booking-panel` (linen or white, rounded) only if the widget reads badly on lime. `.booking-rooms{background:var(--champagne);…}`; `.room`, `.room:nth-of-type(even)`, `.room-photos`, `.room h3`, `.room .lead`, `.room .beds`, `.rooms-family` copied from `pages/it/index.vue:322-336` plus their `@media` lines (`:387-394`, `:414`, `:420`), except `.room-photos` is a 2×2 grid (`grid-template-columns:repeat(2,minmax(0,1fr))`, photos `aspect-ratio:4/3;object-fit:cover`) and `.room .beds` gets a fill that contrasts on champagne (e.g. `var(--linen)`). `.services` panel: `.service-icons{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));background:var(--linen);color:var(--ink);border-radius:…}`, 8 columns at `min-width:901px`, 3 at `max-width:520px`, thin dividers between figures (1px lines in `--champagne` or `--meadow` tint), icon `img` ~48-64px centred, `figcaption{font-size:var(--step-micro);overflow-wrap:anywhere;text-align:center}`. `.service-texts{display:grid;gap:…}` 3 columns at `min-width:901px`; `.service-column{border-top:3px solid var(--meadow);…}` like `.rule` in `pages/it/regolamento.vue`; `.service-column h3` display font at `--step-title`, `--forest`. Justify block and phone block exactly as the test strings.

- [ ] **Step 6: Run the tests to verify they pass**

Same command as Step 4. Expected: all PASS.

- [ ] **Step 7: Lint and typecheck**

Run: `npx -y pnpm@10.10.0 eslint pages/it/prenota.vue layouts/default.vue tests/prenota-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/desktop-scale.nuxt.test.ts` then `npx -y pnpm@10.10.0 nuxi typecheck`
Expected: 0 errors.

- [ ] **Step 8: Commit**

```bash
git add layouts/default.vue pages/it/prenota.vue tests/fixtures/prenota-legacy-text.json tests/prenota-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/desktop-scale.nuxt.test.ts
git commit -m "feat: port the booking page to the redesign"
```

### Task 2: Room photo lightbox (buttons, focus, keyboard, restyle)

**Files:**
- Modify: `pages/it/prenota.vue` (room photo markup, lightbox template, script, scoped CSS)
- Modify: `tests/prenota-page.nuxt.test.ts` (new `describe('room photo lightbox')`)

**Interfaces:**
- Consumes: `article.room#lampone|#mirtillo > div.room-photos`, `lamponePhotos`, `mirtilloPhotos` from Task 1.
- Produces: each gallery photo is `button.room-photo[type=button] > img` (img keeps src/alt from Task 1). Teleported root `div.redesign.lightbox` (`v-if` open) > `button.lightbox-close[aria-label=Chiudi]` "✕", `button.lightbox-prev[aria-label=Precedente]` "‹", `img.lightbox-img`, `button.lightbox-next[aria-label=Successiva]` "›", `div.lightbox-counter` "N / 4". `img.lightbox-img` alt = the alt of the gallery photo shown (e.g. "Camera Lampone foto 2").

- [ ] **Step 1: Write the failing tests** (query the lightbox on `document.body`; keys via `window.dispatchEvent(new KeyboardEvent('keydown', { key }))` + `await nextTick()`)

```ts
it('opens the clicked photo full screen with its counter')
  // click the 2nd '#lampone button.room-photo' -> '.lightbox' exists, img src '/images/lampone/2.webp', alt 'Camera Lampone foto 2', counter '2 / 4'
it('loops through the room photos with the arrows')
  // from photo 4: next -> '1 / 4' src lampone/1; prev -> '4 / 4'; ArrowRight -> '1 / 4'; ArrowLeft -> '4 / 4'
it('closes with the close button, the backdrop and Esc')
  // each closes ('.lightbox' gone); a click on img.lightbox-img does not close
it('moves focus to the close button and back to the opening photo')
  // after open document.activeElement is .lightbox-close; after Esc it is the 2nd '#lampone button.room-photo'
it('ignores the arrow keys while the lightbox is closed')
  // ArrowRight / Escape with nothing open -> no '.lightbox' in document.body, no error
it('lightbox root carries the redesign class')
  // '.lightbox' classList contains 'redesign'; its img has no width/height; ruleBody('.lightbox') contains 'z-index:10001'
it('opens the Mirtillo photos on their own')
  // click the 1st '#mirtillo button.room-photo' -> src '/images/mirtillo/1.webp', counter '1 / 4'
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx -y pnpm@10.10.0 vitest run tests/prenota-page.nuxt.test.ts`
Expected: the new lightbox tests FAIL (no `button.room-photo`, no `redesign` class, legacy alt "Foto N"); Task 1 tests PASS.

- [ ] **Step 3: Implement**

- Wrap each gallery `img` in `<button type="button" class="room-photo" @click="openLightbox(photos, index, $event)">`; reset its look (`padding:0;border:0;background:none;cursor:zoom-in;display:block`), visible `:focus-visible` outline.
- Script: keep `openLightbox`, `closeLightbox`, `prevPhoto`, `nextPhoto`, `handleKeydown` and the `window` listener pair. Lightbox state holds `{ src, alt }` photos instead of strings. `openLightbox` stores the opening button (`event.currentTarget`), then `nextTick` focuses `.lightbox-close` (template ref); `closeLightbox` hides and refocuses the stored button.
- Lightbox root: `<div v-if="lightbox.visible" class="redesign lightbox" @click.self="closeLightbox">`. Scoped CSS restyled to the palette: `position:fixed;inset:0;z-index:10001`, dark backdrop (e.g. `rgba(36,71,44,0.94)`, forest-deep tint), image `max-width:90vw;max-height:85vh;object-fit:contain`, round 44px+ buttons in `--on-forest` with `--lime` focus ring, counter `font-size:var(--step-small)`, phone offsets as legacy (`max-width:600px` arrows at 0.25rem). Remove the `.room-photos img` hover scale if it fights the button; a soft opacity hover on `.room-photo` is fine.

- [ ] **Step 4: Run the tests to verify they pass**

Same command as Step 2. Expected: all PASS.

- [ ] **Step 5: Lint and typecheck**

Run: `npx -y pnpm@10.10.0 eslint pages/it/prenota.vue tests/prenota-page.nuxt.test.ts` then `npx -y pnpm@10.10.0 nuxi typecheck`
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add pages/it/prenota.vue tests/prenota-page.nuxt.test.ts
git commit -m "feat: open the room photos in an accessible lightbox on the booking page"
```

### Task 3: Final verification (main session, via agents)

**Files:** none changed unless a check fails (fixes go back to the Task 1/2 implementer).

- [ ] **Step 1: Gate** — `gate-runner`: lint, typecheck, full tests, `generate`. Expected: lint 0 errors, typecheck ok, all tests pass (150 + the new ones), 24 routes.
- [ ] **Step 2: Browser** — `browser` agent (playwright-core + system Chrome, not Playwright MCP) on the generated build served on a port other than 4173, at 1440/1024/390. Expected: no horizontal overflow; carousel runs and its controls are visible on forest; widget renders and opens its date picker, looking as on the legacy page (reference: port 4173); backgrounds forest, lime, linen, champagne, forest, linen, forest-deep in that order with no linen gap between coloured sections; icon panel 8/4/3 per row, captions inside their cell; service columns 3/3/1; lightbox opens on click and on Enter from the keyboard, next works, Esc closes, it covers the dock and cookie banner; from `/it` the "Dettagli" links land with `#lampone` / `#mirtillo` fully below the header. Screenshots in `%TEMP%\measure\`.
- [ ] **Step 3: Legacy untouched** — `git diff e39d482 --stat` lists only `layouts/default.vue`, `pages/it/prenota.vue`, the plan and the test files of Tasks 1-2; no `pages/en/*`, no `components/*`.
