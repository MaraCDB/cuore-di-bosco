import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '~/pages/it/index.vue'
import BookingPage from '~/pages/it/prenota.vue'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountHome() {
  const wrapper = await mountSuspended(HomePage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('italian home page', () => {
  it.each(['camere', 'colazione', 'arrivare'])('has the #%s section for in-page links', async (sectionId) => {
    const wrapper = await mountHome()

    expect(wrapper.element.querySelector(`#${sectionId}`)).not.toBeNull()
  })

  it('never sets width or height attributes on images', async () => {
    const wrapper = await mountHome()
    const images = [...wrapper.element.querySelectorAll('img')]

    expect(images.length).toBeGreaterThan(0)
    expect(images.filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
  })

  it('links each room card to its own section of the booking page', async () => {
    const wrapper = await mountHome()
    const detailTargets = wrapper.findAllComponents({ name: 'NuxtLink' })
      .map(link => link.props('to'))
      .filter(target => String(target).startsWith('/it/prenota#'))

    expect(detailTargets).toEqual(['/it/prenota#lampone', '/it/prenota#mirtillo'])
  })

  it('leads the Mirtillo card with the large room photo and the wardrobe beside it', async () => {
    const wrapper = await mountHome()
    const mirtilloPhotos = [...wrapper.element.querySelectorAll('.room:nth-of-type(2) .room-photos img')]
      .map(image => image.getAttribute('src'))

    expect(mirtilloPhotos.slice(0, 2)).toEqual(['/images/home/mirtillo-camera-1280.webp', '/images/home/mirtillo-armadio-700.webp'])
  })

  it('lists toiletries and linen apart from cleaning on both room cards', async () => {
    const wrapper = await mountHome()
    const featureLists = [...wrapper.element.querySelectorAll('.room-features')]
      .map(list => [...list.querySelectorAll('li')].map(item => item.textContent?.trim()))

    expect(featureLists).toHaveLength(2)
    featureLists.forEach(features => expect(features).toEqual(expect.arrayContaining([
      'Prodotti per igiene personale e biancheria inclusi',
      'Pulizie incluse',
    ])))
  })

  it('leaves the storage service to the booking page', async () => {
    const wrapper = await mountHome()

    expect(wrapper.element.querySelector('.guest-walkers')?.textContent).not.toContain('Servizio deposito')
    expect(wrapper.element.querySelector('.guest-walkers')?.textContent).toContain('Polsa, San Valentino e San Giacomo')
  })

  it('shows the family terms for both rooms right under the rooms heading', async () => {
    const wrapper = await mountHome()
    const familyTerms = wrapper.element.querySelector('.rooms-head + .rooms-family')

    expect(familyTerms?.textContent).toBe('Culla gratis · 1° bambino gratis · 2° bambino al 50% · <12 anni')
  })

  it('highlights the walkers and nearby keywords in bold', async () => {
    const wrapper = await mountHome()
    const boldWordsIn = (selector: string) => [...wrapper.element.querySelectorAll(`${selector} strong`)].map(word => word.textContent)

    expect(boldWordsIn('.guest-walkers')).toEqual(['bambini', 'trekking', 'Monte Baldo', 'località sciistiche'])
    expect(boldWordsIn('.guest-nearby')).toEqual(['Rovereto', 'Ala', 'Lago di Garda'])
  })

  it('lays out the four guest cards in order with a placeholder for the Altissimo panorama', async () => {
    const wrapper = await mountHome()
    const cardTitles = [...wrapper.element.querySelectorAll('.guests > .guest h3')].map(title => title.textContent)
    const placeholder = wrapper.element.querySelector('.guest-nearby .guest-placeholder')

    expect(cardTitles).toEqual(['Per chi cammina', 'Per chi ama la natura e i paesaggi', 'Per le famiglie', 'A breve distanza'])
    expect(placeholder?.getAttribute('role')).toBe('img')
    expect(placeholder?.getAttribute('aria-label')).toContain('Altissimo')
  })

  it('closes the page with the garden of Europe right after the directions', async () => {
    const wrapper = await mountHome()
    const lastSection = [...wrapper.element.querySelectorAll('section')].at(-1)

    expect(lastSection?.classList.contains('garden')).toBe(true)
    expect(lastSection?.previousElementSibling?.id).toBe('arrivare')
  })

  it('gives the motorway exit its own welcome paragraph after the lead', async () => {
    const wrapper = await mountHome()
    const exitParagraph = wrapper.element.querySelector('.welcome-text .lead + p')

    expect(exitParagraph?.querySelector('strong')?.textContent).toBe('uscita di Rovereto Sud')
    expect(exitParagraph?.textContent).toContain('dell’autostrada A22')
  })

  it('describes the breakfast as a buffet', async () => {
    const wrapper = await mountHome()
    const breakfastText = wrapper.element.querySelector('.breakfast-text')?.textContent

    expect(breakfastText).toContain('un buffet ricco di bontà')
    expect(breakfastText).toContain('Marmellate, sciroppi, erbe, tisane, miele, farine e tanto altro!')
  })

  it.each(['lampone', 'mirtillo'])('has the #%s room section on the booking page', async (roomId) => {
    const wrapper = await mountSuspended(BookingPage, { attachTo: document.body })
    mountedWrappers.push(wrapper)

    expect(wrapper.element.querySelector(`#${roomId}`)).not.toBeNull()
  })

  it('never prefetches pages from its links', async () => {
    const wrapper = await mountHome()
    const links = wrapper.findAllComponents({ name: 'NuxtLink' })

    expect(links.length).toBeGreaterThan(0)
    links.forEach(link => expect(link.props('noPrefetch')).toBe(true))
  })
})
