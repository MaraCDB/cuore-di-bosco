# German home, explore, house rules and privacy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the German twins `/de` (home), `/de/entdecken`, `/de/hausordnung` and `/de/datenschutz`, each a structural copy of its Italian twin with German text, and retire the interim fallback that sends unbuilt German pages to `/de/buchen`.

**Architecture:**
- Same pattern as the English twins (plan `docs/superpowers/plans/2026-11-04-english-home-explore-rules-privacy.md`) and `/de/buchen`: one file per page in `pages/de/`, on `layouts/default.vue` (no `definePageMeta`), sharing the Italian page's CSS through `<style scoped src="../../assets/css/pages/<name>.css">`. The CSS files already exist; no CSS changes.
- The layout already gives German chrome, `<html lang="de">` and the German JSON-LD on `/de…` routes. Each task removes its route id from `pendingRouteIds.de` in `utils/site-links.ts`, so chrome, switch and root redirect start pointing at the new page.
- The last page task removes `pendingRouteIds` and `availablePath`, which are dead once every German page exists.

**Tech Stack:** Nuxt 3.17, Vue 3 `<script setup lang="ts">`, @nuxtjs/i18n, Vitest + @nuxt/test-utils (`mountSuspended`, `mockNuxtImport`).

**Spec:** `docs/superpowers/specs/2026-11-04-german-and-language-switch-design.md`, step 2 of "Order of work", German only (the English twins are done). Step 1 plan: `docs/superpowers/plans/2026-11-04-german-switch-and-booking.md`.

**Status:** executes after step 1 (Task 6 of the step-1 plan) is gated and committed. Owner, 2026-11-04: "fai tutte le pagine tradotte, senza chiedermi particolari": no owner checkpoint between pages.

## Global Constraints

