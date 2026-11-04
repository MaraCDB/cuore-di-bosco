# English home, explore, rules and privacy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the four legacy English pages (`/en`, `/en/explore`, `/en/rules`, `/en/privacy-policy`) with English twins of the redesigned Italian pages, then delete the legacy English layout and the components only it used.

**Architecture:**
- Same pattern as `/en/booking` (plan `docs/superpowers/plans/2026-11-04-english-chrome-and-booking.md`): each Italian page's `<style scoped>` block moves byte-for-byte into `assets/css/pages/<name>.css`, and both twins include it with `<style scoped src>`.
- Each English page is a structural copy of its Italian twin on `layouts/default.vue` (no `definePageMeta`), with English text in the template. The layout already gives English chrome, `<html lang="en">` and the English JSON-LD on `/en…` routes.
- When the last page is ported, `layouts/english.vue` and its legacy components are deleted.

**Tech Stack:** Nuxt 3.17, Vue 3 `<script setup lang="ts">`, @nuxtjs/i18n, Vitest + @nuxt/test-utils (`mountSuspended`).

**Spec:** `docs/superpowers/specs/2026-11-04-english-pages-design.md`, steps 3 to 6, with the owner's 2026-11-04 change: no draft lists, no approval checkpoint between pages; English drafts go straight into the pages and the owner checks them there. The German plan (`docs/superpowers/plans/2026-11-04-german-switch-and-booking.md`) waits until this plan is done.

## Global Constraints

- Branch `redesign/prova-1`. Local commits only: never push or merge. Stage files by name. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `.playwright-mcp/`, `.superpowers/`, `public/images/FOTO MIE BB E DINTORNI/`, `public/images/APT/`.
- Node in Git Bash: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`. pnpm: `npx -y pnpm@10.10.0 <script>`.
- Testing: implementers run only their targeted tests (`npx -y pnpm@10.10.0 vitest run <files>`). The full gate runs through the `gate-runner` agent in Task 6. Baseline at `b990b40`: lint 0 errors (1 legacy warning in `pages/en/rules.vue`), typecheck OK, 224/224 tests, 24 prerendered routes.
- Italian visitors see no change: same text, links, classes, styles.
- No comments in code, except doc comments on exported functions. English identifiers.
- Every redesign `NuxtLink` has `no-prefetch`. Never `width`/`height` on `<img>`, never `v-html`, font sizes only via `--step-*`, never `zoom` (also not `cursor: zoom-in`).
- Text rules:
  - Source of truth is the current Italian page. Reuse the legacy English wording where it faithfully says the same thing, otherwise translate. Nothing added, nothing left out.
  - British English (tranquillity, holidays, pushchair, bed linen; never vacation, stroller, tranquility, linens).
  - Place names: Lake Garda, Brentonico Plateau, Monte Baldo Nature Park, Europe's Garden (never "Italy's Garden"); otherwise Italian (Monte Baldo, Cammino di San Rocco, Polsa e San Valentino, Castello di Avio, Campana dei Caduti, Canyon della Sorna, Prada, Vallagarina).
  - "Lampone" and "Mirtillo" stay, Lampone first. Credits verbatim and untranslated ("Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di …", "APT Rovereto Vallagarina. Foto di Luca Matassoni", "360gardalife. Foto di Angela Trawoeger", "Photo Mara").
  - UPPERCASE where the Italian uses it (13 rules titles, the lime family line, icon captions).
  - Never "rental"/"hire" for the B&B's bikes. No paid extras. No deposit, cancellation or refund text on the home.
- Head blocks: copy each legacy English page's `useHead` / `useSeoMeta` verbatim (the SEO step fixes them later). Read the legacy file with `git show b990b40:pages/en/<file>` before overwriting.
- Links: same targets as Italian, mapped to English (`/it/prenota` → `/en/booking`, `/it/prenota#lampone` → `/en/booking#lampone`). External links: reuse the legacy English URL when the legacy page links the same resource, otherwise the Italian URL unchanged.
- Shared CSS files must not select Italian-only ids or text: if a rule uses `#camere`, `#colazione`, `#arrivare`, `#cammino`, `#storia` or similar, switch it to a class selector already on the element, with no visual change.

