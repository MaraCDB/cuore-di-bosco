# German chrome, IT/EN/DE switch and /de/buchen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add German as a third site language: a flag switch IT / EN / DE in the redesigned header and phone menu, a root `/` that opens in the stored or browser language, the redesigned chrome in German, a German JSON-LD and the German booking page `/de/buchen`.

**Architecture:**
- `utils/routes.ts` and `utils/site-links.ts` grow a third locale, `de`. Every chrome link goes through `site-links.ts`, which sends links to German pages that do not exist yet to `/de/buchen` (interim fallback, removed page by page in step 2).
- A new `SiteLanguageSwitch` component replaces the "English" link in header and menu, and stores the clicked language in `localStorage` through `utils/language-choice.ts`. `pages/index.vue` reads that choice, then `navigator.languages`, and replaces `/` with the home of the chosen language.
- `layouts/default.vue` already derives locale, `<html lang>` and JSON-LD from the route; it only needs the `de` values. `pages/de/buchen.vue` is a structural copy of `pages/it/prenota.vue` sharing `assets/css/pages/booking.css`.

**Tech Stack:** Nuxt 3.17, Vue 3 `<script setup lang="ts">`, @nuxtjs/i18n (`strategy: 'no_prefix'`, `lazy`, `detectBrowserLanguage: false`), Vitest + @nuxt/test-utils (`mountSuspended`, `mockNuxtImport`).

**Spec:** `docs/superpowers/specs/2026-11-04-german-and-language-switch-design.md`, step 1 of "Order of work" only. Step 2 (German home, explore, rules, privacy) gets its own plan.

**Status:** approved by the owner on 2026-11-04, ON HOLD until the remaining English pages are redesigned (owner: "si ma prima finisci le altre pagine di inglese!"). Before executing, refresh the baseline numbers and the "legacy pages" constraint: `layouts/english.vue` and its components will be gone by then.

## Global Constraints

