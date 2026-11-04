# English pages: redesign as translations of the Italian pages

Date: 2026-11-04. Branch: `redesign/prova-1` (experimental, local commits only, never push or merge to `main`).

## Intent

Every Italian page is now redesigned (`pages/it/index.vue`, `esplora.vue`, `regolamento.vue`, `privacy-policy.vue`, `prenota.vue`). The five English pages in `pages/en/` are still the legacy design, with their own layout (`layouts/english.vue`) and partly outdated content.

The owner's decision, in their words: "falle uguali, traducile come le abbiamo fatte in italiano". Each English page must be the Italian redesigned page, section by section and photo by photo, with the text in English. Foreign guests must see the same site as Italian guests. Nothing is added for them, and nothing is left out.

## Goals

- `/en/booking`, `/en`, `/en/explore`, `/en/rules` and `/en/privacy-policy` look and behave exactly like their Italian twins (`/it/prenota`, `/it`, `/it/esplora`, `/it/regolamento`, `/it/privacy-policy`) at 1440, 1024 and 390 px.
- The redesigned chrome is shown in English on English pages. The chrome is the header, phone menu, footer, dock, to-top button, cookie banner and carousel controls.
- The English text follows the current Italian text, including every owner edit made during the Italian ports.

## Non-goals

- No new content for foreign guests: no airport directions, currency or language notes, and no extra sections.
- No SEO or GEO rework. That is the last redesign step, after the owners approve the whole site. Keep each legacy English page's existing `useHead` / `useSeoMeta` (title, description, OG, twitter, canonical) and the English LodgingBusiness JSON-LD as they are today, moved where needed.
- No change to the Italian pages, except the refactors this work needs (shared styles, locale-aware chrome). Those refactors must not change what Italian visitors see.

## Anti-goals

These would make the work a failure even if the code works:

