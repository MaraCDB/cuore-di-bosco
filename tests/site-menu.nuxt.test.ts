import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/site/header.vue'
import SiteMenu from '~/components/site/menu.vue'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountHeader() {
  const wrapper = await mountSuspended(SiteHeader, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  const menuButton = wrapper.find<HTMLButtonElement>('button.menu')
  return { wrapper, menuButton }
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('site menu', () => {
  it('opens the dialog when the Menu button is clicked', async () => {
    const { menuButton } = await mountHeader()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
    expect(document.querySelector('[role=dialog]')).toBeNull()

    await menuButton.trigger('click')

    expect(menuButton.attributes('aria-expanded')).toBe('true')
    const dialog = document.querySelector('[role=dialog]')
    expect(dialog).not.toBeNull()
    expect(dialog?.classList.contains('redesign')).toBe(true)
  })

  it('closes on Escape and returns focus to the Menu button', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    await nextTick()
    await nextTick()

    expect(document.querySelector('[role=dialog]')).toBeNull()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(menuButton.element)
  })

  it('emits close when a menu link is clicked', async () => {
    const { wrapper, menuButton } = await mountHeader()
    await menuButton.trigger('click')

    document.querySelector<HTMLAnchorElement>('[role=dialog] a')?.click()
    await nextTick()

    expect(wrapper.findComponent(SiteMenu).emitted('close')).toHaveLength(1)
  })
})
