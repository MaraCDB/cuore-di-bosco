import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import menuSource from '~/components/site/menu.vue?raw'
import dockSource from '~/components/site/dock.vue?raw'
import footerSource from '~/components/site/footer.vue?raw'
import toTopSource from '~/components/site/to-top.vue?raw'

const globalStyles = readFileSync('assets/css/global.css', 'utf8')

describe('desktop scale', () => {
  it('shrinks the redesigned site to 70% from the desktop breakpoint up', () => {
    const desktopMinWidth = menuSource.match(/DESKTOP_MIN_WIDTH = (\d+)/)?.[1]

    expect(desktopMinWidth).toBe('901')
    expect(globalStyles).toContain(`@media (min-width:${desktopMinWidth}px){.redesign{zoom:0.7}}`)
  })

  it('keeps the footer and the to-top button clear of the taller desktop dock', () => {
    const desktopDockHeight = dockSource.match(/@media \(min-width:901px\)\{\s*\.dock-inner\{min-height:(\d+)px\}/)?.[1]

    expect(desktopDockHeight).toBe('72')
    expect(footerSource).toMatch(new RegExp(`@media \\(min-width:901px\\)\\{\\s*\\.site-footer\\{padding-bottom:calc\\(16px \\+ ${desktopDockHeight}px \\+ env\\(safe-area-inset-bottom\\)\\)\\}`))
    expect(toTopSource).toContain(`@media (min-width:901px){.to-top{bottom:calc(${desktopDockHeight}px + env(safe-area-inset-bottom) + 16px)}}`)
  })
})