## Review Focus

1. **Shared CSS keyed on Italian ids.** An English twin with `#rooms` instead of `#camere` silently loses styles (scroll margins, layout). Expected: identical rendering. Pinned in each page task (the CSS file contains no Italian id selector) and Task 6 browser comparison.
2. **Anchors on English pages.** Menu and dock link to `/en#rooms`, `/en#breakfast`, `/en#directions` (already in `utils/site-links.ts`). Expected: they land on the sections, also from other English pages. Pinned in Task 1 (ids) and Task 6.
3. **Owner edits and removed content leaking back from legacy English.** The legacy English pages predate the owner's edits (picnic, bike rental, old cancellation rule, "Italy's Garden", "Ala"). Expected: the English follows the current Italian. Pinned by each page's forbidden-words and required-text tests.
4. **Cookie banner after the legacy cleanup.** Accept, decline, focus and "Cookie preferences" must still work on every page once the legacy banner mode is gone. Pinned in Task 5 (rewritten banner tests) and Task 6.
5. **Long English words and URLs at 390 px.** Justified text with `hyphens:auto` under `lang="en"`, long external links. Expected: no horizontal overflow. Pinned in Task 6.

---

### Task 1: English home

**Files:**
- Create: `assets/css/pages/home.css` (exact content of `pages/it/index.vue:300-432` style block)
- Modify: `pages/it/index.vue` (style becomes `<style scoped src="../../assets/css/pages/home.css"></style>`)
- Modify: `tests/desktop-scale.nuxt.test.ts` (the `?raw` import at :3 and the home style checks read `home.css`), `tests/home-page.nuxt.test.ts:182,189` (read `home.css`)
- Rewrite: `pages/en/index.vue`
- Modify: `layouts/default.vue` (`redesignedRoutes` + `'/en'`, `'/en/'`), `tests/explore-page.nuxt.test.ts:236-246` (assert them)
- Create: `tests/home-en-page.nuxt.test.ts`

**Interfaces:**
- Consumes: `SitePhotoCarousel` (`photos: {src, alt, caption?, credit?}[]`, `label`), `useReveal`.
- Produces: `/en` with section ids `rooms`, `breakfast`, `cammino`, `story`, `directions` in place of `camere`, `colazione`, `cammino`, `storia`, `arrivare`. Room "Details" links `/en/booking#lampone` and `#mirtillo`; every booking link `/en/booking`.

**Page rules:** same template as `pages/it/index.vue` (elements, classes, photo srcs and order, carousel photos and credits); only text, alts, captions, aria labels and the ids above change. Legacy English covers only hero, welcome and directions; everything else is a fresh translation. The legacy `<Button>`, `router.push`, welcome toast and iframe go.

- [ ] **Step 1: Move the style block** byte-for-byte and update the two tests. Run `npx -y pnpm@10.10.0 vitest run tests/home-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS, same count as before.
- [ ] **Step 2: Write the failing tests** in `tests/home-en-page.nuxt.test.ts`, mounting `~/pages/en/index.vue` (locale `'en'`) and `~/pages/it/index.vue` (locale `'it'`) as in `tests/booking-en-page.nuxt.test.ts`:
  - top-level and section `className` lists equal; ids map `camere→rooms`, `colazione→breakfast`, `cammino→cammino`, `storia→story`, `arrivare→directions`;
  - `img` srcs equal in order; carousel figures 16; every credit text equals the Italian one;
  - room h3s `['Lampone', 'Mirtillo']`; Details hrefs `['/en/booking#lampone', '/en/booking#mirtillo']`; every other internal link `/en/booking` or `#rooms`;
  - forbidden in lowercased text of `h1, h2, h3, p, figcaption, li`: `deposit`, `cancellation`, `refund`, `rental`, `(paid)`, `picnic day`, `welcome gift`, `write to us`, `security bond`, `vacation`, `stroller`, `tranquility`, `linens`; no `/\bhire\b/`;
  - the family line is uppercase; the room bullets include English drafts of "Pulizie incluse" and "Angolo bollitore attrezzato" (assert the exact strings you chose);
  - source: no `v-html`, no `layout: 'english'`, every `NuxtLink` `no-prefetch`, no sized `img`;
  - `assets/css/pages/home.css` does not match `/#(camere|colazione|arrivare|cammino|storia)\b/`.
