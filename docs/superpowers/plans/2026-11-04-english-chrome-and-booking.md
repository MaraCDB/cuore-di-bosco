# English chrome and /en/booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show the redesigned chrome in English on English pages, and replace the legacy `/en/booking` with an English twin of the redesigned `/it/prenota`.

**Architecture:**
- One layout, `layouts/default.vue`, serves both languages. It derives the locale from the route (`/en…` means `en`), sets the i18n locale and `<html lang>`, and emits the matching JSON-LD.
- Chrome components read strings from `i18n/locales/{it,en}.json` and build same-language links through `utils/site-links.ts`.
- The booking page styles move into one CSS file that both twins include with `<style scoped src>`.

**Tech Stack:** Nuxt 3.17, Vue 3 `<script setup lang="ts">`, @nuxtjs/i18n (`strategy: 'no_prefix'`, `defaultLocale: 'it'`), Vitest + @nuxt/test-utils (`mountSuspended`).

**Spec:** `docs/superpowers/specs/2026-11-04-english-pages-design.md`. This plan covers spec steps 1 and 2 only. The owner approves the `/en/booking` drafts before step 3, the English home, is planned.

## Global Constraints

- Branch `redesign/prova-1`. Local commits only: never push or merge. Stage files by name. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `.playwright-mcp/`, `.superpowers/`, `public/images/FOTO MIE BB E DINTORNI/`, `public/images/APT/`.
- Node in Git Bash: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`. pnpm: `npx -y pnpm@10.10.0 <script>` (corepack is broken).
- Testing during a task:
  - Implementers run only their targeted tests: `npx -y pnpm@10.10.0 vitest run <files>`.
  - The full gate (lint, typecheck, test, generate) runs through the `gate-runner` agent in Task 5.
  - Baseline at `d84e1c7`: lint 0 errors (1 legacy warning in `pages/en/rules.vue`), typecheck OK, 177/177 tests, 24 prerendered routes.
- Italian visitors must see no change at all: same text, links, classes and styles.
- No comments in code, except doc comments on exported functions (the style of `utils/site-links.ts`). English identifiers.
- Every redesign `NuxtLink` has `no-prefetch`. Prefetch injects the legacy pages' unscoped CSS.
- Never put `width` or `height` on `<img>`. Never use `v-html`. Font sizes only through `--step-*` tokens. Never use `zoom`, including `cursor: zoom-in`.
- Text rules from the spec:
  - The current Italian page is the source of truth.
  - Reuse the legacy English where it faithfully says the same thing. Otherwise draft.
  - Credits stay verbatim and untranslated.
  - Place names: English where one exists (Lake Garda, Brentonico Plateau, Monte Baldo Nature Park, Europe's Garden), otherwise Italian.
  - "Lampone" and "Mirtillo" stay. Lampone comes first.
  - Never "rental" or "hire" for the B&B's bikes. No paid extras, deposit, cancellation or refund text.
- Teleported elements (the lightbox) need the root class `redesign`.

## Review Focus

1. **Client-side switch between languages.** The layout does not remount when you go from `/it/prenota` to `/en/booking` with "English", or back with "Italiano". The locale, `<html lang>`, chrome labels and JSON-LD must follow the route. This is pinned by the `siteLocale` tests (Task 1), the layout watcher (Task 2) and browser step 5.3.
2. **Trailing slash.** `/en/booking/` must be English and redesigned, exactly like `/en/booking`. Pinned in Task 1 (`siteLocale('/en/booking/')`, `twinPath`) and Task 4 (the `redesignedRoutes` test).
3. **Cookie banner on English pages.**
   - English message, with the line break after "(Google Analytics)."
   - Policy link to `/en/privacy-policy`.
   - The footer "Cookie preferences" button reopens the banner.
   - Pinned in Task 2 (footer test) and browser step 5.3.
4. **Room anchors from other pages.** `/en/booking#lampone` and `#mirtillo` must land on the rooms, so the ids are the same as Italian. Pinned in Task 4.
5. **Legacy leftovers.** These must not reach `/en/booking`: the legacy unscoped CSS, the welcome toast, the WhatsApp float, and the removed paid services. Pinned in Task 4 (forbidden-words test, no `layout: 'english'`) and the update to `tests/legacy-css.nuxt.test.ts`.

---

### Task 1: Locale-aware site links

