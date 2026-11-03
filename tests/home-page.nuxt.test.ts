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

  it('names the castle of Avio near Ala and gives Lake Garda its own sentence', async () => {
    const wrapper = await mountHome()
    const nearbyText = wrapper.element.querySelector('.guest-nearby p')?.textContent

    expect(nearbyText).toContain('il vicino castello di Avio con il suo scenografico mercatino di Natale. Non lontano c’è anche l’alto')
    expect(nearbyText).not.toContain('famoso castello')
  })

  it('lays out the four guest cards in order with the APT photos of the families and the castle of Avio and their credits', async () => {
    const wrapper = await mountHome()
    const cardTitles = [...wrapper.element.querySelectorAll('.guests > .guest h3')].map(title => title.textContent)
    const creditedPhotos = [...wrapper.element.querySelectorAll('.guests figure.guest-photo')].map(figure => ({
      src: figure.querySelector('img')?.getAttribute('src'),
      hasWidth: figure.querySelector('img')?.hasAttribute('width'),
      credit: figure.querySelector('figcaption')?.textContent,
    }))

    expect(cardTitles).toEqual(['Per chi cammina', 'Per chi ama la natura e i paesaggi', 'Per le famiglie', 'A breve distanza'])
    expect(creditedPhotos).toEqual([
      { src: '/images/home/famiglia-castione-1280.webp', hasWidth: false, credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Graziano Galvagni' },
      { src: '/images/home/castello-avio-1280.webp', hasWidth: false, credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo' },
    ])
    expect(wrapper.element.querySelector('.guest-placeholder')).toBeNull()
  })

  it('closes the page with the garden of Europe right after the directions', async () => {
    const wrapper = await mountHome()
    const lastSection = [...wrapper.element.querySelectorAll('section')].at(-1)

    expect(lastSection?.classList.contains('garden')).toBe(true)
    expect(lastSection?.previousElementSibling?.id).toBe('arrivare')
  })

  it('credits every APT and Altissimo photo in the garden row and drops the window view', async () => {
    const wrapper = await mountHome()
    const gardenFigures = [...wrapper.element.querySelectorAll('.garden .photo-row figure')]
    const creditOf = (source: string) => gardenFigures
      .find(figure => figure.querySelector('img')?.getAttribute('src') === `/images/home/${source}`)
      ?.querySelector('.photo-credit')?.textContent
    const aptCredit = 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di '

    expect(gardenFigures).toHaveLength(13)
    expect(gardenFigures.some(figure => figure.querySelector('img')?.getAttribute('src')?.includes('lampone-finestra'))).toBe(false)
    expect(gardenFigures.some(figure => figure.querySelector('img')?.hasAttribute('width'))).toBe(false)
    expect(creditOf('calanchi-san-giacomo-1200.webp')).toBe(`${aptCredit}Graziano Galvagni`)
    expect(creditOf('famiglia-castione-1280.webp')).toBe(`${aptCredit}Graziano Galvagni`)
    expect(creditOf('palazzo-eccheli-baisi-1280.webp')).toBe(`${aptCredit}Luca Matassoni`)
    expect(creditOf('castello-rovereto-700.webp')).toBe(`${aptCredit}Luca Matassoni`)
    expect(creditOf('campana-caduti-700.webp')).toBe(`${aptCredit}Luca Matassoni`)
    expect(creditOf('forra-sorna-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('trekking-baldo-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('inverno-brentonico-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('castello-avio-1280.webp')).toBe(`${aptCredit}Martina Vanzo`)
    expect(creditOf('monte-altissimo-1200.webp')).toBe('360gardalife. Foto di Angela Trawoeger')
  })

  it('ends the garden row with the view from the Lampone balcony right after the house', async () => {
    const wrapper = await mountHome()
    const gardenSources = [...wrapper.element.querySelectorAll('.garden .photo-row figure img')].map(image => image.getAttribute('src'))
    const lastFigure = wrapper.element.querySelector('.garden .photo-row figure:last-child')

    expect(gardenSources.slice(-2)).toEqual(['/images/home/casa-1600.webp', '/images/home/lampone-balcone-1200.webp'])
    expect(gardenSources.filter(source => source?.includes('lampone-balcone'))).toHaveLength(1)
    expect(lastFigure?.querySelector('figcaption')?.textContent).toBe('Dal balcone di Lampone')
  })

  it('marks the San Rocco text column for justified paragraphs', async () => {
    const wrapper = await mountHome()
    const pilgrimsText = wrapper.element.querySelector('#cammino .pilgrims-text')

    expect(pilgrimsText?.querySelector('h2')?.textContent).toBe('Il Cammino di San Rocco')
    expect(pilgrimsText?.querySelectorAll('p')).toHaveLength(3)
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
