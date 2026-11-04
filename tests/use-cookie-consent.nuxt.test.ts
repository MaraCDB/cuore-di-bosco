import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CookieBanner from '~/components/cookie-banner.vue'
import cookieBannerSource from '~/components/cookie-banner.vue?raw'
import dockSource from '~/components/site/dock.vue?raw'
import defaultLayoutSource from '~/layouts/default.vue?raw'
import SiteFooter from '~/components/site/footer.vue'
import gtagPlugin from '~/plugins/gtag.client'
import { expireDeclinedAnalyticsCookies, useCookieConsent } from '~/composables/use-cookie-consent'

const DISABLE_FLAG = `ga-disable-${GA_MEASUREMENT_ID}`

function clearAnalyticsWindowState() {
  Reflect.deleteProperty(window, DISABLE_FLAG)
  Reflect.deleteProperty(window, 'gtag')
}

function clearAllCookies() {
  document.cookie.split(';').forEach((entry) => {
    const name = entry.split('=')[0].trim()
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    }
  })
}

function findCookieOwner(): Document {
  let candidate: object | null = document
  while (candidate && !Object.getOwnPropertyDescriptor(candidate, 'cookie')) {
    candidate = Object.getPrototypeOf(candidate)
  }
  return candidate as Document
}

describe('useCookieConsent', () => {
  let reloadSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
    reloadSpy = vi.fn()
    vi.stubGlobal('location', { ...window.location, hostname: 'localhost', reload: reloadSpy })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    clearAllCookies()
    clearAnalyticsWindowState()
  })

  it('opens the banner when no choice was stored', () => {
    const { isBannerOpen } = useCookieConsent()

    expect(isBannerOpen.value).toBe(true)
  })

  it('keeps the banner closed when a choice was stored', () => {
    document.cookie = 'cookie_consent=declined; path=/'

    const { isBannerOpen } = useCookieConsent()

    expect(isBannerOpen.value).toBe(false)
  })

  it('closes the banner without reloading when declining with no previous choice', async () => {
    const { isBannerOpen, decline } = useCookieConsent()

    decline()
    await nextTick()

    expect(isBannerOpen.value).toBe(false)
    expect(document.cookie).toContain('cookie_consent=declined')
    expect(reloadSpy).not.toHaveBeenCalled()
  })

  it('stores the acceptance, closes the banner and reloads', async () => {
    const { isBannerOpen, accept } = useCookieConsent()

    accept()
    await nextTick()

    expect(isBannerOpen.value).toBe(false)
    expect(document.cookie).toContain('cookie_consent=accepted')
    expect(reloadSpy).toHaveBeenCalledTimes(1)
  })

  it('reopens the banner on request', () => {
    document.cookie = 'cookie_consent=declined; path=/'
    const { isBannerOpen, openPreferences } = useCookieConsent()

    openPreferences()

    expect(isBannerOpen.value).toBe(true)
  })

  it('removes the analytics cookies and reloads when revoking a previous acceptance', async () => {
    document.cookie = 'cookie_consent=accepted; path=/'
    document.cookie = '_ga=1; path=/'
    document.cookie = '_ga_TXLTJ3ZLGZ=2; path=/'
    const { isBannerOpen, openPreferences, decline } = useCookieConsent()

    openPreferences()
    decline()
    await nextTick()

    expect(isBannerOpen.value).toBe(false)
    expect(document.cookie).toContain('cookie_consent=declined')
    expect(document.cookie).not.toContain('_ga')
    expect(reloadSpy).toHaveBeenCalledTimes(1)
  })
})

