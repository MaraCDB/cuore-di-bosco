import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ExplorePage from '~/pages/it/esplora.vue'

const pageSource = readFileSync('pages/it/esplora.vue', 'utf8')
const layoutSource = readFileSync('layouts/default.vue', 'utf8')
const redesignedRoutesDeclaration = layoutSource.match(/const redesignedRoutes = new Set\(\[[^\]]*\]\)/)?.[0] ?? ''
const pageStyles = readFileSync('assets/css/pages/explore.css', 'utf8')
const legacyTexts: string[] = JSON.parse(readFileSync('tests/fixtures/esplora-legacy-text.json', 'utf8'))

const apt = 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo'
const aptCredit = (author: string) => `${apt}. Foto di ${author}`

const legacyHrefs = [
  'http://www.visitrovereto.it/scopri/chiese-e-luoghi-sacri/chiesa-dei-ss-pietro-e-paolo/',
  'http://www.visitrovereto.it/scopri/chiese-e-luoghi-sacri/cripta-di-san-giovanni/',
  'http://www.visitrovereto.it/scopri/luoghi-storici/mulino-zeni/',
  'http://www.visitrovereto.it/scopri/palazzi/palazzo-eccheli-baisi/',
  'https://camminosanrocco.it/',
  'https://regio.outdooractive.com/oar-rovereto-trentino/it/tour/trekking/bocca-d-ardole-corno-della-paura-monte-vignola-/13833250/',
  'https://regio.outdooractive.com/oar-rovereto-trentino/it/tour/trekking/escursione-alla-val-del-parol/13835058/#dmdtab=oax-tab5',
  'https://www.brentonicoski.com',
  'https://www.gardatrentino.it/it',
  'https://www.parcomontebaldo.tn.it/it',
  'https://www.visitrovereto.it',
  'https://www.visitrovereto.it/',
  'https://www.visitrovereto.it/info/guide/inverno-sul-monte-baldo/',
  'https://www.visitrovereto.it/info/uffici-turistici-rovereto-vallagarina/',
  'https://www.visitrovereto.it/scopri/territorio/parco-naturale-locale-del-monte-baldo/',
  'https://www.visitrovereto.it/scopri/territorio/rovereto-citta-di-culture/',
  'https://www.visitrovereto.it/vivi/eventi/ferragosto-baldo-bio-benessere/',
  'https://www.visitrovereto.it/vivi/eventi/festa-della-castagna-castione/',
  'https://www.visitrovereto.it/vivi/eventi/luppoli-e-castagne/',
  'https://www.visitrovereto.it/vivi/eventi/natale-dell-albero-brentonico/',
  'https://www.visitrovereto.it/vivi/eventi/sapori-dautunno/',
  'https://www.visitrovereto.it/vivi/outdoor/neve/sci/sci-alpino/',
  'https://www.visitrovereto.it/vivi/outdoor/summer-camp/',
  'https://www.visitrovereto.it/wp-content/uploads/2023/12/20230805-brentonico-guida-150x190-ITA-LOW_WEB.pdf',
]

const placeNames = ['Brentonico', 'Monte Baldo', 'Canyon della Sorna', 'Lago di Garda', 'Rovereto', 'Castello di Avio', 'Polsa e San Valentino', 'Cammino di San Rocco']
const placePhotos = ['palazzo-eccheli-baisi-1280', 'trekking-baldo-1280', 'forra-sorna-1280', 'monte-altissimo-1200', 'castello-rovereto-700', 'castello-avio-1280', 'inverno-brentonico-1280', 'cammino-san-rocco-960']
const placeCredits = [
  aptCredit('Luca Matassoni'),
  aptCredit('Tommaso Prugnola'),
  aptCredit('Tommaso Prugnola'),
  '360gardalife. Foto di Angela Trawoeger',
  aptCredit('Luca Matassoni'),
  aptCredit('Martina Vanzo'),
  aptCredit('Tommaso Prugnola'),
  null,
]

