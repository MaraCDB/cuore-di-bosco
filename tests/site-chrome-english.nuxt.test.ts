import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/site/header.vue'
import SiteMenu from '~/components/site/menu.vue'
import SiteDock from '~/components/site/dock.vue'
import SiteFooter from '~/components/site/footer.vue'
import SiteToTop from '~/components/site/to-top.vue'
import PhotoCarousel from '~/components/site/photo-carousel.vue'

const currentRoute = vi.hoisted(() => ({ path: '/it' }))

mockNuxtImport('useRoute', () => () => currentRoute)

const mountedWrappers: Array<{ unmount: () => void }> = []

async function track<T extends { unmount: () => void }>(mounting: Promise<T>): Promise<T> {
  const wrapper = await mounting
  mountedWrappers.push(wrapper)
  return wrapper
}

function linkSummaries(root: ParentNode, selector: string) {
  return [...root.querySelectorAll<HTMLAnchorElement>(selector)].map(link => ({ text: link.getAttribute('aria-label') ?? link.textContent?.trim(), href: link.getAttribute('href') }))
}

const englishMenuTexts = ['Home', 'Rooms', 'Breakfast', 'Explore', 'Rules', 'How to get here', 'Italiano', 'English', 'Deutsch']
const otherLanguageNames = ['Italiano', 'Deutsch']

