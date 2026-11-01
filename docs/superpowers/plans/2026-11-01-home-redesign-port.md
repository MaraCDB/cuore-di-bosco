# Italian Home Redesign Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the approved static mockup `.taste-skill/mockup/index.html` into the Nuxt site as the Italian home page (`/it`) plus the new shared Italian chrome (header, mobile menu, footer, dock, back-to-top, cookie preferences).

**Architecture:** Mockup tokens and shared rules go into `assets/css/global.css`. The old global element rules move to `assets/css/legacy.css`, prefixed under a `.legacy` class. That class wraps every page that has not been redesigned yet, plus the whole English layout, so those pages keep looking exactly as they do today. The new chrome lives in `components/site/*` and is mounted by `layouts/default.vue`. The home page is rewritten from the mockup's `<div class="band">` hero through `</main>`, with section CSS scoped to the page.

**Tech Stack:** Nuxt 3.17.5, Vue 3.5, @nuxtjs/i18n 9.5.6 (strategy `no_prefix`, real `/it` and `/en` page folders), @nuxtjs/google-fonts 3.2.0. New dev tooling: @nuxt/eslint, vitest, @nuxt/test-utils, @vue/test-utils, happy-dom, vue-tsc, typescript.

**Spec:**
- `.taste-skill/mockup/index.html` is the visual and copy source of truth.
- `.taste-skill/mockup/esplora.html` is reference only for the footer and dock.
- Owner decisions are in `C:\Users\Mara\.claude\projects\c--Users-Mara-Workspace-cuore-di-bosco\memory\redesign-owner-decisions.md` and `cookie-consent-revocation.md`.

## Global Constraints

- Branch `redesign/prova-1` only. Local commits only. **Never push, never merge to main.** main publishes the live site.
- No `Co-Authored-By` trailer in any commit.
- All page copy is copied verbatim from the mockup. Never invent or reword text. New UI strings are only those listed in this plan.
- `<img>` gets no `width`/`height` attributes (they override `aspect-ratio`). Use CSS only.
- Node: prefix every shell with `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`. The package manager is `npx -y pnpm@10.10.0` (corepack is broken).
- Code in English (names, files). No code comments except docs on public functions.
- Gates (lint, typecheck, test, generate) run through the `gate-runner` agent.
- Phone/tel everywhere: `+393494960228`. WhatsApp `https://wa.me/393494960228`, email `info@cuoredibosco.it`, Facebook `https://www.facebook.com/profile.php?id=61583661897314`, Instagram `https://www.instagram.com/bbcuoredibosco/`.
- The English layout (`layouts/english.vue`) and the `/en/*` pages must render exactly as today, except for the added "Cookie preferences" control (Task 4).
- `/it/prenota`, `/it/esplora`, `/it/regolamento` and `/it/privacy-policy` keep their current page bodies; they only gain the new header, footer and dock.

## Review Focus

1. **Client-side navigation from an old page to the home** (for example `/it/prenota` → dock "Home"). Unscoped legacy page CSS (`pages/it/prenota.vue:381` `<style>`, `pages/it/privacy-policy.vue:103` `<style scope>` typo) defines `.welcome`, `section`, `.card` and must not restyle the home. Expected: the home looks identical whether loaded directly or reached by navigation. Pinned in Task 2 (the styles become scoped) and Task 6 (navigation check).
2. **Menu anchors from another page** (`/it/regolamento` → menu "Camere"). Expected: lands on `/it` scrolled to `#camere`. Pinned in Task 3 (link targets test) and Task 6.
3. **Reveal on first paint.** Content already in the viewport must not flash invisible, and content must stay visible with JS off or reduced motion. Pinned in Task 5 test `marks in-viewport elements before enabling reveal`.
4. **Changing consent from accepted to declined.** Google Analytics was already injected, so the choice must actually stop tracking. Expected: the `_ga*` cookies are removed and the page reloads. Pinned in Task 4.
5. **Mobile menu with the keyboard.** Expected: Escape closes it, focus returns to the Menu button, and `aria-expanded` reflects the state. Pinned in Task 3.

