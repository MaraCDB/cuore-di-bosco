# SEO and GEO before publishing

Date: 2026-11-05. Branch: `redesign/prova-1` (experimental, local commits only, never push or merge to `main` without the owner's explicit OK). Last step of the redesign: the owners approved the whole site on 2026-11-05 and want search and AI-answer visibility done before publishing.

## Intent

The site has to be found by people who do not know Cuore di Bosco yet, both on Google and in the answers of AI assistants (ChatGPT, Perplexity, Gemini, Claude). They search for a place to sleep in a specific area ("B&B Brentonico", "dove dormire a Polsa", "B&B vicino al Lago di Garda") or for what to do there ("ciaspolate Monte Baldo", "escursioni facili montagna"). Families with children stay a core audience; the owners want to **widen** to walkers, nature lovers, skiers, pilgrims and couples, not replace families.

GEO means: the facts an AI needs to recommend the B&B (where it is, altitude, what is nearby, parking, food, transport) are written plainly on the site and in structured data, in the owners' words.

## Goals

1. **FAQ section on the three home pages** (`/it`, `/en`, `/de`), visible to visitors, with matching `FAQPage` JSON-LD.
2. **Correct and complete JSON-LD** for the B&B in IT, EN and DE.
3. **hreflang** on every page: `it`, `en`, `de` twins plus `x-default`.
4. **Sitemap** listing all 15 pages with current dates.
5. **Titles, descriptions and keywords** widened to the owners' search list on every page, in three languages.
6. **Esplora**: links to the Visit Rovereto trekking page and to one trail app, in IT, EN, DE.
7. **`llms.txt`**: a short plain-text description of the B&B for AI crawlers.

## Non-goals

- No new pages, no blog, no landing pages per keyword.
- No paid tools, no new npm dependency (no `@nuxtjs/sitemap`, no SEO module): the site is 15 static pages.
- No review stars (`aggregateRating`) in JSON-LD: Google rejects self-served review markup for local businesses.
- No work on the Google Business Profile, Facebook or Instagram (outside the repo). The profile already exists and is linked from the reviews section.
- No change to legacy pages beyond what the shared layout gives them automatically.
- No restaurant or shop names on the site (they change; the owners would have to keep them updated). The guest PDF keeps them.

## Anti-goals

- Any text that advertises paid extras or contradicts the site: no "noleggio", "rental", "hire", "Verleih", "Vermietung" for the bikes (lent free); no "PIC NIC DAY" or paid picnic; no "lavanderia express"; no "cauzione" / deposit. The owners' guest PDF (`regolamento_ITA_EN.pdf`, older) still says these things: **the site wins** wherever the two differ.
- Invented facts: every fact must come from the site, from the PDF where it does not contradict the site, or from this document.
- Keyword stuffing in visible text. Search words go into titles, descriptions, keywords, JSON-LD and the FAQ answers already approved below; the owners' body copy stays verbatim.
- Any visible change to existing sections. Apart from the new FAQ section and the Esplora link sentences, every page must look identical at 1440, 1024 and 390 px.

## Text rules

- Owners' copy stays verbatim. Every new Italian sentence is listed in this document; approving this document approves them.
- English and German texts are drafts written straight into the pages (owner rule: no draft lists for EN; German is checked live by a German-speaking friend after publishing). English is British; German uses formal "Sie". All rules of the English and German specs apply (`2026-11-04-english-pages-design.md`, `2026-11-04-german-and-language-switch-design.md`), including place names: Lake Garda, Brentonico Plateau, Monte Baldo Nature Park, "Europe's Garden" / Gardasee, Hochebene von Brentonico, Naturpark Monte Baldo, "Garten Europas"; other names stay Italian.

## 1. FAQ section on the home pages

**Position:** on `/it`, `/en`, `/de`, directly before the Cammino di San Rocco section (`#cammino`), after "Una casa aperta a tutti". Background: the page background (linen), so it differs from both neighbours (champagne before, forest band after).

**Layout (owner chose variant C of the mockup):** on desktop two columns, heading and lead on the left (about one third), questions on the right as an accordion. Each question is a native `<details>`/`<summary>`: no JavaScript, answers stay in the HTML for crawlers. Closed items show the question and a "+" marker, open items a "−". Item background champagne, rounded, consistent with the site's cards. Below the site's existing two-column breakpoint the section becomes a single column (heading on top). All items start closed except the first (my call, as in the mockup).

Design rules of the redesign apply: font sizes only via `--step-*` tokens, headings Mountains of Christmas, text Montserrat, paragraphs 68ch with justify + hyphens (left aligned ≤520 px), text in the template (no `v-html`), section has `id="faq"` in every language (my call: same anchor in all languages, not added to the primary navigation).

**Italian text (approved with this document):**

- Heading: **Domande frequenti**
- Lead: **Le domande che ci fate più spesso prima di arrivare.**

| Question | Answer |
|---|---|
| Dove si trova il B&B e a che altitudine? | Siamo a Prada di Brentonico, a 776 metri s.l.m., sul bivio per Polsa: sull'Altopiano di Brentonico, il giardino d'Europa, in Vallagarina, nel Parco Naturale Monte Baldo, in Trentino. Attorno a noi la catena del Monte Baldo, con vista su una delle sue cime più alte e famose, il Monte Altissimo di Nago. |
| Ci sono passeggiate e sentieri? | Il Monte Baldo offre una fitta rete di sentieri tra il Lago di Garda e la Vallagarina, adatti a ogni livello di esperienza. Inoltre il Cammino di San Rocco passa proprio davanti a casa: siamo un suo punto di sosta ufficiale. Alcuni percorsi sono descritti su [Visit Rovereto](https://www.visitrovereto.it/info/guide/percorsi-trekking-monte-baldo/). |
| Dove si mangia nei dintorni? | A Brentonico, a pochi minuti, ci sono diversi ristoranti, poi rifugi, agriturismi e malghe; giù ad Ala, Mori e Rovereto c'è un po' di tutto. In paese un piccolo alimentari fa panini e vende generi alimentari e di necessità. |
| Cosa si raggiunge da qui? | Polsa in 10 minuti, San Giacomo in 15, San Valentino in 20, Rovereto in 25 e il Lago di Garda in circa 30. |
| C'è un parcheggio gratuito? | Ci sono parcheggi liberi e gratuiti disponibili a pochi minuti dalla struttura, alla chiesa e in fondo alla via, con ampia disponibilità. Vi preghiamo gentilmente di non parcheggiare in strada di fronte alla struttura. |
| Si arriva senza auto? | Sì: l'autobus B305 Saccone-Brentonico-Mori-Rovereto ferma all'entrata di Prada. La stazione dei treni più vicina è Rovereto. |

Sources: question 1 and 2 are the owner's texts (light edits approved in chat), 3 is the owner's chat answer, 4 is `pages/it/esplora.vue`, 5 is the owner's guest message, 6 is the guest PDF. The Visit Rovereto link sentence is new. External links open in a new tab with `rel="noopener"`, like the rest of the site.

**English and German:** the same six questions, translated; drafts on the pages.

**Single source:** questions and answers live once per language in a data module (e.g. `utils/home-faq.ts`, structured as question + answer paragraphs + optional link), rendered by the home pages and serialised into `FAQPage` JSON-LD (plain text answers, link label kept as text). Rendering and JSON-LD must not drift.

## 2. JSON-LD

Current file: `utils/structured-data.ts`, injected by `layouts/default.vue` from the route's locale.

Changes, in all three languages:

- `@type`: `BedAndBreakfast` (a schema.org subtype of `LodgingBusiness`). Same `@id` in all languages: `https://www.cuoredibosco.it/#bnb`.
- `url`: the home page of that language (`/it`, `/en`, `/de`), absolute.
- `description`: the new home meta description of that language (section 5).
- `amenityFeature`: bikes become "Biciclette in prestito" / "Bikes on loan" / "Fahrräder zur Verfügung" (German already right). Laundry stays as "Servizio lavanderia" / "Laundry service" / "Wäscheservice": the owner washes guests' clothes on request; there is no washing machine for guests, so nothing may suggest one.
- Parking becomes "Parcheggio gratuito nelle vicinanze" / "Free parking nearby" / "Kostenlose Parkplätze in der Nähe" (my call): the free car parks are public, a few minutes away, and guests are asked not to park in front of the house.
- Add `smokingAllowed: false` (house rules).
- `geo`: add `elevation: 776` (metres).
- `containedInPlace` keeps the Brentonico Plateau as it is (per language).
- `sameAs`: keep Facebook and Instagram; add the Google Maps URL of the business profile, obtained by resolving `https://share.google/WN2W0rEATFBJl1V4G` (the link already used in the reviews section) to its final `google.com/maps` address. If it cannot be resolved to a stable Maps URL, leave `sameAs` unchanged and report it.
- Every language-dependent field is set explicitly per language. German must not inherit any Italian text (today it inherits `url` and other Italian fields through the spread).
- Kept as they are: name, telephone, email, image, CIN identifier, address, coordinates, check-in 15:00, check-out 10:30, `priceRange`, currencies, payment methods, `numberOfRooms: 2`, `petsAllowed: false`, `tourBookingPage` per language.

Home pages additionally carry the `FAQPage` script (section 1). Other pages carry only the B&B script.

## 3. hreflang

Replace the three static `alternate` links in `layouts/default.vue` with links computed from the current route: for every page, `hreflang="it"`, `"en"`, `"de"` pointing to the absolute URL of its twin (`twinPath` in `utils/site-links.ts`) and `hreflang="x-default"` pointing to the Italian twin (decision already in the German spec). Absolute origin `https://www.cuoredibosco.it`, no trailing slash, same form as the canonicals.

Add `og:locale` (`it_IT`, `en_GB`, `de_DE`) with the other two as `og:locale:alternate`, and `og:site_name` "B&B Cuore di Bosco", from the layout. German pages get the `twitter:*` tags the IT and EN pages already have.

The catch-all `pages/[...slug].vue` (redirects unknown paths to `/`) gets `<meta name="robots" content="noindex">`.

## 4. Sitemap and robots

- `public/sitemap.xml`: all 15 pages (the prerender list in `nuxt.config.ts`), `lastmod` = date of the commit that publishes this work (builder sets the date of the final commit), priorities as today (home and booking 1.0, rules 0.8, explore 0.6, privacy 0.3) applied to the German pages too. Kept as a static file.
- A test guards that the sitemap lists exactly the prerendered pages, so a future page cannot be forgotten.
- `public/robots.txt`: unchanged (`Allow: /` already admits search and AI crawlers).

## 5. Titles, descriptions, keywords

Limits: new titles ≤ 65 characters, descriptions ≤ 160. The test allows titles up to 70 (my call): the unchanged Italian and English privacy titles are 66 characters and stay as they are; the German privacy title (75) is shortened, as a draft. Open Graph and Twitter titles/descriptions follow the page's new title/description (they may stay slightly shorter or warmer, but must not contradict it).

**Italian (approved with this document):**

| Page | Title | Description |
|---|---|---|
| `/it` | Cuore di Bosco \| B&B in montagna nel Parco Naturale Monte Baldo | B&B a Prada di Brentonico, 776 m, sul bivio per Polsa: colazioni genuine, kit bimbo e sentieri del Monte Baldo, vicino a Rovereto e al Lago di Garda. |
| `/it/prenota` | Prenota \| B&B Cuore di Bosco a Brentonico, vicino a Polsa | Prenota il tuo soggiorno al B&B Cuore di Bosco a Prada di Brentonico: camere Lampone e Mirtillo, colazione inclusa, kit bimbo e parcheggio gratuito vicino. |
| `/it/esplora` | Esplora Brentonico e il Monte Baldo \| B&B Cuore di Bosco | Escursioni sul Monte Baldo, ciaspolate e piste di Polsa, malghe, Canyon della Sorna, Rovereto e Lago di Garda: cosa fare intorno a Brentonico. |
| `/it/regolamento` | unchanged | unchanged |
| `/it/privacy-policy` | unchanged | unchanged |

**Keywords:** existing keywords stay (owner: "family hotel Trentino", "montagna bambini gratis" included); the owner's list is added, split by page:

- `/it`: b&b trentino, B&B Brentonico, B&B Altopiano di Brentonico, B&B Prada di Brentonico, Brentonico alloggi, B&B Polsa, B&B vicino a Polsa, Polsa alloggi, B&B Monte Baldo, B&B Vallagarina, B&B vicino a Rovereto, B&B vicino al Lago di Garda, trentino vicino lago di garda, montagne sopra rovereto, posti in montagna vicino, B&B nel bosco, B&B tranquillo in montagna, vacanza in famiglia Altopiano di Brentonico, weekend romantico in Trentino, Parco Naturale Monte Baldo.
- `/it/prenota`: dove dormire a Polsa sci, B&B vicino alle piste Polsa, vacanza sulla neve Brentonico, B&B per trekking Monte Baldo, B&B Brentonico.
- `/it/esplora`: piste sci bambini, piste sci bambini trentino, ciaspolate Monte Baldo, mercatini di Natale Brentonico, camminate semplici trentino, escursioni facili montagna, trekking montagna, escursioni monte Baldo, visitare il monte Baldo, viste panoramiche trentino, panorami belli in montagna, panorami Baldo, zone belle per fotografie, birdwatching Trentino, da vedere trentino.

**English and German:** equivalent titles, descriptions and keywords written by the builder as drafts on the pages, following the Italian ones (e.g. `/en` "Cuore di Bosco | Mountain B&B in Monte Baldo Nature Park", `/de` "Cuore di Bosco | B&B in den Bergen im Naturpark Monte Baldo"). Keywords use what English and German speakers search ("B&B near Lake Garda", "Unterkunft Brentonico", "Schneeschuhwandern Monte Baldo", …), not literal translations. Same forbidden words as everywhere.

## 6. Esplora links

In the summer trekking card of `/it/esplora` ("Estate sul Monte Baldo: trekking e malghe") and its EN/DE twins, after the owners' text, add:

- **Visit Rovereto:** "Trovate molti percorsi descritti su [Visit Rovereto](https://www.visitrovereto.it/info/guide/percorsi-trekking-monte-baldo/)."
- **Trail app:** "Per i sentieri meno conosciuti molti escursionisti usano [<app>](<official URL>)."

Default: **Outdooractive** (my call), because the Esplora pages already link two tours on its Rovereto portal (`regio.outdooractive.com/oar-rovereto-trentino`), so the site stays consistent. The builder checks that it shows Monte Baldo trails around Brentonico without paying; only if it does not, it picks one among Komoot, Wikiloc, AllTrails by the same check. The link goes to the app's official site (or its Monte Baldo area page if one exists). The chosen app and the reason are reported to the owner; that sentence is the only Italian text not fully fixed here.

## 7. llms.txt

`public/llms.txt`, in English (the language AI crawlers handle best), following the llms.txt convention: one heading with the name, a one-paragraph summary, then short sections with links to the pages in all three languages. Content only from the approved facts above (location, altitude, rooms, breakfast, family kit, bikes lent free, parking, transport, nearby places, booking page, contacts). Draft, reported to the owner.

## Tests

Unit tests (Vitest), run with the existing suite:

- JSON-LD per language: type, `@id`, `url`, elevation, `smokingAllowed`; no forbidden word in any language (noleggio, rental, hire, Verleih, Vermietung, PIC NIC, express, cauzione, deposit, Kaution); no Italian string in the EN or DE objects.
- `FAQPage` JSON-LD equals the rendered FAQ (same questions, same answers as plain text) in each language.
- hreflang links for a page in each language, including a page with no twin and the root `/`.
- Sitemap lists exactly the prerendered routes.
- Title ≤ 70 and description ≤ 160 characters on every page.
- Existing German tests that forbid `twitter:*` tags or `keywords` on German pages are updated: this spec now asks for both.
- The FAQ section sits directly before `#cammino` on each home page.

Known Vitest dead ends: navigating to booking pages hangs (mount them directly); the `route` option of `mountSuspended` hangs (mock `useRoute` with `mockNuxtImport`).

## Verification

- Gate: lint 0, typecheck 0, all tests, `generate` with the same 34 prerendered routes.
- Generated HTML of every page contains the expected title, description, canonical, four hreflang links and valid JSON-LD (parse it).
- Browser check at 1440, 1024, 390 px: FAQ section on the three home pages (open/close, layout), Esplora link sentences; every other section identical to before (pixel compare against 3927a31).
- JSON-LD of `/it` checked with the Schema.org validator (validator.schema.org) through the browser agent, no errors.

## Order of work

One plan, subagent-driven, local commits only:

1. JSON-LD fixes, hreflang, og:locale, catch-all noindex, sitemap (no visible change).
2. FAQ data module + FAQ section on `/it`, then `/en`, `/de`, + `FAQPage` JSON-LD.
3. Titles, descriptions, keywords on all 15 pages.
4. Esplora links (app research first) and `llms.txt`.
5. Final review, gate, browser check; report to the owner with the EN/DE drafts' locations, the chosen app and the `llms.txt` text.

Publishing stays a separate decision: explicit owner OK required.
