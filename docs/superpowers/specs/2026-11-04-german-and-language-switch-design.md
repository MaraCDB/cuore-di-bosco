# German pages, browser language and IT/EN/DE switch

Date: 2026-11-04. Branch: `redesign/prova-1` (experimental, local commits only, never push or merge to `main`). Extends `docs/superpowers/specs/2026-11-04-english-pages-design.md`; everything that spec says about English pages applies to German pages unless this document says otherwise.

## Intent

The B&B has had almost no German-speaking guests: one so far, and that guest spoke good Italian. The owner wants a German version of the site as an experiment, "vorrei vedere se così ne arriva qualcuno". Lake Garda and Monte Baldo draw many tourists from Germany and Austria, so the audience exists. They do not know the B&B yet, and they search in German.

So the German pages exist to be **found and trusted** by German speakers who have never heard of Cuore di Bosco. They must read as written by someone who speaks German, not as a machine translation.

The owner also asked for:
- the site to open in the visitor's browser language;
- icons to switch between Italian, English and German.

## Goals

- A German twin of every redesigned page: `/de` (home), `/de/buchen`, `/de/entdecken`, `/de/hausordnung`, `/de/datenschutz`. Each is the Italian page, section by section and photo by photo, with German text, at 1440, 1024 and 390 px.
- The redesigned chrome in German on German pages: header, phone menu, footer, dock, to-top, cookie banner and carousel controls.
- A language switch with three icons, IT / EN / DE, on every redesigned page, leading to the twin page in that language.
- Visitors who open the site's root address land on the pages in their browser language.
- A German draft list the owner's German-speaking friend can use for a quick check of the published German pages.

## Non-goals

- No other languages, no regional variants (no Austrian or Swiss German versions).
- No German on legacy pages. German exists only in the redesigned design.
- No content written only for German guests, same rule as English: nothing added, nothing left out.
- No automatic translation at runtime, no translation service.
- No redirect on deep links: `/it/...`, `/en/...` and `/de/...` always show the language in their address.
- The SEO and GEO work (hreflang, German titles and descriptions, sitemap) stays in the final SEO step already planned, after the owners approve the whole site. This spec only makes sure that step has what it needs (see "Being found").

## Anti-goals