- [ ] **Step 3: Run** `npx -y pnpm@10.10.0 vitest run tests/home-en-page.nuxt.test.ts`. Expected: FAIL against the legacy page.
- [ ] **Step 4: Write `pages/en/index.vue`**, add the routes to `redesignedRoutes` and the explore-page assertion.
- [ ] **Step 5: Run** `npx -y pnpm@10.10.0 vitest run tests/home-en-page.nuxt.test.ts tests/home-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/router-scroll.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 6: Commit** in two commits: `refactor: move the home page styles into a shared CSS file` (CSS, `pages/it/index.vue`, two tests), then `feat: redesign the English home as a translation of the Italian one`.

### Task 2: English explore

**Files:**
- Create: `assets/css/pages/explore.css` (from `pages/it/esplora.vue:404-450`); modify `pages/it/esplora.vue`
- Modify: `tests/explore-page.nuxt.test.ts` (`pageStyles` at :9 reads `explore.css`), `tests/desktop-scale.nuxt.test.ts:12` and the explore style checks
- Rewrite: `pages/en/explore.vue`
- Modify: `layouts/default.vue` (+ `'/en/explore'`, `'/en/explore/'`), `tests/explore-page.nuxt.test.ts:236-246`
- Create: `tests/explore-en-page.nuxt.test.ts`

**Page rules:** same template as `pages/it/esplora.vue`. Place tiles in order: `Brentonico`, `Monte Baldo`, `Canyon della Sorna`, `Lake Garda`, `Rovereto`, `Castello di Avio`, `Polsa e San Valentino`, `Cammino di San Rocco`. Keep `<strong>Castello di Avio</strong>` (asserted at `tests/explore-page.nuxt.test.ts:257`). The legacy `<Carousel>` is replaced by the Italian `SitePhotoCarousel` setup (flower photos, no credits where Italian has none).

- [ ] **Step 1: Move the style block** and update the two tests. Run `npx -y pnpm@10.10.0 vitest run tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS, same count.
- [ ] **Step 2: Write the failing tests** in `tests/explore-en-page.nuxt.test.ts`:
  - same top-level/section classes and `img` srcs in order as the Italian page; same number of `article.season` (4) and `li.place` (8);
  - tile names as listed above; every credit text equal to the Italian one;
  - external link hostnames in order equal to the Italian page's;
  - text contains `Europe's Garden` and the Cammino one-liner draft (assert your string); contains none of `Italy's Garden`, `Castello di Ala`, `Lago di Loppio`, `rental`, `vacation`, `tranquility`; no `/\bhire\b/`;
  - source rules as Task 1; `explore.css` has no Italian id selector (`flower-title` is shared and stays).
