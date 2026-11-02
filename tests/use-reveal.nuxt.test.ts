import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { useReveal } from '~/composables/use-reveal'

const VIEWPORT_HEIGHT = 800

type ObserverCallback = (entries: Array<{ isIntersecting: boolean, target: Element }>) => void

const observerInstances: FakeIntersectionObserver[] = []

class FakeIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()

  constructor(
    public callback: ObserverCallback,
    public options?: IntersectionObserverInit,
  ) {
    observerInstances.push(this)
  }
}

const RevealFixture = defineComponent({
  setup() {
    const root = ref<HTMLElement | null>(null)
    useReveal(root)
    return () => h('div', { ref: root }, [
      h('p', { 'id': 'above-the-fold', 'data-reveal': '' }),
      h('p', { 'id': 'below-the-fold', 'data-reveal': '' }),
    ])
  },
})

describe('useReveal', () => {
  let aboveTheFoldClassesWhenRevealWasEnabled: string[] | null

  beforeEach(() => {
    observerInstances.length = 0
    aboveTheFoldClassesWhenRevealWasEnabled = null
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver)
    vi.stubGlobal('innerHeight', VIEWPORT_HEIGHT)
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
      const top = this.id === 'above-the-fold' ? 100 : 5000
      return { top } as DOMRect
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('marks in-viewport elements before enabling reveal', async () => {
    const classListPrototype = Object.getPrototypeOf(document.createElement('div').classList)
    const originalAdd = classListPrototype.add
    vi.spyOn(classListPrototype, 'add').mockImplementation(function (this: DOMTokenList, ...tokens: unknown[]) {
      if (tokens.includes('reveal-ready')) {
        const aboveTheFold = document.getElementById('above-the-fold')
        aboveTheFoldClassesWhenRevealWasEnabled = aboveTheFold ? [...aboveTheFold.classList] : []
      }
      return originalAdd.apply(this, tokens)
    })

    const wrapper = await mountSuspended(RevealFixture, { attachTo: document.body })

    expect(aboveTheFoldClassesWhenRevealWasEnabled).toContain('is-in')
    expect(wrapper.classes()).toContain('reveal-ready')
    expect(wrapper.get('#above-the-fold').classes()).toContain('is-in')
    expect(observerInstances[0].observe).not.toHaveBeenCalledWith(wrapper.get('#above-the-fold').element)
    wrapper.unmount()
  })

  it('reveals below-the-fold elements on intersection', async () => {
    const wrapper = await mountSuspended(RevealFixture, { attachTo: document.body })
    const belowTheFold = wrapper.get('#below-the-fold').element
    const [observer] = observerInstances

    expect(observer.options).toEqual({ rootMargin: '0px 0px -8% 0px' })
    expect(observer.observe).toHaveBeenCalledWith(belowTheFold)
    expect(observer.observe).toHaveBeenCalledTimes(1)
    expect(belowTheFold.classList.contains('is-in')).toBe(false)

    observer.callback([{ isIntersecting: false, target: belowTheFold }])
    expect(belowTheFold.classList.contains('is-in')).toBe(false)

    observer.callback([{ isIntersecting: true, target: belowTheFold }])
    expect(belowTheFold.classList.contains('is-in')).toBe(true)
    expect(observer.unobserve).toHaveBeenCalledWith(belowTheFold)
    wrapper.unmount()
  })

  it('leaves everything visible when IntersectionObserver is missing', async () => {
    vi.stubGlobal('IntersectionObserver', undefined)

    const wrapper = await mountSuspended(RevealFixture, { attachTo: document.body })

    expect(wrapper.classes()).not.toContain('reveal-ready')
    expect(observerInstances).toHaveLength(0)
    wrapper.unmount()
  })

  it('leaves everything visible when creating the IntersectionObserver throws', async () => {
    vi.stubGlobal('IntersectionObserver', vi.fn(function () {
      throw new Error('unsupported')
    }))

    const wrapper = await mountSuspended(RevealFixture, { attachTo: document.body })

    expect(wrapper.classes()).not.toContain('reveal-ready')
    wrapper.unmount()
  })

  it('disconnects on unmount', async () => {
    const wrapper = await mountSuspended(RevealFixture, { attachTo: document.body })
    const [observer] = observerInstances

    expect(observer.disconnect).not.toHaveBeenCalled()
    wrapper.unmount()
    expect(observer.disconnect).toHaveBeenCalledTimes(1)
  })
})
