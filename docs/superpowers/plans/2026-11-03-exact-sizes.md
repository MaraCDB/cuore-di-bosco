# Exact Sizes Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the desktop `zoom:0.7` of the redesigned Italian site with exact sizes. Use one type scale that repeats in every band, and Montserrat for all non-display text.

**Architecture:** Fixed rem type tokens in `:root`, with a desktop override block in `assets/css/global.css`. On desktop, layout lengths become the visual values the zoom produces today (value × 0.7), written in each file's `@media (min-width:901px)` block. A single `--dock-height` token feeds every dock offset.

**Tech Stack:** Nuxt 3.17, @nuxtjs/google-fonts, scoped Vue SFC CSS, Vitest code-reading tests.

**Spec:** this conversation's decisions (variant "A"), preview `.superpowers/sdd/2026-11-03-exact-sizes/preview-a.css`, baseline `.superpowers/sdd/2026-11-03-exact-sizes/baseline.json` (on-screen px measured with the zoom, at 1440/1024/390).

## Global Constraints

- Work on branch `redesign/prova-1`. Local commits only, never push, never a Co-Authored-By trailer. Never stage `.taste-skill/` or `palette_verde1.PNG`.
- The owners' copy is verbatim. Change no text in this plan.
- Never add width/height attributes to `<img>`.
- Node: `export PATH="/c/Users/Mara/AppData/Local/Author Software/nvm/installs/v22.10.0:$PATH"`, then `npx -y pnpm@10.10.0 …`.
- CSS files are read in tests with `readFileSync` (`?raw` on .css returns ''); .vue files with `?raw`.
- Desktop breakpoint is 901px (`DESKTOP_MIN_WIDTH` in components/site/menu.vue). Phone values (≤900px) must render exactly as today, except the font family.
- Minified one-rule-per-line CSS style, as the files already use. No comments.

## Type scale (variant A)

| token | phone (`:root`) | desktop (`@media (min-width:901px){:root{…}}`) | used by |
|---|---|---|---|
| `--step-micro` | 0.75rem | 0.75rem | dock labels ≤520px |
| `--step-small` | 0.875rem | 0.875rem | .rooms-family, figcaption, cookie text and buttons, .footer-legal, .menu-close |
| `--step-nav` | 0.875rem | 0.9375rem | .topbar nav links, .topbar .button-light, .dock links, .dock .button |
| `--step-body` | 1rem | 1rem | base text, buttons, footer text |
| `--step-lead` | 1.0625rem | 1.125rem | .lead, h3 |
| `--step-tagline` | 1.25rem | 1.375rem | .hero .tagline |
| `--step-title` | 1.5rem | 1.75rem | .room h3 (room names) |
| `--step-head` | 1.875rem | 2.25rem | h2, menu panel links |
| `--step-display` | 2.5rem | 3.25rem | .hero h1, .footer-name |

## Review Focus

- 901–1100px desktop widths: vw-based clamps scaled ×0.7 must not make columns or margins collapse. Check against baseline at 1024.
- Pages other than the home (/it/prenota, /it/esplora, …): header, footer and dock carry `.redesign` there too. They must look the same as the home's.
- Cookie banner open on desktop: it must sit exactly on top of the 56px dock, with no gap and no overlap.
- Phone ≤520px dock: labels at 12px, 64px dock, unchanged.
- Bold text: Montserrat 700 must be a loaded weight, not a synthetic one.

---

### Task 1: Exact sizes, one scale, Montserrat everywhere

**Files:**
- Modify: `assets/css/global.css` (tokens, base font, remove zoom, `.button` desktop sizes)
- Modify: `nuxt.config.ts` (googleFonts: drop `Numans`, Montserrat `[300, 400, 500, 600, 700]`)
- Modify: `pages/it/index.vue` (style block only)
- Modify: `components/site/header.vue`, `components/site/dock.vue`, `components/site/footer.vue`, `components/site/to-top.vue`, `components/site/menu.vue`, `components/cookie-banner.vue` (style blocks only; in the cookie banner only the `above-dock` and `.redesign` rules)
- Test: `tests/desktop-scale.nuxt.test.ts` (rewrite), `tests/use-cookie-consent.nuxt.test.ts:314-316` (update), `tests/home-page.nuxt.test.ts` (one breakfast copy test)

**Interfaces:**
- Produces: CSS custom properties `--step-micro|small|nav|body|lead|tagline|title|head|display` and `--dock-height` (64px phone, 56px desktop) on `:root`. Variable `--body` no longer exists, and every former use reads `var(--sub)`.

- [ ] **Step 1: Write the tests**

