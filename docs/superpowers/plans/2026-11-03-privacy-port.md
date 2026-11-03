# Privacy policy port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port `/it/privacy-policy` to the redesign: split hero on forest + 6 policy cards in 2 columns, legacy text verbatim, plus a "Preferenze cookie" button and a mailto link.

**Architecture:** Rewrite `pages/it/privacy-policy.vue` on the model of `pages/it/regolamento.vue` (hero `.rules-hero`, grid `.rules`, cards `.rule`), with scoped CSS copied from it; switch the route on in `layouts/default.vue`.

**Tech Stack:** Nuxt 3, Vue SFC with `<script setup lang="ts">`, scoped CSS, Vitest (`@nuxt/test-utils`).

**Spec:** `docs/superpowers/specs/2026-11-03-privacy-port-design.md`

## Global Constraints

- Branch `redesign/prova-1`, local commits only, never push. No Co-Authored-By trailer.
- Legacy text word for word; no new copy. Visible additions only: button label "Preferenze cookie", mailto on the email.
- Headings Mountains of Christmas; other text `var(--sub)` (never `var(--body)`); font-size only via `--step-*`.
- Paragraphs and `li`: `max-width:68ch;text-align:justify;hyphens:auto`, `text-align:left` at `max-width:520px`.
- No `width`/`height` on `<img>`; no `v-html`; any NuxtLink has `no-prefetch` (the page needs none).
- Never stage `.taste-skill/`, `compare/`, `palette_verde1.PNG`, `public/images/APT/`, `.playwright-mcp/`.
- Owner decision: no new tests; only fix the existing tests the port breaks.
- Toolchain: real node 22.10 on PATH, scripts via `npx pnpm@10.10.0 <script>` (corepack broken).

## Review Focus

- `<button class="button">` is a native button: `.redesign .button` sets no `border`/`font`/`cursor`, so the pill may show a native border or system font. Expected: looks exactly like the other forest pills (scoped reset `border:0;font:inherit;cursor:pointer` on the button if needed).
- Clicking "Preferenze cookie" after a stored choice: banner reopens, focus on Accetta (same as the footer control).
- Phone 390: hero photo first (4:3), cards one column, no horizontal scroll.
- Hero photo `cookies.webp` is 3:2: `object-position` keeps the gingerbread house in view at 1440 and 1024.

---

### Task 1: Port the page and switch the route

**Files:**
- Modify: `pages/it/privacy-policy.vue` (full rewrite of template and style; `useHead` unchanged)
- Modify: `layouts/default.vue:21`
- Modify: `tests/explore-page.nuxt.test.ts:229-235`
- Modify: `tests/legacy-css.nuxt.test.ts:28`

**Interfaces:**
- Consumes: `useCookieConsent()` from `composables/use-cookie-consent.ts` → `{ openPreferences }`; `useReveal(root)` as used in `pages/it/regolamento.vue`; global `.redesign .button` pill and `.redesign .band` (forest).

- [ ] **Step 1: Switch the route on**

`layouts/default.vue:21`: append `'/it/privacy-policy', '/it/privacy-policy/'` to `redesignedRoutes`.

- [ ] **Step 2: Rewrite the template**

Structure (class names are this plan's decision):
- `<div ref="root">` → `<div class="band">` → `<section class="policy-hero">` with `<div class="hero-text"><h1>COOKIES PRIVACY POLICY</h1></div>` and `<figure class="hero-photo"><img :src="cookies" alt="Casetta di pan di zenzero e biscotti a forma di casa" decoding="async"></figure>` (no `loading`, no width/height). Keep `import cookies from "~/assets/images/cookies.webp"`.
- `<div class="policy">` with 6 `<section class="policy-card" data-reveal>`, each `<h2>` = legacy `h3` text, body = legacy markup verbatim (`strong`, `ol`, `ul`, links with `target="_blank" rel="noopener"`).
- Card 5 "Come gestire i cookie" ends with `<button type="button" class="button" @click="openPreferences">Preferenze cookie</button>` after the browser `ul`.
- Card 6 "Titolare del trattamento": `<p><strong>Cuore di Bosco – B&B</strong><br>Email: <a href="mailto:info@cuoredibosco.it"><em>info@cuoredibosco.it</em></a></p>`. The legacy trailing `<br>` goes.
- Script: `const root = ref<HTMLElement | null>(null)`, `useReveal(root)`, `const { openPreferences } = useCookieConsent()`, exactly as Regolamento/footer.

- [ ] **Step 3: Write the scoped CSS**

Replace the legacy `<style scope>` block with `<style scoped>`. Copy Regolamento's hero, `.rules`, `.rule` and media rules, renamed `.rules-hero`→`.policy-hero`, `.rules`→`.policy`, `.rule`→`.policy-card`. Leave out `.rule-conduct` and `.rules-closing`. Add: `ol` with `list-style:decimal;padding-left:1.1em` (as `ul`), card links underlined in `--forest`, `margin-top` on the button (about 16px), and `padding-bottom:var(--section-gap)` (or margin) on `.policy` so the cards don't touch the footer.

- [ ] **Step 4: Fix the existing tests the port breaks**

- `tests/explore-page.nuxt.test.ts`: add `expect(redesignedRoutesDeclaration).toContain("'/it/privacy-policy'")` and `toContain("'/it/privacy-policy/'")`; the loop becomes `for (const route of ['prenota'])`.
- `tests/legacy-css.nuxt.test.ts`: delete the row `['pages/it/privacy-policy.vue', privacySelectors],`; keep the EN row.

- [ ] **Step 5: Run the related tests**

Run: `npx pnpm@10.10.0 vitest run tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts tests/desktop-scale.nuxt.test.ts tests/site-no-prefetch.nuxt.test.ts` (check `package.json` for the test runner script if `vitest` is not direct).
Expected: all PASS.

- [ ] **Step 6: Commit**

```bash
git add pages/it/privacy-policy.vue layouts/default.vue tests/explore-page.nuxt.test.ts tests/legacy-css.nuxt.test.ts
git commit -m "feat: port the privacy policy page to the redesign"
```

### Final checks (main session)

- Full gate via gate-runner: lint, typecheck, full tests, generate (route count unchanged: 24).
- Browser at 1440/1024/390: hero photo loads, 2/2/1 columns, no horizontal scroll, "Preferenze cookie" reopens the banner with focus on Accetta, mailto href correct.
