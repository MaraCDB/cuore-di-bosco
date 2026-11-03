import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const legacyCss = readFileSync('assets/css/legacy.css', 'utf8')
const globalCss = readFileSync('assets/css/global.css', 'utf8')
const exclusion = ':where(:not(.redesign, .redesign *))'
const bookingSelectors = [
  'section', '.booking-widget', '.intro-section', '.bg-red', '.page-title', '.landing-image', '.opacity50',
  '.landing-title', '.welcome', '.contact-us', '.landing-text', '.intro', '.content-wrapper', '.image-container',
  '.image-container img', '.text-content', '.text-content h2', '.separator-wrapper', '.separator', '.text-content p',
  '.photos', '.photos img', '.card', '.room-info h2', '.room-info h3', '.room-short', '.room-list', '.room-list div',
  'section.rooms', '.room-block', '.room-block .card', '.room-gallery', '.room-gallery img', '.room-gallery img:hover',
  '.lightbox-overlay', '.lightbox-img', '.lightbox-close', '.lightbox-prev', '.lightbox-next', '.lightbox-prev:hover',
  '.lightbox-next:hover', '.lightbox-counter', '.wp-block-group', '.icon', '.icon:hover', '.icon img', 'figcaption',
  '.service-image', 'p', 'h1', 'h2', 'h3',
]
const privacySelectors = [
  '.landing-image', '.landing-text', '.landing-title', '.landing-title strong', '.welcome',
  '#cookie-policy-text', '#cookie-policy-text h3', '#cookie-policy-text a',
]
const legacySelectors = [
  'a', '.link', 'a:hover', '.link:hover', '*', 'body', '.text-white', '.text-black', '.text-center', '.text-left',
  '.italic', 'h1', 'h2', 'h3', 'p', 'li', 'section', '.page-title',
]
const unscopedPageFiles: Array<[string, string[]]> = [
  ['pages/en/booking.vue', bookingSelectors],
  ['pages/en/privacy-policy.vue', privacySelectors],
]

function removeBalancedBlocks(css: string, atRulePattern: RegExp): string {
  let result = css
  let match = atRulePattern.exec(result)
  while (match) {
    let depth = 1
    let end = match.index + match[0].length
    while (depth > 0 && end < result.length) {
      if (result[end] === '{') depth++
      if (result[end] === '}') depth--
      end++
    }
    result = result.slice(0, match.index) + result.slice(end)
    match = atRulePattern.exec(result)
  }
  return result
}

function stripExclusion(selector: string): string {
  return selector.slice(0, -exclusion.length)
}

function expectExclusionAtEnd(selectors: string[]) {
  expect(selectors.length).toBeGreaterThan(0)
  expect(selectors.filter(selector => selector.indexOf(exclusion) !== selector.length - exclusion.length)).toEqual([])
}

function expectLegacySelectorsSurvive(selectors: string[], expectedBaseSelectors: string[]) {
  const baseSelectors = new Set(selectors.map(stripExclusion))
  expect(expectedBaseSelectors.filter(selector => !baseSelectors.has(selector))).toEqual([])
}

function splitSelectorList(group: string): string[] {
  const selectors: string[] = []
  let depth = 0
  let current = ''
  for (const char of group) {
    if (char === '(' || char === '[') depth++
    if (char === ')' || char === ']') depth--
    if (char === ',' && depth === 0) {
      selectors.push(current)
      current = ''
    }
    else {
      current += char
    }
  }
  selectors.push(current)
  return selectors
}

function extractSelectors(css: string): string[] {
  const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const withoutKeyframes = removeBalancedBlocks(withoutComments, /@(-\w+-)?keyframes[^{]*\{/)
  const withoutAtRules = withoutKeyframes.replace(/@media[^{]*\{/g, '')
  const selectorGroups = withoutAtRules.match(/[^{}]+(?=\{)/g) ?? []
  return selectorGroups
    .flatMap(splitSelectorList)
    .map(selector => selector.trim())
    .filter(selector => selector.length > 0 && selector !== ':root')
}

describe('legacy.css', () => {
  it('ends every selector with the redesign exclusion', () => {
    expectExclusionAtEnd(extractSelectors(legacyCss))
  })

  it('keeps every original legacy selector', () => {
    expectLegacySelectorsSurvive(extractSelectors(legacyCss), legacySelectors)
  })

  it('keeps the universal selector', () => {
    expect(legacyCss).toContain(`*${exclusion}`)
  })

  it('does not use a wrapper class', () => {
    expect(legacyCss).not.toContain('.legacy')
  })

  it('redeclares the old custom properties', () => {
    for (const property of ['--color-primary', '--color-secondary', '--color-success', '--color-background', '--font-base', '--spacing-base']) {
      expect(legacyCss).toContain(property)
    }
  })
})

describe('extractSelectors', () => {
  it('terminates on a keyframes block with an unclosed brace', () => {
    expect(extractSelectors('.kept { color: red } @keyframes spin { from { a: b }')).toEqual(['.kept'])
  })
})

describe('unscoped page styles', () => {
  it.each(unscopedPageFiles)('%s ends every selector with the redesign exclusion and keeps its legacy selectors', (file, expectedBaseSelectors) => {
    const source = readFileSync(file, 'utf8')
    const styleBlock = source.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ''
    const selectors = extractSelectors(styleBlock)
    expectExclusionAtEnd(selectors)
    expectLegacySelectorsSurvive(selectors, expectedBaseSelectors)
  })
})

describe('global.css', () => {
  it('prefixes every redesign rule with .redesign', () => {
    const unscopedAllowed = ['.reveal-ready [data-reveal]', '.reveal-ready [data-reveal].is-in', 'html']
    const redesignPrefix = /^\.redesign(?![\w-])/
    const selectors = extractSelectors(globalCss.replace(/@import[^;]+;/, ''))
    const offenders = selectors.filter(selector => !redesignPrefix.test(selector) && !unscopedAllowed.includes(selector))
    expect(selectors.length).toBeGreaterThan(0)
    expect(offenders).toEqual([])
  })

  it('has no legacy font family or section rule', () => {
    expect(globalCss).not.toContain('font-family:\'Cardo\'')
    expect(globalCss).not.toContain('section{')
  })
})