**Files:**
- Modify: `utils/site-links.ts`
- Test: `tests/site-links.nuxt.test.ts`

**Interfaces:**
- Produces, in `utils/site-links.ts` (auto-imported):
  - `type SiteLocale = 'it' | 'en'`
  - `siteLocale(path: string): SiteLocale`: `'en'` when the path is `/en` or starts with `/en/`, otherwise `'it'`.
  - `primaryLinks(locale: SiteLocale = 'it'): SiteLink[]`
  - `homePath(locale: SiteLocale): string`: `/it` or `/en`.
  - `localePath(locale: SiteLocale, routeId: string): string`: the path of a route id from `routes(locale)`, falling back to `homePath(locale)`.
  - `twinPath(path: string, target: SiteLocale): string`: maps any path to the page with the same route id in `target`, trailing slash ignored, falling back to `homePath(target)`.
  - `englishTwin(path)` stays and returns `twinPath(path, 'en')`.

- [ ] **Step 1: Write the failing tests** (append to the existing file, keep the existing tests)

```ts
describe('siteLocale', () => {
  it.each([['/en', 'en'], ['/en/booking', 'en'], ['/en/booking/', 'en'], ['/it', 'it'], ['/it/prenota', 'it'], ['/', 'it'], ['/english', 'it']])('reads %s as %s', (path, locale) => {
    expect(siteLocale(path)).toBe(locale)
  })
})

describe('primaryLinks in English', () => {
  it('lists the same targets in the same order as Italian', () => {
    expect(primaryLinks('en')).toEqual([
      { label: 'Rooms', to: '/en#rooms' },
      { label: 'Breakfast', to: '/en#breakfast' },
      { label: 'Explore', to: '/en/explore' },
      { label: 'Rules', to: '/en/rules' },
      { label: 'How to get here', to: '/en#directions' },
    ])
  })
})

describe('twinPath', () => {
  it.each([['/en/booking', 'it', '/it/prenota'], ['/en/booking/', 'it', '/it/prenota'], ['/en', 'it', '/it'], ['/it/prenota', 'en', '/en/booking'], ['/en/unknown', 'it', '/it']])('maps %s to %s', (path, target, expected) => {
    expect(twinPath(path, target as SiteLocale)).toBe(expected)
  })
})

describe('localePath', () => {
  it('finds the booking page in each language', () => {
    expect(localePath('it', 'booking')).toBe('/it/prenota')
    expect(localePath('en', 'booking')).toBe('/en/booking')
    expect(localePath('en', 'privacy-policy')).toBe('/en/privacy-policy')
  })
})
```

- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/site-links.nuxt.test.ts`. Expected: FAIL, because `siteLocale`, `twinPath` and `localePath` are not defined.
- [ ] **Step 3: Implement** the interfaces above. The Italian labels and paths of `primaryLinks('it')` stay exactly as they are today. Route ids come from `utils/routes.ts` (`routes(locale)`, the `id` field).
- [ ] **Step 4: Run** the same command. Expected: PASS, with the existing `primaryLinks` and `englishTwin` tests still green.
- [ ] **Step 5: Commit** `utils/site-links.ts` and `tests/site-links.nuxt.test.ts` with the message `feat: add locale-aware site links for the English pages`.

### Task 2: Bilingual chrome and one layout for both languages

**Files:**
- Modify: `i18n/locales/it.json`, `i18n/locales/en.json`
- Modify: `components/site/header.vue`, `menu.vue`, `footer.vue`, `dock.vue`, `to-top.vue`, `photo-carousel.vue`
- Create: `utils/structured-data.ts`
- Modify: `layouts/default.vue`, `layouts/english.vue` (JSON-LD only: both use the new util)
- Test: create `tests/site-chrome-english.nuxt.test.ts`. Existing chrome tests must still pass unchanged: `site-menu`, `site-no-prefetch`, `site-to-top`, `photo-carousel`, `use-cookie-consent`, `desktop-scale`.

**Interfaces:**
- Consumes: Task 1 (`siteLocale`, `primaryLinks(locale)`, `homePath`, `localePath`, `twinPath`).
- Produces:
  - i18n keys under a `site.` prefix, one per visible string or aria label of the six components. Key names are the builder's call.
  - `lodgingBusinessJsonLd(locale: SiteLocale): Record<string, unknown>` in `utils/structured-data.ts`. It returns today's Italian object (`layouts/default.vue`) for `'it'` and today's English object (`layouts/english.vue:108-170`) for `'en'`, unchanged.
  - The layout sets the i18n locale with `setLocale(siteLocale(route.path))` in a `watch` with `immediate: true`. Chrome components read the locale from `useI18n().locale` and never derive it themselves.

**English strings.** All of them are drafts, so they go on the Task 4 draft list.

| Where | Italian (today) | English |
|---|---|---|
| top bar, menu | Home / English / Menu / Prenota | Home / Italiano / Menu / Book |
| nav aria | Principale / Pagine del sito / Chiudi | Main / Site pages / Close |
| dock | Contatti rapidi (aria) / Chiamaci / Scrivici | Quick contacts / Call us / Email us |
| footer h2 | Ti aspettiamo! | We're waiting for you! (legacy English footer) |
| footer p | Prenotare è molto semplice: puoi scriverci una mail a … o un messaggio whatsapp o telegram al …, ti risponderemo al più presto! | Use the legacy English footer sentence from `layouts/english.vue` if it says the same thing; otherwise draft: "Booking is very easy: send us an email at … or a WhatsApp or Telegram message at …, and we'll reply as soon as possible!" |
| footer aria | Chiamaci al 349 4960228 / Scrivici su WhatsApp / Scrivici una mail a info@cuoredibosco.it / Cuore di Bosco su Facebook / su Instagram | Call us at 349 4960228 / Message us on WhatsApp / Email us at info@cuoredibosco.it / Cuore di Bosco on Facebook / on Instagram |
| footer legal | Privacy / Preferenze cookie | Privacy / Cookie preferences |
| to-top aria | Torna all'inizio | Back to top |
| carousel | carosello / Foto precedente / Foto successiva / Ferma lo scorrimento / Avvia lo scorrimento | carousel / Previous photo / Next photo / Pause scrolling / Start scrolling |

Not translated: the footer address, CIN, CF, phone numbers and the name "B&B Cuore di Bosco". The footer paragraph keeps its two inline links: use `<i18n-t>` with named slots, not `v-html`.

Links:
- Home goes to `homePath(locale) + '#top'`.
- The language link goes to `twinPath(route.path, other)`, labelled "English" on Italian pages and "Italiano" on English pages.
- Prenota/Book goes to `localePath(locale, 'booking')` and Privacy to `localePath(locale, 'privacy-policy')`.

- [ ] **Step 1: Write the failing tests** in `tests/site-chrome-english.nuxt.test.ts`.
  - Setup: set the locale with `await useNuxtApp().$i18n.setLocale('en')` before mounting. Reset it to `'it'` in `afterEach`.
  - **Header** (`mountSuspended(SiteHeader, { route: '/en/booking' })`): nav link texts are `['Home', 'Rooms', 'Breakfast', 'Explore', 'Rules', 'How to get here', 'Italiano', 'Book']`. Their hrefs start with `/en`, except "Italiano", whose href is `/it/prenota`.
  - **Menu** (`open: true`, route `/en/booking`): the same link texts and targets. The close button reads `Close`.
  - **Dock**: labels `Home, Call us, WhatsApp, Email us, Book`. Book links to `/en/booking` and Home to `/en#top`.
  - **Footer**:
    - h2 `We're waiting for you!`;
    - the Privacy link is `/en/privacy-policy`;
    - the button reads `Cookie preferences`, and clicking it calls `openPreferences` (reuse the approach in `tests/use-cookie-consent.nuxt.test.ts`);
    - the address paragraph equals the Italian one.
  - **Carousel**: the three control aria labels are `Previous photo`, `Pause scrolling` and `Next photo`, and `aria-roledescription` is `carousel`.
  - **To-top**: aria label `Back to top`.
  - **Italian control**: the same header mounted with locale `'it'` still shows `['Home', 'Camere', 'Colazione', 'Esplora', 'Regolamento', 'Come arrivare', 'English', 'Prenota']`.
  - **`lodgingBusinessJsonLd`**: `lodgingBusinessJsonLd('en').tourBookingPage` contains `/en/booking`, and `lodgingBusinessJsonLd('it').tourBookingPage` contains `/it/prenota`. Use whatever field names the existing objects use.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/site-chrome-english.nuxt.test.ts`. Expected: FAIL, because the labels are still Italian and `lodgingBusinessJsonLd` is undefined.
- [ ] **Step 3: Implement.**
  - Add the i18n keys to both JSON files. Italian values must be byte-identical to today's strings.
  - Switch the six components to `$t` / `<i18n-t>` and the Task 1 helpers.
  - Move both JSON-LD objects into `utils/structured-data.ts`. `default.vue` uses `lodgingBusinessJsonLd(siteLocale(route.path))` and `htmlAttrs.lang` from the same value, reactive through computed values in `useHead`. `english.vue` uses `lodgingBusinessJsonLd('en')`.
  - Replace the bare `setLocale("it")` in `default.vue` with the watcher.
- [ ] **Step 4: Run** the new test plus the existing chrome tests: `npx -y pnpm@10.10.0 vitest run tests/site-chrome-english.nuxt.test.ts tests/site-links.nuxt.test.ts tests/site-menu.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts tests/site-to-top.nuxt.test.ts tests/photo-carousel.nuxt.test.ts tests/use-cookie-consent.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/home-page.nuxt.test.ts`. Expected: all PASS.
- [ ] **Step 5: Commit** the files listed above with the message `feat: translate the redesigned chrome for English pages and share the JSON-LD`.

### Task 3: Share the booking page styles

**Files:**
- Create: `assets/css/pages/booking.css`, holding the exact content of the `<style scoped>` block of `pages/it/prenota.vue`.
- Modify: `pages/it/prenota.vue`. Its style block becomes `<style scoped src="../../assets/css/pages/booking.css"></style>`.
- Modify: `tests/prenota-page.nuxt.test.ts`. `pageStyles` reads `assets/css/pages/booking.css`.
- Modify: `tests/desktop-scale.nuxt.test.ts`. The booking style checks (lines 14, 61, 80, 93) read the CSS file. For `extractStyleBlocks(bookingSource)`, use the file content directly.

**Interfaces:**
- Produces: `assets/css/pages/booking.css`, included by `pages/en/booking.vue` in Task 4 with the same `<style scoped src>` line.

- [ ] **Step 1: Move the block** byte-for-byte, then update both tests to read the CSS file.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/prenota-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/legacy-css.nuxt.test.ts`. Expected: PASS, with the same test count as before.
- [ ] **Step 3: Check the build output.** Run `npx -y pnpm@10.10.0 generate`. Then confirm that the CSS emitted for `/it/prenota` still holds the rules with a `data-v-` scope, for example by grepping `.output/public/_nuxt/*.css` for `.service-icons[data-v-`. Expected: the scoped rules are present.
- [ ] **Step 4: Commit** the four files with the message `refactor: move the booking page styles into a shared CSS file`.

