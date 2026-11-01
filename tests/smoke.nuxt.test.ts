import { describe, expect, it } from 'vitest'

describe('auto-imported routes', () => {
  it('resolves the italian booking path', () => {
    expect(routes('it').find(route => route.id === 'booking')?.path).toBe('/it/prenota')
  })
})