- [ ] **Step 3: Run** it. Expected: FAIL.
- [ ] **Step 4: Write `pages/en/explore.vue`** and the route changes.
- [ ] **Step 5: Run** `npx -y pnpm@10.10.0 vitest run tests/explore-en-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 6: Commit** in two commits: `refactor: move the explore page styles into a shared CSS file`, then `feat: redesign the English explore page as a translation of the Italian one`.

### Task 3: English rules

**Files:**
- Create: `assets/css/pages/rules.css` (from `pages/it/regolamento.vue:166-197`); modify `pages/it/regolamento.vue`
- Modify: `tests/regolamento-page.nuxt.test.ts` (`pageStyles` at :7 reads `rules.css`), `tests/desktop-scale.nuxt.test.ts:13,56-58` and the rules style checks
- Rewrite: `pages/en/rules.vue` (13 `section.rule` written out in the template, no `v-for` over a text array)
- Modify: `layouts/default.vue` (+ `'/en/rules'`, `'/en/rules/'`), `tests/explore-page.nuxt.test.ts:236-246`
- Create: `tests/rules-en-page.nuxt.test.ts`

**Page rules:** same template as `pages/it/regolamento.vue`, hero photo included (English alt draft). Titles: reuse the legacy English titles (RATES … ACCESS), uppercase, same order as Italian. Text follows the current Italian: cancellation up to the 7th day plus the reschedule sentence, BREAKFAST without the picnic part and ending with the in-room breakfast on request, the diets paragraph, the three typo fixes (no equivalent needed in English).

- [ ] **Step 1: Move the style block** and update the two tests. Run `npx -y pnpm@10.10.0 vitest run tests/regolamento-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts`. Expected: PASS, same count.
- [ ] **Step 2: Write the failing tests** in `tests/rules-en-page.nuxt.test.ts`:
  - same classes and `img` srcs; 13 `section.rule`, `rule-conduct` at the same index; h2s uppercase, 13 of them;
  - text contains your English drafts of the 7-day cancellation sentence, the reschedule sentence and the diets paragraph (assert exact strings), and mentions `vegetarian`, `vegan`, `intolerances`, `allergies`;
  - text contains none of `picnic`, `15th day`, `rental`, `vacation`; no `/\bhire\b/`;
  - source rules as Task 1.
- [ ] **Step 3: Run** it. Expected: FAIL.
- [ ] **Step 4: Write `pages/en/rules.vue`** and the route changes.
- [ ] **Step 5: Run** `npx -y pnpm@10.10.0 vitest run tests/rules-en-page.nuxt.test.ts tests/regolamento-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/explore-page.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 6: Commit** in two commits: `refactor: move the rules page styles into a shared CSS file`, then `feat: redesign the English rules page as a translation of the Italian one`.

### Task 4: English privacy policy

**Files:**
- Create: `assets/css/pages/privacy.css` (from `pages/it/privacy-policy.vue:105-135`); modify `pages/it/privacy-policy.vue`
- Rewrite: `pages/en/privacy-policy.vue`
- Modify: `layouts/default.vue` (+ `'/en/privacy-policy'`, `'/en/privacy-policy/'`), `tests/explore-page.nuxt.test.ts:236-246`
- Modify: `tests/legacy-css.nuxt.test.ts:7-17,110-118` (drop `pages/en/privacy-policy.vue` and its selectors; remove the now-empty check if nothing is left)
- Create: `tests/privacy-en-page.nuxt.test.ts`

**Page rules:** same template as the Italian page: 6 `section.policy-card`, "Cookie preferences" pill button calling `useCookieConsent().openPreferences`, `mailto:` link, same cookies image (English alt draft). Browser help links: the legacy English URLs where they exist, otherwise the Italian ones with the English locale (`hl=en`, `/en-us/`, `en-gb`). The legacy `<style scope>` (global by typo) goes away.

- [ ] **Step 1: Move the style block.**
- [ ] **Step 2: Write the failing tests** in `tests/privacy-en-page.nuxt.test.ts`, mounting `~/pages/en/privacy-policy.vue` (locale `'en'`) and `~/pages/it/privacy-policy.vue` (locale `'it'`):
  - same top-level and section classes and the same `img` src as the Italian page;
  - 6 `section.policy-card`, each with an `h2`;
  - the "Cookie preferences" button calls `openPreferences` (`mockNuxtImport` of `useCookieConsent`);
  - the `mailto:` href equals the Italian one;
  - no browser help link contains `hl=it`, `/it-it/` or `it-it`;
  - source rules as Task 1.
