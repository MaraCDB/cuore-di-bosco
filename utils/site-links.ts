export interface SiteLink {
  label: string
  to: string
}

export type SiteLocale = 'it' | 'en' | 'de'

const primaryLinksByLocale: Record<SiteLocale, SiteLink[]> = {
  it: [
    { label: 'Camere', to: '/it#camere' },
    { label: 'Colazione', to: '/it#colazione' },
    { label: 'Esplora', to: '/it/esplora' },
    { label: 'Regolamento', to: '/it/regolamento' },
    { label: 'Come arrivare', to: '/it#arrivare' },
  ],
  en: [
    { label: 'Rooms', to: '/en#rooms' },
    { label: 'Breakfast', to: '/en#breakfast' },
    { label: 'Explore', to: '/en/explore' },
    { label: 'Rules', to: '/en/rules' },
    { label: 'How to get here', to: '/en#directions' },
  ],
  de: [
    { label: 'Zimmer', to: '/de#zimmer' },
    { label: 'Frühstück', to: '/de#fruehstueck' },
    { label: 'Entdecken', to: '/de/entdecken' },
    { label: 'Hausordnung', to: '/de/hausordnung' },
    { label: 'Anfahrt', to: '/de#anfahrt' },
  ],
}

const pendingRouteIds: Partial<Record<SiteLocale, readonly string[]>> = {
}

function withoutTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

/**
 * Returns the path unchanged when its page exists; a page of a language that is not built yet
 * is replaced by the booking page of that language, without hash.
 */
export function availablePath(path: string): string {
  const normalizedPath = withoutTrailingSlash(path.split('#')[0])
  const locale = siteLocale(normalizedPath)
  const localeRoutes = routes(locale)
  const routeId = localeRoutes.find(route => route.path === normalizedPath)?.id
  if (!routeId || !pendingRouteIds[locale]?.includes(routeId)) {
    return path
  }
  return localeRoutes.find(route => route.id === 'booking')?.path ?? path
}

/**
 * Returns the main navigation links of the site in the given language, in display order.
 */
export function primaryLinks(locale: SiteLocale = 'it'): SiteLink[] {
  return primaryLinksByLocale[locale].map(link => ({ ...link, to: availablePath(link.to) }))
}

/**
 * Reads the language of a path: German for `/de` and English for `/en` and everything below them, Italian otherwise.
 */
export function siteLocale(path: string): SiteLocale {
  if (path === '/de' || path.startsWith('/de/')) {
    return 'de'
  }
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'it'
}

/**
 * Returns the home page path of a language.
 */
export function homePath(locale: SiteLocale): string {
  return availablePath(`/${locale}`)
}

/**
 * Returns the path of a route id in a language, falling back to the home page.
 */
export function localePath(locale: SiteLocale, routeId: string): string {
  const routePath = routes(locale).find(route => route.id === routeId)?.path
  return routePath ? availablePath(routePath) : homePath(locale)
}

/**
 * Maps a path to the page with the same route id in the target language, falling back to its home page.
 */
export function twinPath(path: string, target: SiteLocale): string {
  const normalizedPath = withoutTrailingSlash(path)
  const routeId = routes(siteLocale(normalizedPath)).find(route => route.path === normalizedPath)?.id
  return routeId ? localePath(target, routeId) : homePath(target)
}

/**
 * Maps a path to the English page with the same route id, falling back to `/en`.
 */
export function englishTwin(path: string): string {
  return twinPath(path, 'en')
}