---

### Task 1: Lint, typecheck and test tooling

The project has no ESLint, type check or tests. The user's global rules require all three.

**Files:**
- Modify: `package.json` (devDependencies, scripts)
- Modify: `nuxt.config.ts` (add `@nuxt/eslint` module)
- Create: `eslint.config.mjs`, `vitest.config.ts`, `tests/smoke.nuxt.test.ts`

**Interfaces:**
- Produces scripts: `lint` = `eslint .`, `typecheck` = `nuxi typecheck`, `test` = `vitest run`.
- Vitest runs on the `nuxt` environment (`defineVitestConfig` from `@nuxt/test-utils/config`, `environment: 'nuxt'`, domEnvironment `happy-dom`). Test files: `tests/**/*.nuxt.test.ts`.

- [ ] **Step 1:** Add the dev dependencies with `npx -y pnpm@10.10.0 add -D @nuxt/eslint eslint vitest @nuxt/test-utils @vue/test-utils happy-dom vue-tsc typescript`. Add the module and the three scripts. `eslint.config.mjs` = `withNuxt()` from `./.nuxt/eslint.config.mjs`.
- [ ] **Step 2:** Write `tests/smoke.nuxt.test.ts`: it calls the auto-imported `routes('it')` and asserts `routes('it').find(r => r.id === 'booking')?.path === '/it/prenota'`. This proves the runner works with auto-imports.
- [ ] **Step 3:** Run `eslint . --fix` once. Any remaining errors in files this plan never touches go in an `ignores` list in `eslint.config.mjs`. Allowed entries: `pages/en/**`, `pages/it/{prenota,esplora,regolamento,privacy-policy}.vue`, `layouts/english.vue`, `components/{carousel,toast,top-navbar,mobile-bottom-bar,language-switcher,button}.vue`, `plugins/**`. Name each file individually, and only the files that still fail.
- [ ] **Step 4:** gate-runner runs `lint`, `typecheck`, `test` and `generate`. Expected: all pass.
- [ ] **Step 5:** Commit: `chore: add eslint, typecheck and vitest tooling`. Include this plan file.

### Task 2: Design tokens, fonts and legacy CSS isolation

**Files:**
- Modify: `nuxt.config.ts:11-20`. Keep Cardo and Yesteryear. Add `'Mountains of Christmas': [400,700]`, `Montserrat: [300,400,500,600]`, `Numans: [400]`.
- Modify: `assets/css/global.css`. It becomes the `flag-icons` import, then the mockup lines 12-40 (tokens, reset, base type, `.lead`, `.button*`, `.wrap`, `.band`), then the reveal rules from mockup lines 158-160 with `.js` replaced by `.reveal-ready`, then `@media (prefers-reduced-motion:no-preference){html{scroll-behavior:smooth}}`.
- Create: `assets/css/legacy.css`. Every rule of the current `global.css` except the flag-icons import, each selector prefixed with `.legacy` (`*` becomes `.legacy, .legacy *`; `body{margin:0}` is dropped because the new reset covers it). It also redeclares the old `:root` variables (`--color-primary`, `--color-secondary`, `--color-success`, `--color-background`, `--font-base`, `--spacing-base`) unchanged, because shared components use them.
- Modify: `nuxt.config.ts` css array → `['@/assets/css/global.css', '@/assets/css/legacy.css']`
- Modify: `layouts/english.vue`: add class `legacy` to its root element.
- Modify: `pages/it/prenota.vue:381` and `pages/en/booking.vue:366`: `<style>` → `<style scoped>`. `pages/it/privacy-policy.vue:103` and `pages/en/privacy-policy.vue:108`: `<style scope>` → `<style scoped>`.
- Test: `tests/legacy-css.nuxt.test.ts`