- Branch `redesign/prova-1`. Local commits only: never push or merge. Stage files by name, only the files listed in the task. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `.playwright-mcp/`, `.superpowers/`, `public/images/FOTO MIE BB E DINTORNI/`, `public/images/APT/`.
- Node in Git Bash: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`. pnpm: `npx -y pnpm@10.10.0 <script>` (corepack is broken).
- Testing: write the page and its tests, then run the task's targeted tests once (`npx -y pnpm@10.10.0 vitest run <files>`). No red-green loop. The full gate runs only through the `gate-runner` agent in Task 5. Baseline = gate result at the end of step 1 (filled in by the controller): lint …, typecheck …, … tests, 25 prerendered routes.
- Italian and English pages: no change at all, except the one language-choice paragraph added to `pages/it/privacy-policy.vue` and `pages/en/privacy-policy.vue` in Task 4.
- No comments in code, except doc comments on exported functions. English identifiers.
- Every `NuxtLink` has `no-prefetch`. Never `width`/`height` on `<img>`, never `v-html`, font sizes only through `--step-*` tokens, never `zoom` (also not `cursor: zoom-in`).
- Structural copy: same elements, classes, photo srcs and order, carousel photos, credits and script logic as the Italian twin. Only text, alts, captions, aria labels, iframe titles and the home section ids change. Credits stay verbatim ("Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di …", "APT Rovereto Vallagarina. Foto di Luca Matassoni", "360gardalife. Foto di Angela Trawoeger", "Photo Mara").
- German text rules (spec "Text rules"):
  - Translate the current Italian page; the English twin may help with meaning only. Nothing added, nothing left out.
  - Formal "Sie", warm and simple; standard German (Germany); German quotes „…“.
  - Place names: Gardasee, Hochebene von Brentonico, Naturpark Monte Baldo, Garten Europas, Rovereto, Monte Baldo; otherwise Italian (Cammino di San Rocco, Polsa e San Valentino, Castello di Avio, Campana dei Caduti, Canyon della Sorna, Forra della Sorna, Prada, Vallagarina, Calanchi di San Giacomo). The Italian "Giardino d’Italia" on the explore page is "Garten Europas" (same ruling as English "Europe’s Garden").
  - "Lampone" and "Mirtillo" stay, Lampone first. UPPERCASE where the Italian uses it. Uppercase strings never contain "ß" (write "SS"): `'ß'.toUpperCase()` is `'SS'` and the uppercase tests would fail.
  - Glossary: before writing, read the **Glossar** of `docs/superpowers/drafts/de-chrome-and-booking-drafts.md` (written in step 1). Its terms win (menu, rooms, services, "Frühstück inklusive", the kettle-corner and cleaning terms of `/de/buchen`). If the file is missing, stop and report BLOCKED to the controller. New terms go into the "Glossar-Ergänzungen" section of the page draft list.
- Forbidden in German page text (lowercased): `kaution`, `anzahlung`, `stornierung`, `erstattung`, `verleih`, `vermietung`, `kostenpflichtig`, `picknick-tag`, plus `noleggio` and `rental`. The rules page is the one exception, see Task 3. The B&B's bikes are lent for free, never rented.
- Links: internal links as the Italian page, mapped to German (`/it/prenota` → `/de/buchen`, `/it/prenota#lampone` → `/de/buchen#lampone`, `#camere` → `#zimmer`). External links: the Italian URL unchanged. Two exceptions: the home Google Maps iframe gets `&hl=de` appended (as English got `&hl=en`), and the four privacy browser help links point to their German pages.
- Head blocks (drafts, same shape as `/de/buchen`): `title`; meta `description`; `og:title`, `og:description` (same texts), `og:type` `website`, `og:url` and canonical `https://www.cuoredibosco.it/de…` (the page's own path), `og:image` as the Italian page. No `keywords`, no `twitter:` tags.
- Soft hyphens: at 390 px, a German word that would overflow or break mid-word without a hyphen gets `&shy;` at a correct syllable break (as "COMPLI­MENTARY" on `/en/booking`). Candidates: long uppercase rule titles, the privacy h1, long compounds in h2 and captions. Tests compare text with `­` removed, and assert the raw `­` once for each word that has one.
- Header: the desktop top bar collapses its links into the menu panel between 901 and 1179 px (step 1, `4b6f08a`). At 1180 px German has about 60 px of slack; no header change in this plan.
- Draft list `docs/superpowers/drafts/de-pages-drafts.md` (created in Task 1, one section per task): for the friend's check after publishing. Per page a table `| Italiano | Deutsch |`, one row per string in page order: head title and description, headings, paragraphs, list items, link texts, alts, captions, aria labels, iframe title, carousel label. Credits are not listed (verbatim). Escape `|` in cells. A final "Glossar-Ergänzungen" section collects new terms.

## Review Focus

1. **Stale or premature fallback.** After each task, chrome, switch, cookie banner and root redirect must reach every German page built so far, and still never link a German page not built yet. Expected: `generate` crawls without a 404. Pinned in each task's `tests/site-links.nuxt.test.ts` update and in Task 5 (29 routes).
2. **German anchors.** "Zimmer", "Frühstück", "Anfahrt" from `/de/hausordnung` must land on the sections of `/de`; "Details" on `/de/buchen#lampone` / `#mirtillo`. Pinned in Task 1 (ids, hrefs) and Task 5.
3. **Long German words at 390 px.** Uppercase rule titles ("STORNIERUNGSBEDINGUNGEN"), the privacy h1 and compounds in large headings. Expected: no horizontal overflow, no mid-word break without a hyphen. Pinned by the soft-hyphen assertions in Tasks 2–4 and the Task 5 browser step.
4. **Money words on the rules page.** The Italian rules state a 35 % "acconto" and a cancellation policy, so German needs "Anzahlung", "Stornierung", "Erstattung" there, and never "Kaution". Pinned in Task 3 (required and forbidden lists).
5. **Privacy sentence in Italian and English.** Only one paragraph is added, at the same place in all three privacy pages, so the IT/EN/DE structures stay equal. Pinned in Task 4 (exact sentences, unchanged `tests/privacy-en-page.nuxt.test.ts`).

---

### Task 1: German home `/de`

**Files:**
- Create: `pages/de/index.vue`, `tests/home-de-page.nuxt.test.ts`, `docs/superpowers/drafts/de-pages-drafts.md` (header paragraph, section "## /de – Startseite", section "## Glossar-Ergänzungen")
- Modify: `utils/site-links.ts` (`pendingRouteIds.de` loses `'welcome'`)
- Modify: `layouts/default.vue` (`redesignedRoutes` + `'/de'`, `'/de/'`), `nuxt.config.ts` (`'/de'` in `nitro.prerender.routes`, after `'/de/buchen'`)
- Modify tests: `tests/site-links.nuxt.test.ts`, `tests/site-chrome-german.nuxt.test.ts`, `tests/root-language.nuxt.test.ts`, `tests/explore-page.nuxt.test.ts` ("turns the redesign on…": assert `'/de'`, `'/de/'`)

**Interfaces:**
- Consumes: `pages/it/index.vue` (source), `assets/css/pages/home.css`, `SitePhotoCarousel` (`photos: {src, alt, caption?, credit?}[]`, `label`), `useReveal`.
- Produces: `/de` with section ids `zimmer`, `fruehstueck`, `cammino`, `geschichte`, `anfahrt` in place of `camere`, `colazione`, `cammino`, `storia`, `arrivare`. `homePath('de')` returns `'/de'`.

**Page rules:** h1 `B&B Cuore di Bosco` unchanged. Hero "Le camere" button → `#zimmer`. Room bullets and "Colazione inclusa" use the `/de/buchen` glossary terms. Iframe `title` and map-link `aria-label` translated; iframe src = Italian src + `&hl=de`. Head drafts: title `B&B Cuore di Bosco | Familienurlaub in den Bergen – Brentonico, Trentino`; description `B&B für Familien auf der Hochebene von Brentonico im Trentino. Bergurlaub mit Kindern: natürliches Frühstück, Babyausstattung, Natur und Ruhe in den Wäldern des Naturparks Monte Baldo.`; canonical `https://www.cuoredibosco.it/de`.

- [ ] **Step 1: Write `pages/de/index.vue`, the draft-list section and the route, config and fallback changes.**
- [ ] **Step 2: Write `tests/home-de-page.nuxt.test.ts`**, a copy of `tests/home-en-page.nuxt.test.ts` mounting `~/pages/de/index.vue` with locale `'de'` (afterEach back to `'it'`); `normalize` also removes `­`:
  - same top-level and section classes as Italian, 10 sections;
  - `sectionIds = { camere: 'zimmer', colazione: 'fruehstueck', cammino: 'cammino', storia: 'geschichte', arrivare: 'anfahrt' }`, mapped list equals the German ids;
  - same `img` srcs in order; 16 carousel figures; credits equal the Italian ones (more than 16);
  - captions differ from Italian; caption 1 is your draft for "Il bosco di Prada", caption 2 is `Calanchi di San Giacomo`; `.garden .carousel` aria-label is your draft (assert the exact strings);
  - room h3s `['Lampone', 'Mirtillo']`; Details hrefs `['/de/buchen#lampone', '/de/buchen#mirtillo']`; every other internal link is `/de/buchen` or `#zimmer`;
  - external `a[target="_blank"]` hrefs equal the Italian ones; `iframe` src ends with `&hl=de`;
  - text contains `Garten Europas`, not `Garten Italiens`;
  - lowercased text of `h1, h2, h3, p, figcaption, li` contains none of the forbidden words (Global Constraints) and not `picknick`;
  - `.rooms-head + .rooms-family` text equals your German family line; both `.room-features` lists contain your drafts of "Pulizie incluse" and "Angolo bollitore attrezzato" (same words as the `/de/buchen` glossary);
  - source: no `v-html`, no `definePageMeta`, every `<NuxtLink` has `no-prefetch`, no sized `img`, contains `<style scoped src="../../assets/css/pages/home.css"></style>` and `https://www.cuoredibosco.it/de"`, no `name: "keywords"`, no `twitter:`;
  - `home.css` matches neither `/#(camere|colazione|arrivare|cammino|storia)\b/` nor `/#(zimmer|fruehstueck|anfahrt|geschichte)\b/`.
- [ ] **Step 3: Update the fallback tests** (only assertions that expected `/de/buchen` as a fallback for `/de`):
  - `tests/site-links.nuxt.test.ts`: twinPath case `['/en', 'de', '/de']`; `availablePath('/de')` → `'/de'`, `availablePath('/de#zimmer')` → `'/de#zimmer'`, `homePath('de')` → `'/de'`; `primaryLinks('de')` targets `['/de#zimmer', '/de#fruehstueck', '/de/buchen', '/de/buchen', '/de#anfahrt']`. `/de/hausordnung/` and `privacy-policy` still give `/de/buchen`.
  - `tests/site-chrome-german.nuxt.test.ts`: dock Startseite href `'/de#top'`.
  - `tests/root-language.nuxt.test.ts`: German browser → `replace` called with `'/de'`.
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/home-de-page.nuxt.test.ts tests/home-en-page.nuxt.test.ts tests/home-page.nuxt.test.ts tests/site-links.nuxt.test.ts tests/site-chrome-german.nuxt.test.ts tests/root-language.nuxt.test.ts tests/site-language-switch.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the files listed above: `feat: add the German home page`.

### Task 2: German explore `/de/entdecken`

**Files:**
- Create: `pages/de/entdecken.vue`, `tests/explore-de-page.nuxt.test.ts`
- Modify: `docs/superpowers/drafts/de-pages-drafts.md` (section "## /de/entdecken – Entdecken", before the glossary section)
- Modify: `utils/site-links.ts` (`pendingRouteIds.de` loses `'explore'`), `layouts/default.vue` (+ `'/de/entdecken'`, `'/de/entdecken/'`), `nuxt.config.ts` (+ `'/de/entdecken'`)
- Modify tests: `tests/site-links.nuxt.test.ts`, `tests/site-language-switch.nuxt.test.ts`, `tests/explore-page.nuxt.test.ts` (redesigned routes)

**Interfaces:**
- Consumes: `pages/it/esplora.vue` (source), `assets/css/pages/explore.css`, `SitePhotoCarousel`.
- Produces: `/de/entdecken`; `twinPath('/it/esplora/', 'de')` returns `'/de/entdecken'`.

**Page rules:** `id="flower-title"` stays (the CSS uses it). h1 draft `Die Umgebung entdecken`. Place tiles in order: `Brentonico`, `Monte Baldo`, `Canyon della Sorna`, `Gardasee`, `Rovereto`, `Castello di Avio`, `Polsa e San Valentino`, `Cammino di San Rocco`. Keep `<strong>Castello di Avio</strong>`. The h2 “Giardino d’Italia”… becomes „Garten Europas“ … Naturpark Monte Baldo. Head drafts: title `Die Umgebung von Brentonico entdecken | B&B Cuore di Bosco – Wandern, Almen und Familienaktivitäten`; description translated from the Italian page's description; canonical `https://www.cuoredibosco.it/de/entdecken`.

- [ ] **Step 1: Write the page, the draft-list section and the route, config and fallback changes.**
- [ ] **Step 2: Write `tests/explore-de-page.nuxt.test.ts`**, a copy of `tests/explore-en-page.nuxt.test.ts` for `~/pages/de/entdecken.vue` (locale `'de'`, `normalize` removes `­`):
  - same top-level and section classes and `img` srcs in order as Italian; 4 `article.season`, 8 `li.place`;
  - `.place-name` texts equal the eight tiles above; credits equal the Italian ones;
  - every alt and aria label differs from the Italian one at the same index (more than 15);
  - `a[href^="http"]` hrefs equal the Italian hrefs, in order (more than 20);
  - `strong` texts contain `Castello di Avio`; `.cammino-note` equals your German draft of the Italian Cammino note (assert it);
  - text contains `garten europas`, an h2 contains `Garten Europas`; none of the forbidden words, `garten italiens`, `castello di ala`, `loppio`;
  - each word you soft-hyphenated appears with `­` in the raw text;
  - source rules as Task 1 (canonical `https://www.cuoredibosco.it/de/entdecken`), contains `<style scoped src="../../assets/css/pages/explore.css"></style>`.
- [ ] **Step 3: Update the fallback tests:** `tests/site-links.nuxt.test.ts` twinPath case `['/it/esplora/', 'de', '/de/entdecken']`, third `primaryLinks('de')` target `'/de/entdecken'`; `tests/site-language-switch.nuxt.test.ts` trailing-slash case hrefs `['/it/esplora', '/en/explore', '/de/entdecken']`.
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/explore-de-page.nuxt.test.ts tests/explore-en-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/site-links.nuxt.test.ts tests/site-language-switch.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the listed files: `feat: add the German explore page`.

### Task 3: German house rules `/de/hausordnung`

**Files:**
- Create: `pages/de/hausordnung.vue`, `tests/rules-de-page.nuxt.test.ts`
- Modify: `docs/superpowers/drafts/de-pages-drafts.md` (section "## /de/hausordnung – Hausordnung")
- Modify: `utils/site-links.ts` (`pendingRouteIds.de` loses `'rules'`), `layouts/default.vue` (+ `'/de/hausordnung'`, `'/de/hausordnung/'`), `nuxt.config.ts` (+ `'/de/hausordnung'`)
- Modify tests: `tests/site-links.nuxt.test.ts`, `tests/explore-page.nuxt.test.ts` (redesigned routes)

**Interfaces:**
- Consumes: `pages/it/regolamento.vue` (source), `assets/css/pages/rules.css`.
- Produces: `/de/hausordnung`.

**Page rules:** 13 `section.rule` written out in the template (no `v-for`), `rule-conduct` on the same section as Italian, hero photo with a German alt. h1 `Hausordnung`. Titles (drafts, uppercase, no "ß"; add `&shy;` where 390 px needs it): `PREISE UND INKLUSIVLEISTUNGEN`, `BUCHUNG UND KONTAKT`, `ZAHLUNGSBEDINGUNGEN`, `STORNIERUNGSBEDINGUNGEN`, `CHECK-IN UND AUSWEISDOKUMENTE`, `ZEITEN`, `SICHERHEIT UND HAFTUNG`, `HAUSREGELN`, `REINIGUNG UND INSTANDHALTUNG`, `FRÜHSTÜCK`, `VERHALTENSREGELN`, `EXTERNE DIENSTLEISTUNGEN`, `ZUGANG ZUR UNTERKUNFT`. Closing line translated. The "acconto" is "Anzahlung" (35 %), never "Kaution". Head drafts: title `Hausordnung | Cuore di Bosco – Prada di Brentonico`; description translated from the Italian page; canonical `https://www.cuoredibosco.it/de/hausordnung`.

**Ruling:** the rules page translates the Italian payment and cancellation rules, so its forbidden list drops `anzahlung`, `stornierung` and `erstattung` (as the English rules test dropped deposit and cancellation). Extra costs ("comporteranno un costo aggiuntivo", key replacement) are phrased without "kostenpflichtig" (for example "werden gesondert berechnet").

- [ ] **Step 1: Write the page, the draft-list section and the route, config and fallback changes.**
- [ ] **Step 2: Write `tests/rules-de-page.nuxt.test.ts`**, a copy of `tests/rules-en-page.nuxt.test.ts` for `~/pages/de/hausordnung.vue` (locale `'de'`, `normalize` removes `­`):
  - every element class name and the one `img` src equal the Italian page's;
  - 13 cards, `rule-conduct` at the Italian index; titles (soft hyphens removed) equal the 13 titles above, each equal to its `toUpperCase()`;
  - each soft-hyphenated title contains `­` in its raw text;
  - text contains your German drafts of the 7-day cancellation sentence, the reschedule sentence, the diets paragraph and the in-room breakfast sentence (assert exact strings), and `Anzahlung`, `35`, `vegetarisch`, `vegan`, `Unverträglichkeiten`, `Allergien`;
  - lowercased text contains none of `kaution`, `verleih`, `vermietung`, `kostenpflichtig`, `picknick`, `noleggio`, `rental`, `15. tag`;
  - the alt differs from the Italian one;
  - source: no `v-html`, no `v-for`, no `definePageMeta`, contains `<style scoped src="../../assets/css/pages/rules.css"></style>` and the canonical, no `name: "keywords"`, no `twitter:`.
- [ ] **Step 3: Update the fallback tests:** `tests/site-links.nuxt.test.ts` `availablePath('/de/hausordnung/')` → `'/de/hausordnung/'`, fourth `primaryLinks('de')` target `'/de/hausordnung'`; add twinPath case `['/it/regolamento', 'de', '/de/hausordnung']`.
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/rules-de-page.nuxt.test.ts tests/rules-en-page.nuxt.test.ts tests/regolamento-page.nuxt.test.ts tests/site-links.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the listed files: `feat: add the German house rules page`.

### Task 4: German privacy `/de/datenschutz`, language-choice sentence, fallback removal

**Files:**
- Create: `pages/de/datenschutz.vue`, `tests/privacy-de-page.nuxt.test.ts`
- Modify: `pages/it/privacy-policy.vue`, `pages/en/privacy-policy.vue` (one `<p>` each, see ruling)
- Modify: `docs/superpowers/drafts/de-pages-drafts.md` (section "## /de/datenschutz – Datenschutz", including the sentence row marked "Entwurf, Eigentümerin informieren")
- Modify: `utils/site-links.ts`, `layouts/default.vue` (+ `'/de/datenschutz'`, `'/de/datenschutz/'`), `nuxt.config.ts` (+ `'/de/datenschutz'`)
- Modify tests: `tests/site-links.nuxt.test.ts`, `tests/site-chrome-german.nuxt.test.ts`, `tests/explore-page.nuxt.test.ts` (redesigned routes)

**Interfaces:**
- Consumes: `pages/it/privacy-policy.vue` (source), `assets/css/pages/privacy.css`, `useCookieConsent().openPreferences`; the IT, EN and DE language-choice sentences in section "Für die Eigentümerin" of `docs/superpowers/drafts/de-chrome-and-booking-drafts.md`.
- Produces: `/de/datenschutz`; `localePath('de', 'privacy-policy')` returns `'/de/datenschutz'`. After the refactor commit, `utils/site-links.ts` exports no `availablePath`; `primaryLinks`, `homePath`, `localePath` keep their signatures.

**Ruling (owner: "fai tutte le pagine tradotte, senza chiedermi particolari"):** the language-choice sentence goes into the Italian, English and German privacy pages in this task, copied verbatim from the step-1 draft list in each language. It is a new `<p>` at the end of the fourth card ("Cookie usati su questo sito" and its twins), after the `<ul>`. Nothing else changes on the Italian and English pages. The controller flags it to the owner as a draft in Task 5.

**Page rules:** 6 `section.policy-card`, h1 uppercase (draft `COOKIE- UND DATENSCHUTZERKLÄRUNG`, soft hyphen in the long compound if 390 px needs it). h2 drafts: `Cookie-Richtlinie von Cuore di Bosco`, `Was sind Cookies?`, `Arten der verwendeten Cookies`, `Auf dieser Website verwendete Cookies`, `Cookies verwalten`, `Verantwortlicher`. Button `Cookie-Einstellungen` (same as the footer) calling `openPreferences`. Same `mailto:`. Cookie image with a German alt. Browser help links in German: `https://support.google.com/chrome/answer/95647?hl=de`, Mozilla's German article (`https://support.mozilla.org/de/kb/…`), Edge with `/de-de/` in place of `/it-it/` (same article id), `https://support.apple.com/de-de/guide/safari/sfri11471/mac`; check each answers 200 (`curl -sIL -o /dev/null -w '%{http_code}' <url>`). Head drafts: title `Cookie- und Datenschutzerklärung | Cuore di Bosco – B&B Prada di Brentonico`; description translated from the Italian page; canonical `https://www.cuoredibosco.it/de/datenschutz`.

- [ ] **Step 1: Write the page, the two sentence paragraphs, the draft-list section and the route, config and pending-id changes.**
- [ ] **Step 2: Write `tests/privacy-de-page.nuxt.test.ts`**, a copy of `tests/privacy-en-page.nuxt.test.ts` for `~/pages/de/datenschutz.vue` (locale `'de'`, `mockNuxtImport('useCookieConsent')`, `normalize` removes `­`):
  - same top-level and section classes and `img` src as Italian; 6 cards, h2s equal the six drafts above;
  - the `Cookie-Einstellungen` button calls `openPreferences` once;
  - `mailto:` href equals the Italian one;
  - 4 external hrefs, hostnames equal the Italian ones, none matches `/hl=it|\/it-it\/|it-it|\/it\//`, each matches `/hl=de|\/de-de\/|\/de\//`;
  - the alt differs from the Italian one;
  - text contains none of the forbidden words, `preferenze cookie`, `titolare`, `cookie preferences`;
  - **language-choice sentence**: mounting the Italian, English and German pages, the last `p` of `.policy > section:nth-of-type(4)` equals the IT, EN and DE sentence from the step-1 draft list (exact strings), and that card's `ul` is still the element before it;
  - source: no `v-html`, no `definePageMeta`, no `<NuxtLink`, contains `<style scoped src="../../assets/css/pages/privacy.css"></style>` and the canonical, no `name: "keywords"`.
- [ ] **Step 3: Update the fallback tests:** `tests/site-links.nuxt.test.ts` `localePath('de', 'privacy-policy')` → `'/de/datenschutz'`; `tests/site-chrome-german.nuxt.test.ts` footer privacy href and cookie-banner policy href → `'/de/datenschutz'` (rename the banner test to "…with the policy link on the German privacy page").
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/privacy-de-page.nuxt.test.ts tests/privacy-en-page.nuxt.test.ts tests/site-links.nuxt.test.ts tests/site-chrome-german.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/use-cookie-consent.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the page, IT/EN privacy pages, draft list, config, layout and tests: `feat: add the German privacy policy and the language-choice sentence`.
- [ ] **Step 6: Remove the dead fallback.** Check with a grep that `availablePath` and `pendingRouteIds` are used only in `utils/site-links.ts` and `tests/site-links.nuxt.test.ts`; if anything else uses them, skip this step and report it. Otherwise in `utils/site-links.ts`: delete `pendingRouteIds` and `availablePath`; `primaryLinks` returns `primaryLinksByLocale[locale]`; `homePath` returns `` `/${locale}` ``; `localePath` returns `routes(locale).find(route => route.id === routeId)?.path ?? homePath(locale)`; `withoutTrailingSlash` stays for `twinPath`; doc comments stay accurate. In `tests/site-links.nuxt.test.ts` replace the "interim fallback" describe with:

```ts
describe('German links', () => {
  it('points every German link at its own page', () => {
    expect(homePath('de')).toBe('/de')
    expect(localePath('de', 'privacy-policy')).toBe('/de/datenschutz')
    expect(primaryLinks('de')).toEqual([
      { label: 'Zimmer', to: '/de#zimmer' },
      { label: 'Frühstück', to: '/de#fruehstueck' },
      { label: 'Entdecken', to: '/de/entdecken' },
      { label: 'Hausordnung', to: '/de/hausordnung' },
      { label: 'Anfahrt', to: '/de#anfahrt' },
    ])
  })

  it('keeps the Italian and English home paths', () => {
    expect(homePath('it')).toBe('/it')
    expect(homePath('en')).toBe('/en')
  })
})
```

- [ ] **Step 7: Run** `npx -y pnpm@10.10.0 vitest run tests/site-links.nuxt.test.ts tests/site-chrome-german.nuxt.test.ts tests/site-chrome-english.nuxt.test.ts tests/site-language-switch.nuxt.test.ts tests/root-language.nuxt.test.ts tests/site-layout-locale.nuxt.test.ts tests/site-menu.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 8: Commit** `utils/site-links.ts` and `tests/site-links.nuxt.test.ts`: `refactor: remove the interim fallback for unbuilt German pages`.

### Task 5: Final verification

- [ ] **Step 1: Full gate** through `gate-runner`: lint, typecheck, `vitest run`, `generate`. Expected: lint 0 errors, typecheck OK, all tests pass (baseline plus the new ones), 29 prerendered routes (25 after step 1 + 4), no 404 in the crawl.
- [ ] **Step 2: Browser check.** Serve `.output/public` on any port except 4173 (held by an unrelated process), for example 4180. The `browser` agent checks at 1440, 1024 and 390:
  - `/de`, `/de/entdecken`, `/de/hausordnung`, `/de/datenschutz` (and trailing-slash forms): same layout as the Italian twin, German chrome, `<html lang="de">`, German JSON-LD; carousels work; no horizontal overflow and no mid-word break without a hyphen at 390;
  - top bar at 1180 px in German stays on one line;
  - menu and dock anchors `/de#zimmer`, `#fruehstueck`, `#anfahrt` land on the sections from `/de` and from `/de/hausordnung`; Details reach `/de/buchen#lampone` / `#mirtillo`;
  - flags: from every page in all three languages (15 pages), IT/EN/DE lead to the twin page; footer "Datenschutz" and the cookie banner link reach `/de/datenschutz`; "Cookie-Einstellungen" on the footer and the privacy page reopens the banner;
  - root `/` with `locale: 'de-DE'` lands on `/de` (no longer `/de/buchen`); `en-US` on `/en`; `fr-FR` on `/it`;
  - Italian and English pages: compared with a build of the step-1 final commit (temporary worktree, removed afterwards), identical except the new paragraph in the fourth card of `/it/privacy-policy` and `/en/privacy-policy`.
- [ ] **Step 3: Fix** anything found, run the related targeted tests, commit each fix as `fix: …`, and re-run the gate once if code changed.
- [ ] **Step 4: Wrap-up** (controller): update MEMORY.md and Archivist (`redesign-experimental`), then tell the owner: all German pages exist as drafts for the friend's check after publishing (`docs/superpowers/drafts/de-pages-drafts.md`); the language-choice sentence is now in the Italian, English and German privacy pages as a draft for her to read; next is the final SEO step, after the owners approve the whole site.
