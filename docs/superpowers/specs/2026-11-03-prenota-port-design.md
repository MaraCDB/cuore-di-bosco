# Prenota port — design

Branch `redesign/prova-1` (experimental: local commits only, never push or merge to main without explicit owner OK).

## Intent

`/it/prenota` (`pages/it/prenota.vue`) is the last Italian page still on the legacy look: full-width photo heroes with text-shadow titles, a separator ornament, legacy fonts, an unscoped `<style>` block. Home, Esplora, Regolamento and Privacy are already redesigned. Port Prenota so the Italian site reads as one.

The owner described the page top to bottom (2026-11-03): a photo carousel of the rooms and the house, then the "Prenota" strip with the booking widget, then all the texts in the new type, then the rooms formatted like the home cards but with their full texts and the 4 photos that enlarge on click, then the service icons and the rest. The owner will review the texts at the end, as a separate round.

## Goals

- `/it/prenota` renders inside `main.redesign`: add `'/it/prenota'` and `'/it/prenota/'` to `redesignedRoutes` in `layouts/default.vue`.
- Page structure below, in that order.
- Every legacy text kept word for word, except the two icon captions and the two text fixes the owner decided (see Owner decisions).
- `#lampone` and `#mirtillo` stay: the home "Dettagli" buttons link to `/it/prenota#lampone` and `/it/prenota#mirtillo`.
- The booking widget keeps working exactly as today.
- New tests (owner OK): see Tests.

## Non-goals

- No port of `/en/booking` or any EN page.
- No change to home, Esplora, Regolamento, Privacy, header, menu, footer, dock, cookie banner, `components/site/photo-carousel.vue`.
- No payment or cancellation conditions on Prenota (owner: the widget already goes to bed-and-breakfast.it).
- No new copy beyond what is listed under "Owner decisions". The text review is a later, separate round.
- `useHead` stays as is (title, meta, canonical, the two widget scripts).

## Anti-goals

