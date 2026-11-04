import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { START_LOCATION } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import routerOptions from '~/app/router.options'

type Position = Record<string, unknown> | false | undefined

function route(path: string, hash = ''): RouteLocationNormalized {
  return { path, hash, meta: {} } as RouteLocationNormalized
}

function scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized | typeof START_LOCATION, savedPosition: Position = undefined) {
  return routerOptions.scrollBehavior!(to, from as RouteLocationNormalized, savedPosition as never) as Promise<Position> | Position
}

async function resolveAfterPageLoad(result: Promise<Position> | Position) {
  const nuxtApp = useNuxtApp()
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => callback(0))
  await nuxtApp.hooks.callHook('page:loading:end')
  return result
}

const addedAnchors: HTMLElement[] = []

function addAnchors(...ids: string[]) {
  ids.forEach((id) => {
    const anchor = document.createElement('div')
    anchor.id = id
    document.body.appendChild(anchor)
    addedAnchors.push(anchor)
  })
}

describe('router scroll behavior', () => {
  beforeEach(() => {
    addAnchors('camere', 'colazione', 'arrivare')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    addedAnchors.splice(0).forEach(anchor => anchor.remove())
  })

  it('scrolls to the hash when navigating from another page', async () => {
    const position = await resolveAfterPageLoad(scrollBehavior(route('/it', '#camere'), route('/it/regolamento')))
    expect(position).toEqual({ el: '#camere', behavior: 'instant' })
  })

  it('scrolls to the hash when only the trailing slash of the home path changes', async () => {
    const position = await resolveAfterPageLoad(scrollBehavior(route('/it', '#colazione'), route('/it/')))
    expect(position).toEqual({ el: '#colazione', behavior: 'instant' })
  })

  it('scrolls to the top when navigating to another page without a hash', async () => {
    const position = await resolveAfterPageLoad(scrollBehavior(route('/it/esplora'), route('/it')))
    expect(position).toEqual({ left: 0, top: 0, behavior: 'instant' })
  })

  it('restores the saved position on back navigation', async () => {
    const saved = { left: 0, top: 900 }
    const position = await resolveAfterPageLoad(scrollBehavior(route('/it'), route('/it/esplora'), saved))
    expect(position).toEqual(saved)
  })

  it('scrolls to the hash on the first navigation', async () => {
    const position = await scrollBehavior(route('/it', '#camere'), START_LOCATION)
    expect(position).toEqual({ el: '#camere', behavior: 'instant' })
  })

  it('scrolls to the hash within the same page', () => {
    expect(scrollBehavior(route('/it', '#arrivare'), route('/it', '#camere'))).toEqual({ el: '#arrivare', behavior: 'auto' })
  })

  it('scrolls to the top when the hash is removed within the same page', () => {
    expect(scrollBehavior(route('/it'), route('/it', '#camere'))).toEqual({ left: 0, top: 0 })
  })

  it('scrolls to the top when the hash has no matching element on another page', async () => {
    const position = await resolveAfterPageLoad(scrollBehavior(route('/en', '#rooms'), route('/en/rules')))
    expect(position).toEqual({ left: 0, top: 0, behavior: 'instant' })
  })

  it('checks the hash element after the page has loaded', async () => {
    const result = scrollBehavior(route('/en', '#directions'), route('/en/rules'))
    addAnchors('directions')
    const position = await resolveAfterPageLoad(result)
    expect(position).toEqual({ el: '#directions', behavior: 'instant' })
  })

  it('scrolls to the top when the hash has no matching element on the first navigation', async () => {
    const position = await scrollBehavior(route('/en', '#rooms'), START_LOCATION)
    expect(position).toEqual({ left: 0, top: 0, behavior: 'instant' })
  })

  it('restores the saved position even when the hash has no matching element', async () => {
    const saved = { left: 0, top: 400 }
    const position = await resolveAfterPageLoad(scrollBehavior(route('/en', '#rooms'), route('/en/rules'), saved))
    expect(position).toEqual(saved)
  })

  it('scrolls to the top when the hash has no matching element within the same page', () => {
    expect(scrollBehavior(route('/en', '#rooms'), route('/en', '#top'))).toEqual({ left: 0, top: 0 })
  })
})
