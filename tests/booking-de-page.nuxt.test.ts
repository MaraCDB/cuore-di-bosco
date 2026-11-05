import { readFileSync } from 'node:fs'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GermanBookingPage from '~/pages/de/buchen.vue'
import ItalianBookingPage from '~/pages/it/prenota.vue'

const germanSource = readFileSync('pages/de/buchen.vue', 'utf8')
const reloadPluginSource = readFileSync('plugins/reload-script.client.ts', 'utf8')
const germanWidgetUrl = 'https://www.bed-and-breakfast.it/de/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002'
const forbiddenWords = ['kaution', 'anzahlung', 'stornierung', 'erstattung', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick-tag', 'express']
const ownerEditDrafts = [
  'Süße Kleinigkeit zur Begrüßung',
  'Tee-Ecke mit Wasserkocher, Tee, Kamillentee, Kräutertees, Gläsern und Tassen',
  'Sitzecke mit Sofa, Schreibtisch und Wasserkocher-Set',
]
const softHyphenCaptions = [
  'KOSTEN­LOSES WLAN',
  'PFLEGE­PRODUKTE FÜR DIE GÄSTE',
  'WASSER­KOCHER-SET',
  'WÄSCHE­SERVICE',
  'AUS­STATTUNG FÜR KINDER',
  'TRAGE­HILFEN',
]
const longestUnbrokenCaptionPart = 10

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

async function mountGerman(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('de')
  const wrapper = await mountSuspended(GermanBookingPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

async function mountItalian(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('it')
  const wrapper = await mountSuspended(ItalianBookingPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

function bandChildClasses(root: HTMLElement): string[][] {
  return [...root.querySelectorAll('.band')].map(band => [...band.children].map(child => child.className))
}

function imageSources(root: HTMLElement): (string | null)[] {
  return [...root.querySelectorAll('img')].map(image => image.getAttribute('src'))
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('german booking page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = [...italian.children].map(child => child.className)
    const italianBands = bandChildClasses(italian)
    const german = await mountGerman()

    expect([...german.children].map(child => child.className)).toEqual(italianTopLevel)
    expect(bandChildClasses(german)).toEqual(italianBands)
    expect(italianBands.length).toBeGreaterThan(0)
  })

  it('shows the same photos in the same order', async () => {
    const italianSources = imageSources(await mountItalian())
    const germanSources = imageSources(await mountGerman())

    expect(germanSources).toEqual(italianSources)
    expect(germanSources.filter(source => source?.startsWith('/images/altervista/'))).toHaveLength(15)
  })

  it('keeps the room anchors and names in the italian order', async () => {
    const german = await mountGerman()

    expect(german.querySelector('article.room#lampone')).not.toBeNull()
    expect(german.querySelector('article.room#mirtillo')).not.toBeNull()
    expect(blockTexts(german, 'article.room h3')).toEqual(['Lampone', 'Mirtillo'])
  })

  it('points the booking widget at the german page', async () => {
    const german = await mountGerman()

    expect(german.querySelector('[data-action]')?.getAttribute('data-action')).toBe(germanWidgetUrl)
    expect(german.querySelector('[data-lingua]')?.getAttribute('data-lingua')).toBe('de')
  })

  it('titles the page BUCHEN', async () => {
    const german = await mountGerman()

    expect(blockTexts(german, 'h1')).toEqual(['BUCHEN'])
  })

  it('shows no deposit, payment, cancellation or rental text', async () => {
    const german = await mountGerman()
    const pageText = blockTexts(german, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
  })

  it('uses the redesign layout, plain text, no-prefetch links and unsized images', async () => {
    const german = await mountGerman()
    const links = [...germanSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(germanSource).not.toContain('v-html')
    expect(germanSource).not.toContain('layout: \'english\'')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...german.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('shows fifteen captioned service icons with empty alts', async () => {
    const german = await mountGerman()
    const figures = [...german.querySelectorAll('.services.band .service-icons > figure')]
    const captions = figures.map(figure => normalize(figure.querySelector('figcaption')?.textContent ?? ''))

    expect(figures).toHaveLength(15)
    expect(figures.map(figure => figure.querySelector('img')?.getAttribute('alt'))).toEqual(captions.map(() => ''))
    expect(captions.filter(caption => caption === '' || caption !== caption.toUpperCase())).toEqual([])
  })

  it('lets the long caption words break only at their soft hyphens', async () => {
    const german = await mountGerman()
    const captions = blockTexts(german, '.service-icons figcaption')
    const tooLongParts = captions.flatMap(caption => caption.split(/[\s­-]/)).filter(part => part.length > longestUnbrokenCaptionPart)

    expect(softHyphenCaptions.filter(caption => !captions.includes(caption))).toEqual([])
    expect(tooLongParts).toEqual([])
  })

  it('keeps the owners\' italian edits in german', async () => {
    const german = await mountGerman()
    const pageText = blockTexts(german, 'h1, h2, h3, p, figcaption, li').join(' ')

    expect(ownerEditDrafts.filter(draft => !pageText.includes(draft))).toEqual([])
  })

  it('labels the lightbox controls in german', async () => {
    const german = await mountGerman()
    german.querySelector<HTMLButtonElement>('#lampone button.room-photo')?.click()
    await nextTick()
    const lightbox = document.body.querySelector('.lightbox')

    expect(lightbox?.classList.contains('redesign')).toBe(true)
    expect(['.lightbox-close', '.lightbox-prev', '.lightbox-next'].map(selector => lightbox?.querySelector(selector)?.getAttribute('aria-label'))).toEqual(['Schließen', 'Zurück', 'Weiter'])
    expect(lightbox?.getAttribute('aria-label')).toBe('Zimmer Lampone, Foto 1')
  })

  it('reloads the page when the visitor navigates to it', () => {
    expect(reloadPluginSource).toContain('\'/de/buchen\'')
  })
})
