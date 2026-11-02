import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import SiteHeader from '~/components/site/header.vue'
import SiteMenu from '~/components/site/menu.vue'
import menuSource from '~/components/site/menu.vue?raw'
import bannerSource from '~/components/cookie-banner.vue?raw'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountHeader() {
  const wrapper = await mountSuspended(SiteHeader, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  const menuButton = wrapper.find<HTMLButtonElement>('button.menu')
  return { wrapper, menuButton }
}

afterEach(async () => {
  vi.unstubAllGlobals()
  await useRouter().push('/it')
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

  it('points the Home link at the top of the home page', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')

    const homeLink = document.querySelector<HTMLAnchorElement>('[role=dialog] a')

    expect(homeLink?.textContent).toBe('Home')
    expect(homeLink?.getAttribute('href')).toBe('/it#top')
  })

  it('stacks the menu panel above the cookie banner', () => {
    const menuZIndex = Number(menuSource.match(/\.menu-panel\{[^}]*z-index:(\d+)/)?.[1])
    const bannerZIndex = Number(bannerSource.match(/\.cookie-banner\s*\{[^}]*z-index:\s*(\d+)/)?.[1])

    expect(menuZIndex).toBeGreaterThan(bannerZIndex)
  })

  it('closes with the Chiudi button and returns focus to the Menu button', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()

    document.querySelector<HTMLButtonElement>('.menu-close')?.click()
    await nextTick()
    await nextTick()

    expect(document.querySelector('[role=dialog]')).toBeNull()
    expect(document.activeElement).toBe(menuButton.element)
  })

  it('moves focus to the Chiudi button when opened', async () => {
    const { menuButton } = await mountHeader()

    await menuButton.trigger('click')
    await nextTick()
    await nextTick()

    expect(document.activeElement).toBe(document.querySelector('.menu-close'))
  })

  it('does not steal focus back to the Menu button after a link click', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()

    document.querySelector<HTMLAnchorElement>('[role=dialog] a')?.click()
    await nextTick()
    await nextTick()

    expect(document.querySelector('[role=dialog]')).toBeNull()
    expect(document.activeElement).not.toBe(menuButton.element)
  })

  it('wraps focus with Tab and Shift+Tab', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()
    await nextTick()
    const closeButton = document.querySelector<HTMLButtonElement>('.menu-close')!
    const links = document.querySelectorAll<HTMLAnchorElement>('[role=dialog] a')
    const lastLink = links[links.length - 1]

    lastLink.focus()
    const forwardTab = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
    document.dispatchEvent(forwardTab)
    expect(forwardTab.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(closeButton)

    const backwardTab = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true })
    document.dispatchEvent(backwardTab)
    expect(backwardTab.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(lastLink)
  })

  it('closes when the route changes', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()

    useRouter().push('/it/esplora')
    await vi.waitFor(() => expect(document.querySelector('[role=dialog]')).toBeNull())

    expect(document.querySelector('[role=dialog]')).toBeNull()
    expect(menuButton.attributes('aria-expanded')).toBe('false')
  })

  it('closes when the viewport grows past 900px and stays open below it', async () => {
    const { menuButton } = await mountHeader()
    await menuButton.trigger('click')
    await nextTick()

    vi.stubGlobal('innerWidth', 900)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(document.querySelector('[role=dialog]')).not.toBeNull()

    vi.stubGlobal('innerWidth', 901)
    window.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(document.querySelector('[role=dialog]')).toBeNull()
  })

  it('labels the dialog and its navigation differently and only references the panel while open', async () => {
    const { menuButton } = await mountHeader()
    expect(menuButton.attributes('aria-controls')).toBeUndefined()

    await menuButton.trigger('click')
    await nextTick()

    expect(document.querySelector('[role=dialog]')?.getAttribute('aria-label')).toBe('Menu')
    expect(document.querySelector('[role=dialog] nav')?.getAttribute('aria-label')).toBe('Pagine del sito')
    expect(menuButton.attributes('aria-controls')).toBe('site-menu')
    expect(document.getElementById('site-menu')).not.toBeNull()
  })
})
