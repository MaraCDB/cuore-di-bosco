import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
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
  it('reopens the banner after a stored choice', async () => {
    clearNuxtState('cookie-banner-open')
    document.cookie = 'cookie_consent=declined; path=/'
    const wrapper = await mountSuspended(SiteFooter)
    const { isBannerOpen } = useCookieConsent()
    expect(isBannerOpen.value).toBe(false)

    await wrapper.find('button.cookie-preferences').trigger('click')

    expect(isBannerOpen.value).toBe(true)
    wrapper.unmount()
    document.cookie = 'cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  })
})
