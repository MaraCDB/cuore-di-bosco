import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BookingGuide from '~/components/BookingGuide.vue'
import { bookingGuide, plainText, splitStrongText } from '~/utils/booking-guide'
import type { SiteLocale } from '~/utils/site-links'

const locales: SiteLocale[] = ['it', 'en', 'de']

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

const italianSectionTitles = ['Come funziona la prenotazione?', 'Se volessi cancellare all’ultimo momento?', 'CHECK-IN']

describe('booking guide', () => {
  it('splits copy on ** markers into plain and strong parts', () => {
    expect(splitStrongText('L’**addebito effettivo** avviene')).toEqual([
      { text: 'L’', strong: false },
      { text: 'addebito effettivo', strong: true },
      { text: ' avviene', strong: false },
    ])
    expect(splitStrongText('**tutto**')).toEqual([{ text: 'tutto', strong: true }])
    expect(plainText('a **b** c')).toBe('a b c')
  })

  it('keeps the owner’s Italian section titles and voucher wording', () => {
    const copy = bookingGuide('it')

    expect(copy.sections.map((section) => section.title)).toEqual(italianSectionTitles)
    expect(plainText(copy.sections[1].paragraphs[0])).toContain('per malattia, infortunio, maltempo o esigenze lavorative, previo accordi, possiamo offrirti un buono pari all’importo della prenotazione')
    expect(plainText(copy.sections[2].paragraphs[1])).toContain('documento d’identità in corso di validità per ogni ospite soggiornante, bambini compresi')
  })

  it.each(locales)('renders three closed sections with bold parts and the rules link in %s', async (locale) => {
    const copy = bookingGuide(locale)
    const wrapper = await mountSuspended(BookingGuide, { props: { locale } })
    const guide: Element | null = wrapper.element.matches('.booking-guide') ? wrapper.element : wrapper.element.querySelector('.booking-guide')
    const sections = Array.from(guide?.querySelectorAll<HTMLDetailsElement>(':scope > details') ?? [])

    expect(sections).toHaveLength(3)
    sections.forEach((section, index) => {
      const sectionCopy = copy.sections[index]
      const blocks = Array.from(section.querySelectorAll<HTMLElement>(sectionCopy.numbered ? 'ol > li' : 'p'))

      expect(section.hasAttribute('open')).toBe(false)
      expect(normalize(section.querySelector('summary')?.textContent ?? '')).toBe(sectionCopy.title)
      expect(blocks.map((block) => normalize(block.textContent ?? ''))).toEqual(sectionCopy.paragraphs.map((paragraph) => normalize(plainText(paragraph))))
    })
    expect(sections[0].querySelector('ol')).not.toBeNull()
    expect(guide?.querySelectorAll('strong').length).toBeGreaterThanOrEqual(5)

    const closing = guide?.querySelector(':scope > p.booking-guide-closing')
    expect(closing?.querySelector('a')?.getAttribute('href')).toBe(copy.closing.to)
    expect(normalize(closing?.textContent ?? '')).toBe(normalize(copy.closing.before + copy.closing.linkLabel + copy.closing.after))
    wrapper.unmount()
  })

  it('opens and closes every section from the first one, and the others one at a time', async () => {
    const wrapper = await mountSuspended(BookingGuide, { props: { locale: 'it' } })
    const root: Element = wrapper.element
    const sections = Array.from(root.querySelectorAll<HTMLDetailsElement>('details'))
    const toggle = async (section: HTMLDetailsElement, open: boolean) => {
      section.open = open
      section.dispatchEvent(new Event('toggle'))
      await nextTick()
    }

    await toggle(sections[0], true)
    expect(sections.map((section) => section.open)).toEqual([true, true, true])

    await toggle(sections[2], false)
    expect(sections.map((section) => section.open)).toEqual([true, true, false])

    await toggle(sections[0], false)
    expect(sections.map((section) => section.open)).toEqual([false, false, false])

    await toggle(sections[1], true)
    expect(sections.map((section) => section.open)).toEqual([false, true, false])
    wrapper.unmount()
  })
})
