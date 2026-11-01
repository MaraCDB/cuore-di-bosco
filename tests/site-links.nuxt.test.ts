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