afterEach(() => {
  currentRoute.path = '/it'
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('English site chrome', () => {
  beforeEach(async () => {
    currentRoute.path = '/en/booking'
    await useNuxtApp().$i18n.setLocale('en')
  })

  afterEach(async () => {
    await useNuxtApp().$i18n.setLocale('it')
  })

  it('shows the English header links, with the language links going to the Italian and German twins', async () => {
    const wrapper = await track(mountSuspended(SiteHeader, { attachTo: document.body }))
    const links = linkSummaries(wrapper.element, 'nav a')

    expect(links.map(link => link.text)).toEqual([...englishMenuTexts, 'Book'])
    links.filter(link => !otherLanguageNames.includes(link.text ?? '')).forEach(link => expect(link.href).toMatch(/^\/en/))
    expect(links.find(link => link.text === 'Italiano')?.href).toBe('/it/prenota')
    expect(links.find(link => link.text === 'Deutsch')?.href).toBe('/de/buchen')
    expect(wrapper.element.querySelector('nav')?.getAttribute('aria-label')).toBe('Main')
    expect(wrapper.find('button.menu').text()).toBe('Menu')
  })

  it('shows the same links in the open menu with an English close button', async () => {
    await track(mountSuspended(SiteMenu, { props: { open: true }, attachTo: document.body }))
    const panel = document.querySelector('[role=dialog]') as HTMLElement
    const links = linkSummaries(panel, 'a')

    expect(links.map(link => link.text)).toEqual(englishMenuTexts)
    links.filter(link => !otherLanguageNames.includes(link.text ?? '')).forEach(link => expect(link.href).toMatch(/^\/en/))
    expect(links.find(link => link.text === 'Italiano')?.href).toBe('/it/prenota')
    expect(links.find(link => link.text === 'Deutsch')?.href).toBe('/de/buchen')
    expect(panel.querySelector('.menu-close')?.textContent).toBe('Close')
    expect(panel.querySelector('nav')?.getAttribute('aria-label')).toBe('Site pages')
  })

  it('labels the dock in English and links to the English pages', async () => {
    const wrapper = await track(mountSuspended(SiteDock))
    const links = linkSummaries(wrapper.element, 'a')

    expect(links.map(link => link.text)).toEqual(['Home', 'Call us', 'WhatsApp', 'Email us', 'Book'])
    expect(links[0].href).toBe('/en#top')
    expect(links[4].href).toBe('/en/booking')
    expect(wrapper.element.getAttribute('aria-label')).toBe('Quick contacts')
  })

  it('translates the footer and keeps the address as is', async () => {
    const wrapper = await track(mountSuspended(SiteFooter))
    const element = wrapper.element as HTMLElement

    expect(element.querySelector('h2')?.textContent).toBe('We\'re waiting for you!')
    expect(element.querySelector('.footer-welcome p')?.textContent).toBe('Booking is very easy: you can email us at info@cuoredibosco.it or send a WhatsApp or Telegram message to 349 4960228, and we\'ll reply as soon as possible!')
    expect(linkSummaries(element, '.footer-welcome p a').map(link => link.href)).toEqual(['mailto:info@cuoredibosco.it', 'https://wa.me/393494960228'])
    expect([...element.querySelectorAll('.footer-contacts a')].map(link => link.getAttribute('aria-label'))).toEqual([
      'Call us at 349 4960228',
      'Message us on WhatsApp',
      'Email us at info@cuoredibosco.it',
      'Cuore di Bosco on Facebook',
      'Cuore di Bosco on Instagram',
    ])
    expect(element.querySelector('.footer-legal a')?.getAttribute('href')).toBe('/en/privacy-policy')
    expect(element.querySelector('.footer-info p')?.textContent).toBe('B&B Cuore di BoscoVia Gardesani, 15Brentonico – fraz. Prada (TN)')
  })

  it('opens the cookie preferences from the English footer button', async () => {
    clearNuxtState('cookie-banner-open')
    document.cookie = 'cookie_consent=declined; path=/'
    const wrapper = await track(mountSuspended(SiteFooter))
    const button = wrapper.find('button.cookie-preferences')
    const { isBannerOpen } = useCookieConsent()

    expect(button.text()).toBe('Cookie preferences')
    expect(isBannerOpen.value).toBe(false)
    await button.trigger('click')
    expect(isBannerOpen.value).toBe(true)
    document.cookie = 'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  })

  it('labels the carousel controls in English', async () => {
    const wrapper = await track(mountSuspended(PhotoCarousel, { props: { photos: [{ src: '/images/home/bosco-1920.webp', alt: 'A forest path' }], label: 'Photos' } }))
    const element = wrapper.element as HTMLElement

    expect(element.getAttribute('aria-roledescription')).toBe('carousel')
    expect([...element.querySelectorAll('.carousel-controls button')].map(button => button.getAttribute('aria-label'))).toEqual(['Previous photo', 'Pause scrolling', 'Next photo'])
  })

  it('labels the back to top link in English', async () => {
    const wrapper = await track(mountSuspended(SiteToTop))
    expect(wrapper.element.getAttribute('aria-label')).toBe('Back to top')
  })
})

describe('Italian site chrome', () => {
  it('keeps the Italian header links', async () => {
    currentRoute.path = '/it/prenota'
    const wrapper = await track(mountSuspended(SiteHeader, { attachTo: document.body }))
    const links = linkSummaries(wrapper.element, 'nav a')

    expect(links.map(link => link.text)).toEqual(['Home', 'Camere', 'Colazione', 'Esplora', 'Regolamento', 'Come arrivare', 'Italiano', 'English', 'Deutsch', 'Prenota'])
    expect(links.find(link => link.text === 'English')?.href).toBe('/en/booking')
  })
})

describe('lodgingBusinessJsonLd', () => {
  it('points the booking page at the page of each language', () => {
    expect(lodgingBusinessJsonLd('en').tourBookingPage).toContain('/en/booking')
    expect(lodgingBusinessJsonLd('it').tourBookingPage).toContain('/it/prenota')
  })

  it('describes the B&B in the language of the page', () => {
    expect(lodgingBusinessJsonLd('en').description).toMatch(/^B&B in Prada di Brentonico, 776 m, at the Polsa junction/)
    expect(lodgingBusinessJsonLd('it').description).toMatch(/^B&B a Prada di Brentonico, 776 m, sul bivio per Polsa/)
  })
})
