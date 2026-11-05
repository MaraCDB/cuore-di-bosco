import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'
import ItalianHomePage from '~/pages/it/index.vue'
import EnglishHomePage from '~/pages/en/index.vue'
import GermanHomePage from '~/pages/de/index.vue'
import { faqPageJsonLd, faqPlainAnswer, homeFaq } from '../utils/home-faq'
import type { SiteLocale } from '../utils/site-links'

const forbiddenWords = ['noleggio', 'rental', 'hire', 'verleih', 'vermietung', 'pic nic', 'picnic day', 'picknick-tag', 'express', 'cauzione', 'deposit', 'kaution', 'kostenpflichtig', 'a pagamento', 'paid', 'washing machine', 'lavatrice', 'waschmaschine']
const homePages = { it: ItalianHomePage, en: EnglishHomePage, de: GermanHomePage }
const mountedWrappers: Array<{ unmount: () => void }> = []

const italianQuestions = [
  'Dove si trova il B&B e a che altitudine?',
  'Ci sono passeggiate e sentieri?',
  'Dove si mangia nei dintorni?',
  'Cosa si raggiunge da qui?',
  "C'è un parcheggio gratuito?",
  'Si arriva senza auto?',
]

const italianAnswers = [
  "Siamo a Prada di Brentonico, a 776 metri s.l.m., sul bivio per Polsa: sull'Altopiano di Brentonico, il giardino d'Europa, in Vallagarina, nel Parco Naturale Monte Baldo, in Trentino. Attorno a noi la catena del Monte Baldo, con vista su una delle sue cime più alte e famose, il Monte Altissimo di Nago.",
  'Il Monte Baldo offre una fitta rete di sentieri tra il Lago di Garda e la Vallagarina, adatti a ogni livello di esperienza. Inoltre il Cammino di San Rocco passa proprio davanti a casa: siamo un suo punto di sosta ufficiale.',
  "A Brentonico, a pochi minuti, ci sono diversi ristoranti, poi rifugi, agriturismi e malghe; giù ad Ala, Mori e Rovereto c'è un po' di tutto. In paese un piccolo alimentari fa panini e vende generi alimentari e di necessità.",
  'Polsa in 10 minuti, San Giacomo in 15, San Valentino in 20, Rovereto in 25 e il Lago di Garda in circa 30.',
  'Ci sono parcheggi liberi e gratuiti disponibili a pochi minuti dalla struttura, alla chiesa e in fondo alla via, con ampia disponibilità. Vi preghiamo gentilmente di non parcheggiare in strada di fronte alla struttura.',
  "Sì: l'autobus B305 Saccone-Brentonico-Mori-Rovereto ferma all'entrata di Prada. La stazione dei treni più vicina è Rovereto.",
]

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/­/g, '').replace(/\s+/g, ' ').trim()
}

async function mountHome(locale: SiteLocale): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale(locale)
  const wrapper = await mountSuspended(homePages[locale], { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

function ldJsonScripts(): Array<Record<string, unknown>> {
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')].map(script => JSON.parse(script.innerHTML))
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('homeFaq content', () => {
  it('keeps the approved Italian text verbatim', () => {
    const italian = homeFaq('it')

    expect(italian.heading).toBe('Domande frequenti')
    expect(italian.lead).toBe('Le domande che ci fate più spesso prima di arrivare.')
    expect(italian.items.map(item => item.question)).toEqual(italianQuestions)
    expect(italian.items.map(item => item.answer)).toEqual(italianAnswers)
    expect(italian.items[1].link).toEqual({ text: 'Alcuni percorsi sono descritti su', label: 'Visit Rovereto', href: 'https://www.visitrovereto.it/info/guide/percorsi-trekking-monte-baldo/' })
    expect(italian.items.filter(item => item.link)).toHaveLength(1)
  })

  it.each(['en', 'de'] as SiteLocale[])('has the six items, the link, the facts and no forbidden word in %s', (locale) => {
    const content = homeFaq(locale)
    const serialized = JSON.stringify(content)

    expect(content.items).toHaveLength(6)
    expect(content.items[1].link?.href).toBe(homeFaq('it').items[1].link?.href)
    expect(serialized).toContain('776')
    expect(serialized).toContain('B305')
    forbiddenWords.forEach(word => expect(serialized.toLowerCase()).not.toContain(word))
  })

  it('appends the link sentence to the plain answer', () => {
    const item = homeFaq('it').items[1]
    expect(faqPlainAnswer(item)).toBe(`${item.answer} Alcuni percorsi sono descritti su Visit Rovereto.`)
    expect(faqPlainAnswer(homeFaq('it').items[0])).toBe(italianAnswers[0])
  })
})

describe.each(['it', 'en', 'de'] as SiteLocale[])('faqPageJsonLd(%s)', (locale) => {
  it('is a parseable FAQPage with one question per item', () => {
    const jsonLd = JSON.parse(JSON.stringify(faqPageJsonLd(locale)))

    expect(jsonLd['@type']).toBe('FAQPage')
    expect(jsonLd.mainEntity.map((entity: { name: string }) => entity.name)).toEqual(homeFaq(locale).items.map(item => item.question))
  })

  it('gives the same words as the answer a visitor reads on the mounted page', async () => {
    const home = await mountHome(locale)
    const visibleAnswers = [...home.querySelectorAll('section#faq details p')].map(paragraph => normalize(paragraph.textContent ?? ''))
    const jsonLdAnswers = (faqPageJsonLd(locale).mainEntity as Array<{ acceptedAnswer: { text: string } }>).map(entity => normalize(entity.acceptedAnswer.text))

    expect(visibleAnswers).toHaveLength(6)
    expect(jsonLdAnswers).toEqual(visibleAnswers)
  })
})

describe('mounted FAQ section', () => {
  it('sits right before the Cammino section with six items and only the first open', async () => {
    const home = await mountHome('it')
    const faqSection = home.querySelector('section#faq') as HTMLElement

    expect(faqSection.nextElementSibling?.id).toBe('cammino')
    expect(faqSection.querySelectorAll('details')).toHaveLength(6)
    expect([...faqSection.querySelectorAll('details')].map(details => details.hasAttribute('open'))).toEqual([true, false, false, false, false, false])
    expect(faqSection.querySelector('h2')?.textContent).toBe('Domande frequenti')
  })

  it('opens the Visit Rovereto link in a new tab with noopener', async () => {
    const home = await mountHome('it')
    const link = home.querySelector('section#faq a') as HTMLAnchorElement

    expect(link.textContent).toBe('Visit Rovereto')
    expect(link.getAttribute('target')).toBe('_blank')
    expect(link.getAttribute('rel')).toContain('noopener')
  })

  it.each(['it', 'en', 'de'] as SiteLocale[])('adds a FAQPage script next to the B&B script on the %s home', async (locale) => {
    const layout = await mountSuspended(DefaultLayout, { route: `/${locale}`, attachTo: document.body })
    mountedWrappers.push(layout)
    await mountHome(locale)

    await vi.waitFor(() => expect(ldJsonScripts().map(script => script['@type']).sort()).toEqual(['BedAndBreakfast', 'FAQPage']))
  })
})
