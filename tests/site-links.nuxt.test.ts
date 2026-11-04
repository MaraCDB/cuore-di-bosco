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
