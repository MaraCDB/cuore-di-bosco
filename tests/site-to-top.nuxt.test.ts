import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteToTop from '~/components/site/to-top.vue'

function scrollTo(scrollY: number) {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true })
  window.dispatchEvent(new Event('scroll'))
}

describe('SiteToTop', () => {
  it('becomes visible only after scrolling past the viewport height', async () => {
    const wrapper = await mountSuspended(SiteToTop)
    expect(wrapper.classes()).not.toContain('is-visible')

    scrollTo(window.innerHeight)
    await nextTick()
    expect(wrapper.classes()).not.toContain('is-visible')

    scrollTo(window.innerHeight + 1)
    await nextTick()
    expect(wrapper.classes()).toContain('is-visible')

    scrollTo(0)
    await nextTick()
    expect(wrapper.classes()).not.toContain('is-visible')
    wrapper.unmount()
  })
})
