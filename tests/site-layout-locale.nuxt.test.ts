import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'
import EnglishLayout from '~/layouts/english.vue'
import SiteFooter from '~/components/site/footer.vue'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountDefaultLayout(path: string) {
  const wrapper = await mountSuspended(DefaultLayout, { route: path, attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function emittedJsonLd(): Record<string, unknown> {
  const script = document.head.querySelector('script[type="application/ld+json"]')
  return JSON.parse(script?.innerHTML ?? 'null')
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useRouter().push('/it')
  await useNuxtApp().$i18n.setLocale('it')
})

describe('default layout language', () => {
  it('uses English on an /en path', async () => {
    await mountDefaultLayout('/en/rules')
    await vi.waitFor(() => expect(useNuxtApp().$i18n.locale.value).toBe('en'))
  })

  it('uses Italian on an /it path', async () => {
    await useNuxtApp().$i18n.setLocale('en')
    await mountDefaultLayout('/it/regolamento')
    await vi.waitFor(() => expect(useNuxtApp().$i18n.locale.value).toBe('it'))
  })

  it('emits a JSON-LD object and the html lang of the page language', async () => {
    await mountDefaultLayout('/en/rules')
    await vi.waitFor(() => expect(document.documentElement.lang).toBe('en'))
    const englishJsonLd = emittedJsonLd()
    expect(typeof englishJsonLd).toBe('object')
    expect(englishJsonLd.tourBookingPage).toContain('/en/booking')
  })

  it('follows a route change from Italian to English without remounting', async () => {
    await mountDefaultLayout('/it/regolamento')
    await vi.waitFor(() => expect(document.documentElement.lang).toBe('it'))
    expect(emittedJsonLd().tourBookingPage).toContain('/it/prenota')

    await useRouter().push('/en/rules')
    await vi.waitFor(() => expect(document.documentElement.lang).toBe('en'))
    await vi.waitFor(() => expect(useNuxtApp().$i18n.locale.value).toBe('en'))
    expect(emittedJsonLd().tourBookingPage).toContain('/en/booking')
  })
})

describe('english layout JSON-LD', () => {
  it('emits the structured data as a single JSON object', async () => {
    const wrapper = await mountSuspended(EnglishLayout, { route: '/en/rules', attachTo: document.body })
    mountedWrappers.push(wrapper)
    await vi.waitFor(() => expect(document.documentElement.lang).toBe('en'))

    const jsonLd = emittedJsonLd()
    expect(typeof jsonLd).toBe('object')
    expect(jsonLd.tourBookingPage).toContain('/en/booking')
  })
})

describe('footer paragraph', () => {
  it('keeps only the two links inside the Italian paragraph', async () => {
    const wrapper = await mountSuspended(SiteFooter)
    mountedWrappers.push(wrapper)
    const paragraph = wrapper.element.querySelector('.footer-welcome p') as HTMLElement
    expect([...paragraph.children].map(child => child.tagName)).toEqual(['A', 'A'])
    expect(paragraph.textContent?.trim()).toBe('Prenotare è molto semplice: puoi scriverci una mail a info@cuoredibosco.it o un messaggio whatsapp o telegram al 349 4960228, ti risponderemo al più presto!')
  })
})