`tests/desktop-scale.nuxt.test.ts`, `describe('exact sizes')`:
- `it('never zooms the redesigned site')`: `globalStyles` does not match `/zoom/`.
- `it('defines the phone type scale in rem')`: `globalStyles` contains each `:root` pair from the table, e.g. `--step-lead:1.0625rem`, `--step-title:1.5rem`, plus `--dock-height:64px`.
- `it('overrides the type scale and dock height from the desktop breakpoint')`: the `@media (min-width:901px){:root{…}}` block contains `--step-nav:0.9375rem`, `--step-lead:1.125rem`, `--step-tagline:1.375rem`, `--step-title:1.75rem`, `--step-head:2.25rem`, `--step-display:3.25rem`, `--dock-height:56px`.
- `it('sets Montserrat for all non-display text')`: `globalStyles` and `nuxt.config.ts` contain no `Numans`; no redesign source (global.css, index.vue, header, dock, footer, to-top, menu, cookie-banner) contains `var(--body)`; nuxt.config lists Montserrat with 700.
- `it('sizes redesigned text only through the scale tokens')`: in every `font-size:` declaration of global.css, the style blocks of index.vue, header, dock, footer, to-top and menu, and the `.cookie-banner.redesign` rules, the value matches `/^var\(--step-[a-z]+\)$/`.
- `it('ties every dock offset to one dock height')`: dock.vue has `.dock-inner{…min-height:var(--dock-height)`; cookie-banner has `bottom: calc(var(--dock-height) + env(safe-area-inset-bottom))`; footer has `calc(16px + var(--dock-height) + env(safe-area-inset-bottom))`; to-top has `bottom:calc(var(--dock-height) + env(safe-area-inset-bottom) + 16px)`; none of the four files contains `72px`.
- `it('gives room names their own step below the section title')`: index.vue `.room h3` uses `var(--step-title)`, and footer `.footer-name` uses `var(--step-display)`.

`tests/use-cookie-consent.nuxt.test.ts:314`: rename to `'offsets the banner above the dock plus the safe area'`, and expect the `var(--dock-height)` rule above.

`tests/home-page.nuxt.test.ts`: `it('describes the breakfast as a buffet')`: the `.breakfast-text` text contains `un buffet ricco di bontà` and `Marmellate, sciroppi, erbe, tisane, miele, farine e tanto altro!`.

- [ ] **Step 2: Implement**

Rules:
1. Remove `@media (min-width:901px){.redesign{zoom:0.7}}`.
2. Tokens as in the table. Delete `--body`. `.redesign` base font becomes `400 var(--step-body)/1.65 var(--sub)`. Every `var(--body)` becomes `var(--sub)`. Delete the redundant `.welcome,.everyone,.pilgrims{font-family:var(--sub)}`.
3. Font sizes: `.room h3` uses `var(--step-title)`, `.footer-name` uses `var(--step-display)` (replaces its clamp), dock ≤520 labels use `var(--step-micro)`. In header and dock, the base rules use `var(--step-nav)` and the desktop `1.1875rem` lines are deleted. Remove every other literal font-size in scope.
4. Desktop lengths (`@media (min-width:901px)`), applied only to the redesign rules: every length above 8px becomes today's value × 0.7. That covers padding, margin, gap, min/max/height/width, image caps, `vw` and `svh` terms, and all three arguments of a `clamp()`. Round px to whole numbers and vw/svh to 2 decimals. Leave lengths of 8px or less, border widths, radii of `999px`/`50%`, aspect-ratios, and percentages as they are. Global tokens go in the desktop `:root` block: `--page-max:1008px`, `--margin:clamp(14px,2.8vw,45px)`, `--section-gap:clamp(20px,2.1vw,34px)`, `--band-pad:clamp(17px,1.93vw,31px)`. The baseline's 1440/1024 boxes are the target (±2px for images, column left/width, and fixed-height elements).
5. Desktop touch targets, the exception to rule 4:
   - `.button` min-height 44px, padding 0 21px;
   - `.topbar .button-light` 44px;
   - `.dock a:not(.button)` and `.dock .button` min-height 44px;
   - `.footer-contacts a` 44×44 with svg 18px;
   - `.to-top` 44×44 with svg 18px;
   - dock svg 18px;
   - `.dock-inner` padding 6px var(--margin), min-height `var(--dock-height)`;
   - cookie banner buttons stay 44px.
6. Dock offsets: one rule each, using `var(--dock-height)` (see the tests). Delete the 72px desktop twins in cookie-banner, footer and to-top.
7. "Una casa aperta a tutti" at desktop: `.guest-side{grid-template-columns:minmax(0,1fr) minmax(0,2fr)}`, so the side text column is less narrow.

- [ ] **Step 3: Run the related tests** (via the gate-runner agent): `vitest run tests/desktop-scale.nuxt.test.ts tests/use-cookie-consent.nuxt.test.ts tests/home-page.nuxt.test.ts`. Expected: all pass.

- [ ] **Step 4: Commit** (local): `feat: replace the desktop zoom with an exact type scale in Montserrat`

### Task 2: Verify in the browser (main session, browser agent)

- [ ] Regenerate the site. At 1440x900, 1024x768 and 390x844, after "Rifiuta", compare with `baseline.json`:
  - image boxes and column left/width within ±2px at 1440/1024;
  - phone (390) image and control sizes equal to the baseline;
  - effective font sizes equal to the table;
  - font family Montserrat everywhere except Mountains of Christmas titles;
  - desktop controls ≥44px;
  - dock 56px desktop / 64px phone;
  - cookie banner flush on the dock (measure before "Rifiuta");
  - no horizontal overflow;
  - header, footer and dock identical on /it/prenota.
- [ ] Report the page height against the baseline (5110 / 4783 / 11309). Take side-by-side screenshots against the baseline for hero, welcome, everyone, colazione, camere, footer.
- [ ] Full gate (lint, typecheck, all tests, generate) via gate-runner before the final commit.
