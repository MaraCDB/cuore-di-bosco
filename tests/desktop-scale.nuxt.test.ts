import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import homeSource from '~/pages/it/index.vue?raw'
import headerSource from '~/components/site/header.vue?raw'
import menuSource from '~/components/site/menu.vue?raw'
import dockSource from '~/components/site/dock.vue?raw'
import footerSource from '~/components/site/footer.vue?raw'
import toTopSource from '~/components/site/to-top.vue?raw'
import cookieBannerSource from '~/components/cookie-banner.vue?raw'

const exploreSource = readFileSync('pages/it/esplora.vue', 'utf8')
const globalStyles = readFileSync('assets/css/global.css', 'utf8')
const nuxtConfig = readFileSync('nuxt.config.ts', 'utf8')

const phoneScale = [
  '--step-micro:0.75rem',
  '--step-small:0.875rem',
  '--step-nav:0.875rem',
  '--step-body:1rem',
  '--step-lead:1.0625rem',
  '--step-tagline:1.25rem',
  '--step-title:1.5rem',
  '--step-head:1.875rem',
  '--step-display:2.5rem',
  '--dock-height:64px',
]

const desktopScale = [
  '--step-nav:0.9375rem',
  '--step-lead:1.125rem',
  '--step-tagline:1.375rem',
  '--step-title:1.75rem',
  '--step-head:2.25rem',
  '--step-display:3.25rem',
  '--dock-height:56px',
]

function extractStyleBlocks(source: string): string {
  return [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(match => match[1]).join('\n')
}

function extractFontSizes(styles: string): string[] {
  return [...styles.matchAll(/font-size:\s*([^;}]+)/g)].map(match => match[1].trim())
}

const cookieBannerRedesignRules = (cookieBannerSource.match(/\.cookie-banner\.redesign[^{]*\{[^}]*\}/g) ?? []).join('\n')

