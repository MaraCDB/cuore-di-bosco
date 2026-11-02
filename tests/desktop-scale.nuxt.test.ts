import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import menuSource from '~/components/site/menu.vue?raw'

const globalStyles = readFileSync('assets/css/global.css', 'utf8')

describe('desktop scale', () => {
  it('shrinks the redesigned site to 70% from the desktop breakpoint up', () => {
    const desktopMinWidth = menuSource.match(/DESKTOP_MIN_WIDTH = (\d+)/)?.[1]

    expect(desktopMinWidth).toBe('901')
    expect(globalStyles).toContain(`@media (min-width:${desktopMinWidth}px){.redesign{zoom:0.7}}`)
  })
})
