import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ItalianExplorePage from '~/pages/it/esplora.vue'
import EnglishExplorePage from '~/pages/en/explore.vue'
import GermanExplorePage from '~/pages/de/entdecken.vue'
import { SITE_ORIGIN } from '../utils/structured-data'

const visitRoveretoHref = 'https://www.visitrovereto.it/info/guide/percorsi-trekking-monte-baldo/'
const trailAppHref = 'https://www.outdooractive.com/it/escursionismo/brentonico/escursionismo-a-brentonico/2521850/'

const forbiddenWords = ['noleggio', 'rental', 'hire', 'verleih', 'vermietung', 'pic nic', 'picnic day', 'picknick-tag', 'express', 'cauzione', 'deposit', 'kaution', 'kostenpflichtig', 'a pagamento', 'paid', 'washing machine', 'lavatrice', 'waschmaschine']

const pageRoutes = [
  '/it', '/it/prenota', '/it/esplora', '/it/regolamento', '/it/privacy-policy',
  '/en', '/en/booking', '/en/explore', '/en/rules', '/en/privacy-policy',
  '/de', '/de/buchen', '/de/entdecken', '/de/hausordnung', '/de/datenschutz',
]

const mountedWrappers: Array<{ unmount: () => void }> = []

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function mountSummerCard(locale: 'it' | 'en' | 'de', page: object): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale(locale)
  const wrapper = await mountSuspended(page, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  const cards = [...(wrapper.element as HTMLElement).querySelectorAll<HTMLElement>('article.season')]
  const summerCard = cards.find(card => /^(Estate|Summer|Sommer)/.test(card.querySelector('h3')?.textContent ?? ''))
  expect(summerCard).toBeDefined()
  return summerCard as HTMLElement
}

function expectExternalAnchor(card: HTMLElement, href: string) {
  const anchor = card.querySelector<HTMLAnchorElement>(`a[href="${href}"]`)
  expect(anchor, href).not.toBeNull()
  expect(anchor?.getAttribute('target')).toBe('_blank')
  expect(anchor?.getAttribute('rel')).toContain('noopener')
}

describe('trail links in the summer card of the explore pages', () => {
  it.each([
    ['it', ItalianExplorePage, 'Trovate molti percorsi descritti su Visit Rovereto', 'Per i sentieri meno conosciuti molti escursionisti usano Outdooractive'],
    ['en', EnglishExplorePage, 'You will find many routes described on Visit Rovereto', 'For lesser-known trails, many hikers use Outdooractive'],
    ['de', GermanExplorePage, 'Viele Routen finden Sie beschrieben auf Visit Rovereto', 'Für weniger bekannte Wege verwenden viele Wanderer Outdooractive'],
  ] as const)('shows the two sentences and both external links in %s', async (locale, page, firstSentence, secondSentence) => {
    const card = await mountSummerCard(locale, page)
    const text = normalize(card.textContent ?? '')

    expect(text).toContain(firstSentence)
    expect(text).toContain(secondSentence)
    expectExternalAnchor(card, visitRoveretoHref)
    expectExternalAnchor(card, trailAppHref)
  })
})

describe('llms.txt', () => {
  const llmsText = readFileSync('public/llms.txt', 'utf8')

  it('starts with the site name and states the altitude', () => {
    expect(llmsText.startsWith('# B&B Cuore di Bosco')).toBe(true)
    expect(llmsText).toContain('776')
  })

  it.each(pageRoutes)('lists the page URL for %s', (route) => {
    expect(llmsText).toContain(`${SITE_ORIGIN}${route})`)
  })

  it('gives the phone number and e-mail address of the structured data', () => {
    expect(llmsText).toContain('+393494960228')
    expect(llmsText).toContain('info@cuoredibosco.it')
  })

  it('contains no forbidden word', () => {
    const lowered = llmsText.toLowerCase()
    expect(forbiddenWords.filter(word => lowered.includes(word))).toEqual([])
  })
})
