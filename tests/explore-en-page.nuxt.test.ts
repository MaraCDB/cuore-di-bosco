import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishExplorePage from '~/pages/en/explore.vue'
import ItalianExplorePage from '~/pages/it/esplora.vue'

const englishSource = readFileSync('pages/en/explore.vue', 'utf8')
const exploreStyles = readFileSync('assets/css/pages/explore.css', 'utf8')
const forbiddenWords = ['italy’s garden', 'italy\'s garden', 'garden of europe', 'castello di ala', 'lago di loppio', 'rental', 'vacation', 'tranquility', 'stroller', 'linens']
const placeNames = ['Brentonico', 'Monte Baldo', 'Canyon della Sorna', 'Lake Garda', 'Rovereto', 'Castello di Avio', 'Polsa e San Valentino', 'Cammino di San Rocco']
const camminoLine = 'The Cammino di San Rocco passes right in front of our property and can be walked all year round. For more information and to download the map go to the official website'

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
  const wrapper = await mountSuspended(EnglishExplorePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

async function mountItalian(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('it')
  const wrapper = await mountSuspended(ItalianExplorePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

function topLevelClassNames(root: HTMLElement): string[] {
  return [...root.children].map(child => child.className)
}

function sectionClassNames(root: HTMLElement): string[] {
  return [...root.querySelectorAll('section')].map(section => section.className)
}

function imageSources(root: HTMLElement): (string | null)[] {
  return [...root.querySelectorAll('img')].map(image => image.getAttribute('src'))
}

function accessibleLabels(root: HTMLElement): string[] {
  return [...root.querySelectorAll('[alt], [aria-label]')]
    .flatMap(node => [node.getAttribute('alt'), node.getAttribute('aria-label')])
    .filter((label): label is string => Boolean(label))
}

function externalHostnames(root: HTMLElement): string[] {
  return [...root.querySelectorAll('a[href^="http"]')].map(link => new URL(link.getAttribute('href') ?? '').hostname)
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('english explore page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = topLevelClassNames(italian)
    const italianSections = sectionClassNames(italian)
    const english = await mountEnglish()

    expect(topLevelClassNames(english)).toEqual(italianTopLevel)
    expect(sectionClassNames(english)).toEqual(italianSections)
    expect(english.querySelectorAll('article.season')).toHaveLength(4)
    expect(english.querySelectorAll('li.place')).toHaveLength(8)
  })

  it('shows the same photos in the same order', async () => {
    const italianSources = imageSources(await mountItalian())
    const englishSources = imageSources(await mountEnglish())

    expect(englishSources).toEqual(italianSources)
    expect(englishSources.length).toBeGreaterThan(8)
  })

  it('names the eight places in order and keeps every credit verbatim', async () => {
    const italian = await mountItalian()
    const italianCredits = blockTexts(italian, '.photo-credit')
    const english = await mountEnglish()

    expect(blockTexts(english, '.place-name')).toEqual(placeNames)
    expect(blockTexts(english, '.photo-credit')).toEqual(italianCredits)
    expect(italianCredits.length).toBeGreaterThan(8)
  })

  it('translates every alt text and aria label', async () => {
    const italianLabels = accessibleLabels(await mountItalian())
    const englishLabels = accessibleLabels(await mountEnglish())

    expect(englishLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(15)
    englishLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('links to the same hosts in the same order', async () => {
    const italianHosts = externalHostnames(await mountItalian())
    const englishHosts = externalHostnames(await mountEnglish())

    expect(englishHosts).toEqual(italianHosts)
    expect(englishHosts.length).toBeGreaterThan(20)
  })

  it('keeps the castle of Avio in bold and shortens the Cammino note', async () => {
    const english = await mountEnglish()
    const boldWords = [...english.querySelectorAll('strong')].map(word => normalize(word.textContent ?? ''))

    expect(boldWords).toContain('Castello di Avio')
    expect(blockTexts(english, '.cammino-note')).toEqual([camminoLine])
  })

  it('names the plateau Europe\'s Garden and keeps removed names out', async () => {
    const english = await mountEnglish()
    const pageText = blockTexts(english, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(pageText).toContain('europe\'s garden')
    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toMatch(/\bhire\b/)
    expect(blockTexts(english, 'h2').some(heading => heading.includes('Europe\'s Garden'))).toBe(true)
  })

  it('uses the redesign layout, plain text, no-prefetch links and unsized images', async () => {
    const english = await mountEnglish()
    const links = [...englishSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(englishSource).not.toContain('v-html')
    expect(englishSource).not.toContain('layout: \'english\'')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...english.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('keeps the shared explore styles free of italian section ids', () => {
    expect(exploreStyles).not.toMatch(/#(?!flower-title\b)[a-z]/)
    expect(englishSource).toContain('<style scoped src="../../assets/css/pages/explore.css"></style>')
  })
})
