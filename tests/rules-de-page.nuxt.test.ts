import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import GermanRulesPage from '~/pages/de/hausordnung.vue'
import ItalianRulesPage from '~/pages/it/regolamento.vue'

const germanSource = readFileSync('pages/de/hausordnung.vue', 'utf8')
const rulesStyles = readFileSync('assets/css/pages/rules.css', 'utf8')
const forbiddenWords = ['kaution', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick', 'noleggio', 'rental', '15. tag']
const expectedTitles = [
  'PREISE UND INKLUSIVLEISTUNGEN',
  'BUCHUNG UND KONTAKT',
  'ZAHLUNGSBEDINGUNGEN',
  'STORNIERUNGSBEDINGUNGEN',
  'CHECK-IN UND AUSWEISDOKUMENTE',
  'ZEITEN',
  'SICHERHEIT UND HAFTUNG',
  'HAUSREGELN',
  'REINIGUNG UND INSTANDHALTUNG',
  'FRÜHSTÜCK',
  'VERHALTENSREGELN',
  'EXTERNE DIENSTLEISTUNGEN',
  'ZUGANG ZUR UNTERKUNFT',
]
const hyphenatedTitleParts = [
  'INKLUSIV­LEISTUNGEN',
  'ZAHLUNGS­BEDINGUNGEN',
  'STORNIERUNGS­BEDINGUNGEN',
  'AUSWEIS­DOKUMENTE',
  'INSTAND­HALTUNG',
  'VERHALTENS­REGELN',
  'DIENST­LEISTUNGEN',
]
const cancellationSentence = 'Wenn Sie bis zum 7. Tag vor der Anreise stornieren, erstatten wir die geleistete Anzahlung vollständig.'
const rescheduleSentence = 'Nach vorheriger Absprache kann der Aufenthalt bei gesundheitlichen Problemen oder unaufschiebbaren Verpflichtungen auf einen anderen Termin verschoben werden, außer in der Hochsaison.'
const dietsParagraph = 'Wir sind für jeden Ernährungswunsch da: vegetarisch, vegan, bei Unverträglichkeiten oder Allergien. Bitte sagen Sie uns rechtzeitig vor Ihrer Anreise Bescheid, damit wir Ihnen eine passende Auswahl anbieten können.'
const inRoomBreakfastSentence = 'Außerdem können wir ein Frühstück zum Verzehr auf dem Zimmer zubereiten (auf Anfrage).'

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/­/g, '').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map(node => normalize(node.textContent ?? ''))
}

async function mountGerman(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('de')
  const wrapper = await mountSuspended(GermanRulesPage, { attachTo: document.body })
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

describe('german rules page', () => {
  it('has the same classes and photos as the italian page', async () => {
    const italian = await mountItalian()
    const italianClassNames = elementClassNames(italian)
    const italianSources = imageSources(italian)
    const german = await mountGerman()

    expect(elementClassNames(german)).toEqual(italianClassNames)
    expect(imageSources(german)).toEqual(italianSources)
    expect(italianSources).toHaveLength(1)
  })

  it('lists thirteen uppercase rules and keeps the conduct rules in the same place', async () => {
    const italianCards = [...(await mountItalian()).querySelectorAll('.rules > .rule')]
    const italianConductIndex = italianCards.findIndex(card => card.classList.contains('rule-conduct'))
    const german = await mountGerman()
    const cards = [...german.querySelectorAll('.rules > .rule')]
    const titles = blockTexts(german, '.rules > .rule > h2')

    expect(italianCards).toHaveLength(13)
    expect(cards).toHaveLength(13)
    expect(cards.findIndex(card => card.classList.contains('rule-conduct'))).toBe(italianConductIndex)
    expect(blockTexts(german, 'h1')).toEqual(['Hausordnung'])
    expect(titles).toEqual(expectedTitles)
    expect(titles.filter(title => title !== title.toUpperCase())).toEqual([])
  })

  it('puts soft hyphens into the long uppercase titles', async () => {
    const german = await mountGerman()
    const rawTitles = [...german.querySelectorAll('.rules > .rule > h2')].map(node => node.textContent ?? '').join(' ')

    hyphenatedTitleParts.forEach(part => expect(rawTitles).toContain(part))
  })

  it('states the payment, the 7-day cancellation, the reschedule sentence and the diets paragraph', async () => {
    const german = await mountGerman()
    const pageText = normalize(german.textContent ?? '')

    expect(pageText).toContain(cancellationSentence)
    expect(pageText).toContain(rescheduleSentence)
    expect(pageText).toContain(dietsParagraph)
    expect(pageText).toContain(inRoomBreakfastSentence)
    expect(pageText).toContain('Anzahlung')
    expect(pageText).toContain('35')
    ;['vegetarisch', 'vegan', 'Unverträglichkeiten', 'Allergien'].forEach(word => expect(pageText).toContain(word))
  })

  it('keeps removed content out', async () => {
    const german = await mountGerman()
    const pageText = normalize(german.textContent ?? '').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
  })

  it('translates the photo description', async () => {
    const italianLabels = accessibleLabels(await mountItalian())
    const germanLabels = accessibleLabels(await mountGerman())

    expect(germanLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(0)
    germanLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('uses plain text in the template, the shared styles and the head drafts', () => {
    expect(germanSource).not.toContain('v-html')
    expect(germanSource).not.toContain('v-for')
    expect(germanSource).not.toContain('definePageMeta')
    expect(germanSource).toContain('name: "keywords"')
    expect(germanSource).toContain('name: "twitter:card"')
    expect(germanSource).toContain('<style scoped src="../../assets/css/pages/rules.css"></style>')
    expect(germanSource).toContain('link: [{ rel: "canonical", href: "https://www.cuoredibosco.it/de/hausordnung" }]')
    expect(germanSource).toContain('title: "Hausordnung | Cuore di Bosco – Prada di Brentonico"')
    expect(rulesStyles).not.toMatch(/#[a-z]/)
  })
})
