# Regolamento port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `/it/regolamento` from the legacy layout to the redesign style (split hero, 13 rule cards, closing line), keeping every legacy text except 4 owner-approved changes.

**Architecture:** `layouts/default.vue` turns `main.redesign` on for `/it/regolamento` too. `pages/it/regolamento.vue` is rewritten in place: same `useHead`, the `sections` array + `v-html` replaced by 13 sections written out in the template, scoped styles mirroring `pages/it/index.vue` (`.hero`, `.story`) and `pages/it/esplora.vue` (`.seasons`/`.season`), `useReveal(root)`. Redesign globals (`.band`, `.wrap`, tokens) already live in `assets/css/global.css` under `.redesign`.

**Tech Stack:** Nuxt 3.17, Vue SFC, vitest + `@nuxt/test-utils` (`mountSuspended`), plain CSS, sharp via `C:/Users/Mara/Workspace/cdb-tools`.

**Spec:** `docs/superpowers/specs/2026-11-03-regolamento-port-design.md` (read it: structure table, Hero, Rule cards, text changes, Tests).

## Global Constraints

- Branch `redesign/prova-1`, local commits only, never push, never merge. No `Co-Authored-By` trailer.
- Never commit `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`. Stage files by name, never `git add -A`/`.`.
- Owners' text word for word. Only changes: the 4 in the spec ("Owner-approved text changes"). No new headings, leads, captions or sentences. The POLITICHE DI CANCELLAZIONE paragraph is not touched.
- No `width`/`height` attributes on `<img>`. Every NuxtLink has `no-prefetch` (the page has none; keep it so).
- `font-size` only as `var(--step-*)`. Text font Montserrat (`var(--sub)`), headings display font; never `var(--body)`. No `zoom`.
- Long paragraphs and list items: `max-width:68ch;text-align:justify;hyphens:auto`, `text-align:left` at `max-width:520px`.
- Backgrounds: hero forest (`.band`), rules linen (page), closing champagne (not `.band`). No two adjacent sections alike; on conflict stop and report, never change colors.
- No legacy page touched: `pages/en/*`, `pages/it/prenota.vue`, `pages/it/privacy-policy.vue`.
- No code comments. English identifiers.
- Node: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`, then `npx -y pnpm@10.10.0 <script>`. Targeted tests only inside a task: `npx -y pnpm@10.10.0 vitest run <files>`.

## Review Focus

1. Phone width 390: the h1 "Regolamento" at `--step-display` or a long list item overflows horizontally. Expect no horizontal scroll. Pinned by the browser check in Task 2.
2. Legacy text silently dropped or reworded while moving it out of `v-html`: fixture-based verbatim test (Task 1, `keeps every legacy text word for word`).
3. Scoped rules not reaching the rule text (justify, lists, h2 size): test asserts the rendered `p`/`li` sit inside `.rule` elements of the template (no `v-html` in the source) and the CSS rules exist.
4. Route switch leaks the redesign onto `/it/prenota` or `/it/privacy-policy`: route test asserts they are absent from `redesignedRoutes`.
5. Closing section accidentally forest (uses `.band`): test asserts `.rules-closing` has no `band` class and its CSS sets `var(--champagne)`.

---

### Task 1: Redesigned `/it/regolamento`

**Files:**
- Modify: `layouts/default.vue:21` (add `'/it/regolamento'`, `'/it/regolamento/'`)
- Rewrite: `pages/it/regolamento.vue` (template + scoped style; `useHead` unchanged)
- Create: `public/images/home/regole-1440.webp`
- Create: `tests/fixtures/regolamento-legacy-text.json`
- Create: `tests/regolamento-page.nuxt.test.ts`
- Modify: `tests/explore-page.nuxt.test.ts:228-234` (route test)
- Modify: `tests/desktop-scale.nuxt.test.ts` (regolamento source in both lists + no-zoom assertion)
- Modify: `tests/site-no-prefetch.nuxt.test.ts` (regolamento `describe`)

**Interfaces:**
- Produces (class names tests and the browser check rely on): root `div` with `ref="root"`; `div.band > section.hero.rules-hero > div.hero-text > h1` + `figure.hero-photo > img`; `div.rules > section.rule` x13 (each `h2` + `p`/`ul > li`); `section.rules-closing > p`.

- [ ] **Step 1: Freeze the legacy text as a fixture (before touching the page)**

Mount the current legacy `pages/it/regolamento.vue` in a throwaway vitest file, collect `textContent` of every `h1, h2, p, li`, normalize (`\u00a0` -> space, collapse whitespace, trim), drop empties, apply exactly these replacements, write the array to `tests/fixtures/regolamento-legacy-text.json`, then delete the throwaway file.

```
"Vi invitiamo inoltre di fare"            -> "Vi invitiamo inoltre a fare"
"Saranno a vs disposizione"               -> "Saranno a vostra disposizione"
"Spegnere luci e finestre quando uscite"  -> "Spegnere le luci e chiudere le finestre quando uscite"
"Inoltre possiamo preparare una colazione da consumare in camera (a richiesta) e cesti picnic per consumarli in uscita (servizio a pagamento su prenotazione almeno 24h prima)"
                                          -> "Inoltre possiamo preparare una colazione da consumare in camera (a richiesta)"