describe('exact sizes', () => {
  it('never zooms the redesigned site', () => {
    expect(globalStyles).not.toMatch(/zoom/)
  })

  it('defines the phone type scale in rem', () => {
    for (const declaration of phoneScale) {
      expect(globalStyles).toContain(declaration)
    }
  })

  it('overrides the type scale and dock height from the desktop breakpoint', () => {
    const desktopRoot = globalStyles.match(/@media \(min-width:901px\)\{\s*:root\{([^}]*)\}/)?.[1]

    expect(desktopRoot).toBeDefined()
    for (const declaration of desktopScale) {
      expect(desktopRoot).toContain(declaration)
    }
  })

  it('sets Montserrat for all non-display text', () => {
    const redesignSources = [globalStyles, homeSource, exploreSource, headerSource, dockSource, footerSource, toTopSource, menuSource, cookieBannerSource]

    expect(globalStyles).not.toContain('Numans')
    expect(nuxtConfig).not.toContain('Numans')
    for (const source of redesignSources) {
      expect(source).not.toContain('var(--body)')
    }
    expect(nuxtConfig).toMatch(/Montserrat: \[[^\]]*700[^\]]*\]/)
  })

  it('sizes redesigned text only through the scale tokens', () => {
    const styles = [
      globalStyles,
      ...[homeSource, exploreSource, headerSource, dockSource, footerSource, toTopSource, menuSource].map(extractStyleBlocks),
      cookieBannerRedesignRules,
    ].join('\n')
    const fontSizes = extractFontSizes(styles)

    expect(fontSizes.length).toBeGreaterThan(0)
    for (const fontSize of fontSizes) {
      expect(fontSize).toMatch(/^var\(--step-[a-z]+\)$/)
    }
  })

  it('ties every dock offset to one dock height', () => {
    expect(dockSource).toMatch(/\.dock-inner\{[^}]*min-height:var\(--dock-height\)/)
    expect(cookieBannerSource).toContain('bottom: calc(var(--dock-height) + env(safe-area-inset-bottom))')
    expect(footerSource).toContain('calc(16px + var(--dock-height) + env(safe-area-inset-bottom))')
    expect(toTopSource).toContain('bottom:calc(var(--dock-height) + env(safe-area-inset-bottom) + 16px)')
    for (const source of [dockSource, cookieBannerSource, footerSource, toTopSource]) {
      expect(source).not.toContain('72px')
    }
  })

  it('gives room names their own step below the section title', () => {
    expect(homeSource).toMatch(/\.room h3\{[^}]*font-size:var\(--step-title\)/)
    expect(footerSource).toMatch(/\.footer-name\{[^}]*font-size:var\(--step-display\)/)
  })

  it('widens the desktop page to 1440px and aligns the split bands text with the content', () => {
    const contentEdgePadding = 'max(var(--margin),calc((100vw - var(--page-max)) / 2 + var(--margin)))'
    const desktopRoot = globalStyles.match(/@media \(min-width:901px\)\{\s*:root\{([^}]*)\}/)?.[1]

    expect(globalStyles).toMatch(/:root\{[^}]*--page-max:1440px/)
    expect(desktopRoot).not.toContain('--page-max')
    expect(homeSource).toContain(`.hero-text{align-self:center;padding:48px clamp(32px,4vw,64px) 72px ${contentEdgePadding}}`)
    expect(homeSource).toContain(`.breakfast-text,.welcome-text{padding:var(--band-pad) ${contentEdgePadding} var(--band-pad) clamp(32px,5vw,96px)}`)
    expect(homeSource).toContain('.hero-text{padding-top:34px;padding-right:clamp(22px,2.8vw,45px);padding-bottom:50px}')
    expect(homeSource).toContain('.breakfast-text,.welcome-text{padding-left:clamp(22px,3.5vw,67px)}')
    expect(homeSource).not.toContain('* 0.35')
  })

  it('justifies the welcome, San Rocco, guest and breakfast paragraphs within 68ch', () => {
    expect(homeSource).toContain('.welcome-text p,.pilgrims-text p,.guest p,.breakfast-text p{max-width:68ch;text-align:justify;hyphens:auto}')
  })

  it('aligns the justified paragraphs to the left on phones', () => {
    const phoneRules = homeSource.match(/@media \(max-width:520px\)\{([\s\S]*?)\n\}/)?.[1]

    expect(phoneRules).toContain('.welcome-text p,.pilgrims-text p,.guest p,.breakfast-text p{text-align:left}')
  })

  it('gives the map more width than the directions text without changing its height', () => {
    expect(homeSource).toContain('.arrive{margin-top:var(--section-gap);margin-bottom:var(--section-gap);display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);')
    expect(homeSource).toContain('.map-frame{position:relative;min-height:440px}')
    expect(homeSource).toContain('.map-frame{min-height:308px;max-height:622px}')
    expect(homeSource).toContain('.map-frame{min-height:320px}')
  })

  it('stretches the welcome photo to the full band height on desktop', () => {
    expect(homeSource).toContain('.welcome img{aspect-ratio:16/9;align-self:stretch;height:100%}')
  })

  it('shortens the reveal offset on desktop without overriding reduced motion', () => {
    const baseRevealIndex = globalStyles.indexOf('.reveal-ready [data-reveal]{opacity:0;transform:translateY(20px)')
    const desktopRevealIndex = globalStyles.indexOf('@media (min-width:901px){.reveal-ready [data-reveal]{transform:translateY(14px)}}')
    const reducedMotionIndex = globalStyles.indexOf('@media (prefers-reduced-motion:reduce){.reveal-ready [data-reveal]{opacity:1;transform:none}}')

    expect(baseRevealIndex).toBeGreaterThan(-1)
    expect(desktopRevealIndex).toBeGreaterThan(baseRevealIndex)
    expect(reducedMotionIndex).toBeGreaterThan(desktopRevealIndex)
  })
})
