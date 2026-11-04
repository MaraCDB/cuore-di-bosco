import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'
import SiteLanguageSwitch from '~/components/site/language-switch.vue'
import languageSwitchSource from '~/components/site/language-switch.vue?raw'

const currentRoute = vi.hoisted(() => ({ path: '/it' }))

mockNuxtImport('useRoute', () => () => currentRoute)

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountSwitch(path: string) {
  currentRoute.path = path
  const wrapper = await mountSuspended(SiteLanguageSwitch, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function switchLinks(root: Element) {
  return [...root.querySelectorAll<HTMLAnchorElement>('a')]
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  currentRoute.path = '/it'
  localStorage.clear()
  vi.restoreAllMocks()
  await useNuxtApp().$i18n.setLocale('it')
})

describe('language switch', () => {
  it('lists Italian, English and German with flags, codes and twin links', async () => {
    const wrapper = await mountSwitch('/it/prenota')
    const links = switchLinks(wrapper.element)

    expect(wrapper.element.getAttribute('role')).toBe('group')
    expect(wrapper.element.getAttribute('aria-label')).toBe('Lingua')
    expect(links.map(link => link.getAttribute('aria-label'))).toEqual(['Italiano', 'English', 'Deutsch'])
    expect(links.map(link => link.getAttribute('lang'))).toEqual(['it', 'en', 'de'])
    expect(links.map(link => link.getAttribute('hreflang'))).toEqual(['it', 'en', 'de'])
    expect(links.map(link => link.getAttribute('href'))).toEqual(['/it/prenota', '/en/booking', '/de/buchen'])
    expect(links.map(link => link.getAttribute('aria-current'))).toEqual(['true', null, null])
    expect(links.map(link => link.querySelector('img')?.getAttribute('src'))).toEqual(['/images/flags/it.svg', '/images/flags/gb.svg', '/images/flags/de.svg'])
    links.forEach(link => expect(link.querySelector('img')?.getAttribute('alt')).toBe(''))
    expect(links.map(link => link.textContent?.trim())).toEqual(['IT', 'EN', 'DE'])
  })

  it('finds the twins of a path with a trailing slash', async () => {
    const wrapper = await mountSwitch('/it/esplora/')
    expect(switchLinks(wrapper.element).map(link => link.getAttribute('href'))).toEqual(['/it/esplora', '/en/explore', '/de/buchen'])
  })

  it('marks German as current on the German booking page', async () => {
    await useNuxtApp().$i18n.setLocale('de')
    const wrapper = await mountSwitch('/de/buchen')
    const links = switchLinks(wrapper.element)

    expect(links.map(link => link.getAttribute('aria-current'))).toEqual([null, null, 'true'])
    expect(wrapper.element.getAttribute('aria-label')).toBe('Sprache')
    expect(links[0].getAttribute('href')).toBe('/it/prenota')
  })

  it('stores the clicked language', async () => {
    const wrapper = await mountSwitch('/it/prenota')
    const englishLink = wrapper.find('a[lang=en]')

    wrapper.element.addEventListener('click', event => event.preventDefault(), { capture: true })
    await englishLink.trigger('click')

    expect(localStorage.getItem(LANGUAGE_CHOICE_KEY)).toBe('en')
    expect(LANGUAGE_CHOICE_KEY).toBe('cdb-language')
  })
})

describe('language choice storage', () => {
  it('ignores blocked storage', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => { throw new Error('blocked') })

    expect(() => rememberLanguage('de')).not.toThrow()
    expect(storedLanguage()).toBeNull()
  })
})

describe('language switch source', () => {
  it('never prefetches and never sizes the flag images', () => {
    const nuxtLinks = languageSwitchSource.match(/<NuxtLink[^>]*>/g) ?? []

    expect(nuxtLinks.length).toBeGreaterThan(0)
    nuxtLinks.forEach(tag => expect(tag).toContain('no-prefetch'))
    expect(languageSwitchSource).not.toMatch(/<img[^>]*\s(width|height)=/)
  })
})
