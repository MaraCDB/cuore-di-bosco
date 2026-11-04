import { readFileSync } from 'node:fs'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishBookingPage from '~/pages/en/booking.vue'
import ItalianBookingPage from '~/pages/it/prenota.vue'

const englishSource = readFileSync('pages/en/booking.vue', 'utf8')
const englishWidgetUrl = 'https://www.bed-and-breakfast.it/en/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002'
const forbiddenWords = ['deposit', 'cancellation', 'refund', 'rental', '(paid)', 'weather permitting', 'welcome gift', 'picnic day', 'write to us', 'security bond']
const ownerEditDrafts = [
  'Welcome sweet treat',
  'Herbal tea corner with kettle, tea, chamomile, herbal teas, glasses and cups',
  'relax area with sofa, desk and kettle set',
]

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
  const wrapper = await mountSuspended(EnglishBookingPage, { attachTo: document.body })
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

describe('english booking page', () => {
  it('has the same sections as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = [...italian.children].map(child => child.className)
    const italianBands = bandChildClasses(italian)
    const english = await mountEnglish()

    expect([...english.children].map(child => child.className)).toEqual(italianTopLevel)
    expect(bandChildClasses(english)).toEqual(italianBands)
    expect(italianBands.length).toBeGreaterThan(0)
  })

  it('shows the same photos in the same order', async () => {
    const italianSources = imageSources(await mountItalian())
    const englishSources = imageSources(await mountEnglish())

    expect(englishSources).toEqual(italianSources)
    expect(englishSources.filter(source => source?.startsWith('/images/altervista/'))).toHaveLength(15)
  })

  it('keeps the room anchors and names in the italian order', async () => {
    const english = await mountEnglish()

    expect(english.querySelector('article.room#lampone')).not.toBeNull()
    expect(english.querySelector('article.room#mirtillo')).not.toBeNull()
    expect(blockTexts(english, 'article.room h3')).toEqual(['Lampone', 'Mirtillo'])
    expect(blockTexts(english, 'h3').slice(0, 2)).toEqual(['Lampone', 'Mirtillo'])
  })

  it('points the booking widget at the english page', async () => {
    const english = await mountEnglish()

    expect(english.querySelector('[data-action]')?.getAttribute('data-action')).toBe(englishWidgetUrl)
  })

  it('titles the page BOOK', async () => {
    const english = await mountEnglish()

    expect(blockTexts(english, 'h1')).toEqual(['BOOK'])
  })

  it('shows no removed service, payment or cancellation text', async () => {
    const english = await mountEnglish()
    const pageText = blockTexts(english, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toMatch(/\bhire\b/)
  })

  it('uses the redesign layout, plain text, no-prefetch links and unsized images', async () => {
    const english = await mountEnglish()
    const links = [...englishSource.matchAll(/<NuxtLink\b[^>]*>/g)].map(match => match[0])

    expect(englishSource).not.toContain('v-html')
    expect(englishSource).not.toContain('layout: \'english\'')
    expect(links.filter(link => !/\sno-prefetch\b/.test(link))).toEqual([])
    expect([...english.querySelectorAll('img')].filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('shows fifteen captioned service icons with empty alts', async () => {
    const english = await mountEnglish()
    const figures = [...english.querySelectorAll('.services.band .service-icons > figure')]
    const captions = figures.map(figure => normalize(figure.querySelector('figcaption')?.textContent ?? ''))

    expect(figures).toHaveLength(15)
    expect(figures.map(figure => figure.querySelector('img')?.getAttribute('alt'))).toEqual(captions.map(() => ''))
    expect(captions.filter(caption => caption === '' || caption !== caption.toUpperCase())).toEqual([])
  })

  it('uses British English', async () => {
    const english = await mountEnglish()
    const pageText = blockTexts(english, 'h1, h2, h3, p, figcaption, li').join(' ').toLowerCase()

    expect(['tranquility', 'vacation', 'stroller', 'linens'].filter(word => pageText.includes(word))).toEqual([])
    expect(['tranquillity', 'holidays', 'pushchair', 'bed linen'].filter(word => !pageText.includes(word))).toEqual([])
  })

  it('lets the long amenities caption break only at its soft hyphen', async () => {
    const english = await mountEnglish()
    const amenitiesCaption = blockTexts(english, '.service-icons figcaption').find(caption => caption.replace(/­/g, '') === 'COMPLIMENTARY AMENITIES')

    expect(amenitiesCaption).toBe('COMPLI­MENTARY AMENITIES')
  })

  it('keeps the owners\' italian edits in english', async () => {
    const english = await mountEnglish()
    const pageText = blockTexts(english, 'h1, h2, h3, p, figcaption, li').join(' ')

    expect(ownerEditDrafts.filter(draft => !pageText.includes(draft))).toEqual([])
  })

  it('labels the lightbox controls in english', async () => {
    const english = await mountEnglish()
    english.querySelector<HTMLButtonElement>('#lampone button.room-photo')?.click()
    await nextTick()
    const lightbox = document.body.querySelector('.lightbox')

    expect(lightbox?.classList.contains('redesign')).toBe(true)
    expect(['.lightbox-close', '.lightbox-prev', '.lightbox-next'].map(selector => lightbox?.querySelector(selector)?.getAttribute('aria-label'))).toEqual(['Close', 'Previous', 'Next'])
    expect(lightbox?.getAttribute('aria-label')).toBe('Lampone room photo 1')
  })
})
