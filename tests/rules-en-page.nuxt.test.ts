import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishRulesPage from '~/pages/en/rules.vue'
import ItalianRulesPage from '~/pages/it/regolamento.vue'

const englishSource = readFileSync('pages/en/rules.vue', 'utf8')
const rulesStyles = readFileSync('assets/css/pages/rules.css', 'utf8')
const forbiddenWords = ['picnic', '15th day', 'rental', 'vacation', 'tranquility', 'stroller', 'linens', 'behavioral']
const cancellationSentence = 'if you cancel up to the 7th day before arrival, we will refund the deposit paid in full.'
const onlinePaymentSentence = 'Online booking: your credit card is requested as a guarantee only, and nothing is paid at the time of booking.'
const directPaymentSentence = 'Direct booking (phone or email): once the booking is confirmed, we require a deposit of 35% of the total amount by bank transfer.'
const onlineCancellationSentence = 'Online booking: free cancellation up to the 7th day before arrival.'
const voucherSentence = 'For cancellations in the last 7 days, we can offer a voucher for the amount paid, valid for another stay within 12 months'
const dietsParagraph = 'We are happy to meet any dietary requirement: vegetarian, vegan, intolerances or allergies. Please let us know in good time before your arrival so that we can offer you a suitable choice.'
const inRoomBreakfastSentence = 'We can also prepare a breakfast to be enjoyed in your room (on request).'

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map(node => normalize(node.textContent ?? ''))
}

async function mountEnglish(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('en')
  const wrapper = await mountSuspended(EnglishRulesPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

async function mountItalian(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('it')
  const wrapper = await mountSuspended(ItalianRulesPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

function elementClassNames(root: HTMLElement): string[] {
  return [...root.querySelectorAll('*')].map(node => node.className).filter(className => typeof className === 'string' && className !== '')
}

function imageSources(root: HTMLElement): (string | null)[] {
  return [...root.querySelectorAll('img')].map(image => image.getAttribute('src'))
}

function accessibleLabels(root: HTMLElement): string[] {
  return [...root.querySelectorAll('[alt], [aria-label]')]
    .flatMap(node => [node.getAttribute('alt'), node.getAttribute('aria-label')])
    .filter((label): label is string => Boolean(label))
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('english rules page', () => {
  it('has the same classes and photos as the italian page', async () => {
    const italian = await mountItalian()
    const italianClassNames = elementClassNames(italian)
    const italianSources = imageSources(italian)
    const english = await mountEnglish()

    expect(elementClassNames(english)).toEqual(italianClassNames)
    expect(imageSources(english)).toEqual(italianSources)
    expect(italianSources).toHaveLength(1)
  })

  it('lists thirteen uppercase rules and keeps the conduct rules in the same place', async () => {
    const italianCards = [...(await mountItalian()).querySelectorAll('.rules > .rule')]
    const italianConductIndex = italianCards.findIndex(card => card.classList.contains('rule-conduct'))
    const english = await mountEnglish()
    const cards = [...english.querySelectorAll('.rules > .rule')]
    const titles = blockTexts(english, '.rules > .rule > h2')

    expect(cards).toHaveLength(13)
    expect(cards.findIndex(card => card.classList.contains('rule-conduct'))).toBe(italianConductIndex)
    expect(titles).toHaveLength(13)
    expect(titles.filter(title => title !== title.toUpperCase())).toEqual([])
    expect(titles[0]).toBe('RATES AND INCLUDED SERVICES')
    expect(titles[12]).toBe('ACCESS TO THE PROPERTY')
  })

  it('splits payment and cancellation into online and direct booking and keeps the diets paragraph', async () => {
    const english = await mountEnglish()
    const pageText = normalize(english.textContent ?? '')

    expect(pageText).toContain(cancellationSentence)
    expect(pageText).toContain(onlinePaymentSentence)
    expect(pageText).toContain(directPaymentSentence)
    expect(pageText).toContain(onlineCancellationSentence)
    expect(pageText).toContain(voucherSentence)
    expect(pageText).not.toContain('except in high season')
    expect(pageText).not.toContain('or with the online booking')
    expect(pageText).toContain(dietsParagraph)
    expect(pageText).toContain(inRoomBreakfastSentence)
    ;['vegetarian', 'vegan', 'intolerances', 'allergies'].forEach(word => expect(pageText).toContain(word))
  })

  it('keeps removed content out', async () => {
    const english = await mountEnglish()
    const pageText = normalize(english.textContent ?? '').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toMatch(/\bhire\b/)
  })

  it('translates the photo description', async () => {
    const italianLabels = accessibleLabels(await mountItalian())
    const englishLabels = accessibleLabels(await mountEnglish())

    expect(englishLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(0)
    englishLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('uses plain text in the template, the shared styles and the redesign layout', () => {
    expect(englishSource).not.toContain('v-html')
    expect(englishSource).not.toContain('v-for')
    expect(englishSource).not.toContain('definePageMeta')
    expect(englishSource).toContain('<style scoped src="../../assets/css/pages/rules.css"></style>')
    expect(rulesStyles).not.toMatch(/#[a-z]/)
  })
})
