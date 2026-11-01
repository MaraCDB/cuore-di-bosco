export interface SiteLink {
  label: string
  to: string
}

/**
 * Returns the main navigation links of the Italian site, in display order.
 */
export function primaryLinks(): SiteLink[] {
  return [
    { label: 'Camere', to: '/it#camere' },
    { label: 'Colazione', to: '/it#colazione' },
    { label: 'Esplora', to: '/it/esplora' },
    { label: 'Regolamento', to: '/it/regolamento' },
    { label: 'Come arrivare', to: '/it#arrivare' },
  ]
}

/**
 * Maps an Italian path to the English page with the same route id, falling back to `/en`.
 */
export function englishTwin(path: string): string {
  const normalizedPath = path.length > 1 ? path.replace(/\/+$/, '') : path
  const routeId = routes('it').find(route => route.path === normalizedPath)?.id
  return routes('en').find(route => route.id === routeId)?.path ?? '/en'
}
