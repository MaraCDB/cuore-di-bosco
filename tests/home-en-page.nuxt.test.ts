import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishHomePage from '~/pages/en/index.vue'
import ItalianHomePage from '~/pages/it/index.vue'

const englishSource = readFileSync('pages/en/index.vue', 'utf8')
const homeStyles = readFileSync('assets/css/pages/home.css', 'utf8')
const forbiddenWords = ['deposit', 'cancellation', 'refund', 'rental', '(paid)', 'picnic day', 'welcome gift', 'write to us', 'security bond', 'vacation', 'stroller', 'tranquility', 'linens']
const sectionIds: Record<string, string> = { camere: 'rooms', colazione: 'breakfast', cammino: 'cammino', storia: 'story', arrivare: 'directions' }

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map((node) => {
    const copy = node.cloneNode(true) as Element
    copy.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '))
    return normalize(copy.textContent ?? '')
  })
}

async function mountEnglish(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('en')
  const wrapper = await mountSuspended(EnglishHomePage, { attachTo: document.body })
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

describe('english home page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = [...italian.children].map(child => child.className)
    const italianSections = sectionClassNames(italian)
    const english = await mountEnglish()

    expect([...english.children].map(child => child.className)).toEqual(italianTopLevel)
    expect(sectionClassNames(english)).toEqual(italianSections)
    expect(italianSections).toHaveLength(10)
  })

  it('renames the section ids for in-page links and keeps the others', async () => {
    const italianIds = sectionIdList(await mountItalian())
    const englishIds = sectionIdList(await mountEnglish())

    expect(englishIds).toEqual(italianIds.map(id => sectionIds[id] ?? id))
    expect(englishIds).toEqual(expect.arrayContaining(['rooms', 'breakfast', 'cammino', 'story', 'directions']))
  })

  it('shows the same photos in the same order', async () => {
    const italianSources = imageSources(await mountItalian())
    const english = await mountEnglish()

    expect(imageSources(english)).toEqual(italianSources)
    expect(carouselFigures(english)).toHaveLength(16)
  })

  it('keeps every photo credit verbatim', async () => {
    const italian = await mountItalian()
    const italianCredits = blockTexts(italian, '.photo-credit')
    const english = await mountEnglish()

    expect(blockTexts(english, '.photo-credit')).toEqual(italianCredits)
    expect(italianCredits.length).toBeGreaterThan(16)
  })

  it('translates the carousel captions and alts', async () => {
    const italianFigures = carouselFigures(await mountItalian())
    const italianCaptions = italianFigures.map(figure => normalize(figure.querySelector('figcaption')?.firstChild?.textContent ?? ''))
    const english = await mountEnglish()
    const englishFigures = carouselFigures(english)
    const englishCaptions = englishFigures.map(figure => normalize(figure.querySelector('figcaption')?.firstChild?.textContent ?? ''))

    expect(englishCaptions).not.toEqual(italianCaptions)
    expect(englishCaptions.slice(0, 2)).toEqual(['The woods of Prada', 'Calanchi di San Giacomo'])
    expect(englishFigures[7].querySelector('img')?.getAttribute('alt')).toBe('A dive into the waters of the Canyon della Sorna')
    expect(english.querySelector('.garden .carousel')?.getAttribute('aria-label')).toBe('Photographs of the house, the Plateau and the surroundings')
  })

  it('names the rooms and points every link to the english booking page', async () => {
    const english = await mountEnglish()
    const detailLinks = [...english.querySelectorAll('.room-actions .button-quiet')].map(link => link.getAttribute('href'))
    const internalLinks = [...english.querySelectorAll('a')]
      .map(link => link.getAttribute('href') ?? '')
      .filter(href => href.startsWith('/') || href.startsWith('#'))
    const otherInternalLinks = internalLinks.filter(href => !detailLinks.includes(href))

    expect(blockTexts(english, 'article.room h3')).toEqual(['Lampone', 'Mirtillo'])
    expect(detailLinks).toEqual(['/en/booking#lampone', '/en/booking#mirtillo'])
    expect(otherInternalLinks.length).toBeGreaterThan(0)
    expect(otherInternalLinks.filter(href => href !== '/en/booking' && href !== '#rooms')).toEqual([])
  })

  it("names the plateau Europe’s Garden and never the Garden of Europe", async () => {
    const pageText = normalize((await mountEnglish()).textContent ?? '')

    expect(pageText).toContain('Europe’s Garden')
    expect(pageText).not.toMatch(/Italy['’]s Garden/)
    expect(pageText).not.toContain('Garden of Europe')
    expect(englishSource).not.toContain('Garden of Europe')
  })

  it('keeps the external links of the italian page', async () => {
    const italianLinks = [...(await mountItalian()).querySelectorAll('a[target="_blank"]')].map(link => link.getAttribute('href'))
    const englishLinks = [...(await mountEnglish()).querySelectorAll('a[target="_blank"]')].map(link => link.getAttribute('href'))

    expect(englishLinks).toEqual(italianLinks)
  })

  it('shows no removed service, payment or cancellation text', async () => {
    const english = await mountEnglish()
    const pageText = blockTexts(english, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toMatch(/\bhire\b/)
  })

  it('writes the family terms in uppercase and the room extras in english', async () => {
    const english = await mountEnglish()
    const familyTerms = english.querySelector('.rooms-head + .rooms-family')
    const roomFeatures = [...english.querySelectorAll('.room-features')].map(list => blockTexts(list, 'li'))

    expect(familyTerms?.textContent).toBe('Free cot · 1st child free · 2nd child 50% off · <12 years')
    expect(homeStyles).toMatch(/\.rooms-family\{[^}]*text-transform:uppercase/)
    expect(roomFeatures).toHaveLength(2)
    for (const features of roomFeatures) {
      expect(features).toContain('Cleaning included')
      expect(features).toContain('Equipped kettle corner')
    }
  })

  it('uses the redesign layout, plain text, no-prefetch links and unsized images', async () => {
    const english = await mountEnglish()
    const links = [...englishSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(links.length).toBeGreaterThan(0)
    expect(englishSource).not.toContain('v-html')
    expect(englishSource).not.toContain('layout: \'english\'')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...english.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('keeps the shared home styles free of italian section ids', () => {
    expect(homeStyles).not.toMatch(/#(camere|colazione|arrivare|cammino|storia)\b/)
    expect(englishSource).toContain('<style scoped src="../../assets/css/pages/home.css"></style>')
  })
})