describe('analytics opt-out', () => {
  let reloadSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
    reloadSpy = vi.fn()
    vi.stubGlobal('location', { ...window.location, hostname: 'localhost', reload: reloadSpy })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    clearAllCookies()
    clearAnalyticsWindowState()
  })

  it('sets the opt-out flag before the first analytics cookie is expired', () => {
    document.cookie = 'cookie_consent=accepted; path=/'
    document.cookie = '_ga=1; path=/'
    const flagWhenExpired: unknown[] = []
    const cookieOwner = findCookieOwner()
    const originalDescriptor = Object.getOwnPropertyDescriptor(cookieOwner, 'cookie')!
    const setterSpy = vi.spyOn(cookieOwner, 'cookie', 'set').mockImplementation(function (this: Document, value: string) {
      if (value.startsWith('_ga=;')) {
        flagWhenExpired.push((window as unknown as Record<string, unknown>)[DISABLE_FLAG])
      }
      originalDescriptor.set!.call(this, value)
    })
    const { decline } = useCookieConsent()

    try {
      decline()
    }
    finally {
      setterSpy.mockRestore()
    }

    expect(flagWhenExpired.length).toBeGreaterThan(0)
    expect(flagWhenExpired.every(flag => flag === true)).toBe(true)
  })

  it('denies analytics storage through gtag when it is loaded', () => {
    const gtagSpy = vi.fn();
    (window as unknown as Record<string, unknown>).gtag = gtagSpy
    const { decline } = useCookieConsent()

    decline()

    expect(gtagSpy).toHaveBeenCalledWith('consent', 'update', { analytics_storage: 'denied' })
  })

  it('expires leftover analytics cookies on decline even without an accepted choice, without reloading', async () => {
    document.cookie = '_ga=1; path=/'
    document.cookie = '_ga_TXLTJ3ZLGZ=2; path=/'
    const { decline } = useCookieConsent()

    decline()
    await nextTick()

    expect(document.cookie).not.toContain('_ga')
    expect(document.cookie).toContain('cookie_consent=declined')
    expect(reloadSpy).not.toHaveBeenCalled()
  })

  it('expires leftover analytics cookies on start when the stored choice is declined', () => {
    document.cookie = 'cookie_consent=declined; path=/'
    document.cookie = '_ga_TXLTJ3ZLGZ=2; path=/'

    expireDeclinedAnalyticsCookies()

    expect(document.cookie).not.toContain('_ga')
    expect(document.cookie).toContain('cookie_consent=declined')
  })

  it('keeps analytics cookies on start when the choice is accepted or missing', () => {
    document.cookie = '_ga=1; path=/'
    expireDeclinedAnalyticsCookies()
    expect(document.cookie).toContain('_ga=1')

    document.cookie = 'cookie_consent=accepted; path=/'
    expireDeclinedAnalyticsCookies()
    expect(document.cookie).toContain('_ga=1')
  })

  it('runs the start cleanup from the gtag plugin without loading the script', async () => {
    document.cookie = 'cookie_consent=declined; path=/'
    document.cookie = '_ga=1; path=/'
    const scriptsBefore = document.head.querySelectorAll('script').length

    await (gtagPlugin as unknown as (nuxtApp: ReturnType<typeof useNuxtApp>) => Promise<void>)(useNuxtApp())

    expect(document.cookie).not.toContain('_ga')
    expect(document.head.querySelectorAll('script').length).toBe(scriptsBefore)
  })
})

describe('footer cookie preferences button', () => {
  afterEach(() => {
    clearAllCookies()
  })

  it('reopens the banner after a stored choice', async () => {
    clearNuxtState('cookie-banner-open')
    document.cookie = 'cookie_consent=declined; path=/'
    const wrapper = await mountSuspended(SiteFooter)
    const { isBannerOpen } = useCookieConsent()
    expect(isBannerOpen.value).toBe(false)

    await wrapper.find('button.cookie-preferences').trigger('click')

    expect(isBannerOpen.value).toBe(true)
    wrapper.unmount()
  })
})

