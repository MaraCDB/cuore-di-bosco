const CONSENT_COOKIE = 'cookie_consent'
const ANALYTICS_COOKIE_PREFIX = '_ga'
const EXPIRED_DATE = 'Thu, 01 Jan 1970 00:00:00 GMT'

function getCookieDomains(hostname: string) {
  const labels = hostname.split('.')
  const domains: string[] = []
  for (let start = 0; labels.length - start >= 2; start++) {
    const suffix = labels.slice(start).join('.')
    domains.push(suffix, `.${suffix}`)
  }
  return domains
}

function expireAnalyticsCookies() {
  const domains = getCookieDomains(window.location.hostname)
  document.cookie
    .split(';')
    .map(entry => entry.split('=')[0].trim())
    .filter(name => name.startsWith(ANALYTICS_COOKIE_PREFIX))
    .forEach((name) => {
      const expired = `${name}=; expires=${EXPIRED_DATE}; path=/`
      document.cookie = expired
      domains.forEach((domain) => {
        document.cookie = `${expired}; domain=${domain}`
      })
    })
}

function reloadAfterCookieWrite() {
  nextTick(() => window.location.reload())
}

/**
 * Shared state and actions for the cookie consent banner, so the choice can be changed at any time.
 */
export function useCookieConsent() {
  const consentCookie = useCookie<string | null | undefined>(CONSENT_COOKIE)
  const hasStoredChoice = () => consentCookie.value === 'accepted' || consentCookie.value === 'declined'

  const isBannerOpen = useState<boolean>('cookie-banner-open', () => import.meta.client && !hasStoredChoice())

  if (getCurrentInstance()) {
    onMounted(() => {
      isBannerOpen.value = !hasStoredChoice()
    })
  }

  function openPreferences() {
    isBannerOpen.value = true
  }

  function accept() {
    consentCookie.value = 'accepted'
    isBannerOpen.value = false
    reloadAfterCookieWrite()
  }

  function decline() {
    const wasAccepted = consentCookie.value === 'accepted'
    consentCookie.value = 'declined'
    isBannerOpen.value = false
    if (wasAccepted) {
      expireAnalyticsCookies()
      reloadAfterCookieWrite()
    }
  }

  return { isBannerOpen, openPreferences, accept, decline }
}
