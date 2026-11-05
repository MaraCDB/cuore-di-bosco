import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GermanHomePage from '~/pages/de/index.vue'
import ItalianHomePage from '~/pages/it/index.vue'

const germanSource = readFileSync('pages/de/index.vue', 'utf8')
const homeStyles = readFileSync('assets/css/pages/home.css', 'utf8')
const forbiddenWords = ['kaution', 'anzahlung', 'stornierung', 'erstattung', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick', 'noleggio', 'rental']
const sectionIds: Record<string, string> = { camere: 'zimmer', colazione: 'fruehstueck', cammino: 'cammino', storia: 'geschichte', arrivare: 'anfahrt', faq: 'faq' }

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/­/g, '').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map((node) => {
    const copy = node.cloneNode(true) as Element
    copy.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '))
    return normalize(copy.textContent ?? '')
  })
}

async function mountGerman(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('de')
  const wrapper = await mountSuspended(GermanHomePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

async function mountItalian(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('it')
  const wrapper = await mountSuspended(ItalianHomePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

function sectionClassNames(root: HTMLElement): string[] {
  return [...root.querySelectorAll('section')].map(section => section.className)
}

function sectionIdList(root: HTMLElement): string[] {
  return [...root.querySelectorAll('section')].map(section => section.id)
}

function imageSources(root: HTMLElement): (string | null)[] {
  return [...root.querySelectorAll('img')].map(image => image.getAttribute('src'))
}

function carouselFigures(root: HTMLElement): Element[] {
  return [...root.querySelectorAll('.garden .photo-row figure:not([aria-hidden])')]
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('german home page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = [...italian.children].map(child => child.className)
    const italianSections = sectionClassNames(italian)
    const german = await mountGerman()

    expect([...german.children].map(child => child.className)).toEqual(italianTopLevel)
    expect(sectionClassNames(german)).toEqual(italianSections)
    expect(italianSections).toHaveLength(11)
  })

  it('renames the section ids for in-page links and keeps the others', async () => {
    const italianIds = sectionIdList(await mountItalian())
    const germanIds = sectionIdList(await mountGerman())

    expect(germanIds).toEqual(italianIds.map(id => sectionIds[id] ?? id))
    expect(germanIds).toEqual(expect.arrayContaining(['zimmer', 'fruehstueck', 'cammino', 'geschichte', 'anfahrt']))
  })

  it('shows the same photos in the same order', async () => {
    const italian = await mountItalian()
    const italianSources = imageSources(italian)
    const german = await mountGerman()

    expect(imageSources(german)).toEqual(italianSources)
    expect(carouselFigures(german)).toHaveLength(carouselFigures(italian).length)
    expect(carouselFigures(german)).toHaveLength(16)
  })

  it('keeps every photo credit verbatim', async () => {
    const italian = await mountItalian()
    const italianCredits = blockTexts(italian, '.photo-credit')
    const german = await mountGerman()

    expect(blockTexts(german, '.photo-credit')).toEqual(italianCredits)
    expect(italianCredits.length).toBeGreaterThan(16)
  })

  it('translates the carousel captions and alts', async () => {
    const italianFigures = carouselFigures(await mountItalian())
    const italianCaptions = italianFigures.map(figure => normalize(figure.querySelector('figcaption')?.firstChild?.textContent ?? ''))
    const german = await mountGerman()
    const germanFigures = carouselFigures(german)
    const germanCaptions = germanFigures.map(figure => normalize(figure.querySelector('figcaption')?.firstChild?.textContent ?? ''))

    expect(germanCaptions).not.toEqual(italianCaptions)
    expect(germanCaptions.slice(0, 2)).toEqual(['Der Wald von Prada', 'Calanchi di San Giacomo'])
    expect(germanFigures[7].querySelector('img')?.getAttribute('alt')).toBe('Ein Sprung in das Wasser der Forra della Sorna')
    expect(german.querySelector('.garden .carousel')?.getAttribute('aria-label')).toBe('Fotos des Hauses, der Hochebene und der Umgebung')
  })

  it('names the rooms and points every link to the german booking page', async () => {
    const german = await mountGerman()
    const detailLinks = [...german.querySelectorAll('.room-actions .button-quiet')].map(link => link.getAttribute('href'))
    const internalLinks = [...german.querySelectorAll('a')]
      .map(link => link.getAttribute('href') ?? '')
      .filter(href => href.startsWith('/') || href.startsWith('#'))
    const otherInternalLinks = internalLinks.filter(href => !detailLinks.includes(href))

    expect(blockTexts(german, 'article.room h3')).toEqual(['Lampone', 'Mirtillo'])
    expect(detailLinks).toEqual(['/de/buchen#lampone', '/de/buchen#mirtillo'])
    expect(otherInternalLinks.length).toBeGreaterThan(0)
    expect(otherInternalLinks.filter(href => href !== '/de/buchen' && href !== '#zimmer')).toEqual([])
  })

  it('names the plateau Garten Europas and never Garten Italiens', async () => {
    const pageText = normalize((await mountGerman()).textContent ?? '')

    expect(pageText).toContain('Garten Europas')
    expect(pageText).not.toContain('Garten Italiens')
    expect(germanSource).not.toContain('Garten Italiens')
  })

  it('keeps the external links of the italian page and shows the map in german', async () => {
    const italianLinks = [...(await mountItalian()).querySelectorAll('a[target="_blank"]')].map(link => link.getAttribute('href'))
    const german = await mountGerman()
    const germanLinks = [...german.querySelectorAll('a[target="_blank"]')].map(link => link.getAttribute('href'))

    expect(germanLinks).toEqual(italianLinks)
    expect(german.querySelector('iframe')?.getAttribute('src')?.endsWith('&hl=de')).toBe(true)
  })

  it('shows no removed service, payment or rental text', async () => {
    const german = await mountGerman()
    const pageText = blockTexts(german, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
  })

  it('writes the family line and the room extras in the glossary terms', async () => {
    const german = await mountGerman()
    const familyTerms = german.querySelector('.rooms-head + .rooms-family')
    const roomFeatures = [...german.querySelectorAll('.room-features')].map(list => blockTexts(list, 'li'))

    expect(familyTerms?.textContent).toBe('Babybett kostenlos · 1. Kind kostenlos · 2. Kind 50 % · <12 Jahre')
    expect(homeStyles).toMatch(/\.rooms-family\{[^}]*text-transform:uppercase/)
    expect(roomFeatures).toHaveLength(2)
    for (const features of roomFeatures) {
      expect(features).toContain('Reinigung inklusive')
      expect(features).toContain('Ausgestattete Wasserkocher-Ecke')
      expect(features).toContain('Frühstück inklusive')
    }
  })

  it('uses the redesign layout, plain text, no-prefetch links and unsized images', async () => {
    const german = await mountGerman()
    const links = [...germanSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(links.length).toBeGreaterThan(0)
    expect(germanSource).not.toContain('v-html')
    expect(germanSource).not.toContain('definePageMeta')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...german.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('sets the german head block with keywords and twitter tags', () => {
    expect(germanSource).toContain('https://www.cuoredibosco.it/de"')
    expect(germanSource).toContain('title: "Cuore di Bosco | B&B in den Bergen im Naturpark Monte Baldo"')
    expect(germanSource).toContain('name: "keywords"')
    expect(germanSource).toContain('name: "twitter:card"')
  })

  it('keeps the shared home styles free of section ids', () => {
    expect(homeStyles).not.toMatch(/#(camere|colazione|arrivare|cammino|storia)\b/)
    expect(homeStyles).not.toMatch(/#(zimmer|fruehstueck|anfahrt|geschichte)\b/)
    expect(germanSource).toContain('<style scoped src="../../assets/css/pages/home.css"></style>')
  })
})
