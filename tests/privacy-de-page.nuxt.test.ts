import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishPrivacyPage from '~/pages/en/privacy-policy.vue'
import GermanPrivacyPage from '~/pages/de/datenschutz.vue'
import ItalianPrivacyPage from '~/pages/it/privacy-policy.vue'

const openPreferences = vi.hoisted(() => vi.fn())

mockNuxtImport('useCookieConsent', () => () => ({ openPreferences }))

const germanSource = readFileSync('pages/de/datenschutz.vue', 'utf8')
const privacyStyles = readFileSync('assets/css/pages/privacy.css', 'utf8')
const forbiddenWords = ['kaution', 'anzahlung', 'stornierung', 'erstattung', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick-tag', 'noleggio', 'rental']
const softHyphen = '­'

const italianLanguageSentence = 'Lingua scelta: quando l’utente clicca su una delle bandierine (IT, EN, DE), il sito salva nel browser del suo dispositivo (localStorage) la voce «cdb-language» con il valore «it», «en» o «de». Serve solo ad aprire l’indirizzo principale del sito nella lingua scelta: resta sul dispositivo, non viene inviata a nessuno e si può cancellare in qualsiasi momento dalle impostazioni del browser.'
const englishLanguageSentence = 'Chosen language: when the user clicks one of the flags (IT, EN, DE), the site saves the entry "cdb-language" with the value "it", "en" or "de" in the browser of their device (localStorage). It is used only to open the site\'s main address in the chosen language: it stays on the device, is not sent to anyone and can be deleted at any time in the browser settings.'
const germanLanguageSentence = 'Gewählte Sprache: Wenn Sie auf eine der Flaggen (IT, EN, DE) klicken, speichert die Website im Browser Ihres Geräts (localStorage) den Eintrag „cdb-language“ mit dem Wert „it“, „en“ oder „de“. Er dient nur dazu, die Hauptadresse der Website in der gewählten Sprache zu öffnen: Er bleibt auf Ihrem Gerät, wird an niemanden weitergegeben und kann jederzeit in den Browsereinstellungen gelöscht werden.'

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(new RegExp(softHyphen, 'g'), '').replace(/\s+/g, ' ').trim()
}

async function mountPage(locale: 'it' | 'en' | 'de'): Promise<HTMLElement> {
  const pages = { it: ItalianPrivacyPage, en: EnglishPrivacyPage, de: GermanPrivacyPage }
  await useNuxtApp().$i18n.setLocale(locale)
  const wrapper = await mountSuspended(pages[locale], { attachTo: document.body })
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

function externalHrefs(root: HTMLElement): string[] {
  return [...root.querySelectorAll('a[href^="http"]')].map(link => link.getAttribute('href') ?? '')
}

afterEach(async () => {
  openPreferences.mockClear()
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useNuxtApp().$i18n.setLocale('it')
})

describe('german privacy policy page', () => {
  it('has the same structure and photo as the italian page', async () => {
    const italian = await mountPage('it')
    const italianTopLevel = topLevelClassNames(italian)
    const italianSections = sectionClassNames(italian)
    const italianSources = imageSources(italian)
    const german = await mountPage('de')

    expect(topLevelClassNames(german)).toEqual(italianTopLevel)
    expect(sectionClassNames(german)).toEqual(italianSections)
    expect(imageSources(german)).toEqual(italianSources)
    expect(italianSources).toHaveLength(1)
  })

  it('has six policy cards, each with a heading', async () => {
    const german = await mountPage('de')
    const cards = [...german.querySelectorAll('section.policy-card')]

    expect(cards).toHaveLength(6)
    cards.forEach(card => expect(card.querySelector('h2')).not.toBeNull())
    expect([...german.querySelectorAll('.policy-card h2')].map(heading => normalize(heading.textContent ?? ''))).toEqual([
      'Cookie-Richtlinie von Cuore di Bosco',
      'Was sind Cookies?',
      'Arten der verwendeten Cookies',
      'Auf dieser Website verwendete Cookies',
      'Cookies verwalten',
      'Verantwortlicher',
    ])
  })

  it('writes the title in capitals with one soft hyphen in the long compound', async () => {
    const heading = (await mountPage('de')).querySelector('h1')

    expect(normalize(heading?.textContent ?? '')).toBe('COOKIE- UND DATENSCHUTZERKLÄRUNG')
    expect(heading?.textContent).toBe(`COOKIE- UND DATENSCHUTZ${softHyphen}ERKLÄRUNG`)
    expect(germanSource.split('&shy;')).toHaveLength(2)
  })

  it('opens the cookie preferences from the pill button', async () => {
    const german = await mountPage('de')
    const button = [...german.querySelectorAll('button.button')].find(candidate => normalize(candidate.textContent ?? '') === 'Cookie-Einstellungen') as HTMLButtonElement

    expect(button).toBeDefined()
    button.click()

    expect(openPreferences).toHaveBeenCalledTimes(1)
  })

  it('keeps the same mailto link as the italian page', async () => {
    const italianMail = (await mountPage('it')).querySelector('a[href^="mailto:"]')?.getAttribute('href')
    const germanMail = (await mountPage('de')).querySelector('a[href^="mailto:"]')?.getAttribute('href')

    expect(germanMail).toBe('mailto:info@cuoredibosco.it')
    expect(germanMail).toBe(italianMail)
  })

  it('points the four browser help links to german pages', async () => {
    const italianHosts = externalHrefs(await mountPage('it')).map(href => new URL(href).hostname)
    const germanHrefs = externalHrefs(await mountPage('de'))

    expect(germanHrefs.map(href => new URL(href).hostname)).toEqual(italianHosts)
    expect(germanHrefs).toHaveLength(4)
    expect(germanHrefs.filter(href => /hl=it|\/it-it\/|it-it|\/it\//.test(href))).toEqual([])
    germanHrefs.forEach(href => expect(href).toMatch(/hl=de|\/de-de\/|\/de\//))
  })

  it('translates the photo description', async () => {
    const italianLabels = accessibleLabels(await mountPage('it'))
    const germanLabels = accessibleLabels(await mountPage('de'))

    expect(germanLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(0)
    germanLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('keeps italian and english text out', async () => {
    const pageText = normalize((await mountPage('de')).textContent ?? '').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toContain('preferenze cookie')
    expect(pageText).not.toContain('titolare')
    expect(pageText).not.toContain('cookie preferences')
  })

  it('uses the redesign layout, shared styles and plain markup', () => {
    expect(germanSource).not.toContain('v-html')
    expect(germanSource).not.toContain('definePageMeta')
    expect(germanSource).not.toContain('<NuxtLink')
    expect(germanSource).not.toContain('name: "keywords"')
    expect(germanSource).toContain('<style scoped src="../../assets/css/pages/privacy.css"></style>')
    expect(germanSource).toContain('https://www.cuoredibosco.it/de/datenschutz')
    expect(privacyStyles).not.toMatch(/#[a-z]/)
  })
})

describe('language-choice sentence on the privacy pages', () => {
  it.each([
    ['it', italianLanguageSentence],
    ['en', englishLanguageSentence],
    ['de', germanLanguageSentence],
  ] as const)('ends the fourth card of the %s page with the sentence, after the list', async (locale, sentence) => {
    const fourthCard = (await mountPage(locale)).querySelector('.policy > section:nth-of-type(4)')
    const lastParagraph = fourthCard?.querySelector('p:last-of-type')

    expect(lastParagraph?.textContent).toBe(sentence)
    expect(lastParagraph?.previousElementSibling?.tagName).toBe('UL')
    expect(fourthCard?.lastElementChild).toBe(lastParagraph)
  })
})