### Task 4: English booking page

**Files:**
- Rewrite: `pages/en/booking.vue`. Before you overwrite it, keep the legacy file at hand with `git show d84e1c7:pages/en/booking.vue`: it is the source for the reused English and for the head block.
- Modify: `layouts/default.vue`. Add `'/en/booking'` and `'/en/booking/'` to `redesignedRoutes`.
- Modify: `tests/explore-page.nuxt.test.ts:236-244`. The `redesignedRoutes` assertion includes the two new paths.
- Modify: `tests/legacy-css.nuxt.test.ts:26-27`. Drop `pages/en/booking.vue` from the legacy-selector list.
- Create: `tests/booking-en-page.nuxt.test.ts`.
- Create: `docs/superpowers/drafts/en-booking-drafts.md`, the draft list and glossary for the owner.

**Interfaces:**
- Consumes:
  - `assets/css/pages/booking.css` (Task 3);
  - the Task 2 chrome and layout;
  - `SitePhotoCarousel` (`components/site/photo-carousel.vue`, props `photos: {src, alt, caption?, credit?}[]` and `label`).
- Produces: `/en/booking` on `layouts/default.vue`, with `#lampone` and `#mirtillo` ids. Task 3 of the next plan (the English home) links to it.

**Page rules:**
- The template has the same structure as `pages/it/prenota.vue`: the same elements, classes, ids, photo srcs and order, icons, lightbox and script logic. Only text, alts and aria labels change. Do not set `definePageMeta({ layout: 'english' })`.
- Widget: `data-action="https://www.bed-and-breakfast.it/en/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"`. Copy every other widget attribute from the Italian page.
- The h1 is `BOOK`. The carousel `label` is an English draft of "Fotografie delle camere e della casa".
- The lightbox aria labels are `Close`, `Previous` and `Next`.
- The head block: copy the legacy `useHead` / `useSeoMeta` (legacy lines 280-330) verbatim. If its description mentions a removed service (bike rental, picnic day, paid laundry), keep it anyway and flag it in the draft list under "SEO, for later".
- Text: translate every Italian text node of the current `pages/it/prenota.vue` following the Global Constraints text rules.
- **Draft list** (`docs/superpowers/drafts/en-booking-drafts.md`):
  - a table `Italian | English | Why` covering every string. "Why" is one of: `legacy reused`, `legacy fixed: <what>`, `new draft`, `changed in Italian`.
  - a **Glossary** section with the room, service, place-name and menu terms chosen, for the later pages to reuse.