**Interfaces:**
- Produces: the global classes `.button`, `.button-light`, `.button-quiet`, `.wrap`, `.band`, `.lead`, `.reveal-ready [data-reveal]` and `[data-reveal].is-in`, plus all mockup custom properties (`--forest`, `--step-body` and the rest). Later tasks use them without redefining them.
- Produces: `.legacy` is the wrapper class that keeps old pages styled as today. Task 3 applies it in `default.vue`.

- [ ] **Step 1: Before screenshots.** Generate and serve `.output/public`. Ask the `browser` agent for full-page screenshots at 1440 and 390 of `/en`, `/en/booking`, `/it/prenota`, `/it/regolamento` and `/it/privacy-policy`. Save them to `.taste-skill/port/before/`.
- [ ] **Step 2: Write the test** `tests/legacy-css.nuxt.test.ts`. It reads `assets/css/legacy.css` as text and asserts:
  - every selector starts with `.legacy`;
  - it contains `.legacy *`;
  - `assets/css/global.css` contains no `font-family:'Cardo'` and no `section{` rule.
- [ ] **Step 3:** Implement the file changes above.
- [ ] **Step 4:** Run `vitest run tests/legacy-css.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: After screenshots.** Take the same five pages again. The EN pages must match the before screenshots. Expected differences on the IT pages: header, footer and fonts appear only after Task 3. Until then, temporarily add `class="legacy"` to the root of `layouts/default.vue` so the IT pages also match the before screenshots; Task 3 replaces it. Any other visual difference is a defect to fix before committing.
- [ ] **Step 6:** Commit: `refactor: isolate legacy styles and add redesign tokens and fonts`.

### Task 3: Shared Italian chrome (header, menu, footer, dock, back-to-top)

**Files:**
- Create:
  - `components/site/header.vue` (`<SiteHeader>`): mockup `.masthead`/`.topbar`, lines 189-202 and CSS 42-48.
  - `components/site/menu.vue` (`<SiteMenu>`): mobile menu panel; not in the mockup, see below.
  - `components/site/footer.vue` (`<SiteFooter>`): mockup lines 386-403 and the footer CSS.
  - `components/site/dock.vue` (`<SiteDock>`): lines 405-413 and CSS 145-149, 155-156, 177-180.
  - `components/site/to-top.vue` (`<SiteToTop>`): line 414, CSS 150-153 and the scroll logic at lines 422-425.
- Create: `utils/site-links.ts`
- Modify: `layouts/default.vue`.
  - Template becomes `<SiteHeader/>`, `<CookieBanner/>`, `<main :class="{ legacy: !isRedesignedRoute }"><slot/></main>`, `<SiteFooter/>`, `<SiteDock/>`, `<SiteToTop/>`.
  - Remove TopNavbar, Toast, the floating WhatsApp link, the old footer and MobileBottomBar.
  - Keep `setLocale` and the whole `useHead` block (113-197) including the JSON-LD.
  - `isRedesignedRoute` = `route.path === '/it'`. Remove the temporary root `legacy` class from Task 2.
  - Scoped styles: delete the old ones and keep only what the new template needs.
- Test: `tests/site-links.nuxt.test.ts`, `tests/site-menu.nuxt.test.ts`, `tests/site-to-top.nuxt.test.ts`

**Interfaces:**
- Produces in `utils/site-links.ts` (auto-imported):
  - `interface SiteLink { label: string; to: string }`
  - `primaryLinks(): SiteLink[]`. Returns, in order:
    - Camere → `/it#camere`
    - Colazione → `/it#colazione`
    - Esplora → `/it/esplora`
    - Regolamento → `/it/regolamento`
    - Come arrivare → `/it#arrivare`
  - `englishTwin(path: string): string`. Maps an IT path to its EN twin by route `id` via `routes()`: `/it` → `/en`, `/it/prenota` → `/en/booking`, `/it/esplora` → `/en/explore`, and so on. Unknown paths → `/en`.
