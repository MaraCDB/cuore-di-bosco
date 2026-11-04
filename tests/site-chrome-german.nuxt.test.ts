import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import SiteDock from '~/components/site/dock.vue'
import SiteFooter from '~/components/site/footer.vue'
import SiteToTop from '~/components/site/to-top.vue'
import PhotoCarousel from '~/components/site/photo-carousel.vue'
import CookieBanner from '~/components/cookie-banner.vue'

const currentRoute = vi.hoisted(() => ({ path: '/it' }))

mockNuxtImport('useRoute', () => () => currentRoute)

const mountedWrappers: Array<{ unmount: () => void }> = []

async function track<T extends { unmount: () => void }>(mounting: Promise<T>): Promise<T> {
  const wrapper = await mounting
  mountedWrappers.push(wrapper)
  return wrapper
}

function linkSummaries(root: ParentNode, selector: string) {
  return [...root.querySelectorAll<HTMLAnchorElement>(selector)].map(link => ({ text: link.textContent?.trim(), href: link.getAttribute('href') }))
}

function openCookieBanner() {
  document.cookie = 'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  clearNuxtState('cookie-banner-open')
}

const forbiddenWords = ['kaution', 'anzahlung', 'stornierung', 'erstattung', 'verleih', 'vermietung', 'kostenpflichtig', 'picknick-tag', 'noleggio', 'rental', 'pic nic']

afterEach(() => {
  currentRoute.path = '/it'
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('German site chrome', () => {
  beforeEach(async () => {
    currentRoute.path = '/de/buchen'
    await useNuxtApp().$i18n.setLocale('de')
  })

  afterEach(async () => {
    await useNuxtApp().$i18n.setLocale('it')
  })

  it('labels the dock in German and links to the German booking page', async () => {
    const wrapper = await track(mountSuspended(SiteDock))
    const links = linkSummaries(wrapper.element, 'a')

    expect(links.map(link => link.text)).toEqual(['Startseite', 'Anrufen', 'WhatsApp', 'E-Mail', 'Buchen'])
    expect(links[0].href).toBe('/de/buchen#top')
    expect(links[4].href).toBe('/de/buchen')
    expect(wrapper.element.getAttribute('aria-label')).toBe('Schnellkontakt')
  })

  it('translates the footer and keeps the address as is', async () => {
    const wrapper = await track(mountSuspended(SiteFooter))
    const element = wrapper.element as HTMLElement
    const privacyLink = element.querySelector('.footer-legal a')

    expect(element.querySelector('h2')?.textContent).toBe('Wir freuen uns auf Sie!')
    expect(element.querySelector('.footer-welcome p')?.textContent).toBe('Buchen ist ganz einfach: Schreiben Sie uns eine E-Mail an info@cuoredibosco.it oder eine WhatsApp- oder Telegram-Nachricht an 349 4960228, wir antworten Ihnen so schnell wie möglich!')
    expect(linkSummaries(element, '.footer-welcome p a').map(link => link.href)).toEqual(['mailto:info@cuoredibosco.it', 'https://wa.me/393494960228'])
    expect(privacyLink?.textContent).toBe('Datenschutz')
    expect(privacyLink?.getAttribute('href')).toBe('/de/buchen')
    expect(wrapper.find('button.cookie-preferences').text()).toBe('Cookie-Einstellungen')
    expect(element.querySelector('.footer-info p')?.textContent).toBe('B&B Cuore di BoscoVia Gardesani, 15Brentonico – fraz. Prada (TN)')
  })

  it('shows the cookie banner in German with the policy link on the German booking page', async () => {
    openCookieBanner()
    const wrapper = await track(mountSuspended(CookieBanner))

    expect(wrapper.find('.cookie-text').text().startsWith('Wir verwenden Cookies für statistische Analysen (Google Analytics).\nSind Sie damit einverstanden?')).toBe(true)
    expect(wrapper.find('.cookie-text a').attributes('href')).toBe('/de/buchen')
    expect(wrapper.findAll('.cookie-buttons button').map(button => button.text())).toEqual(['Akzeptieren', 'Ablehnen'])
  })

  it('labels the carousel controls in German', async () => {
    const wrapper = await track(mountSuspended(PhotoCarousel, { props: { photos: [{ src: '/images/home/bosco-1920.webp', alt: 'Ein Waldweg' }], label: 'Fotos' } }))
    const element = wrapper.element as HTMLElement

    expect(element.getAttribute('aria-roledescription')).toBe('Karussell')
    expect([...element.querySelectorAll('.carousel-controls button')].map(button => button.getAttribute('aria-label'))).toEqual(['Vorheriges Foto', 'Bildlauf anhalten', 'Nächstes Foto'])
  })

  it('labels the back to top link in German', async () => {
    const wrapper = await track(mountSuspended(SiteToTop))
    expect(wrapper.element.getAttribute('aria-label')).toBe('Nach oben')
  })
})

describe('Italian cookie banner', () => {
  it('keeps the Italian policy link', async () => {
    currentRoute.path = '/it/prenota'
    openCookieBanner()
    const wrapper = await track(mountSuspended(CookieBanner))

    expect(wrapper.find('.cookie-text a').attributes('href')).toBe('/it/privacy-policy')
  })
})

describe('German JSON-LD', () => {
  it('points the booking page at the German booking page', () => {
    expect(lodgingBusinessJsonLd('de').tourBookingPage).toBe('https://www.cuoredibosco.it/de/buchen')
  })

  it('uses none of the forbidden words', () => {
    const germanJsonLd = JSON.stringify(lodgingBusinessJsonLd('de')).toLowerCase()
    forbiddenWords.forEach(word => expect(germanJsonLd).not.toContain(word))
  })

  it('leaves the Italian and English descriptions as they are', () => {
    expect(lodgingBusinessJsonLd('en').description).toMatch(/^Family-friendly B&B/)
    expect(lodgingBusinessJsonLd('it').description).toMatch(/^B&B per famiglie/)
  })
})

describe('German translation keys', () => {
  it('has the same keys as the English file', () => {
    const germanKeys = Object.keys(JSON.parse(readFileSync('i18n/locales/de.json', 'utf8')))
    const englishKeys = Object.keys(JSON.parse(readFileSync('i18n/locales/en.json', 'utf8')))
    expect(germanKeys).toEqual(englishKeys)
  })
})
