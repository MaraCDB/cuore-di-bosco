import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GermanExplorePage from '~/pages/de/entdecken.vue'
import ItalianExplorePage from '~/pages/it/esplora.vue'

const germanSource = readFileSync('pages/de/entdecken.vue', 'utf8')
const exploreStyles = readFileSync('assets/css/pages/explore.css', 'utf8')
const forbiddenWords = ['kaution', 'anzahlung', 'stornierung', 'erstattung', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick-tag', 'noleggio', 'rental', 'garten italiens', 'castello di ala']
const placeNames = ['Brentonico', 'Monte Baldo', 'Canyon della Sorna', 'Gardasee', 'Rovereto', 'Castello di Avio', 'Polsa e San Valentino', 'Cammino di San Rocco']
const camminoLine = 'Der Cammino di San Rocco führt direkt an unserem Haus vorbei und ist das ganze Jahr über begehbar. Für weitere Informationen und um die Karte herunterzuladen besuchen Sie die offizielle Website'

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
  const wrapper = await mountSuspended(GermanExplorePage, { attachTo: document.body })
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

function externalHrefs(root: HTMLElement): (string | null)[] {
  return [...root.querySelectorAll('a[href^="http"]')].map(link => link.getAttribute('href'))
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('german explore page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = topLevelClassNames(italian)
    const italianSections = sectionClassNames(italian)
    const german = await mountGerman()

    expect(topLevelClassNames(german)).toEqual(italianTopLevel)
    expect(sectionClassNames(german)).toEqual(italianSections)
    expect(german.querySelectorAll('article.season')).toHaveLength(4)
    expect(german.querySelectorAll('li.place')).toHaveLength(8)
  })

  it('shows the same photos in the same order', async () => {
    const italianSources = imageSources(await mountItalian())
    const germanSources = imageSources(await mountGerman())

    expect(germanSources).toEqual(italianSources)
    expect(germanSources.length).toBeGreaterThan(8)
  })

  it('names the eight places in order and keeps every credit verbatim', async () => {
    const italian = await mountItalian()
    const italianCredits = blockTexts(italian, '.photo-credit')
    const german = await mountGerman()

    expect(blockTexts(german, '.place-name')).toEqual(placeNames)
    expect(blockTexts(german, '.photo-credit')).toEqual(italianCredits)
    expect(italianCredits.length).toBeGreaterThan(8)
  })

  it('translates every alt text and aria label', async () => {
    const italianLabels = accessibleLabels(await mountItalian())
    const germanLabels = accessibleLabels(await mountGerman())

    expect(germanLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(15)
    germanLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('links to the same addresses in the same order', async () => {
    const italianHrefs = externalHrefs(await mountItalian())
    const germanHrefs = externalHrefs(await mountGerman())

    expect(germanHrefs).toEqual(italianHrefs)
    expect(germanHrefs.length).toBeGreaterThan(20)
  })

  it('keeps the castle of Avio in bold and translates the Cammino note', async () => {
    const german = await mountGerman()
    const boldWords = [...german.querySelectorAll('strong')].map(word => normalize(word.textContent ?? ''))

    expect(boldWords).toContain('Castello di Avio')
    expect(blockTexts(german, '.cammino-note')).toEqual([camminoLine])
  })

  it('names the plateau Garten Europas and keeps removed names out', async () => {
    const german = await mountGerman()
    const pageText = blockTexts(german, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(pageText).toContain('garten europas')
    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(blockTexts(german, '.place-name').some(name => name.toLowerCase().includes('loppio'))).toBe(false)
    expect(blockTexts(german, 'h2').some(heading => heading.includes('Garten Europas'))).toBe(true)
  })

  it('uses the german headings and the shared flower title id', async () => {
    const german = await mountGerman()

    expect(blockTexts(german, 'h1')).toEqual(['Die Umgebung entdecken'])
    expect(german.querySelector('h2#flower-title')).not.toBeNull()
    expect(german.querySelector('.explore-flower .carousel')?.getAttribute('aria-label')).toBe('Brentonico, die Blume des Monte Baldo')
  })

  it('uses plain text, no-prefetch links and unsized images', async () => {
    const german = await mountGerman()
    const links = [...germanSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(germanSource).not.toContain('v-html')
    expect(germanSource).not.toContain('definePageMeta')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...german.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('sets the german head block without keywords or twitter tags', () => {
    expect(germanSource).toContain('"https://www.cuoredibosco.it/de/entdecken"')
    expect(germanSource).toContain('title: "Die Umgebung von Brentonico entdecken | B&B Cuore di Bosco – Wandern, Almen und Familienaktivitäten"')
    expect(germanSource).not.toContain('name: "keywords"')
    expect(germanSource).not.toContain('twitter:')
  })

  it('needs no soft hyphen at phone width and keeps the shared styles', () => {
    expect(germanSource).not.toContain('&shy;')
    expect(germanSource).not.toContain('­')
    expect(exploreStyles).not.toMatch(/#(?!flower-title\b)[a-z]/)
    expect(germanSource).toContain('<style scoped src="../../assets/css/pages/explore.css"></style>')
  })
})
