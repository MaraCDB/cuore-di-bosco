import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '~/pages/it/index.vue'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountHome() {
  const wrapper = await mountSuspended(HomePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('italian home page', () => {
  it.each(['camere', 'colazione', 'arrivare'])('has the #%s section for in-page links', async (sectionId) => {
    const wrapper = await mountHome()

    expect(wrapper.element.querySelector(`#${sectionId}`)).not.toBeNull()
  })

  it('never sets width or height attributes on images', async () => {
    const wrapper = await mountHome()
    const images = [...wrapper.element.querySelectorAll('img')]

    expect(images.length).toBeGreaterThan(0)
    expect(images.filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('never prefetches pages from its links', async () => {
    const wrapper = await mountHome()
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })

    expect(links.length).toBeGreaterThan(0)
    links.forEach(link => expect(link.props('noPrefetch')).toBe(true))
  })
})