- Inventing facts, a photo credit, or rewording the owners' text.
- Two adjacent sections with the same background.
- `width`/`height` attributes on `<img>`; any NuxtLink without `no-prefetch`.
- Breaking the widget (its container `div.js-booking-engine-container` and all its `data-*` attributes stay identical; the `onMounted` init loop stays).
- Committing `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `.playwright-mcp/`, `.superpowers/`.

## Constraints (from the ported pages, already decided)

- Headings Mountains of Christmas, all other text Montserrat (`var(--sub)`), font-size only via `--step-*`, `--page-max` 1440, text padding `max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))`.
- Long paragraphs: `max-width:68ch`, `text-align:justify`, `hyphens:auto`, `text-align:left` at `<=520px`.
- Backgrounds: forest `.band`, lime, champagne, linen (page). Footer is forest-deep.
- `useReveal(root)` + `data-reveal` as in Regolamento/Privacy.
- Text in the template, not `v-html`.
- The legacy unscoped `<style>` block goes entirely; the new page uses `<style scoped>`.
- Teleported elements live outside `main.redesign`, so the legacy global rules (`*:where(:not(.redesign, .redesign *))` and friends in `assets/css/legacy.css`) hit them. The lightbox root must carry the class `redesign`, as `components/site/menu.vue` does for its teleported panel.

## Page structure (top to bottom)

| # | Section | Background | Content |
|---|---|---|---|
| 1 | Carousel | forest band | `SitePhotoCarousel` with the room and house photos. No hero photo, no text. |
| 2 | Prenota strip | lime | h1 "PRENOTA" (legacy, uppercase), then the booking widget. |
| 3 | Welcome texts | linen | The 4 legacy intro paragraphs. |
| 4 | Rooms | champagne | h2 "Scopri le nostre camere" + its 3 paragraphs, Lampone card, Mirtillo card, lime family line. |
| 5 | Services | forest band | h2 "I nostri servizi" + one linen panel with the 15 icons. |
| 6 | Service texts | linen | Three columns: "Servizi per famiglie", "Servizi in camera", "Altri servizi per te!". |

Sequence: header, forest, lime, linen, champagne, forest, linen, footer forest-deep. No adjacent pair alike. The legacy separator ornament and the second photo hero ("I NOSTRI SERVIZI" over `colazioni.webp`) go; the `camere.webp`, `colazioni.webp`, `separator.webp` imports go with them.

Mockups the owner approved (structure, not final styling): `.superpowers/brainstorm/29174-1793727702/content/prenota-layout.html` and `prenota-servizi-v2.html`.

## 1. Carousel

- Reuse `components/site/photo-carousel.vue` as is: `<SitePhotoCarousel :photos label>`.
- Photos (owner: "per ora usa queste", more house photos will come later): `public/images/lampone/1-5.webp`, `public/images/mirtillo/1-4.webp`, the house `public/images/home/casa-*.webp`, the Lampone balcony `public/images/home/lampone-balcone-*.webp`, the breakfast `public/images/home/colazione-*.webp`. Order: builder's call, starting with the house.
- No captions, no credits (none known; invent none).
- The balcony photo left the home garden carousel only because that carousel is about the surroundings; the owner approved it here ("per ora usa queste" answered a list that included it).
- Alt texts, reused: house "La casa in pietra del B&B Cuore di Bosco a Prada" (`pages/it/index.vue`, Benvenuti photo); breakfast "La colazione con la torta fatta in casa" (home Colazione photo); balcony "Il Monte Baldo innevato visto dal balcone della camera Lampone" (its alt when it was in the home garden carousel, commit 0a345e0). Room photos use the legacy pattern "Camera Lampone foto N" / "Camera Mirtillo foto N".
- `label` (screen-reader only): "Fotografie delle camere e della casa" (my call).
- The carousel is the first thing on the page; its photos may stay `loading="lazy"` as the component sets them.

## 2. Prenota strip

- Lime band (`var(--lime)`, ink text). h1 "PRENOTA" in the display font at `--step-display`, centred, `--forest-deep` or `--ink` (builder checks contrast on lime).
- Below it the widget container, unchanged markup: `<div class="booking-widget js-booking-engine-container" data-idstruttura="68002" data-tipostruttura="bbit" data-tipo="widget" data-lingua="it" data-action="https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002" data-colore="green" data-wl="true">`.
- The widget draws its own UI from the external script. We style only the container (width, centring, spacing). If the widget's green controls read badly on lime, the container may get its own linen or white rounded panel inside the lime band (my call); the band stays lime and the widget's `data-colore` stays `green`. The redesign global rules (`.redesign a`, buttons, fonts) may leak into the injected widget: the builder checks it in the browser and, if needed, contains the leak in scoped CSS without restyling the widget's fields.

## 3. Welcome texts

- The 4 legacy paragraphs, words unchanged: "Benvenuti al B&B Cuore di Bosco, …", "Di b&b ce ne sono tanti, …", "Per esigenze alimentari particolari …", "Ci vediamo presto!". Keep their `<strong>`/`<em>`.
- My calls: the manual `<br>` line breaks go (they only shaped the old centred layout); the paragraphs follow the 68ch justify rule. The broken bold "A<strong>ltopiano di Brentonico</strong>" becomes `<strong>Altopiano di Brentonico</strong>` (markup fix, same words).

## 4. Rooms

- h2 "Scopri le nostre camere" (legacy), then its 3 legacy paragraphs (from the legacy `blockquote`, now plain paragraphs).
- Two cards styled like the home `.room` articles (`pages/it/index.vue`: grid of photos beside text, alternating sides, h3 in the display font at `--step-title`, `.lead`, champagne pill). Copy the needed rules into the scoped CSS; do not refactor the home into a shared component. The rooms section is champagne here, so the pill (champagne on the home) needs a contrasting fill: builder's call within the palette (e.g. linen or white).
- Each card, `id` on the `<article>`: `id="lampone"`, `id="mirtillo"`.
  - Name as h3: "Lampone", "Mirtillo" (sentence case like the home; legacy h2 was uppercase).
  - Lead: the legacy `.room-short` sentence.
  - Then the 2 legacy paragraphs, words unchanged.
  - Pill: "Da 2 a 4 posti letto adulti" (the home's wording of the legacy h3).
  - No buttons, no raspberry/blueberry icons (my calls: the home cards have neither; the page itself is the booking page).
- Photos: the 4 legacy photos per room (`/images/lampone/1-4.webp`, `/images/mirtillo/1-4.webp`) in a 2x2 grid, as in the approved mockup.
- Anchors: the header must not cover the card when arriving from `/it/prenota#lampone`: builder sets `scroll-margin-top` as needed.
- Family line under the two cards (shown to the owner in the mockup marked "da confermare"; owner answered "ok"): the home's `p.rooms-family` exactly (the mockup's wording was a placeholder; the home text wins), text "Culla gratis · 1° bambino gratis · 2° bambino al 50% · &lt;12 anni", lime pill, uppercase via CSS. Placement under the cards as in the approved mockup (the home has it above).

