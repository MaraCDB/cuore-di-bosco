import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { lodgingBusinessJsonLd } from '../utils/structured-data'

const pagePaths = [
  'pages/it/index.vue',
  'pages/it/prenota.vue',
  'pages/it/esplora.vue',
  'pages/it/regolamento.vue',
  'pages/it/privacy-policy.vue',
  'pages/en/index.vue',
  'pages/en/booking.vue',
  'pages/en/explore.vue',
  'pages/en/rules.vue',
  'pages/en/privacy-policy.vue',
  'pages/de/index.vue',
  'pages/de/buchen.vue',
  'pages/de/entdecken.vue',
  'pages/de/hausordnung.vue',
  'pages/de/datenschutz.vue',
]

const forbiddenWords = ['noleggio', 'rental', 'hire', 'verleih', 'vermietung', 'pic nic', 'picnic day', 'picknick-tag', 'express', 'cauzione', 'deposit', 'kaution', 'kostenpflichtig', 'a pagamento', 'paid', 'washing machine', 'lavatrice', 'waschmaschine']

interface PageHead {
  title: string
  meta: Record<string, string>
  block: string
}

function readHead(path: string): PageHead {
  const source = readFileSync(path, 'utf8')
  const block = source.slice(source.indexOf('useHead({'))
  const title = block.match(/title:\s*"([^"]*)"/)?.[1] ?? ''
  const meta: Record<string, string> = {}
  for (const entry of block.matchAll(/\{\s*(?:name|property):\s*"([^"]+)",\s*content:\s*"([^"]*)"/g)) {
    meta[entry[1]] = entry[2]
  }
  return { title, meta, block }
}

const heads = Object.fromEntries(pagePaths.map(path => [path, readHead(path)]))

const italianHomeTitle = 'Cuore di Bosco | B&B in montagna nel Parco Naturale Monte Baldo'
const italianHomeDescription = 'B&B a Prada di Brentonico, 776 m, sul bivio per Polsa: colazioni genuine, kit bimbo e sentieri del Monte Baldo, vicino a Rovereto e al Lago di Garda.'
const italianBookingTitle = 'Prenota | B&B Cuore di Bosco a Brentonico, vicino a Polsa'
const italianBookingDescription = 'Prenota il tuo soggiorno al B&B Cuore di Bosco a Prada di Brentonico: camere Lampone e Mirtillo, colazione inclusa, kit bimbo e parcheggio gratuito vicino.'
const italianExploreTitle = 'Esplora Brentonico e il Monte Baldo | B&B Cuore di Bosco'
const italianExploreDescription = 'Escursioni sul Monte Baldo, ciaspolate e piste di Polsa, malghe, Canyon della Sorna, Rovereto e Lago di Garda: cosa fare intorno a Brentonico.'

describe('page titles, descriptions and keywords', () => {
  it.each(pagePaths)('keeps %s within the length limits', (path) => {
    expect(heads[path].title.length).toBeGreaterThan(0)
    expect(heads[path].title.length).toBeLessThanOrEqual(70)
    expect(heads[path].meta.description.length).toBeGreaterThan(0)
    expect(heads[path].meta.description.length).toBeLessThanOrEqual(160)
  })

  it.each(pagePaths)('gives %s keywords, Open Graph and Twitter tags', (path) => {
    const { meta } = heads[path]
    expect(meta.keywords?.length).toBeGreaterThan(0)
    for (const tag of ['og:title', 'og:description', 'twitter:card', 'twitter:title', 'twitter:description']) {
      expect(meta[tag]?.length, `${path} ${tag}`).toBeGreaterThan(0)
    }
  })

  it.each(pagePaths)('keeps forbidden words out of the %s head block', (path) => {
    const { title, meta } = heads[path]
    const text = [title, ...Object.values(meta)].join(' ').toLowerCase()
    expect(forbiddenWords.filter(word => text.includes(word))).toEqual([])
  })

  it('sets the approved Italian titles and descriptions', () => {
    expect(heads['pages/it/index.vue'].title).toBe(italianHomeTitle)
    expect(heads['pages/it/index.vue'].meta.description).toBe(italianHomeDescription)
    expect(heads['pages/it/prenota.vue'].title).toBe(italianBookingTitle)
    expect(heads['pages/it/prenota.vue'].meta.description).toBe(italianBookingDescription)
    expect(heads['pages/it/esplora.vue'].title).toBe(italianExploreTitle)
    expect(heads['pages/it/esplora.vue'].meta.description).toBe(italianExploreDescription)
  })

  it('leaves the Italian rules and privacy title and description unchanged', () => {
    expect(heads['pages/it/regolamento.vue'].title).toBe('Regole della casa | Cuore di Bosco - Prada di Brentonico')
    expect(heads['pages/it/regolamento.vue'].meta.description).toBe('Leggi le regole della casa del B&B Cuore di Bosco per garantire a tutti un soggiorno sereno e rispettoso.')
    expect(heads['pages/it/privacy-policy.vue'].title).toBe('Cookie e Privacy Policy | Cuore di Bosco - B&B Prada di Brentonico')
    expect(heads['pages/it/privacy-policy.vue'].meta.description).toBe('Informativa sulla privacy e cookie policy del sito cuoredibosco.it. Scopri come gestiamo i tuoi dati e i cookie.')
  })

  it('keeps the existing Italian home keywords and adds the new ones', () => {
    const keywords = heads['pages/it/index.vue'].meta.keywords
    for (const keyword of ['family hotel Trentino', 'montagna bambini gratis', 'B&B Polsa', 'B&B Prada di Brentonico', 'weekend romantico in Trentino']) {
      expect(keywords).toContain(keyword)
    }
  })

  it('adds the Italian booking and explore keywords', () => {
    expect(heads['pages/it/prenota.vue'].meta.keywords).toContain('dove dormire a Polsa sci')
    expect(heads['pages/it/esplora.vue'].meta.keywords).toContain('ciaspolate Monte Baldo')
    expect(heads['pages/it/esplora.vue'].meta.keywords).toContain('Castello di Avio')
  })

  it.each([
    ['en', 'pages/en/index.vue'],
    ['de', 'pages/de/index.vue'],
  ] as const)('matches the %s home description with the structured data', (locale, path) => {
    expect(heads[path].meta.description).toBe(lodgingBusinessJsonLd(locale).description)
  })

  it('follows each page title and description in Open Graph and Twitter tags', () => {
    for (const path of ['pages/it/index.vue', 'pages/it/prenota.vue', 'pages/it/esplora.vue', 'pages/en/index.vue', 'pages/en/booking.vue', 'pages/en/explore.vue', 'pages/de/index.vue', 'pages/de/buchen.vue', 'pages/de/entdecken.vue']) {
      const { title, meta } = heads[path]
      expect(meta['og:title'], path).toBe(title)
      expect(meta['og:description'], path).toBe(meta.description)
      expect(meta['twitter:title'], path).toBe(title)
      expect(meta['twitter:description'], path).toBe(meta.description)
    }
  })
})