- German that sounds clumsy or machine-made to a native reader. This would push away the guests the experiment is trying to attract.
- German text that says something the Italian does not, or keeps something the owners removed (all the English anti-goals apply: no paid extras, no bike rental ("Verleih" / "Vermietung" for the B&B's bikes is forbidden), no deposit or cancellation text on booking or home, no invented facts or credits).
- A redirect loop, or a visitor who cannot reach the Italian site because their browser is German.
- Any visible change to the Italian pages, apart from the language switch replacing the "English" link.

## Text rules

1. **Source of truth is the current Italian page.** The approved English twin, when it exists, can help with meaning, but German translates the Italian.
2. **Every German string is a draft** (there is no legacy German to reuse). Each page's German drafts go into a draft list: Italian source and German draft, one row per string, alts and captions included.
3. **Register (my call): formal "Sie"**, warm and simple, like the Italian. Hospitality sites in Germany and Austria mostly use "Sie". The owner's friend can switch to "du" in review; that is a global change, done once.
4. **Standard German (Germany)**, which Austrian and Swiss readers understand.
5. **Place names (my call)**: the German name where one is in common use: Gardasee, Hochebene von Brentonico, Naturpark Monte Baldo, Garten Europas (for "il giardino d'Europa"), Rovereto, Monte Baldo. Otherwise Italian: Cammino di San Rocco, Polsa e San Valentino, Castello di Avio, Campana dei Caduti, Prada, Vallagarina. One form per place across all pages; the first German page fixes the glossary.
6. Room names stay "Lampone" and "Mirtillo". Credits stay verbatim and untranslated. UPPERCASE where the Italian uses it (German h1 on booking: "BUCHEN"). Text lives in the template, never in `v-html`.

## The friend's check

The owner's friend reads German well and will do one quick check. **She reads the German pages on the live site, after publishing** (owner decision: "metti tutto online sul sito e poi lo leggerà, sono sicura che nessun tedesco mi denuncierà per qualche errore"). The owner accepts that the German pages may go live with small errors until her check. So:
- no preview site and no pre-publication review: the German pages go online together with the rest of the redesign, when the owners approve the whole site and give the explicit OK to publish (the redesign rule is unchanged: nothing reaches `main` without that OK);
- the German draft list per page (Italian | German) is still written, so the friend can see the source of each string;
- her corrections are applied in one pass after publishing, as a normal follow-up change.

## Language switch (my calls)

- **Look**: three small flag icons, each with its code next to it: Italian flag "IT", British flag "EN" (the owners chose British English), German flag "DE". Self-hosted SVG flags, not emoji: Windows does not draw flag emoji and shows two letters instead. The current language is visibly marked and not a link (or a link with `aria-current="true"`).
- **Where**: desktop header, in the place of today's "English" link (between the menu links and the PRENOTA button). Phone menu: the same three icons in one row. The dock does not change.
- **Accessibility**: each link has `lang` and `hreflang` set to its language and an accessible name in its own language: "Italiano", "English", "Deutsch".
- **Target**: the twin page of the current page in that language, through the route ids in `utils/routes.ts` (`twinPath` grows to three languages). Section anchors are not carried over.
- **Interim fallback**: while some German or English twins do not exist yet, the icon leads to the closest existing page in that language (the booking page) instead of a 404. Nothing is published before every page exists in all three languages, so this only matters during development.
- **Memory**: clicking an icon stores the chosen language in the browser (`localStorage`, no cookie), so the root address respects that choice later. This is a technical preference store: no consent banner change, but one sentence about it goes into the privacy policy in all three languages (draft for the owner). **When (my call)**: the sentence is drafted in step 1's draft list, but it goes into the Italian privacy page only in the privacy step, after the owner approves the text, together with the English and German privacy pages. Step 1 leaves the Italian pages identical apart from the switch. Nothing is published before then.

## Browser language (my calls)

- Only the root address `/` decides the language (today `pages/index.vue` always replaces to `/it`). Order:
  1. the stored choice from the switch, if any;
  2. otherwise the first of `navigator.languages` whose primary subtag is `de`, `en` or `it` (`de-AT`, `de-CH` count as `de`; `en-US` as `en`);
  3. otherwise Italian.
- The redirect goes to `/de`, `/en` or `/it` with `replace` (no extra history entry). Search engines and visitors without JavaScript get Italian, as today.
- `i18n.detectBrowserLanguage` stays `false`: the layouts set the locale from the route, and the root redirect above is the only detection. This settles the owner's earlier question 4.

## Architecture

- **Locale**: add `de` to `nuxt.config.ts` i18n locales (`de-DE`, `de.json`). `SiteLocale` and `LanguageCode` become `'it' | 'en' | 'de'`; `siteLocale(path)` maps `/de` and `/de/...` to `de`. `layouts/default.vue` sets locale, `<html lang="de">` and a German LodgingBusiness JSON-LD from the route. **German JSON-LD (my call)**: it translates the facts of the current Italian pages, not the stale Italian JSON-LD in `utils/structured-data.ts`. It leaves out anything the Italian pages no longer say: no bike rental ("Noleggio biciclette"; the bikes are lent for free), no PIC NIC DAY, no paid express laundry. The Italian and English JSON-LD stay as they are until the final SEO step fixes them. The German forbidden-words test covers the German JSON-LD too.
- **Routes** (my call, readable for German visitors and searches): `/de`, `/de/buchen`, `/de/entdecken`, `/de/hausordnung`, `/de/datenschutz`, added to `utils/routes.ts` with the existing route ids, and to `redesignedRoutes` with and without trailing slash.
- **Chrome strings**: `i18n/locales/de.json` with every `site.*` key and the cookie banner keys. German menu, same order as Italian: Startseite, Zimmer, Frühstück, Entdecken, Hausordnung, Anfahrt, (switch), BUCHEN. Drafts.
- **German home anchors**: `#zimmer`, `#fruehstueck`, `#anfahrt`, plus `#top`. Room "Details" links go to `/de/buchen#lampone` / `#mirtillo`.
- **Pages**: one file per page in `pages/de/`, structural copy of the Italian twin, sharing its CSS through `<style scoped src>` like English. The CSS of home, explore, rules and privacy is extracted when their English twin is built (booking is done already).
- **Booking widget**: `data-lingua="de"` and the German bed-and-breakfast.it page, `https://www.bed-and-breakfast.it/de/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002` (answers 200; the builder must check in the browser that the widget renders in German). **If it does not, or only partly (my call)**: `/de/buchen` uses the English widget (`data-lingua="en"` and the English bed-and-breakfast.it page), the draft list says so, and the owner is told. German visitors read English more easily than Italian. Step 1 is not blocked by this. `plugins/reload-script.client.ts` gets `/de/buchen` in its list: the full reload on entering a booking page is intended (it re-runs the widget script).
- **Router**: `app/router.options.ts` already falls back to the top when a hash target is missing; nothing new.

## Being found (input for the final SEO step)

German visitors only arrive if search engines index the German pages as German. The final SEO step must add, for every page: `hreflang` alternates for `it`, `en`, `de` plus `x-default` (Italian), German `title`, `description`, Open Graph and canonical, and the German pages in the sitemap. The German pages get a minimal German `title` and `description` now (drafts) so they are not left with Italian or English ones.

## Order of work

Spec approved by the owner on 2026-11-04. **Owner, 2026-11-04 ("si ma prima finisci le altre pagine di inglese!")**: the English pages still on the legacy design (home, explore, rules, privacy) are redesigned first, English only, following the English spec. The German work below starts after them, so step 2 becomes German-only. Each step is gated (lint, typecheck, tests, build), checked in the browser at 1440/1024/390 and committed locally.

1. **Switch, browser language, German chrome, `/de/buchen`.** Locale `de`, routes, three-way `twinPath`, flag switch in header and phone menu (replacing the "English" link on Italian and English pages too), root redirect with stored choice, `de.json`, German JSON-LD, `pages/de/buchen.vue`. Italian pages must look identical apart from the switch.
2. **Then each remaining page in English and German together**, in the English spec's order: home, explore, rules, privacy. **English changes (owner, 2026-11-04: "fai anche quello sulle pagine direttamente faccio il check da lì")**: the English drafts go straight into the pages, with no separate English draft list and no approval checkpoint between pages; the owner checks the English on the pages themselves and sends corrections. This replaces the per-page draft-list approval of the English spec. The German drafts of the same page are collected for the friend.
3. **Publishing** with the rest of the redesign, after the owners approve the whole site and the final SEO step (explicit owner OK required, as for every publication).
4. **Friend's check** of the live German pages in one pass, corrections applied afterwards.

## Tests

- Each German page mirrors its Italian twin's tests (structure, photos, credits, no `v-html`, no image width/height) with a German forbidden-words list: for example "Kaution", "Anzahlung", "Stornierung", "Erstattung", "Verleih", "Vermietung", "kostenpflichtig", "Picknick-Tag".
- Switch: three links with `lang`, `hreflang`, accessible names in their own language, current language marked, targets are the twin pages (including the interim fallback).
- Root redirect: stored choice wins; `de-AT` goes to `/de`; `en-US` to `/en`; `fr-FR` to `/it`; nothing in `navigator.languages` goes to `/it`.
- Italian chrome unchanged except the switch; English chrome unchanged except the switch.

## Left to the builder

- Flag SVG source (any license-free set, self-hosted), exact icon size within the header's type scale.
- i18n key names for the new strings, the `localStorage` key name.
- How the interim fallback is computed.
- Commit order inside a step.

## Owner questions

None open. Answered: the friend checks the German pages on the live site after publishing (see "The friend's check").
