# Esplora port — design

Branch `redesign/prova-1` (experimental: local commits only, never push or merge to main without explicit owner OK).

## Intent

`/it/esplora` is still the legacy page (`pages/it/esplora.vue`: hero photo with text-shadow title, centered 16pt text, Carousel component). The home is already redesigned. Port Esplora to the same redesign style so the two Italian pages read as one site, and fill the 9-place grid from the mockup with the APT photos the owner approved.

## Goals

- `/it/esplora` renders inside `main.redesign` with the redesign header, footer, dock (today `layouts/default.vue` `isRedesignedRoute` matches only `/it`).
- Intro band + 9-place grid as in `.taste-skill/mockup/esplora.html`, with photos and credits.
- Every legacy text kept word for word, restyled with the home's rules.
- "Castello di Ala" becomes "Castello di Avio" (owner-approved) in IT and EN.

## Non-goals

- No port of `/en/explore` (stays legacy; only the Avio fix touches it).
- No new copy: no new headings, intros or captions beyond what is listed here. Only the typo fixes listed below.
- No change to the home, header, menu, footer, dock beyond what the route switch needs.

## Anti-goals

- Inventing facts or rewording the owners' text.
- Two adjacent sections with the same background.
- `width`/`height` attributes on `<img>`; any NuxtLink without `no-prefetch`.
- A photo without its credit.
- Committing `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `00-Monte-Altissimo-*.jpg`, the `Gamme 2026-*.zip`.

## Constraints (from the home, already decided)

- Tokens and fonts from the home/global CSS: headings Mountains of Christmas, all other text Montserrat, font-size only via `--step-*`, `--page-max` 1440, `.wrap` for content, split-band text padding `max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))`.
- Long paragraphs: `max-width:68ch`, `text-align:justify`, `hyphens:auto`, `text-align:left` at `<=520px`.
- Backgrounds: forest `.band`, champagne, linen (page). Footer is forest-deep.
- Credit text: `Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di <autore>` (author from file name; none: APT part only). Style as home `.photo-credit` (`--step-micro`, `--muted`).
- `useReveal(root)` + `data-reveal` as in the home.

## Page structure (top to bottom)

| # | Section | Background | Content (verbatim from legacy `pages/it/esplora.vue`) |
|---|---|---|---|
| 1 | Intro | forest band | h1 "Esplora i dintorni" (sentence case as in the mockup, legacy was uppercase) + `.lead` = legacy paragraph 1 ("A pochi minuti da Brentonico, **Prada** …"). The legacy hero photo `bosco.webp` is dropped (mockup). |
| 2 | Places grid | linen | 8 tiles, order below. No heading. |
| 3 | Nature and families | champagne | legacy paragraphs "Situato a Prada …" through "Sul sito del Parco qui sotto …", then the Parco Monte Baldo logo link (keep the link and alt "Logo Parco Naturale Monte Baldo"; size via CSS class, not inline style). The legacy external logo URL is dead (301 -> 404): use the owner's file `public/images/logo-parco-monte-baldo.svg` (viewBox 229.8x93.25, no scripts), committed with the port. |
| 4 | Surroundings | linen | "In inverno si raggiungono …", "Per tutti gli eventi … brentonicoski", "Anche **Rovereto** …", "Nei dintorni … **Castello di Avio** … Loppio … Garda", "Siamo all'interno della **Vallagarina** …"; then the `apt_brentonico.jpg` panorama (link to visitrovereto.it, keep srcset/sizes, drop width/height, credit APT only) and the h3 link "Guida All'Altopiano di Brentonico (PDF – 4,61 MB)". |
| 5 | "Brentonico, il fiore del Baldo" | forest band | h2 + horizontal photo row like the home garden (`.photo-row`), replacing `<Carousel>`; the 5 visitrovereto.it images stay hotlinked with their legacy alts; each gets a credit, author from the file name: Valentino Azzolini, Luca Matassoni, Luca Matassoni, Tommaso Prugnola, Graziano Galvagni. |
| 6 | "Giardino d'Italia" | champagne | h2 "“Giardino d’Italia” nel cuore del Parco del Monte Baldo" + its 4 paragraphs with links. |
| 7 | Seasons | linen | 4 cards (2x2 desktop, 1 column phone), each the legacy h3 + paragraphs: primavera, estate (3 paragraphs incl. Cammino di San Rocco + camp + Baldo Bio Benessere, 4 counting the split one), autunno, inverno (2 paragraphs). |
| 8 | Closing note | champagne | the two bold paragraphs "Per scoprire tutti gli eventi …" and "FONTE TESTO WWW.VISITROVERETO.IT". |

Sequence: forest, linen, champagne, linen, forest, champagne, linen, champagne, footer forest-deep: no adjacent pair alike. If the build shows a conflict, stop and propose options; do not change colors unilaterally.

## Places grid

Order (mockup minus Loppio): Brentonico, Monte Baldo, Canyon della Sorna, Lago di Garda, Rovereto, Castello di Avio, Polsa e San Valentino, Cammino di San Rocco. Owner removed the Lago di Loppio tile (only mentioned in passing in the text; the sentence stays). 4 columns x 2 rows on desktop (`>=901px`), 2 columns x 4 rows below; no spanning tile. Tiles are not links.

| Tile | Image (`public/images/home/`) | Credit |
|---|---|---|
| Brentonico | `palazzo-eccheli-baisi-1280.webp` | APT, Foto di Luca Matassoni |
| Monte Baldo | `trekking-baldo-1280.webp` | APT, Foto di Tommaso Prugnola |
| Canyon della Sorna | `forra-sorna-1280.webp` | APT, Foto di Tommaso Prugnola |
| Lago di Garda | `monte-altissimo-1200.webp` | `360gardalife. Foto di Angela Trawoeger` (same as home; not owner-confirmed, flag stays open) |
| Rovereto | `castello-rovereto-700.webp` | APT, Foto di Luca Matassoni |
| Castello di Avio | `castello-avio-1280.webp` | APT, Foto di Martina Vanzo |
| Polsa e San Valentino | `inverno-brentonico-1280.webp` | APT, Foto di Tommaso Prugnola |
| Cammino di San Rocco | `cammino-san-rocco-960.webp` (owners' photo) | none |

Owner approved this mapping on 2026-11-03 ("approvata, più 2 foto": Garda and San Rocco added).

Tile layout (my call): square photo (`aspect-ratio:1/1`, `object-fit:cover`), place name below in the display font (mockup `.place-name` size), credit below the name. No placeholder tiles. No text over photos (no scrims or text-shadow). Alt texts: reuse the home's alt for each image.

## Calls made by me (not owner-decided)

- Credits on the forest band (section 5) use `--on-forest-soft` (as `.footer-legal`), not `--muted` (1.3:1 on forest).
- `.place-name` uses an existing `--step-*` token (`--step-title` or the closest) instead of the mockup's literal clamp.
- `esplora.vue` has no NuxtLink today: the no-prefetch guard must cover it without requiring at least one link.
- Tile layout, photo-row hotlinking and credits from file names (above) are my calls too.

## Avio fix (owner-approved)

- IT: paragraph text "il **Castello di Ala**" -> "il **Castello di Avio**"; SEO keyword "Castello di Ala" -> "Castello di Avio"; tile name.
- EN `pages/en/explore.vue:72`: "**Castello di Ala**" -> "**Castello di Avio**". Separate commit from the port.

## Left to the builder

- Exact grid gaps, card spacing, section margins (reuse `--section-gap`, `--band-pad`, home values).
- Whether section CSS lives scoped in `esplora.vue` or shared; prefer scoped, mirroring `index.vue`.
- Whether `castello-rovereto-700.webp` is too soft in a ~430px tile at 2x; if so, regenerate a larger width from the APT original with `cdb-tools/apt-resize.mjs` (original never committed).
- Legacy `useHead` stays as is, except the Avio keyword.

## Done when

- `/it/esplora` in redesign style, grid with 8 photos and the credits listed (7: San Rocco has none), all legacy text present verbatim (except Ala -> Avio and the typo fixes).
- Tests (new `tests/explore-page.nuxt.test.ts` + no-prefetch guard covering `esplora.vue` + layout route test) pass; gate green via gate-runner (lint, typecheck, full tests, generate).
- Browser PASS at 1440/1024/390: no horizontal overflow, all images load, no adjacent same backgrounds, credits visible, grid 4/4/2 columns.
- Local commits only.

## Typo fixes (owner-approved, IT only)

- "località scistiche" -> "località sciistiche"
- "materiale informativo e in nostri consigli" -> "materiale informativo e i nostri consigli"
- "un evento dedicata al relax" -> "un evento dedicato al relax"
- "**Canyon della Sorna** , una" -> "**Canyon della Sorna**, una" (space before the comma)

Nothing else in the text changes.
