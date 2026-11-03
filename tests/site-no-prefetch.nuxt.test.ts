import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/site/header.vue'
import SiteMenu from '~/components/site/menu.vue'
import SiteFooter from '~/components/site/footer.vue'
import SiteDock from '~/components/site/dock.vue'
import ExplorePage from '~/pages/it/esplora.vue'
import RulesPage from '~/pages/it/regolamento.vue'

const mountedWrappers: Array<{ unmount: () => void }> = []

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('site chrome links', () => {
  it.each([
    ['header', SiteHeader, {}],
    ['menu', SiteMenu, { open: true }],
    ['footer', SiteFooter, {}],
    ['dock', SiteDock, {}],
  ])('never prefetch pages from the %s', async (_name, component, props) => {
    const wrapper = await mountSuspended(component, { props, attachTo: document.body })
    mountedWrappers.push(wrapper)

    const links = wrapper.findAllComponents({ name: 'NuxtLink' })

    expect(links.length).toBeGreaterThan(0)
    links.forEach(link => expect(link.props('noPrefetch')).toBe(true))
  })
})

describe('explore page links', () => {
  it('never prefetch pages from the explore page', async () => {
    const wrapper = await mountSuspended(ExplorePage, { attachTo: document.body })
    mountedWrappers.push(wrapper)

    wrapper.findAllComponents({ name: 'NuxtLink' }).forEach(link => expect(link.props('noPrefetch')).toBe(true))
  })
})

describe('rules page links', () => {
  it('never prefetch pages from the rules page', async () => {
    const wrapper = await mountSuspended(RulesPage, { attachTo: document.body })
    mountedWrappers.push(wrapper)

    wrapper.findAllComponents({ name: 'NuxtLink' }).forEach(link => expect(link.props('noPrefetch')).toBe(true))
  })
})