- Branch `redesign/prova-1`. Local commits only: never push or merge. Stage files by name. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `.playwright-mcp/`, `.superpowers/`, `public/images/FOTO MIE BB E DINTORNI/`, `public/images/APT/`.
- Node in Git Bash: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`. pnpm: `npx -y pnpm@10.10.0 <script>` (corepack is broken).
- Testing: implementers run only their targeted tests, `npx -y pnpm@10.10.0 vitest run <files>`. The full gate runs through the `gate-runner` agent in Task 6. Baseline at `d0d49a3`: lint 0 errors, typecheck OK, 224/224 tests, 24 prerendered routes.
- Italian pages: no visible change except the switch replacing "English" in header and menu. English `/en/booking`: same rule. Legacy pages (`layouts/english.vue`, `components/top-navbar.vue`, `language-switcher.vue`, `mobile-bottom-bar.vue`) are not touched.
- IT and EN JSON-LD stay byte-identical (fixed only in the final SEO step). `i18n.detectBrowserLanguage` stays `false`. No hreflang/sitemap work.
- No comments in code, except doc comments on exported functions (style of `utils/site-links.ts`). English identifiers.
- Every redesign `NuxtLink` has `no-prefetch`. Never `width`/`height` on `<img>`, never `v-html`, font sizes only through `--step-*` tokens, never `zoom` (also not `cursor: zoom-in`).
- German text rules (spec "Text rules"): translate the current Italian page; formal "Sie"; standard German (Germany); place names Gardasee, Hochebene von Brentonico, Naturpark Monte Baldo, Garten Europas, Rovereto, Monte Baldo, otherwise Italian (Cammino di San Rocco, Polsa e San Valentino, Castello di Avio, Campana dei Caduti, Prada, Vallagarina); "Lampone" and "Mirtillo" stay, Lampone first; credits verbatim; UPPERCASE where the Italian uses it. Every German string is a draft and goes on the draft list (Task 5).
- Forbidden in German text and JSON-LD: `kaution`, `anzahlung`, `stornierung`, `erstattung`, `verleih`, `vermietung`, `kostenpflichtig`, `picknick-tag`. The B&B's bikes are lent for free, never rented.
- Interim fallback: `pendingRouteIds.de` in `utils/site-links.ts` lists the German pages not built yet. Step 2 removes each id when its page lands. No link may point at a German page that does not exist: `generate` crawls links and fails on 404s.

## Review Focus

1. **Unbuilt German pages.** Header, menu, dock, footer, cookie banner, switch and root redirect must never produce `/de`, `/de/entdecken`, `/de/hausordnung` or `/de/datenschutz` while those pages do not exist. Expected: they lead to `/de/buchen`. Pinned in Task 1 (`availablePath`, `primaryLinks('de')`, `homePath('de')`), Task 2 (cookie banner, footer) and Task 6 (`generate` with 25 routes).
2. **Broken or blocked storage.** `localStorage` can throw (disabled storage, some private modes) or hold a stale value (`'fr'`, `'english'`). Expected: the flags still navigate, the root ignores the bad value and falls back to `navigator.languages`. Pinned in Task 3 (`rememberLanguage` and `storedLanguage` with a throwing storage) and Task 4 (`rootLanguage('fr', …)`).
3. **German top bar width.** German labels are longer ("Startseite", "Hausordnung") and three flags replace one word. Expected: the desktop top bar stays on one line from 901 px up, in all three languages. Pinned in Task 6 browser step at 901 and 1024 px.
4. **Long German words on the phone.** Service-icon captions and headings at 390 px. Expected: no horizontal overflow and no mid-word break without a hyphen; use a soft hyphen (`­`) where needed, as done for "COMPLI­MENTARY". Pinned in Task 5 (soft-hyphen test for any caption you hyphenate) and Task 6 browser step.
5. **Switching language from any page.** From `/it/esplora/` (trailing slash) the switch must still find the twins; from `/de/buchen` Italian goes to `/it/prenota`. Locale, `<html lang>`, chrome and JSON-LD follow the route. Pinned in Task 1 (`twinPath` with trailing slash), Task 2 (layout test) and Task 6.

---

### Task 1: Three-language routes and site links

**Files:**
- Modify: `utils/routes.ts`, `utils/site-links.ts`
- Test: `tests/site-links.nuxt.test.ts` (append; keep existing tests green)

**Interfaces:**
- Produces, in `utils/routes.ts`:
  - `type LanguageCode = "it" | "en" | "de"`; `routes("de")` returns `germanRoutes` with the same five ids: `welcome` `/de` "WILLKOMMEN", `booking` `/de/buchen` "BUCHEN", `explore` `/de/entdecken` "ENTDECKEN", `rules` `/de/hausordnung` "HAUSORDNUNG", `privacy-policy` `/de/datenschutz` "DATENSCHUTZ" (`hidden: true`).
- Produces, in `utils/site-links.ts`:
  - `type SiteLocale = 'it' | 'en' | 'de'`.
  - `siteLocale(path)`: `'de'` for `/de` and `/de/…`, `'en'` as today, else `'it'`.
  - `primaryLinksByLocale.de` (final targets): Zimmer `/de#zimmer`, Frühstück `/de#fruehstueck`, Entdecken `/de/entdecken`, Hausordnung `/de/hausordnung`, Anfahrt `/de#anfahrt`.
  - `const pendingRouteIds: Partial<Record<SiteLocale, readonly string[]>> = { de: ['welcome', 'explore', 'rules', 'privacy-policy'] }` (not exported).
  - `availablePath(path: string): string` (exported, doc comment): returns `path` unchanged when its page exists; when the path (hash and trailing slash ignored) belongs to a pending route id of its language, returns that language's booking path, without hash.
  - `primaryLinks(locale)` maps every `to` through `availablePath`.
  - `homePath(locale)` returns `availablePath('/' + locale)`. `localePath(locale, routeId)` returns `availablePath(<route path>)`, falling back to `homePath(locale)`. `twinPath` keeps its logic and inherits the fallback. `englishTwin` stays.

- [ ] **Step 1: Write the failing tests**

