import { describe, expect, it } from 'vitest'

describe('primaryLinks', () => {
  it('lists the five main targets in order', () => {
    expect(primaryLinks().map(link => link.to)).toEqual([
      '/it#camere',
      '/it#colazione',
      '/it/esplora',
      '/it/regolamento',
      '/it#arrivare',
    ])
  })
})

describe('englishTwin', () => {
  it('maps the booking page', () => {
    expect(englishTwin('/it/prenota')).toBe('/en/booking')
  })

  it('maps the home page', () => {
    expect(englishTwin('/it')).toBe('/en')
  })

  it('maps a path with a trailing slash', () => {
    expect(englishTwin('/it/esplora/')).toBe('/en/explore')
  })

  it('falls back to the English home for unknown paths', () => {
    expect(englishTwin('/it/unknown')).toBe('/en')
  })
})

describe('siteLocale', () => {
  it.each([['/en', 'en'], ['/en/booking', 'en'], ['/en/booking/', 'en'], ['/it', 'it'], ['/it/prenota', 'it'], ['/', 'it'], ['/english', 'it']])('reads %s as %s', (path, locale) => {
    expect(siteLocale(path)).toBe(locale)
  })
})

describe('primaryLinks in English', () => {
  it('lists the same targets in the same order as Italian', () => {
    expect(primaryLinks('en')).toEqual([
      { label: 'Rooms', to: '/en#rooms' },
      { label: 'Breakfast', to: '/en#breakfast' },
      { label: 'Explore', to: '/en/explore' },
      { label: 'Rules', to: '/en/rules' },
      { label: 'How to get here', to: '/en#directions' },
    ])
  })
})

describe('twinPath', () => {
  it.each([['/en/booking', 'it', '/it/prenota'], ['/en/booking/', 'it', '/it/prenota'], ['/en', 'it', '/it'], ['/it/prenota', 'en', '/en/booking'], ['/en/unknown', 'it', '/it']])('maps %s to %s', (path, target, expected) => {
    expect(twinPath(path, target as SiteLocale)).toBe(expected)
  })
})

describe('localePath', () => {
  it('finds the booking page in each language', () => {
    expect(localePath('it', 'booking')).toBe('/it/prenota')
    expect(localePath('en', 'booking')).toBe('/en/booking')
    expect(localePath('en', 'privacy-policy')).toBe('/en/privacy-policy')
  })
})

describe('three languages', () => {
  it.each([['/de', 'de'], ['/de/buchen', 'de'], ['/de/buchen/', 'de'], ['/deutsch', 'it']])('reads %s as %s', (path, locale) => {
    expect(siteLocale(path)).toBe(locale)
  })

  it('lists the five German routes with the shared ids', () => {
    expect(routes('de').map(route => [route.id, route.path])).toEqual([
      ['welcome', '/de'], ['booking', '/de/buchen'], ['explore', '/de/entdecken'], ['rules', '/de/hausordnung'], ['privacy-policy', '/de/datenschutz'],
    ])
  })

  it.each([
    ['/it/prenota', 'de', '/de/buchen'], ['/de/buchen', 'it', '/it/prenota'], ['/de/buchen/', 'en', '/en/booking'],
    ['/it/esplora/', 'de', '/de/entdecken'], ['/it/esplora/', 'en', '/en/explore'], ['/en', 'de', '/de'],
  ])('maps %s to %s as %s', (path, target, expected) => {
    expect(twinPath(path, target as SiteLocale)).toBe(expected)
  })
})

describe('interim fallback for German pages not built yet', () => {
  it('sends unbuilt German pages to the German booking page', () => {
    expect(availablePath('/de')).toBe('/de')
    expect(availablePath('/de#zimmer')).toBe('/de#zimmer')
    expect(availablePath('/de/hausordnung/')).toBe('/de/buchen')
    expect(homePath('de')).toBe('/de')
    expect(localePath('de', 'privacy-policy')).toBe('/de/buchen')
    expect(primaryLinks('de').map(link => link.to)).toEqual(['/de#zimmer', '/de#fruehstueck', '/de/entdecken', '/de/buchen', '/de#anfahrt'])
    expect(primaryLinks('de').map(link => link.label)).toEqual(['Zimmer', 'Frühstück', 'Entdecken', 'Hausordnung', 'Anfahrt'])
  })

  it('leaves Italian and English paths untouched', () => {
    expect(availablePath('/it#camere')).toBe('/it#camere')
    expect(availablePath('/en/rules')).toBe('/en/rules')
    expect(homePath('it')).toBe('/it')
    expect(homePath('en')).toBe('/en')
  })
})