### Lightbox

Keep today's behaviour: click a photo, it opens full screen; ‹ and › move between that room's 4 photos (looping); counter "N / 4"; ✕ closes; click on the dark backdrop closes; Esc closes, ArrowLeft/ArrowRight move. Keep the Italian aria-labels "Chiudi", "Precedente", "Successiva".

My calls (accessibility, no visible change): each gallery photo is a `<button type="button">` wrapping its `<img>` so the keyboard can open it; on open, focus moves to the close button; on close, focus returns to the photo that opened it. The lightbox stays a `<Teleport to="body">` with the root class `redesign` (see Constraints). Styling restyled to the palette (dark backdrop stays).

## 5. Services

- Forest band, h2 "I nostri servizi" (legacy "I NOSTRI SERVIZI" was a photo hero h1; the words stay, case as the builder sees fit for a display-font h2 like the other pages: my call "I nostri servizi", as in the approved mockup).
- One linen panel holding the 15 icons in a row that wraps: 8 per row on desktop, 3-4 per row on phone (my call), thin dividers between icons, no separate tiles.
- Icons: the legacy `/images/altervista/*.png` files, same order. Captions verbatim, uppercase as written, except two owner changes (no paid services may be advertised):
  - "SERVIZIO LAVANDERIA" becomes "LAVANDERIA";
  - "SERVIZIO PIC-NIC" becomes "PIC-NIC" (the owner gives breakfast to take away; hyphen kept from the original, my call).
- Each `alt` equals its caption (as today).

## 6. Service texts

- Three columns side by side on desktop (`>=901px`), stacked below. Each column has a meadow top border like the Regolamento cards.
- Column titles from the legacy bold lines, as h2 or h3 in the display font: "Servizi per famiglie", "Servizi in camera", "Altri servizi per te!".
- All legacy paragraphs verbatim for now, including the parts the text review will revisit (see Open points). The empty legacy `<p></p>` goes.
- Line lists (the `<br>`-separated lines in "Servizi in camera" and "Altri servizi per te!") stay as line breaks (my call; a `<ul>` would be a markup change the owner can ask for in the text review).
- Columns have different lengths ("Servizi per famiglie" is the longest): accepted.

## Owner decisions (2026-11-03)

- Order: carousel, Prenota strip, texts, rooms, icons, rest; texts reviewed at the end.
- Carousel with the existing room and house photos for now (list incl. the Lampone balcony).
- Family line under the room cards (mockup "ok").
- Prenota strip: lime band, "PRENOTA", widget below.
- No payment or cancellation conditions on the page.
- Icons in one joined panel in a row; captions unchanged except "LAVANDERIA" and "PIC-NIC".
- Service texts in three columns.
- New tests: OK.
- Text fixes (owner answers on the first review):
  - "Nell’apposito stand inoltre troverei tutte le mappe…" becomes "troverai".
  - "Ampia camera matrimoniale da 28 mq con letto matrimoniale" stays as written.
  - "libreria ed angolo giochi attrezzato (in realizzazione)." loses " (in realizzazione)": "libreria ed angolo giochi attrezzato."
  - "Prodotti per igiene personale, pulizia e biancheria inclusi" in the room texts stays as written (owner: "pulizie ok").
  - The legacy-text fixture records the fixed text; the test asserts "troverei" and "(in realizzazione)" are gone.

