import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import CookieBanner from '~/components/cookie-banner.vue'
import cookieBannerSource from '~/components/cookie-banner.vue?raw'
import SiteFooter from '~/components/site/footer.vue'
import { useCookieConsent } from '~/composables/use-cookie-consent'

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

describe('CookieBanner position', () => {
  beforeEach(() => {
    clearAllCookies()
    clearNuxtState('cookie-banner-open')
  })

  it('applies the dock offset class only when asked', async () => {
    const withDock = await mountSuspended(CookieBanner, { props: { aboveDock: true } })
    expect(withDock.find('.cookie-banner').classes()).toContain('above-dock')
    withDock.unmount()

    const withoutDock = await mountSuspended(CookieBanner)
    expect(withoutDock.find('.cookie-banner').classes()).not.toContain('above-dock')
    withoutDock.unmount()
  })

  it('offsets the banner above the 64px dock plus the safe area', () => {
    expect(cookieBannerSource).toMatch(/\.cookie-banner\.above-dock\s*\{\s*bottom:\s*calc\(64px \+ env\(safe-area-inset-bottom\)\);/)
  })
})
