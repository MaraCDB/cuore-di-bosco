import { SITE_ORIGIN } from './structured-data'
import { twinPath, type SiteLocale } from './site-links'

export type AlternateLink = {
  rel: 'alternate'
  hreflang: SiteLocale | 'x-default'
  href: string
}

const openGraphLocales: Record<SiteLocale, string> = {
  it: 'it_IT',
  en: 'en_GB',
  de: 'de_DE',
}

/**
 * Returns the four hreflang alternate links (it, en, de, x-default) of a page, as absolute URLs; x-default is the Italian twin.
 */
export function alternateLinks(path: string): AlternateLink[] {
  const italianHref = `${SITE_ORIGIN}${twinPath(path, 'it')}`
  return [
    { rel: 'alternate', hreflang: 'it', href: italianHref },
    { rel: 'alternate', hreflang: 'en', href: `${SITE_ORIGIN}${twinPath(path, 'en')}` },
    { rel: 'alternate', hreflang: 'de', href: `${SITE_ORIGIN}${twinPath(path, 'de')}` },
    { rel: 'alternate', hreflang: 'x-default', href: italianHref },
  ]
}

/**
 * Returns the Open Graph locale code (`it_IT`, `en_GB`, `de_DE`) of a site language.
 */
export function openGraphLocale(locale: SiteLocale): string {
  return openGraphLocales[locale]
}
