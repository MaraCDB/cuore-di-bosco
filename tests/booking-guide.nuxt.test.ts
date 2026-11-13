import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BookingGuide from '~/components/BookingGuide.vue'
import { bookingGuide } from '~/utils/booking-guide'
import type { SiteLocale } from '~/utils/site-links'

const locales: SiteLocale[] = ['it', 'en', 'de']

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

describe('booking guide', () => {
  it.each(locales)('renders a closed disclosure with the %s copy and rules link', async (locale) => {
    const copy = bookingGuide(locale)
    const wrapper = await mountSuspended(BookingGuide, { props: { locale } })
    const details = wrapper.element.matches('details.booking-guide') ? wrapper.element : wrapper.element.querySelector('details.booking-guide')
    const text = normalize(details?.textContent ?? '')

    expect(details).not.toBeNull()
    expect(details?.hasAttribute('open')).toBe(false)
    expect(normalize(details?.querySelector('summary')?.textContent ?? '')).toBe(copy.summary)
    expect(text).toContain(normalize(copy.paragraphs[0]))
    expect(text).toContain(normalize(copy.paragraphs[2]))
    expect(details?.querySelectorAll('p')).toHaveLength(copy.paragraphs.length + 1)
    expect(details?.querySelector('p:last-child a')?.getAttribute('href')).toBe(copy.closing.to)
    expect(normalize(details?.querySelector('p:last-child')?.textContent ?? '')).toBe(normalize(copy.closing.before + copy.closing.linkLabel + copy.closing.after))
    wrapper.unmount()
  })
})
