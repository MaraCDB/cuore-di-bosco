import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import EnglishPrivacyPage from '~/pages/en/privacy-policy.vue'
import ItalianPrivacyPage from '~/pages/it/privacy-policy.vue'

const openPreferences = vi.hoisted(() => vi.fn())

mockNuxtImport('useCookieConsent', () => () => ({ openPreferences }))

const englishSource = readFileSync('pages/en/privacy-policy.vue', 'utf8')
const privacyStyles = readFileSync('assets/css/pages/privacy.css', 'utf8')
const forbiddenWords = ['tranquility', 'stroller', 'linens', 'personalized']

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function mountEnglish(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('en')
  const wrapper = await mountSuspended(EnglishPrivacyPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper.element as HTMLElement
}

async function mountItalian(): Promise<HTMLElement> {
  await useNuxtApp().$i18n.setLocale('it')
  const wrapper = await mountSuspended(ItalianPrivacyPage, { attachTo: document.body })
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

describe('english privacy policy page', () => {
  it('has the same structure and photo as the italian page', async () => {
    const italian = await mountItalian()
    const italianTopLevel = topLevelClassNames(italian)
    const italianSections = sectionClassNames(italian)
    const italianSources = imageSources(italian)
    const english = await mountEnglish()

    expect(topLevelClassNames(english)).toEqual(italianTopLevel)
    expect(sectionClassNames(english)).toEqual(italianSections)
    expect(imageSources(english)).toEqual(italianSources)
    expect(italianSources).toHaveLength(1)
  })

  it('has six policy cards, each with a heading', async () => {
    const english = await mountEnglish()
    const cards = [...english.querySelectorAll('section.policy-card')]

    expect(cards).toHaveLength(6)
    cards.forEach(card => expect(card.querySelector('h2')).not.toBeNull())
    expect([...english.querySelectorAll('.policy-card h2')].map(heading => normalize(heading.textContent ?? ''))).toEqual([
      'Cuore di Bosco Cookie Policy',
      'What are cookies',
      'Types of cookies used',
      'Cookies used on this site',
      'How to manage cookies',
      'Data Controller',
    ])
  })

  it('opens the cookie preferences from the pill button', async () => {
    const english = await mountEnglish()
    const button = [...english.querySelectorAll('button.button')].find(candidate => normalize(candidate.textContent ?? '') === 'Cookie preferences') as HTMLButtonElement

    expect(button).toBeDefined()
    button.click()

    expect(openPreferences).toHaveBeenCalledTimes(1)
  })

  it('keeps the same mailto link as the italian page', async () => {
    const italianMail = (await mountItalian()).querySelector('a[href^="mailto:"]')?.getAttribute('href')
    const englishMail = (await mountEnglish()).querySelector('a[href^="mailto:"]')?.getAttribute('href')

    expect(englishMail).toBe('mailto:info@cuoredibosco.it')
    expect(englishMail).toBe(italianMail)
  })

  it('points the four browser help links to english pages', async () => {
    const italianHosts = externalHrefs(await mountItalian()).map(href => new URL(href).hostname)
    const englishHrefs = externalHrefs(await mountEnglish())

    expect(englishHrefs.map(href => new URL(href).hostname)).toEqual(italianHosts)
    expect(englishHrefs).toHaveLength(4)
    expect(englishHrefs.filter(href => /hl=it|\/it-it\/|it-it|\/it\//.test(href))).toEqual([])
  })

  it('translates the photo description', async () => {
    const italianLabels = accessibleLabels(await mountItalian())
    const englishLabels = accessibleLabels(await mountEnglish())

    expect(englishLabels).toHaveLength(italianLabels.length)
    expect(italianLabels.length).toBeGreaterThan(0)
    englishLabels.forEach((label, index) => expect(label).not.toBe(italianLabels[index]))
  })

  it('keeps italian text out', async () => {
    const pageText = normalize((await mountEnglish()).textContent ?? '').toLowerCase()

    expect(forbiddenWords.filter(word => pageText.includes(word))).toEqual([])
    expect(pageText).not.toContain('preferenze cookie')
    expect(pageText).not.toContain('titolare')
  })

  it('uses the redesign layout, shared styles and plain markup', () => {
    expect(englishSource).not.toContain('v-html')
    expect(englishSource).not.toContain('definePageMeta')
    expect(englishSource).not.toContain('<NuxtLink')
    expect(englishSource).toContain('<style scoped src="../../assets/css/pages/privacy.css"></style>')
    expect(privacyStyles).not.toMatch(/#[a-z]/)
  })
})
