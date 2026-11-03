import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import RulesPage from '~/pages/it/regolamento.vue'

const pageSource = readFileSync('pages/it/regolamento.vue', 'utf8')
const pageStyles = pageSource.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ''
const legacyTexts: string[] = JSON.parse(readFileSync('tests/fixtures/regolamento-legacy-text.json', 'utf8'))

const ruleTitles = ['TARIFFE E SERVIZI INCLUSI', 'PRENOTAZIONI E CONTATTI', 'MODALITÀ DI PAGAMENTO', 'POLITICHE DI CANCELLAZIONE', 'CHECK-IN E DOCUMENTI', 'ORARI', 'SICUREZZA E RESPONSABILITÀ', 'REGOLE DELLA CASA', 'PULIZIE E MANUTENZIONE', 'COLAZIONE', 'NORME COMPORTAMENTALI', 'SERVIZI ESTERNI', 'ACCESSO ALLA STRUTTURA']

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim()
}

async function mountRules() {
  const wrapper = await mountSuspended(RulesPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function ruleBody(selector: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return pageStyles.match(new RegExp(`(?:^|[\\s,}])${escaped}\\{([^}]*)\\}`, 'm'))?.[1]
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('italian rules page', () => {
  it('keeps every legacy text word for word', async () => {
    const wrapper = await mountRules()
    const pageText = normalize(wrapper.element.textContent ?? '')

    expect(legacyTexts.length).toBeGreaterThan(30)
    expect(legacyTexts.filter(text => !pageText.includes(text))).toEqual([])
  })

  it('drops the picnic offer and the three typos', async () => {
    const wrapper = await mountRules()
    const pageText = normalize(wrapper.element.textContent ?? '')

    for (const removed of ['picnic', 'a pagamento su prenotazione', 'di fare molta', 'vs disposizione', 'Spegnere luci e finestre']) {
      expect(pageText).not.toContain(removed)
    }
  })

  it('keeps the cancellation policy untouched', async () => {
    const wrapper = await mountRules()
    const pageText = normalize(wrapper.element.textContent ?? '')

    expect(pageText).toContain('In caso di cancellazione comunicata entro il 15° giorno prima dell’arrivo, restituiremo per intero l’acconto versato. Non sono previsti rimborsi per cancellazioni comunicate negli ultimi 7 giorni o per partenze anticipate rispetto alla prenotazione originaria.')
  })

  it('lists the thirteen rules in order as cards', async () => {
    const wrapper = await mountRules()
    const cards = [...wrapper.element.querySelectorAll('.rules > .rule')]

    expect(cards).toHaveLength(13)
    expect(cards.map(card => card.querySelector('h2')?.textContent)).toEqual(ruleTitles)
  })

  it('writes the rules in the template so scoped styles reach them', async () => {
    const wrapper = await mountRules()
    const looseTexts = [...wrapper.element.querySelectorAll('p, li')].filter(node => !node.closest('.rule, .rules-closing'))

    expect(pageSource).not.toContain('v-html')
    expect(looseTexts).toEqual([])
  })

  it('opens with a split hero on the forest band', async () => {
    const wrapper = await mountRules()
    const hero = wrapper.element.querySelector('.band > section.rules-hero')
    const image = hero?.querySelector('figure.hero-photo > img')
    const images = [...wrapper.element.querySelectorAll('img')]

    expect(hero?.querySelector('.hero-text > h1')?.textContent).toBe('Regolamento')
    expect(image?.getAttribute('src')).toBe('/images/home/regole-1440.webp')
    expect(image?.getAttribute('alt')).toBe('Pedine e dadi su un gioco da tavolo')
    expect(image?.hasAttribute('loading')).toBe(false)
    expect(images.filter(img => img.hasAttribute('width') || img.hasAttribute('height'))).toEqual([])
    expect(ruleBody('.rules-hero h1')).toContain('color:var(--on-forest)')
  })

  it('closes with the wish on champagne', async () => {
    const wrapper = await mountRules()
    const closing = wrapper.element.querySelector('section.rules-closing')

    expect(closing?.querySelector('p')?.textContent?.trim()).toBe('Auguriamo a tutti un soggiorno indimenticabile tra le nostre montagne!')
    expect(closing?.classList.contains('band')).toBe(false)
    expect(ruleBody('.rules-closing')).toContain('background:var(--champagne)')
    expect(wrapper.element.querySelector('hr')).toBeNull()
  })

  it('styles the cards like the explore seasons', () => {
    const desktopRules = pageStyles.match(/@media \(min-width:901px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(ruleBody('.rule')).toContain('border-top:3px solid var(--meadow)')
    expect(ruleBody('.rule h2')).toContain('font-size:var(--step-title)')
    expect(ruleBody('.rule li+li')).toContain('margin-top:0.5em')
    expect(ruleBody('.rule>:last-child')).toContain('margin-bottom:0')
    expect(desktopRules).toContain('.rules{grid-template-columns:repeat(2,minmax(0,1fr))')
  })

  it('justifies rule paragraphs and list items within 68ch and aligns them left on phones', () => {
    const phoneRules = pageStyles.match(/@media \(max-width:520px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(pageStyles).toMatch(/\.rule p,\.rule li\{max-width:68ch;text-align:justify;hyphens:auto\}/)
    expect(phoneRules).toContain('.rule p,.rule li{text-align:left}')
  })
})