```ts
describe('three languages', () => {
  it.each([['/de', 'de'], ['/de/buchen', 'de'], ['/de/buchen/', 'de'], ['/deutsch', 'it']])('reads %s as %s', (path, locale) => {
    expect(siteLocale(path)).toBe(locale)
  })

  it('lists the five German routes with the shared ids', () => {
    expect(routes('de').map(route => [route.id, route.path])).toEqual([
      ['welcome', '/de'], ['booking', '/de/buchen'], ['explore', '/de/entdecken'], ['rules', '/de/hausordnung'], ['privacy-policy', '/de/datenschutz'],
    ])
  })

  it.each([
    ['/it/prenota', 'de', '/de/buchen'], ['/de/buchen', 'it', '/it/prenota'], ['/de/buchen/', 'en', '/en/booking'],
    ['/it/esplora/', 'de', '/de/buchen'], ['/it/esplora/', 'en', '/en/explore'], ['/en', 'de', '/de/buchen'],
  ])('maps %s to %s as %s', (path, target, expected) => {
    expect(twinPath(path, target as SiteLocale)).toBe(expected)
  })
})

describe('interim fallback for German pages not built yet', () => {
  it('sends unbuilt German pages to the German booking page', () => {
    expect(availablePath('/de')).toBe('/de/buchen')
    expect(availablePath('/de#zimmer')).toBe('/de/buchen')
    expect(availablePath('/de/hausordnung/')).toBe('/de/buchen')
    expect(homePath('de')).toBe('/de/buchen')
    expect(localePath('de', 'privacy-policy')).toBe('/de/buchen')
    expect(primaryLinks('de').map(link => link.to)).toEqual(Array(5).fill('/de/buchen'))
    expect(primaryLinks('de').map(link => link.label)).toEqual(['Zimmer', 'Frühstück', 'Entdecken', 'Hausordnung', 'Anfahrt'])
  })

  it('leaves Italian and English paths untouched', () => {
    expect(availablePath('/it#camere')).toBe('/it#camere')
    expect(availablePath('/en/rules')).toBe('/en/rules')
    expect(homePath('it')).toBe('/it')
    expect(homePath('en')).toBe('/en')
  })
})
```

- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/site-links.nuxt.test.ts`. Expected: FAIL (`availablePath` undefined, no German routes).
- [ ] **Step 3: Implement** the interfaces above. Italian and English labels and paths stay exactly as today.
- [ ] **Step 4: Run** the same command. Expected: PASS, existing tests included.
- [ ] **Step 5: Commit** both utils and the test: `feat: add German routes and an interim fallback for unbuilt German pages`.

### Task 2: German locale, chrome strings, JSON-LD and cookie banner link

**Files:**
- Modify: `nuxt.config.ts` (i18n locales: `{ code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' }`)
- Create: `i18n/locales/de.json`
- Modify: `utils/structured-data.ts`, `components/cookie-banner.vue`
- Test: create `tests/site-chrome-german.nuxt.test.ts`; append to `tests/site-layout-locale.nuxt.test.ts`

**Interfaces:**
- Consumes: Task 1 (`SiteLocale` with `de`, `siteLocale`, `localePath`, `homePath`).
- Produces:
  - `de.json` with every key of `en.json` (same placeholders `{email}` and `{phone}`), values below.
  - `lodgingBusinessJsonLd('de')` returns `germanLodgingBusiness`, built as `{ ...italianLodgingBusiness, <German fields> }`. `lodgingBusinessJsonLd` picks the object from a `Record<SiteLocale, …>`.
  - The cookie banner's policy link is `localePath(siteLocale(route.path), 'privacy-policy')` (same output as today for `/`, `/it…`, `/en…`).

**`de.json` values (drafts):**

| Key | German |
|---|---|
| common.accept / common.reject | Akzeptieren / Ablehnen |
| cookies-banner-message | Wir verwenden Cookies für statistische Analysen (Google Analytics). Sind Sie damit einverstanden? |
| cookies-banner-read-policy | Unsere Datenschutzerklärung lesen |
| site.home / site.menu / site.book | Startseite / Menü / Buchen |
| site.nav-main / site.nav-pages / site.close | Hauptmenü / Seiten der Website / Schließen |
| site.dock-label / site.call / site.email | Schnellkontakt / Anrufen / E-Mail |
| site.footer-title | Wir freuen uns auf Sie! |
| site.footer-text | Buchen ist ganz einfach: Schreiben Sie uns eine E-Mail an {email} oder eine WhatsApp- oder Telegram-Nachricht an {phone}, wir antworten Ihnen so schnell wie möglich! |
| site.footer-call / site.footer-whatsapp / site.footer-email | Rufen Sie uns an: {phone} / Schreiben Sie uns auf WhatsApp / Schreiben Sie uns eine E-Mail an {email} |
| site.footer-facebook / site.footer-instagram | Cuore di Bosco auf Facebook / Cuore di Bosco auf Instagram |
| site.privacy / site.cookie-preferences / site.to-top | Datenschutz / Cookie-Einstellungen / Nach oben |
| site.carousel / site.photo-previous / site.photo-next | Karussell / Vorheriges Foto / Nächstes Foto |
| site.scroll-pause / site.scroll-start | Bildlauf anhalten / Bildlauf starten |

`site.language` is copied too for now; Task 3 removes it from all three files.

**German JSON-LD fields (drafts; facts from the current Italian pages):**
- `description`: "B&B für Familien mit Kindern auf der Hochebene von Brentonico im Trentino. Natürliches Frühstück, Babyausstattung, Fahrräder und Angebote für Familien, mitten in der Natur des Naturparks Monte Baldo."
- `paymentAccepted`: "Bargeld, Kreditkarte, Debitkarte, Banküberweisung"
- `amenityFeature` names: "Kostenloses WLAN", "Frühstück inklusive", "Kostenlose Parkmöglichkeit", "Angebote für Familien", "Fahrräder zur Verfügung", "Wäscheservice" (no bike rental, no paid laundry, no PIC NIC DAY).
- `containedInPlace.name` "Hochebene von Brentonico", its `description` "Die Hochebene von Brentonico, bekannt als Garten Europas, liegt im Naturpark Monte Baldo im Trentino, Italien.", inner `name` "Trentino-Südtirol, Italien".
- `tourBookingPage`: "https://www.cuoredibosco.it/de/buchen".

- [ ] **Step 1: Write the failing tests.**
  - `tests/site-chrome-german.nuxt.test.ts`, same harness as `tests/site-chrome-english.nuxt.test.ts` (`mockNuxtImport('useRoute')`, route `/de/buchen`, `setLocale('de')` in `beforeEach`, back to `'it'` in `afterEach`):
    - **Dock**: link texts `['Startseite', 'Anrufen', 'WhatsApp', 'E-Mail', 'Buchen']`; Startseite href `/de/buchen#top`, Buchen href `/de/buchen`; aria-label `Schnellkontakt`.
    - **Footer**: h2 `Wir freuen uns auf Sie!`; `.footer-welcome p` text equals the footer-text with `info@cuoredibosco.it` and `349 4960228`, its two links unchanged; Privacy link text `Datenschutz`, href `/de/buchen`; button `Cookie-Einstellungen`; `.footer-info p` equals the Italian address.
    - **Cookie banner** (`components/cookie-banner.vue`, props `redesign: true`, banner open as in `tests/use-cookie-consent.nuxt.test.ts`): `.cookie-text` starts with `Wir verwenden Cookies für statistische Analysen (Google Analytics).\nSind Sie damit einverstanden?`; policy link href `/de/buchen`; buttons `Akzeptieren`, `Ablehnen`. Control: with route `/it/prenota` and locale `it` the href is `/it/privacy-policy`.
    - **Carousel / to-top**: aria labels `['Vorheriges Foto', 'Bildlauf anhalten', 'Nächstes Foto']`, roledescription `Karussell`; to-top `Nach oben`.
    - **JSON-LD**: `lodgingBusinessJsonLd('de').tourBookingPage` is `https://www.cuoredibosco.it/de/buchen`; `JSON.stringify(lodgingBusinessJsonLd('de')).toLowerCase()` contains none of the forbidden German words (Global Constraints) and no `noleggio`, `rental`, `pic nic`; `lodgingBusinessJsonLd('it')` and `('en')` still match the existing description assertions.
    - **Keys**: `Object.keys(de.json)` equals `Object.keys(en.json)` (read both with `readFileSync`).
  - `tests/site-layout-locale.nuxt.test.ts`: a test mounting the default layout on `/de` (the layout reads only `route.path`; if the unmatched route misbehaves, use `/de/buchen/`, which the reload plugin does not intercept). Expect locale `de`, `document.documentElement.lang === 'de'` and emitted JSON-LD `tourBookingPage` containing `/de/buchen`.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/site-chrome-german.nuxt.test.ts tests/site-layout-locale.nuxt.test.ts`. Expected: FAIL (no `de` locale).
- [ ] **Step 3: Implement** the config, `de.json`, JSON-LD and banner link.
- [ ] **Step 4: Run** the two files plus `tests/site-chrome-english.nuxt.test.ts tests/use-cookie-consent.nuxt.test.ts tests/site-links.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the six files: `feat: add the German locale, chrome strings and JSON-LD`.

### Task 3: Flag switch in header and phone menu

**Files:**
- Create: `public/images/flags/it.svg`, `gb.svg`, `de.svg`
- Create: `utils/language-choice.ts`
- Create: `components/site/language-switch.vue` (auto-imported as `SiteLanguageSwitch`)
- Modify: `components/site/header.vue`, `components/site/menu.vue`, `i18n/locales/{it,en,de}.json`
- Test: create `tests/site-language-switch.nuxt.test.ts`; modify `tests/site-chrome-english.nuxt.test.ts`

**Interfaces:**
- Consumes: Task 1 (`twinPath`, `SiteLocale`), Task 2 (`de` locale).
- Produces, in `utils/language-choice.ts`:
  - `export const LANGUAGE_CHOICE_KEY = 'cdb-language'`
  - `rememberLanguage(locale: SiteLocale): void`: `localStorage.setItem`, swallowing any exception.
  - `storedLanguage(): string | null`: `localStorage.getItem`, `null` on exception.
- Produces `SiteLanguageSwitch`: no props. Root `<div class="language-switch" role="group" :aria-label="$t('site.languages')">` with three `NuxtLink no-prefetch`, order IT, EN, DE. Each link: `:to="twinPath(route.path, locale)"`, `lang` and `hreflang` = locale, `aria-label` = "Italiano" / "English" / "Deutsch", `aria-current="true"` only on the current i18n locale, `@click="rememberLanguage(locale)"`; content `<img src="/images/flags/<it|gb|de>.svg" alt="">` plus the code `IT` / `EN` / `DE`.
- New i18n key `site.languages`: it "Lingua", en "Language", de "Sprache". Remove `site.language` from all three files.

**Flags** (public domain geometry, self-hosted):
- `it.svg`: `viewBox="0 0 3 2"`, three vertical stripes `#009246`, `#fff`, `#ce2b37`.
- `de.svg`: `viewBox="0 0 5 3"`, three horizontal stripes `#000`, `#dd0000`, `#ffce00`.
- `gb.svg`: the Wikimedia Union Jack:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>
```

**Look:** links inline-flex, `min-height:44px`, gap 6px between flag and code, `font-family:var(--sub)`, `font-size:var(--step-nav)`, weight 600, uppercase, `color:inherit`, no underline; flag `height:0.9em; aspect-ratio:3/2; object-fit:cover`; current language underlined in `var(--lime)`. Header: the switch takes the place of the "English" link, gets a class from the header and is hidden at `max-width:900px` like the other top-bar links. Menu: the `site.language` entry leaves `links`; the switch sits right after the `<nav>` in the panel.

- [ ] **Step 1: Write the failing tests.**
  - `tests/site-language-switch.nuxt.test.ts` (`mockNuxtImport('useRoute')` as in the English chrome test; clear `localStorage` in `afterEach`):
    - On `/it/prenota`, locale `it`: aria-labels `['Italiano', 'English', 'Deutsch']`, `lang` and `hreflang` `['it', 'en', 'de']`, hrefs `['/it/prenota', '/en/booking', '/de/buchen']`, `aria-current` only on Italiano, img srcs `['/images/flags/it.svg', '/images/flags/gb.svg', '/images/flags/de.svg']` with `alt=""`, codes `['IT', 'EN', 'DE']`, group aria-label `Lingua`.
    - On `/it/esplora/`: hrefs `['/it/esplora', '/en/explore', '/de/buchen']`.
    - On `/de/buchen`, locale `de`: `aria-current` only on Deutsch, group label `Sprache`, Italiano href `/it/prenota`.
    - Clicking the English link stores `en` under `cdb-language`.
    - `rememberLanguage('de')` does not throw and `storedLanguage()` returns `null` when `Storage.prototype.setItem` / `getItem` throw (`vi.spyOn(Storage.prototype, …).mockImplementation(() => { throw new Error('blocked') })`).
    - Source of `components/site/language-switch.vue`: every `<NuxtLink` has `no-prefetch`; no `width`/`height` on `img`.
  - `tests/site-chrome-english.nuxt.test.ts`: `linkSummaries` reports `aria-label` when present, else the text. Expected header texts become `['Home', 'Rooms', 'Breakfast', 'Explore', 'Rules', 'How to get here', 'Italiano', 'English', 'Deutsch', 'Book']`, menu the same without `Book`; the `/^\/en/` check skips Italiano and Deutsch; Italiano `/it/prenota`, Deutsch `/de/buchen`. Italian control: `['Home', 'Camere', 'Colazione', 'Esplora', 'Regolamento', 'Come arrivare', 'Italiano', 'English', 'Deutsch', 'Prenota']`, English href `/en/booking`.
  - `tests/site-chrome-german.nuxt.test.ts` (from Task 2): header texts `['Startseite', 'Zimmer', 'Frühstück', 'Entdecken', 'Hausordnung', 'Anfahrt', 'Italiano', 'English', 'Deutsch', 'Buchen']`, nav aria-label `Hauptmenü`, menu button `Menü`; open menu close button `Schließen`.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/site-language-switch.nuxt.test.ts tests/site-chrome-english.nuxt.test.ts tests/site-chrome-german.nuxt.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement** flags, util, component, header and menu changes, i18n keys.
- [ ] **Step 4: Run** the three files plus `tests/site-menu.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/home-page.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the listed files: `feat: replace the English link with an IT/EN/DE flag switch`.

### Task 4: Root address opens in the visitor's language

**Files:**
- Modify: `utils/language-choice.ts`, `pages/index.vue`
- Test: create `tests/root-language.nuxt.test.ts`

**Interfaces:**
- Consumes: Task 1 (`homePath`, `SiteLocale`), Task 3 (`storedLanguage`, `LANGUAGE_CHOICE_KEY`).
- Produces: `rootLanguage(storedChoice: string | null, browserLanguages: readonly string[]): SiteLocale` in `utils/language-choice.ts` (doc comment). A stored choice counts only if it is `it`, `en` or `de`; otherwise the first browser language whose primary subtag (lowercased, before `-`) is one of them; otherwise `it`.
- `pages/index.vue` keeps its empty template; `onMounted` calls `router.replace(homePath(rootLanguage(storedLanguage(), navigator.languages ?? [navigator.language])))`.

- [ ] **Step 1: Write the failing tests**

```ts
describe('rootLanguage', () => {
  it.each([
    ['en', ['de-DE'], 'en'], ['de', [], 'de'], [null, ['de-AT', 'en'], 'de'], [null, ['DE-ch'], 'de'],
    [null, ['en-US'], 'en'], [null, ['fr-FR'], 'it'], [null, ['fr-FR', 'en-GB'], 'en'], [null, [], 'it'],
    ['fr', ['en-US'], 'en'], ['english', [], 'it'], [null, ['it-CH', 'de'], 'it'],
  ])('stored %s with %j opens %s', (stored, languages, expected) => {
    expect(rootLanguage(stored, languages)).toBe(expected)
  })
})
```

  Plus a mount test of `~/pages/index.vue`: spy on `useRouter().replace` (`mockResolvedValue(undefined)`); with `localStorage['cdb-language'] = 'en'` it is called once with `'/en'`; with no stored choice and `navigator.languages` stubbed to `['de-DE']` (`vi.spyOn(navigator, 'languages', 'get')`) with `'/de/buchen'` (interim fallback for `/de`).
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/root-language.nuxt.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement** `rootLanguage` and the page.
- [ ] **Step 4: Run** the same command. Expected: PASS.
- [ ] **Step 5: Commit**: `feat: open the root address in the stored or browser language`.

Known interim effect, no fix: `/de/buchen` is a reload route, so a German root redirect adds a history entry until `/de` exists in step 2.

### Task 5: German booking page

**Files:**
- Create: `pages/de/buchen.vue`
- Modify: `layouts/default.vue` (`redesignedRoutes` gets `'/de/buchen'`, `'/de/buchen/'`), `plugins/reload-script.client.ts` (`'/de/buchen'` in `reloadRoutes`), `nuxt.config.ts` (`'/de/buchen'` in `nitro.prerender.routes`)
- Modify: `tests/explore-page.nuxt.test.ts` (`redesignedRoutes` assertions for the two new paths)
- Create: `tests/booking-de-page.nuxt.test.ts`
- Create: `docs/superpowers/drafts/de-chrome-and-booking-drafts.md`

**Interfaces:**
- Consumes: `assets/css/pages/booking.css`, `SitePhotoCarousel`, Tasks 1-3.
- Produces: `/de/buchen` with `#lampone` / `#mirtillo`, on the default layout.

**Page rules:**
- Same template as `pages/it/prenota.vue` (elements, classes, ids, photo srcs and order, icons, lightbox, script logic). Only text, alts and aria labels change. `<style scoped src="../../assets/css/pages/booking.css"></style>`. No `definePageMeta({ layout: 'english' })`.
- Widget: `data-lingua="de"`, `data-action="https://www.bed-and-breakfast.it/de/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002"`; every other attribute from the Italian page.
- h1 `BUCHEN`. Lightbox aria labels `Schließen`, `Zurück`, `Weiter`; dialog label `Zimmer Lampone, Foto 1` pattern (`Zimmer <room>, Foto <n>`).
- Head (drafts): title `Buchen | B&B Cuore di Bosco – Familienurlaub in Brentonico`; description `Buchen Sie Ihren Familienurlaub im B&B Cuore di Bosco in Prada di Brentonico: zwei Zimmer, Frühstück inklusive und viel Natur im Naturpark Monte Baldo im Trentino.`; `og:title`, `og:description` (same texts), `og:type` `website`, `og:url` and canonical `https://www.cuoredibosco.it/de/buchen`, `og:image` as English; the two widget scripts as English. No keywords or twitter tags.
- Draft list `docs/superpowers/drafts/de-chrome-and-booking-drafts.md`, for the friend's check after publishing:
  - table `Italiano | Deutsch` covering every `de.json` value, the German JSON-LD strings, and every string of `/de/buchen` (head, alts, aria labels, captions included);
  - **Glossar**: rooms, place names (Global Constraints), service and menu terms, for step 2;
  - **Für die Eigentümerin** section: the `localStorage` privacy sentence in IT, EN and DE (what is stored: key `cdb-language`, value `it`/`en`/`de`, set only by clicking a flag, used only to open the root in that language, stays on the device, not sent to anyone, can be deleted in the browser settings), in the register of the current Italian privacy page. It enters the privacy pages only in the privacy step, after owner approval;
  - a widget note filled in Task 6 (German or English fallback).

- [ ] **Step 1: Write the failing tests** in `tests/booking-de-page.nuxt.test.ts`, mirroring `tests/booking-en-page.nuxt.test.ts` with locale `'de'`:
  - same top-level and band classes as the Italian page; same `img` srcs in order, 15 under `/images/altervista/`;
  - `#lampone`, `#mirtillo`, room h3s `['Lampone', 'Mirtillo']`;
  - `[data-action]` is the German URL above and `[data-lingua]` is `de`;
  - h1 `['BUCHEN']`;
  - lowercased text of `h1, h2, h3, p, figcaption, li` contains none of the German forbidden words;
  - source: no `v-html`, no `layout: 'english'`, every `NuxtLink` `no-prefetch`, no sized `img`;
  - 15 service figures, empty alts, captions non-empty and uppercase; for every caption you break with a soft hyphen, assert it (as the English `COMPLI­MENTARY` test);
  - owner edits survive: the German drafts for `Dolcetto di benvenuto`, `Angolo tisane con bollitore, tè, camomilla, tisane, bicchieri e tazze` and Mirtillo `set bollitore` are present (assert the exact strings you chose; list them in the draft file);
  - lightbox: root has class `redesign`; close/prev/next labels `['Schließen', 'Zurück', 'Weiter']`; dialog label `Zimmer Lampone, Foto 1`;
  - `plugins/reload-script.client.ts` source contains `'/de/buchen'`.
- [ ] **Step 2: Run** `npx -y pnpm@10.10.0 vitest run tests/booking-de-page.nuxt.test.ts`. Expected: FAIL (page missing).
- [ ] **Step 3: Write the page, the draft file and the config, layout and plugin changes.** Mount the page directly in tests: navigating to a booking route under vitest hangs (reload plugin).
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/booking-de-page.nuxt.test.ts tests/booking-en-page.nuxt.test.ts tests/prenota-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** the listed files: `feat: add the German booking page`.

### Task 6: Final verification

- [ ] **Step 1: Full gate** through `gate-runner`: lint, typecheck, `vitest run`, `generate`. Expected: lint 0 errors, typecheck OK, all tests pass (224 plus the new ones), 25 prerendered routes, no 404 in the crawl.
- [ ] **Step 2: Italian and English unchanged except the switch.** The `browser` agent compares `/it`, `/it/prenota`, `/it/esplora`, `/en/booking` at 1440, 1024 and 390 against a `d0d49a3` build (temporary worktree). Expected: differences only inside the top-bar nav (desktop) and the open phone menu.
- [ ] **Step 3: German booking and switch.** The `browser` agent checks at 1440, 1024, 901 and 390:
  - `/de/buchen` and `/de/buchen/`: layout identical to `/it/prenota`, German chrome, `<html lang="de">`, German JSON-LD;
  - the top bar stays on one line at 901 and 1024 in IT, EN and DE;
  - no horizontal overflow, no mid-word break without a hyphen at 390;
  - the widget renders in German. **If not, or only partly**: switch `/de/buchen` to `data-lingua="en"` and the English `data-action`, update the test, note it in the draft list, commit `fix: use the English booking widget on the German page`, and tell the owner;
  - cookie banner in German with the line break, its link goes to `/de/buchen`; "Cookie-Einstellungen" reopens it;
  - flags: IT → `/it/prenota`, EN → `/en/booking`, DE back, `lang` and chrome follow; the current flag is marked;
  - root `/`: with a German browser (`locale: 'de-DE'`) lands on `/de/buchen`; `en-US` on `/en`; `fr-FR` on `/it`; after clicking EN on any page, `/` with `de-DE` lands on `/en`.
- [ ] **Step 4: Wrap-up** (controller): update MEMORY.md and Archivist (`redesign-experimental`), commit any fix, then tell the owner: the German widget result, the privacy sentence drafts awaiting approval, and that German chrome and `/de/buchen` are drafts for the friend's check after publishing.