```

Check: the JSON has h1 "Regolamento", the 13 h2, every paragraph and list item, the closing line; no entry contains "di fare", "vs disposizione", "picnic", "Spegnere luci".

- [ ] **Step 2: Make the hero WebP**

Run from the repo root: `node ../cdb-tools/apt-resize.mjs public/images/altervista/regole-scaled.jpg regole 1440`
Expected: `public/images/home/regole-1440.webp` exists. `regole-scaled.jpg` unchanged.

- [ ] **Step 3: Write the failing tests** in `tests/regolamento-page.nuxt.test.ts` (setup as in `tests/explore-page.nuxt.test.ts:1-11,73-95`: `normalize()`, mount helper, `pageStyles`, `ruleBody()`)

```ts
const ruleTitles = ['TARIFFE E SERVIZI INCLUSI', 'PRENOTAZIONI E CONTATTI', 'MODALITÀ DI PAGAMENTO', 'POLITICHE DI CANCELLAZIONE', 'CHECK-IN E DOCUMENTI', 'ORARI', 'SICUREZZA E RESPONSABILITÀ', 'REGOLE DELLA CASA', 'PULIZIE E MANUTENZIONE', 'COLAZIONE', 'NORME COMPORTAMENTALI', 'SERVIZI ESTERNI', 'ACCESSO ALLA STRUTTURA']

it('keeps every legacy text word for word')
  // every fixture string is a substring of normalize(page textContent)
it('drops the picnic offer and the three typos')
  // page text contains none of: 'picnic', 'a pagamento su prenotazione', 'di fare molta', 'vs disposizione', 'Spegnere luci e finestre'
it('keeps the cancellation policy untouched')
  // contains 'In caso di cancellazione comunicata entro il 15° giorno prima dell’arrivo, restituiremo per intero l’acconto versato. Non sono previsti rimborsi per cancellazioni comunicate negli ultimi 7 giorni o per partenze anticipate rispetto alla prenotazione originaria.'
it('lists the thirteen rules in order as cards')
  // findAll('.rules > .rule').length === 13; their h2 texts === ruleTitles
it('writes the rules in the template so scoped styles reach them')
  // pageSource has no 'v-html'; every p and li of the page except hero/closing is inside a .rule
it('opens with a split hero on the forest band')
  // .band > .rules-hero contains h1 'Regolamento' and img src '/images/home/regole-1440.webp', alt 'Pedine e dadi su un gioco da tavolo'
  // no img on the page has width or height attributes
  // ruleBody('.rules-hero h1') contains 'color:var(--on-forest)'
it('closes with the wish on champagne')
  // .rules-closing p text === 'Auguriamo a tutti un soggiorno indimenticabile tra le nostre montagne!'
  // .rules-closing has no class 'band'; ruleBody('.rules-closing') contains 'background:var(--champagne)'; no <hr> on the page
it('styles the cards like the explore seasons')
  // ruleBody('.rule') contains 'border-top:3px solid var(--meadow)'
  // ruleBody('.rule h2') contains 'font-size:var(--step-title)'
  // a min-width:901px media block sets '.rules{grid-template-columns:repeat(2,minmax(0,1fr))'