- English text that says something the Italian does not. That includes a service, a price, a paid extra, a bike rental ("rental" / "hire" for the B&B's bikes is forbidden: the owners lend their own bikes for free), a deposit or cancellation condition on booking or home, or an invented fact or credit.
- Legacy English paragraphs that the owners removed from the Italian text. Examples: WRITE TO US / afternoon snack, BIKE RENTAL, PICNIC DAY, "(paid)" on the express laundry, "(weather permitting)" on the balcony drying rack, "Welcome gift". These must not survive in English.
- A design that drifts from the Italian over time because the two copies are styled separately.

## Text rules

1. **Source of truth is the current Italian page**, not the legacy English one.
2. **Reuse legacy English wording** where it is a faithful translation of the current Italian sentence. Light fixes are allowed, but each one must be listed: typos, an obviously wrong word, or a name change the Italian already made (for example "Castello di Avio", not "Ala").
3. **Draft a new translation** where the Italian is new or was edited by the owners, or where the legacy English does not match. Every drafted string is a draft for owner approval.
4. **Every port ends with a draft list** for the owner, in the final report: Italian source, English draft, and reason (new / changed / legacy mismatch). Alt texts and captions are part of the list.
5. **Credits stay verbatim and untranslated**: "Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di …", "APT Rovereto Vallagarina. Foto di Luca Matassoni", "360gardalife. Foto di Angela Trawoeger", "Photo Mara".
6. **Place names (owner decision)**: use the English name where one exists in the legacy English site or in common use: Lake Garda, Brentonico Plateau, Monte Baldo Nature Park, Europe's Garden. Proper names with no established English form stay Italian, for example Monte Baldo, Cammino di San Rocco, Polsa e San Valentino, Castello di Avio and Campana dei Caduti. Use one form per place across all five pages. The first page fixes the glossary and the later pages follow it.
7. **Room names**: keep "Lampone" and "Mirtillo". Room order is the same as Italian (Lampone first).
8. **Register**: warm and simple, like the Italian. The audience is walkers, nature lovers, families and pilgrims. Keep the Italian's UPPERCASE where the Italian uses it: the 13 rules titles, the "PRENOTA" h1 (English "BOOK"), icon captions, and the lime family line.
9. Text lives in the template, never in `v-html`.

## Architecture (my calls, open to the owner but technical)

### Layout and routing

- English pages move to `layouts/default.vue`, the same layout as Italian. The layout sets the locale and `<html lang>` from the route (`/en…` means `en`, otherwise `it`) and emits the matching JSON-LD. The current English JSON-LD lives in `layouts/english.vue:108-170`.
- `redesignedRoutes` in `layouts/default.vue` only adds the `.redesign` class to `<main>`. Each ported English route is added to it, with and without trailing slash. The guard test in `tests/explore-page.nuxt.test.ts` is updated to match.
- During the transition, the not-yet-ported English pages keep `layout: 'english'`. When the last English page is ported:
  - delete `layouts/english.vue`;
  - delete the legacy components that nothing else uses any more (TopNavbar, LanguageSwitcher, Toast, MobileBottomBar, the legacy CookieBanner mode, the legacy WhatsApp float);
  - update the tests that read them (`tests/use-cookie-consent.nuxt.test.ts:7-8, 368-370`, `tests/legacy-css.nuxt.test.ts`).
- The English welcome toast and the floating WhatsApp button disappear, because the Italian site has neither.

### Chrome in two languages

- The chrome components get English strings from the active locale. Visible text and aria labels both switch. The components are `components/site/header.vue`, `menu.vue`, `footer.vue`, `dock.vue`, `to-top.vue`, `photo-carousel.vue` and `utils/site-links.ts`.
- Links must point to the same-language pages, through the route ids in `utils/routes.ts`. The language link reads "English" on Italian pages and "Italiano" on English pages, and goes to the twin page (`englishTwin` already exists; add the reverse).
- Use i18n messages (`i18n/locales/it.json`, `en.json`, already used by the cookie banner). Italian values must equal today's hard-coded strings.
- English menu, in the same order as the Italian one (`utils/site-links.ts`): Home, Rooms, Breakfast, Explore, Rules, How to get here, Italiano, BOOK. One shared list of route ids with translated labels. The labels are drafts, so they go on the draft list. (My call: same order as Italian.)
- Footer: same content and layout as Italian. The address block, CIN and CF are not translated. The "Privacy" link goes to `/en/privacy-policy`. "Preferenze cookie" becomes "Cookie preferences".
- Section anchors on the English home use English ids: `#rooms`, `#breakfast`, `#directions`, plus `#top`. The menu and dock link to them, and room "Details" links go to `/en/booking#lampone` / `#mirtillo`.

### Pages and styles

- Each English page is its own file in `pages/en/`, a structural copy of its Italian twin with English text. This matches today's split, keeps text in templates and keeps the Italian legacy-text fixtures working.
- **Styles are shared, never duplicated.** Move each Italian page's `<style scoped>` block into a CSS file, for example `assets/css/pages/booking.css`. Both twins include it with `<style scoped src="…">`. Italian rendering must stay identical, and the tests that read page styles need to follow the move. This prevents drift.
- Same photos and the same order as Italian, with English alt texts and captions.
- `/en/booking` keeps the English bed-and-breakfast.it widget (`data-action="https://www.bed-and-breakfast.it/en/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"`), styled like the Italian one.
- English privacy policy: same structure as Italian (6 cards, h2 titles, "Cookie preferences" button, mailto).
- English rules: same 13 cards. The text follows the current Italian, including the cancellation change ("entro il 7° giorno" plus the reschedule sentence), the dropped picnic part of BREAKFAST, the diets paragraph and the 3 typo fixes.

## Order of work

Each step is a separate deliverable. It is gated (lint, typecheck, tests, build), checked in the browser at 1440/1024/390, committed locally, and shown to the owner with its draft list.

**Approval checkpoint (owner decision):** after each page (steps 2 to 6), work stops until the owner approves or edits that page's draft list. Apply the owner's edits, including words reused on later pages such as menu labels, service terms and place names, before the next page starts. Later pages reuse the approved wording.

1. Shared styles plus bilingual chrome, with no visible change in Italian. The English chrome strings can be tested through unit tests before any English page uses them.
2. `/en/booking`.
3. `/en` (home).
4. `/en/explore`.
5. `/en/rules`.
6. `/en/privacy-policy`, then remove `layouts/english.vue` and the dead legacy components.

## Tests

- Each English page gets a test file mirroring its Italian twin's assertions, adapted to English: structure, photos, credits, forbidden words, no `v-html`, no width/height on images. Translate the forbidden-words lists too (for example "deposit", "cancellation", "refund", "rental", "hire", "(paid)").
- Chrome: tests that the English locale renders English labels and same-language links, and that Italian is unchanged.
- Legacy-text fixtures are not needed for English. The English text is new or a draft, so there is no verbatim legacy text to protect.

## Left to the builder

- Exact i18n key names, and how the layout derives the locale.
- The CSS file names and folder.
- Whether shared fragments between twins go into small components, as long as text stays in the templates.
- The order of commits within a step.