- [ ] **Step 3: Write `pages/en/privacy-policy.vue`** and the route and test changes.
- [ ] **Step 4: Run** `npx -y pnpm@10.10.0 vitest run tests/privacy-en-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/use-cookie-consent.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 5: Commit** in two commits: `refactor: move the privacy page styles into a shared CSS file`, then `feat: redesign the English privacy policy as a translation of the Italian one`.

### Task 5: Remove the legacy English chrome

**Files:**
- Delete: `layouts/english.vue`, `components/top-navbar.vue`, `components/language-switcher.vue`, `components/toast.vue`, `components/mobile-bottom-bar.vue`, `components/carousel.vue`, `components/button.vue`
- Modify: `components/cookie-banner.vue` (drop the `aboveDock`/`redesign` props and the legacy markup and CSS; the banner always renders the redesign version), `layouts/default.vue` (`<CookieBanner />`), `eslint.config.mjs:23-26` (drop ignores of deleted files)
- Modify: `tests/site-layout-locale.nuxt.test.ts` (delete the `EnglishLayout` import and the test at :65-75), `tests/use-cookie-consent.nuxt.test.ts` (:274-294, :310, :337-363, :368-370: mount the single banner; keep every behaviour assertion — focus on open, accept, decline, preferences — on the redesign markup)
- Keep: `utils/routes.ts` (used by `utils/site-links.ts`), `assets/css/legacy.css` (out of scope; report it as possibly dead).

- [ ] **Step 1: Check** with a grep that nothing outside the deleted files references them (`TopNavbar`, `LanguageSwitcher`, `Toast`, `MobileBottomBar`, `<Carousel`, `<Button`, `layout: 'english'`). Expected: no hits.
- [ ] **Step 2: Delete and edit** the files above; rewrite the banner tests.
- [ ] **Step 3: Run** `npx -y pnpm@10.10.0 vitest run tests/use-cookie-consent.nuxt.test.ts tests/site-layout-locale.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/smoke.nuxt.test.ts tests/site-chrome-english.nuxt.test.ts`. Expected: PASS.
- [ ] **Step 4: Commit**: `refactor: remove the legacy English layout and its components`.

### Task 6: Final verification

- [ ] **Step 1: Full gate** through `gate-runner`: lint, typecheck, `vitest run`, `generate`. Expected: lint 0 errors and no warnings left from `pages/en/rules.vue`, typecheck OK, all tests pass, 24 routes.
- [ ] **Step 2: Italian unchanged.** The `browser` agent compares `/it`, `/it/esplora`, `/it/regolamento`, `/it/privacy-policy`, `/it/prenota` at 1440, 1024 and 390 against a `b990b40` build (temporary worktree). Expected: pixel-identical.
- [ ] **Step 3: English pages.** The `browser` agent checks `/en`, `/en/explore`, `/en/rules`, `/en/privacy-policy` (and their trailing-slash forms) at 1440, 1024 and 390:
  - layout identical to the Italian twin, English chrome, `<html lang="en">`;
  - menu and dock anchors `/en#rooms`, `#breakfast`, `#directions` land on the sections, from `/en` and from `/en/rules`;
  - Details links reach `/en/booking#lampone` / `#mirtillo`;
  - carousels work; cookie banner accept/decline work and "Cookie preferences" (footer and privacy page) reopens it;
  - no welcome toast, no WhatsApp float, no horizontal overflow;
  - "Italiano" leads to each Italian twin and back.
- [ ] **Step 4: Wrap-up** (controller): update MEMORY.md and Archivist, then tell the owner the English pages are ready to check on the pages, listing the alts and captions that are new drafts. Then the German plan resumes (refresh its baseline first).
