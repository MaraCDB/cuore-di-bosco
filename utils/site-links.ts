export interface SiteLink {
  label: string
  to: string
}

export type SiteLocale = 'it' | 'en'

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
}

/**
 * Returns the main navigation links of the site in the given language, in display order.
 */
export function primaryLinks(locale: SiteLocale = 'it'): SiteLink[] {
  return primaryLinksByLocale[locale]
}

/**
 * Reads the language of a path: English for `/en` and everything below it, Italian otherwise.
 */
export function siteLocale(path: string): SiteLocale {
  return path === '/en' || path.startsWith('/en/') ? 'en' : 'it'
}

/**
 * Returns the home page path of a language.
 */
export function homePath(locale: SiteLocale): string {
  return `/${locale}`
}

/**
 * Returns the path of a route id in a language, falling back to the home page.
 */
export function localePath(locale: SiteLocale, routeId: string): string {
  return routes(locale).find(route => route.id === routeId)?.path ?? homePath(locale)
}

/**
 * Maps a path to the page with the same route id in the target language, falling back to its home page.
 */
export function twinPath(path: string, target: SiteLocale): string {
  const normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path
  const routeId = routes(siteLocale(normalizedPath)).find(route => route.path === normalizedPath)?.id
  return routeId ? localePath(target, routeId) : homePath(target)
}

/**
 * Maps a path to the English page with the same route id, falling back to `/en`.
 */
export function englishTwin(path: string): string {
  return twinPath(path, 'en')
}