- Header nav: `primaryLinks()`, then "English" → `englishTwin(route.path)`, then a "Menu" button (visible ≤900px) and a "Prenota" `.button.button-light` → `/it/prenota`. Use `NuxtLink` for internal links.
- `<SiteMenu>`:
  - Props: `open: boolean`. Emits: `close`.
  - Rendered with `<Teleport to="body">`, `role="dialog"`, `aria-modal="true"`, `aria-label="Menu"`.
  - Lists Home → `/it`, then `primaryLinks()`, then English → `englishTwin(route.path)`.
  - Styling: full-screen `--forest-deep` panel, links in `--display` font at `--step-head`, a close button labelled "Chiudi".
  - Closes on link click, on Escape and on the close button.
- Header Menu button:
  - Attributes: `aria-expanded`, `aria-controls="site-menu"`.
  - When the menu closes, focus returns to it.
- Footer and dock copy, `aria-label`s and SVGs: verbatim from the mockup.
- Dock: "Home" → `/it#top`. The masthead keeps `id="top"`.
- Footer links: `href` values from the Global Constraints; Privacy → `/it/privacy-policy`.

- [ ] **Step 1: Write the tests.**
  - `site-links`:
    - `primaryLinks().map(l => l.to)` equals the five targets above in order;
    - `englishTwin('/it/prenota') === '/en/booking'`;
    - `englishTwin('/it') === '/en'`;
    - `englishTwin('/it/unknown') === '/en'`.
  - `site-menu` (mount `SiteHeader` with `mountSuspended` from `@nuxt/test-utils/runtime`):
    - clicking Menu sets `aria-expanded="true"` and renders `[role=dialog]`;
    - pressing Escape removes the dialog and focuses the Menu button;
    - clicking a menu link emits `close`.
  - `site-to-top`: it gets class `is-visible` only after `window.scrollY` exceeds `window.innerHeight` and a `scroll` event fires.
- [ ] **Step 2:** Run them. Expected: FAIL, because the modules don't exist yet.
- [ ] **Step 3:** Implement the components, `utils/site-links.ts` and the `layouts/default.vue` changes. Footer and dock styles are scoped in their components, using the global tokens.
- [ ] **Step 4:** Run the new tests. Expected: PASS.
- [ ] **Step 5: Visual check.** Ask the `browser` agent for screenshots at 1440 and 390. On `/it/regolamento`, the new header, footer and dock appear and the body matches its before screenshot. On mobile at 390, Menu opens the panel.
- [ ] **Step 6:** Commit: `feat: add redesigned header, menu, footer and dock to the Italian layout`.

### Task 4: Cookie preferences (mandatory, IT and EN)

**Files:**
- Create: `composables/use-cookie-consent.ts`
- Modify:
  - `components/cookie-banner.vue`: visibility comes from the composable.
  - `components/site/footer.vue`: add a "Preferenze cookie" button next to Privacy.
  - `layouts/english.vue`: add a "Cookie preferences" button in its footer, using the existing footer classes.
- Test: `tests/use-cookie-consent.nuxt.test.ts`

**Interfaces:**
- Produces `useCookieConsent(): { isBannerOpen: Ref<boolean>; openPreferences(): void; accept(): void; decline(): void }`.
  - `isBannerOpen` is `useState('cookie-banner-open')`. It starts true when cookie `cookie_consent` is neither `accepted` nor `declined`, and is set on mount, as today.
  - `openPreferences()` sets `isBannerOpen` to true.
  - `accept()`: sets the cookie to `accepted`, closes the banner, reloads the page. Behaviour is unchanged.
  - `decline()`: sets the cookie to `declined` and closes the banner. If the previous value was `accepted`, it also expires every cookie whose name starts with `_ga`, on the current host and on `.` + hostname, then reloads.
- New UI strings: IT "Preferenze cookie", EN "Cookie preferences".
- On IT pages, the banner sits above the dock (`bottom: calc(64px + env(safe-area-inset-bottom))`), so the dock never covers the Accetta and Rifiuta buttons.