it('justifies rule paragraphs and list items within 68ch and aligns them left on phones')
  // pageStyles has '{max-width:68ch;text-align:justify;hyphens:auto}' on a selector list covering '.rule p' and '.rule li'
  // the max-width:520px block sets '{text-align:left}' on the same selectors
```

- [ ] **Step 4: Update the shared tests**

- `tests/explore-page.nuxt.test.ts` route test: rename to `'turns the redesign on for the explore and rules pages only among the inner italian pages'`; add `toContain("'/it/regolamento'")` and `toContain("'/it/regolamento/'")`; loop over `['prenota', 'privacy']` only.
- `tests/desktop-scale.nuxt.test.ts`: `const rulesSource = readFileSync('pages/it/regolamento.vue', 'utf8')`; add it to the `redesignSources` array (line ~70) and to the style-block list (line ~83); new `it('never zooms the rules page')` asserting `extractStyleBlocks(rulesSource)` does not contain `zoom`.
- `tests/site-no-prefetch.nuxt.test.ts`: import `RulesPage from '~/pages/it/regolamento.vue'`; `describe('rules page links')` copied from the explore one.

- [ ] **Step 5: Run the tests to verify they fail**

Run: `npx -y pnpm@10.10.0 vitest run tests/regolamento-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts`
Expected: the new regolamento tests and the route test FAIL (legacy page, route missing); the fixture test may already pass.

- [ ] **Step 6: Implement**

- `layouts/default.vue:21`: add the two routes to the Set.
- `pages/it/regolamento.vue`: template per Interfaces; the 13 sections written out with the fixture text and the legacy inline markup (`<strong>`, `<b>`); script: `const root = ref<HTMLElement | null>(null)`, `useReveal(root)` as in `esplora.vue`, `useHead` unchanged, `sections` array removed. Hero img `src="/images/home/regole-1440.webp"`, alt `Pedine e dadi su un gioco da tavolo`, no `loading="lazy"` (above the fold).
- Scoped CSS: hero = copy of home `.hero`/`.hero-text`/`.hero-photo` rules scoped to `.rules-hero` with a lower desktop `min-height` (~300-360px at 1440; phone photo first, 4:3); `.rules-hero h1{font-size:var(--step-display);line-height:1;color:var(--on-forest)}`; `.rules` = `.seasons` grid values with `align-items:start`; `.rule` = `.season` values; `.rule h2` display font, `--step-title`, `--forest`; `.rule ul{list-style:disc;padding-left:1.1em}`; justify block and phone left block as constraints; `.rules-closing` = home `.story` values plus `font-style:italic` on its `p`.

- [ ] **Step 7: Run the tests to verify they pass**

Same command as Step 5. Expected: all PASS.

- [ ] **Step 8: Lint and typecheck the touched files**

Run: `npx -y pnpm@10.10.0 eslint pages/it/regolamento.vue layouts/default.vue tests/regolamento-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts` then `npx -y pnpm@10.10.0 nuxi typecheck`
Expected: 0 errors.

- [ ] **Step 9: Commit**

```bash
git add layouts/default.vue pages/it/regolamento.vue public/images/home/regole-1440.webp tests/fixtures/regolamento-legacy-text.json tests/regolamento-page.nuxt.test.ts tests/explore-page.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts
git commit -m "feat: port the rules page to the redesign"
```

### Task 2: Final verification (main session, via agents)

**Files:** none changed unless a check fails (fixes go back to Task 1's implementer).

- [ ] **Step 1: Gate** — `gate-runner`: lint, typecheck, full tests, `generate`. Expected: lint 0 errors, typecheck ok, all tests pass, 24 routes.
- [ ] **Step 2: Browser** — `browser` agent (playwright-core + system Chrome, not Playwright MCP) on the generated build at 1440/1024/390: no horizontal overflow, hero photo loads, backgrounds forest/linen/champagne/forest-deep in order, card columns 2/2/1, h1 fits at 390. Screenshots in `%TEMP%\measure\`.
- [ ] **Step 3: Legacy untouched** — `git diff 51bde0f --stat` lists no `pages/en/*`, `pages/it/prenota.vue`, `pages/it/privacy-policy.vue`.