- [ ] **Step 1: Write the failing tests** in `tests/booking-en-page.nuxt.test.ts`. Mount `~/pages/en/booking.vue` and `~/pages/it/prenota.vue` with `mountSuspended`, and set the locale to `'en'` for the English mount.
  - **Same structure:** for `.band` sections, `[...root.children].map(el => el.className)` is equal for both pages.
  - **Same photos:** every `img` `src` in the same order on both pages. This covers the carousel, welcome, room photos and the 15 icons.
  - **Same room ids:** `#lampone` and `#mirtillo` exist, and the room h3s are `['Lampone', 'Mirtillo', …]` in the Italian order.
  - **Widget:** `[data-action]` equals the English URL above.
  - **Headings:** h1 is `['BOOK']`.
  - **Forbidden content:** the lowercased text of `h1, h2, h3, p, figcaption, li` contains none of `deposit`, `cancellation`, `refund`, `rental`, `(paid)`, `weather permitting`, `welcome gift`, `picnic day`, `write to us`, and does not match `/\bhire\b/`.
  - **Source:** contains no `v-html` and no `layout: 'english'`. Every `NuxtLink` has `noPrefetch === true`, and no `img` has `width` or `height`.
  - **Service icons:** every icon `img` has `alt=""`, and there are 15 figcaptions, all non-empty and uppercase.
  - **Owner edits survive in English:** the text contains an English draft for each guarded Italian edit, namely `Dolcetto di benvenuto`, `Angolo tisane con bollitore, tè, camomilla, tisane, bicchieri e tazze` and the Mirtillo `set bollitore`. Assert the exact English strings you chose, and list them in the draft file.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/booking-en-page.nuxt.test.ts`. Expected: FAIL against the legacy page.
- [ ] **Step 3: Write `pages/en/booking.vue`** and the draft file. Update `redesignedRoutes` and the two existing tests.
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/booking-en-page.nuxt.test.ts tests/prenota-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/site-chrome-english.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the six files with the message `feat: redesign the English booking page as a translation of the Italian one`.

### Task 5: Final verification

- [ ] **Step 1: Full gate** through the `gate-runner` agent: lint, typecheck, `vitest run`, `generate`. Expected: lint 0 errors, typecheck OK, every test passes (177 plus the new ones), 24 routes.
- [ ] **Step 2: Italian unchanged.** The `browser` agent compares `/it/prenota`, `/it` and `/it/esplora` at 1440, 1024 and 390 against screenshots taken on `d84e1c7`. Expected: no visible difference; build `d84e1c7` in a temporary worktree for the baseline.
- [ ] **Step 3: English booking.** The `browser` agent checks `/en/booking` and `/en/booking/` at 1440, 1024 and 390. Expected result:
  - layout identical to `/it/prenota`, with English chrome and `<html lang="en">`;
  - carousel controls work;
  - the lightbox opens, cycles and closes with Escape;
  - the widget loads in English;
  - the cookie banner is English with the line break, its link goes to `/en/privacy-policy`, and "Cookie preferences" reopens it;
  - "Italiano" goes to `/it/prenota` with `lang="it"` and Italian chrome, and "English" there comes back to `/en/booking`, all without a full reload;
  - `/en/booking#mirtillo` scrolls to the Mirtillo room;
  - no horizontal overflow.
- [ ] **Step 4: Hand over to the owner.** Relay the draft list (`docs/superpowers/drafts/en-booking-drafts.md`) and stop. The English home is planned only after the owner approves or edits these drafts.
