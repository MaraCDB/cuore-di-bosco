import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const legacyCss = readFileSync('assets/css/legacy.css', 'utf8')
const globalCss = readFileSync('assets/css/global.css', 'utf8')
const exclusion = ':where(:not(.redesign, .redesign *))'
const unscopedPageFiles = [
  'pages/it/prenota.vue',
  'pages/en/booking.vue',
  'pages/it/privacy-policy.vue',
  'pages/en/privacy-policy.vue',
]

function removeBalancedBlocks(css: string, atRulePattern: RegExp): string {
  let result = css
  let match = atRulePattern.exec(result)
  while (match) {
    let depth = 1
    let end = match.index + match[0].length
    while (depth > 0) {
      if (result[end] === '{') depth++
      if (result[end] === '}') depth--
      end++
    }
    result = result.slice(0, match.index) + result.slice(end)
    match = atRulePattern.exec(result)
  }
  return result
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
  it('excludes redesigned markup from every selector', () => {
    const selectors = extractSelectors(legacyCss)
    expect(selectors.length).toBeGreaterThan(0)
    expect(selectors.filter(selector => !selector.includes(exclusion))).toEqual([])
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

describe('unscoped page styles', () => {
  it.each(unscopedPageFiles)('%s excludes redesigned markup from every selector', (file) => {
    const source = readFileSync(file, 'utf8')
    const styleBlock = source.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ''
    const selectors = extractSelectors(styleBlock)
    expect(selectors.length).toBeGreaterThan(0)
    expect(selectors.filter(selector => !selector.includes(exclusion))).toEqual([])
  })
})

describe('global.css', () => {
  it('prefixes every redesign rule with .redesign', () => {
    const unscopedAllowed = ['.reveal-ready', '[data-reveal]', 'html']
    const selectors = extractSelectors(globalCss.replace(/@import[^;]+;/, ''))
    const offenders = selectors.filter(selector => !selector.startsWith('.redesign') && !unscopedAllowed.some(allowed => selector.startsWith(allowed)))
    expect(selectors.length).toBeGreaterThan(0)
    expect(offenders).toEqual([])
  })

  it('has no legacy font family or section rule', () => {
    expect(globalCss).not.toContain('font-family:\'Cardo\'')
    expect(globalCss).not.toContain('section{')
  })
})