- [ ] **Step 1: Write the tests.**
  - With no cookie, `isBannerOpen` is true.
  - After `decline()` from no previous value, the banner is closed and there is no reload; spy on `location.reload`.
  - With the cookie `accepted` and a `_ga=1` cookie in `document.cookie`, calling `openPreferences()` then `decline()` removes `_ga` and calls reload.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement. `cookie-banner.vue` keeps its markup and styles and only swaps its state logic for the composable.
- [ ] **Step 4:** Run. Expected: PASS.
- [ ] **Step 5:** Commit: `feat: let visitors change their cookie choice at any time`.

### Task 5: Italian home page

**Files:**
- Modify: `pages/it/index.vue`.
  - The template is the mockup markup from the `<div class="band">` hero (line 204) through the end of `<main>`, verbatim.
  - Image `src` values change from `img/<name>` to `/images/home/<name>`; the logo uses `~/assets/images/logo_400.webp`.
  - Internal links become `NuxtLink`: `/it/prenota`, `#camere`, and `esplora.html` → `/it/esplora`.
  - The script keeps the existing `useHead` block (166-215) unchanged and removes `goToBooking`, the Button usage and the old imports.
  - Styles: `<style scoped>` with the mockup's section CSS (lines 49-144 minus the footer rules, plus the section rules inside the 900px and 520px media queries).
- Create: `composables/use-reveal.ts`
- Add to git: `public/images/home/*.webp`. These are the 26 files, already present and untracked.
- Test: `tests/use-reveal.nuxt.test.ts`

**Interfaces:**
- Produces `useReveal(root: Ref<HTMLElement | null>): void`.
  - Called in the page setup. Its behaviour runs in `onMounted`:
    1. every `[data-reveal]` inside `root` whose `getBoundingClientRect().top < window.innerHeight` gets `is-in` immediately;
    2. `reveal-ready` is added to `root`;
    3. the remaining elements are observed with `IntersectionObserver` (`rootMargin: '0px 0px -8% 0px'`), adding `is-in` and unobserving.
  - The observer is disconnected in `onBeforeUnmount`.
  - Without JS, `reveal-ready` is never set, so nothing is hidden.

- [ ] **Step 1: Write the tests** for `use-reveal`. Mock `IntersectionObserver` and `getBoundingClientRect`.
  - `marks in-viewport elements before enabling reveal`: the element at top 100 has `is-in` at the moment the root gains `reveal-ready`.
  - `reveals below-the-fold elements on intersection`: the element at top 5000 lacks `is-in` until the observer callback fires with `isIntersecting: true`.
  - `disconnects on unmount`.
- [ ] **Step 2:** Run. Expected: FAIL.
- [ ] **Step 3:** Implement `use-reveal.ts`, then rewrite `pages/it/index.vue`.
- [ ] **Step 4:** Run the new tests. Expected: PASS.
- [ ] **Step 5: Visual check.** Generate and serve. Ask the `browser` agent for full-page screenshots of `/it` at 1440 and 390, side by side with the mockup's `index.html` at the same widths. Sections, copy, photo crops and spacing must match. Allowed differences: font rendering only.
- [ ] **Step 6:** Commit: `feat: redesigned Italian home page`.

### Task 6: Final review and gates

- [ ] **Step 1:** gate-runner runs the full suite: `lint`, `typecheck`, `test`, `generate`. Expected: all pass.
- [ ] **Step 2: Browser checks.** At 1440 and 390:
  - Direct load of `/it`, then dock Prenota → `/it/prenota`, then dock Home → `/it`. The home must look identical to the direct load.
  - From `/it/regolamento`, menu "Camere" lands on `/it` at the rooms section.
  - Cookie banner: accept, then the footer "Preferenze cookie" reopens it, then reject. `_ga` cookies are gone.
  - `/en` matches its before screenshot plus the "Cookie preferences" control.
- [ ] **Step 3:** Whole-branch review (subagent-driven-development final reviewer).
- [ ] **Step 4:** Update MEMORY.md and Archivist `redesign-experimental`. Then make a local commit if anything changed. **No push.**