const flowerPhotos = [
  'https://www.visitrovereto.it/wp-content/uploads/2019/11/paesaggio-inverno-monte-baldo-foto-valentino-azzolini-1.jpg',
  'https://www.visitrovereto.it/wp-content/uploads/2023/07/palazzo-eccheli-baisi-giardino-botanico-brentonico-luca-matassoni-2023-3.jpg',
  'https://www.visitrovereto.it/wp-content/uploads/2023/06/Giardino-Botanico-ph-lucamatassoni-web.png',
  'https://www.visitrovereto.it/wp-content/uploads/2019/10/paesaggio-inverno-monte-baldo-foto-tommaso-prugnola-3.jpg',
  'https://www.visitrovereto.it/wp-content/uploads/2024/10/Brentonico-il-fiore-del-Baldo-Graziano-Galvagni.jpg',
  '/images/home/fiori-rosa-700.webp',
  '/images/home/fiori-gialli-700.webp',
  '/images/home/anemoni-bianchi-700.webp',
  '/images/home/rose-rosse-700.webp',
]
const flowerAlts = [
  'Monte Baldo in inverno - paesaggio innevato Altopiano di Brentonico',
  'Giardino botanico di Palazzo Eccheli-Baisi a Brentonico',
  'Giardino Botanico del Parco Naturale Monte Baldo',
  'Paesaggio invernale Monte Baldo - Trentino',
  'Brentonico il fiore del Baldo - panorama montano',
  'Un prato di fiori rosa sotto il cielo d’estate, con le montagne sullo sfondo',
  'Fiori gialli su un pendio erboso al margine del bosco',
  'Anemoni bianchi in fiore',
  'Rose rosse davanti ai prati e alle montagne tra le nuvole',
]
const flowerCredits = [...['Valentino Azzolini', 'Luca Matassoni', 'Luca Matassoni', 'Tommaso Prugnola', 'Graziano Galvagni'].map(aptCredit), 'Photo Mara', 'Photo Mara', 'Photo Mara', 'Photo Mara']