describe('analytics cookie expiry domains', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    clearAllCookies()
  })

  it('targets the host and every parent domain down to the registrable one, never the bare TLD', () => {
    vi.stubGlobal('location', { ...window.location, hostname: 'www.example.it', reload: vi.fn() })
    document.cookie = 'cookie_consent=accepted; path=/'
    document.cookie = '_ga=1; path=/'
    const writes: string[] = []
    const cookieOwner = findCookieOwner()
    const originalDescriptor = Object.getOwnPropertyDescriptor(cookieOwner, 'cookie')!
    const setterSpy = vi.spyOn(cookieOwner, 'cookie', 'set').mockImplementation(function (this: Document, value: string) {
      writes.push(value)
      originalDescriptor.set!.call(this, value)
    })
    const { decline } = useCookieConsent()

    try {
      decline()
    }
    finally {
      setterSpy.mockRestore()
    }

    const expiryDomains = writes
      .filter(write => write.startsWith('_ga=;'))
      .map(write => write.match(/domain=([^;]+)/)?.[1])
    expect(expiryDomains).toEqual([undefined, 'www.example.it', '.www.example.it', 'example.it', '.example.it'])
  })
})

describe('CookieBanner focus', () => {
  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
    clearNuxtState('cookie-banner-focus-request')
  })

  afterEach(() => {
    clearAllCookies()
  })

  it('moves focus to the accept button when the banner is reopened from the preferences link', async () => {
    document.cookie = 'cookie_consent=declined; path=/'
    const wrapper = await mountSuspended(CookieBanner, { attachTo: document.body })
    expect(wrapper.find('.cookie-banner').exists()).toBe(false)

    useCookieConsent().openPreferences()
    await nextTick()
    await nextTick()

    expect(document.activeElement).toBe(wrapper.get('.button-light').element)
    expect(useCookieConsent().shouldFocusBanner.value).toBe(false)
    wrapper.unmount()
  })

  it('does not take focus when the first-visit banner shows at load', async () => {
    const wrapper = await mountSuspended(CookieBanner, { attachTo: document.body })
    await nextTick()
    await nextTick()

    expect(wrapper.find('.cookie-banner').exists()).toBe(true)
    expect(document.activeElement).not.toBe(wrapper.get('.button-light').element)
    wrapper.unmount()
  })
})

describe('CookieBanner position', () => {
  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
  })

  it('offsets the banner above the dock plus the safe area', () => {
    expect(cookieBannerSource).toMatch(/\.cookie-banner\s*\{[^}]*bottom:\s*calc\(var\(--dock-height\) \+ env\(safe-area-inset-bottom\)\);/)
  })

  it('follows the dock height on mobile and desktop', () => {
    const globalStyles = readFileSync('assets/css/global.css', 'utf8')
    const mobileDockHeight = globalStyles.match(/:root\{[^}]*--dock-height:(\d+)px/)?.[1]
    const desktopDockHeight = globalStyles.match(/@media \(min-width:901px\)\{\s*:root\{[^}]*--dock-height:(\d+)px/)?.[1]

    expect(mobileDockHeight).toBe('64')
    expect(desktopDockHeight).toBe('56')
    expect(dockSource).toMatch(/\.dock-inner\{[^}]*min-height:var\(--dock-height\)/)
    expect(cookieBannerSource).not.toContain('72px')
  })
})

describe('CookieBanner style', () => {
  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
  })

  it('renders the redesigned banner with pill buttons', async () => {
    const wrapper = await mountSuspended(CookieBanner)
    expect(wrapper.find('.cookie-banner').classes()).toContain('redesign')
    expect(wrapper.findAll('.cookie-buttons button').map(button => button.classes())).toEqual([
      ['button', 'button-light'],
      ['button', 'button-quiet'],
    ])
    wrapper.unmount()
  })

  it('starts the consent question on a new line', async () => {
    const wrapper = await mountSuspended(CookieBanner)
    expect(wrapper.find('.cookie-text').text()).toContain('(Google Analytics).\n')
    wrapper.unmount()

    expect(cookieBannerSource).toMatch(/\.cookie-text \{[^}]*white-space: pre-line;/)
  })

  it('is rendered without props by the default layout', () => {
    expect(defaultLayoutSource).toMatch(/<CookieBanner \/>/)
  })
})