## Calls made by me (not owner-decided)

- Carousel order (house first), alt texts reused from the home, screen-reader label.
- Widget may sit on a linen/white panel inside the lime band if its green reads badly on lime.
- Manual `<br>` dropped in the welcome texts; "Altopiano" bold fixed.
- Room cards: h3 sentence case, no buttons, no fruit icons, 2x2 photo grid, pill wording from the home, family line placed under the cards.
- Gallery photos as buttons, focus handling in the lightbox.
- "I nostri servizi" sentence case; 3-4 icons per row on phone; "PIC-NIC" keeps its hyphen.

## Open points (for the owners' text review, do not fix now)

- The services: the owner must first check which services they can offer, then we review the service texts and icons together. Until then the service texts stay verbatim, including "PIC NIC DAY: … (servizio a pagamento)" in "Servizi per famiglie" and "Servizio a richiesta di lavanderia express … (a pagamento)" in "Altri servizi per te!" (paid services, must change).
- More house photos for the carousel (owner is looking).
- Still open from earlier pages: Regolamento hero alt draft "Pedine e dadi su un gioco da tavolo", Privacy hero alt draft "Casetta di pan di zenzero e biscotti a forma di casa", beb.it "Nessun anticipo" (wrong: 35% deposit).

## Left to the builder

- Exact gaps, panel padding, column gap, photo grid gaps (reuse home/Regolamento values).
- Carousel photo order after the house.
- h1 colour on lime, pill fill on champagne, lightbox styling within the palette.
- Containing any style leak into the widget.

## Tests

New file `tests/prenota-page.nuxt.test.ts` (mount with `mountSuspended`, as `tests/home-page.nuxt.test.ts`):

- `#lampone` and `#mirtillo` exist.
- No `<img>` has `width`/`height`.
- Lightbox: clicking a Lampone photo opens it at that photo; next/previous loop through the 4 photos and the counter follows; Esc and the close button close it; ArrowLeft/ArrowRight move; focus returns to the opening photo.
- Legacy text guard: a fixture `tests/fixtures/prenota-legacy-text.json` with every legacy text block (as Regolamento's `tests/fixtures/regolamento-legacy-text.json`), each present in the rendered page text; captions "LAVANDERIA" and "PIC-NIC" present, "SERVIZIO LAVANDERIA" and "SERVIZIO PIC-NIC" absent.
- The widget container keeps its class and all its `data-*` values.

Existing tests the port breaks, to update:

- `tests/explore-page.nuxt.test.ts` route test: `/it/prenota` and `/it/prenota/` now in `redesignedRoutes`; the `not.toContain` loop over `['prenota']` goes (nothing legacy left among IT pages).
- `tests/legacy-css.nuxt.test.ts`: remove the `pages/it/prenota.vue` row from `unscopedPageFiles`; keep `pages/en/booking.vue` and `bookingSelectors` (EN has its own copy).
- `tests/home-page.nuxt.test.ts` imports `pages/it/prenota.vue`: must keep passing.

## Done when

- `/it/prenota` in redesign style with the structure above; all legacy text present (two captions changed); widget loads and works; lightbox works by mouse and keyboard; `/it/prenota#lampone` and `#mirtillo` land on the cards.
- Gate green via gate-runner (lint, typecheck, full tests, generate).
- Browser PASS at 1440/1024/390 (not on port 4173, held by an old legacy server): no horizontal overflow, carousel runs, widget renders, no adjacent same backgrounds, 8-per-row icon panel on desktop, 3/3/1 text columns, lightbox open/next/Esc, home "Dettagli" links land on the right card.
- No legacy page touched (EN pages).
- Local commits only.