const sectionOrder = ['explore-intro', 'places', 'explore-nature', 'explore-around', 'explore-flower', 'explore-garden', 'seasons', 'explore-note']

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function mountExplore() {
  const wrapper = await mountSuspended(ExplorePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function ruleBody(selector: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return pageStyles.match(new RegExp(`(?:^|[\\s,}])${escaped}\\{([^}]*)\\}`, 'm'))?.[1]
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('italian explore page', () => {
  it('keeps every legacy heading and paragraph word for word', async () => {
    const wrapper = await mountExplore()
    const pageText = normalize(wrapper.element.textContent ?? '')

    expect(legacyTexts.length).toBeGreaterThan(30)
    expect(legacyTexts.filter(text => !pageText.includes(text))).toEqual([])
  })

  it('lists the eight places in order with their photos and credits', async () => {
    const wrapper = await mountExplore()
    const tiles = [...wrapper.element.querySelectorAll('ul.places > li.place')]

    expect(tiles.map(tile => tile.querySelector('.place-name')?.textContent)).toEqual(placeNames)
    expect(tiles.map(tile => tile.querySelector('figure > img')?.getAttribute('src'))).toEqual(placePhotos.map(name => `/images/home/${name}.webp`))
    expect(tiles.map(tile => tile.querySelector('figcaption > .photo-credit')?.textContent ?? null)).toEqual(placeCredits)
    expect(tiles.map(tile => tile.querySelector('.place-name')?.textContent)).not.toContain('Lago di Loppio')
  })

  it('keeps the Cammino di San Rocco out of the summer card', async () => {
    const wrapper = await mountExplore()
    const summerCard = [...wrapper.element.querySelectorAll('.season')].find(card => card.querySelector('h3')?.textContent?.startsWith('Estate'))

    expect(summerCard?.querySelector('h3')?.textContent).toBe('Estate sul Monte Baldo: trekking e malghe')
    expect(normalize(summerCard?.textContent ?? '')).not.toContain('Cammino di San Rocco')
  })

  it('places the all-year Cammino di San Rocco note between the Sorna and the park paragraphs', async () => {
    const wrapper = await mountExplore()
    const note = wrapper.element.querySelector('.explore-nature .text-columns > p.cammino-note')
    const link = note?.querySelector('a')

    expect(normalize(note?.previousElementSibling?.textContent ?? '')).toMatch(/^Non perdere il magnifico Canyon della Sorna/)
    expect(note?.nextElementSibling?.matches('.park-link')).toBe(true)
    expect(normalize(note?.textContent ?? '')).toBe('Il Cammino di San Rocco passa proprio davanti alla nostra struttura ed è percorribile tutto l’anno. Per maggiori informazioni e per scaricare la mappa vai sul sito ufficiale')
    expect(link?.getAttribute('href')).toBe('https://camminosanrocco.it/')
    expect(link?.getAttribute('target')).toBe('_blank')
  })

  it('reveals the explore note paragraphs while the band stays still', async () => {
    const wrapper = await mountExplore()
    const band = wrapper.element.querySelector('section.explore-note')
    const paragraphs = [...(band?.querySelectorAll('p') ?? [])]

    expect(band?.hasAttribute('data-reveal')).toBe(false)
    expect(paragraphs).toHaveLength(2)
    expect(paragraphs.every(paragraph => paragraph.hasAttribute('data-reveal'))).toBe(true)
  })

  it('shows the flower of Baldo photos as a credited row', async () => {
    const wrapper = await mountExplore()
    const photos = [...wrapper.element.querySelectorAll('.explore-flower .photo-row > figure:not([aria-hidden])')]

    expect(photos.map(photo => photo.querySelector('img')?.getAttribute('src'))).toEqual(flowerPhotos)
    expect(photos.map(photo => photo.querySelector('img')?.getAttribute('alt'))).toEqual(flowerAlts)
    expect(photos.map(photo => photo.querySelector('figcaption .photo-credit')?.textContent)).toEqual(flowerCredits)
  })

  it('credits the Brentonico panorama to the APT archive', async () => {
    const wrapper = await mountExplore()
    const panorama = wrapper.element.querySelector('img[src="/images/altervista/apt_brentonico.jpg"]')

    expect(panorama).not.toBeNull()
    expect(panorama?.closest('figure')?.querySelector('.photo-credit')?.textContent).toBe(apt)
  })

  it('links the park logo from the local file', async () => {
    const wrapper = await mountExplore()
    const logo = wrapper.element.querySelector('a[href="https://www.parcomontebaldo.tn.it/it"] img.park-logo')

    expect(logo?.getAttribute('src')).toBe('/images/logo-parco-monte-baldo.svg')
    expect(logo?.getAttribute('alt')).toBe('Logo Parco Naturale Monte Baldo')
  })

  it('keeps the park logo right under the sentence that points to it', async () => {
    const wrapper = await mountExplore()
    const parkLink = wrapper.element.querySelector('.explore-nature .text-columns > .park-link')

    expect(normalize(parkLink?.querySelector('p')?.textContent ?? '')).toBe('Sul sito del Parco qui sotto puoi trovare i percorsi e le tante attività in programma!')
    expect(parkLink?.querySelector('p + figure.park-logo-figure img.park-logo')).not.toBeNull()
    expect(ruleBody('.park-link')).toMatch(/break-inside:avoid/)
    expect(ruleBody('.park-logo-figure')).toMatch(/display:flex;justify-content:center/)
  })

  it('keeps every legacy link', async () => {
    const wrapper = await mountExplore()
    const hrefs = new Set([...wrapper.element.querySelectorAll('a')].map(link => link.getAttribute('href')))

    expect(legacyHrefs).toHaveLength(24)
    expect(legacyHrefs.filter(href => !hrefs.has(href))).toEqual([])
  })

  it('never sets width or height attributes or inline styles on images', async () => {
    const wrapper = await mountExplore()
    const images = [...wrapper.element.querySelectorAll('img')]

    expect(images.length).toBeGreaterThan(0)
    expect(images.filter(image => image.hasAttribute('width') || image.hasAttribute('height') || image.hasAttribute('style'))).toEqual([])
  })

  it('orders the sections so no two neighbours share a background', async () => {
    const wrapper = await mountExplore()
    const sections = [...wrapper.element.children].map(child => child.matches('.band') ? child.firstElementChild : child)

    expect(sections.map(section => sectionOrder.find(name => section?.classList.contains(name)))).toEqual(sectionOrder)
    expect(wrapper.element.querySelector('.band > .explore-intro')).not.toBeNull()
    expect(wrapper.element.querySelector('.band > .explore-flower')).not.toBeNull()
    for (const name of ['explore-nature', 'explore-garden', 'explore-note']) {
      expect(ruleBody(`.${name}`)).toMatch(/background:var\(--champagne\)/)
    }
    for (const name of ['places', 'explore-around', 'seasons']) {
      expect(ruleBody(`.${name}`) ?? '').not.toMatch(/background/)
    }
  })

  it('uses the light credit and control colours on the forest band', () => {
    expect(ruleBody('.explore-flower')).toContain('--carousel-credit:var(--on-forest-soft);--carousel-control:var(--on-forest);--carousel-control-ink:var(--forest)')
  })

  it('lays the places out four across on desktop and two on phones', () => {
    const desktopRules = pageStyles.match(/@media \(min-width:901px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(ruleBody('.places')).toMatch(/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/)
    expect(desktopRules).toMatch(/\.places\{[^}]*grid-template-columns:repeat\(4,minmax\(0,1fr\)\)/)
  })

  it('justifies long paragraphs and breaks long links', () => {
    const phoneRules = pageStyles.match(/@media \(max-width:520px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(pageStyles).toMatch(/\{max-width:68ch;text-align:justify;hyphens:auto\}/)
    expect(phoneRules).toMatch(/\{text-align:left\}/)
    expect(pageStyles).toMatch(/a\{[^}]*overflow-wrap:anywhere/)
  })

  it('turns the redesign on for every inner italian page', () => {
    expect(redesignedRoutesDeclaration).toContain("'/it/esplora'")
    expect(redesignedRoutesDeclaration).toContain("'/it/esplora/'")
    expect(redesignedRoutesDeclaration).toContain("'/it/regolamento'")
    expect(redesignedRoutesDeclaration).toContain("'/it/regolamento/'")
    expect(redesignedRoutesDeclaration).toContain("'/it/privacy-policy'")
    expect(redesignedRoutesDeclaration).toContain("'/it/privacy-policy/'")
    expect(redesignedRoutesDeclaration).toContain("'/it/prenota'")
    expect(redesignedRoutesDeclaration).toContain("'/it/prenota/'")
    expect(redesignedRoutesDeclaration).toContain("'/en/booking'")
    expect(redesignedRoutesDeclaration).toContain("'/en/booking/'")
    expect(redesignedRoutesDeclaration).toContain("'/en'")
    expect(redesignedRoutesDeclaration).toContain("'/en/'")
    expect(redesignedRoutesDeclaration).toContain("'/en/explore'")
    expect(redesignedRoutesDeclaration).toContain("'/en/explore/'")
    expect(redesignedRoutesDeclaration).toContain("'/en/rules'")
    expect(redesignedRoutesDeclaration).toContain("'/en/rules/'")
    expect(redesignedRoutesDeclaration).toContain("'/en/privacy-policy'")
    expect(redesignedRoutesDeclaration).toContain("'/en/privacy-policy/'")
    expect(redesignedRoutesDeclaration).toContain("'/de/buchen'")
    expect(redesignedRoutesDeclaration).toContain("'/de/buchen/'")
    expect(redesignedRoutesDeclaration).toContain("'/de'")
    expect(redesignedRoutesDeclaration).toContain("'/de/'")
    expect(redesignedRoutesDeclaration).toContain("'/de/entdecken'")
    expect(redesignedRoutesDeclaration).toContain("'/de/entdecken/'")
    expect(redesignedRoutesDeclaration).toContain("'/de/hausordnung'")
    expect(redesignedRoutesDeclaration).toContain("'/de/hausordnung/'")
  })

  it('names the castle of Avio in the SEO keywords', () => {
    const keywords = pageSource.match(/name: "keywords",\s*content:\s*"([^"]*)"/)?.[1]

    expect(keywords).toContain('Castello di Avio')
    expect(keywords).not.toContain('Castello di Ala')
  })

  it('names the castle of Avio on the english explore page', () => {
    const englishSource = readFileSync('pages/en/explore.vue', 'utf8')

    expect(englishSource).toContain('<strong>Castello di Avio</strong>')
    expect(englishSource).not.toContain('Castello di Ala')
  })
})
