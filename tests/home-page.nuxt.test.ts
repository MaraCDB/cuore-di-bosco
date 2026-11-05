import { readFileSync } from 'node:fs'
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

  it('shows the Lampone kettle corner instead of the sofa photo', async () => {
    const wrapper = await mountHome()
    const lamponePhotos = [...wrapper.element.querySelectorAll('.room:nth-of-type(1) .room-photos img')]
      .map(image => image.getAttribute('src'))

    expect(lamponePhotos).toContain('/images/home/lampone-angolo-960.webp')
    expect(lamponePhotos).not.toContain('/images/home/lampone-divano-900.webp')
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

    expect(wrapper.element.querySelector('.guest-sport')?.textContent).not.toContain('Servizio deposito')
    expect(wrapper.element.querySelector('.guest-sport')?.textContent).toContain('Polsa, San Valentino e San Giacomo')
  })

  it('moves the walking sentence to the nature card and closes the sport card with the sport places', async () => {
    const wrapper = await mountHome()
    const sportParagraphs = [...wrapper.element.querySelectorAll('.guest-sport p')].map(paragraph => paragraph.textContent)
    const walkingSentence = 'Dai sentieri facili per passeggiate con bambini ai percorsi panoramici per trekking, ogni camminata offre scenari mozzafiato immersi nella natura del Monte Baldo e dei boschi circostanti.'

    expect(wrapper.element.querySelector('.guest-sport h3')?.textContent).toBe('Sport e natura')
    expect(sportParagraphs.join(' ')).not.toContain('Dai sentieri facili')
    expect(sportParagraphs.at(-1)).toContain('Parco Family Adventure Polsa')
    expect(sportParagraphs.at(-1)).toContain('Sull’Altopiano si svolgono inoltre campi scuola e ritiri sportivi.')
    expect(sportParagraphs.at(-1)).not.toContain('meta ideale')
    expect([...wrapper.element.querySelectorAll('.guest-nature p')].map(paragraph => paragraph.textContent).at(-1)).toBe(walkingSentence)
  })

  it('lists the baby equipment in its own paragraph and drops the baby kit link', async () => {
    const wrapper = await mountHome()
    const familyCard = [...wrapper.element.querySelectorAll('.guests > .guest')].find(card => card.querySelector('h3')?.textContent === 'Per le famiglie')
    const familyParagraphs = [...familyCard?.querySelectorAll('p') ?? []].map(paragraph => paragraph.textContent)

    expect(familyParagraphs).toHaveLength(2)
    expect(familyParagraphs[0]).toMatch(/ai genitori! Abbiamo tutto quello che serve, dimezzate i bagagli!$/)
    expect(familyParagraphs[1]).toMatch(/^Lettino, sponde per letto, fasciatoio,/)
    expect(familyParagraphs[1]).toMatch(/frigobar in camera lampone, .* materiali per colorare, disegnare e adesivi in quantità!$/)
    expect(familyCard?.querySelector('a')).toBeNull()
    expect(familyCard?.textContent).not.toContain('baby kit')
  })

  it('highlights the welcome keywords in bold and names the private bathroom and balcony', async () => {
    const wrapper = await mountHome()
    const welcomeBoldWords = [...wrapper.element.querySelectorAll('.welcome-text p:not(.lead) strong')].map(word => word.textContent)

    expect(welcomeBoldWords).toEqual(['uscita di Rovereto Sud', 'Monte Baldo', 'montagna', 'ospiti', 'coppie', 'famiglie', 'bagno e balcone privati', 'bambini'])
    expect(wrapper.element.querySelector('.welcome-text')?.textContent).not.toContain('bagno privato')
  })

  it('shows the family terms for both rooms right under the rooms heading', async () => {
    const wrapper = await mountHome()
    const familyTerms = wrapper.element.querySelector('.rooms-head + .rooms-family')

    expect(familyTerms?.textContent).toBe('Culla gratis · 1° bambino gratis · 2° bambino al 50% · <12 anni')
  })

  it('highlights the sport, nature and nearby keywords in bold', async () => {
    const wrapper = await mountHome()
    const boldWordsIn = (selector: string) => [...wrapper.element.querySelectorAll(`${selector} strong`)].map(word => word.textContent)

    expect(boldWordsIn('.guest-sport')).toEqual(['località sciistiche', 'bike park di Polsa', 'Parco Family Adventure Polsa', 'Canyon della Sorna', 'arrampicate', 'trekking', 'campi scuola e ritiri sportivi'])
    expect(boldWordsIn('.guest-nature')).toEqual(['Prada', 'Parco Naturale del Monte Baldo', 'bambini', 'trekking', 'Monte Baldo'])
    expect(boldWordsIn('.guest-nearby')).toEqual(['Rovereto', 'Ala', 'Lago di Garda'])
  })

  it('names the castle of Avio near Ala and gives Lake Garda its own sentence', async () => {
    const wrapper = await mountHome()
    const nearbyText = wrapper.element.querySelector('.guest-nearby p')?.textContent

    expect(nearbyText).toContain('il vicino castello di Avio con il suo scenografico mercatino di Natale. Non lontano c’è anche l’alto')
    expect(nearbyText).not.toContain('famoso castello')
  })

  it('adds the trains and the Trentino Guest Card link to the nearby card', async () => {
    const wrapper = await mountHome()
    const nearbyParagraphs = [...wrapper.element.querySelectorAll('.guest-nearby p')]
    const guestCardLink = nearbyParagraphs.at(-1)?.querySelector('a')

    expect(nearbyParagraphs).toHaveLength(2)
    expect(nearbyParagraphs.at(-1)?.textContent).toBe('Dalla stazione di Rovereto o Mori sono comodamente raggiungibili in treno anche località più lontane come Verona, Trento, Bolzano. I mezzi pubblici in territorio trentino sono tutti inclusi nella Trentino Guest Card insieme a sconti e convenzioni!')
    expect(guestCardLink?.textContent).toBe('Trentino Guest Card')
    expect(guestCardLink?.getAttribute('href')).toBe('https://www.visittrentino.info/it/esperienze/trentino-guest-card')
    expect(guestCardLink?.getAttribute('rel')).toBe('noopener')
  })

  it('lays out the four guest cards in order with the APT photos of the families and the castle of Avio and their credits', async () => {
    const wrapper = await mountHome()
    const cardTitles = [...wrapper.element.querySelectorAll('.guests > .guest h3')].map(title => title.textContent)
    const creditedPhotos = [...wrapper.element.querySelectorAll('.guests figure.guest-photo')].map(figure => ({
      src: figure.querySelector('img')?.getAttribute('src'),
      hasWidth: figure.querySelector('img')?.hasAttribute('width'),
      credit: figure.querySelector('figcaption')?.textContent,
    }))

    expect(cardTitles).toEqual(['Sport e natura','Per chi ama la natura e i paesaggi', 'Per le famiglie', 'A breve distanza'])
    expect(creditedPhotos).toEqual([
      { src: '/images/home/famiglia-castione-1280.webp', hasWidth: false, credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Graziano Galvagni' },
      { src: '/images/home/castello-avio-1280.webp', hasWidth: false, credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo' },
    ])
    expect(wrapper.element.querySelector('.guest-placeholder')).toBeNull()
  })

  it('opens the nearby card paragraph with "In auto" instead of repeating its title', async () => {
    const wrapper = await mountHome()
    const nearbyParagraph = wrapper.element.querySelector('.guest-nearby h3 + p')

    expect(nearbyParagraph?.textContent).toMatch(/^In auto è possibile visitare anche Rovereto/)
  })

  it('moves the rooms and breakfast sections right after the welcome', async () => {
    const wrapper = await mountHome()
    const sectionOrder = [...wrapper.element.querySelectorAll('section')]
      .map(section => section.id || [...section.classList].find(name => !['band', 'wrap'].includes(name)))

    expect(sectionOrder).toEqual(['hero', 'welcome', 'camere', 'colazione', 'everyone', 'faq', 'cammino', 'storia', 'reviews', 'arrivare', 'garden'])
  })

  it('sets the welcome and the garden on champagne bands so the cream rooms and directions never touch another cream section', () => {
    const homeStyles = readFileSync('assets/css/pages/home.css', 'utf8')

    expect(homeStyles).toMatch(/\n\.welcome\{background:var\(--champagne\);/)
    expect(homeStyles).toMatch(/\n\.garden\{background:var\(--champagne\);[^}]*padding:var\(--band-pad\) 0\}/)
  })

  it('shows the hero logo larger on phones and on desktop', () => {
    const homeStyles = readFileSync('assets/css/pages/home.css', 'utf8')

    expect(homeStyles).toContain('.hero-logo{width:clamp(90px,10.6vw,160px);')
    expect(homeStyles).toMatch(/@media \(min-width:901px\)\{[^@]*\.hero-logo\{width:clamp\(75px,8\.9vw,135px\)\}/)
    expect(homeStyles).toMatch(/@media \(max-width:520px\)\{[^@]*\.hero-logo\{width:75px\}/)
  })

  it('closes the page with the garden of Europe right after the directions', async () => {
    const wrapper = await mountHome()
    const lastSection = [...wrapper.element.querySelectorAll('section')].at(-1)

    expect(lastSection?.classList.contains('garden')).toBe(true)
    expect(lastSection?.previousElementSibling?.id).toBe('arrivare')
  })

  it('credits every APT, Altissimo and owner photo in the garden row and drops the window view', async () => {
    const wrapper = await mountHome()
    const gardenFigures = [...wrapper.element.querySelectorAll('.garden .photo-row figure:not([aria-hidden])')]
    const creditOf = (source: string) => gardenFigures
      .find(figure => figure.querySelector('img')?.getAttribute('src') === `/images/home/${source}`)
      ?.querySelector('.photo-credit')?.textContent
    const aptCredit = 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di '

    expect(gardenFigures).toHaveLength(16)
    expect(gardenFigures.some(figure => figure.querySelector('img')?.getAttribute('src')?.includes('lampone-finestra'))).toBe(false)
    expect(gardenFigures.some(figure => figure.querySelector('img')?.hasAttribute('width'))).toBe(false)
    expect(creditOf('calanchi-san-giacomo-1200.webp')).toBe(`${aptCredit}Graziano Galvagni`)
    expect(creditOf('famiglia-castione-1280.webp')).toBe(`${aptCredit}Graziano Galvagni`)
    expect(creditOf('palazzo-eccheli-baisi-1280.webp')).toBe(`${aptCredit}Luca Matassoni`)
    expect(creditOf('castello-rovereto-700.webp')).toBe(`${aptCredit}Luca Matassoni`)
    expect(creditOf('campana-caduti-700.webp')).toBe('APT Rovereto Vallagarina. Foto di Luca Matassoni')
    expect(creditOf('forra-sorna-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('trekking-baldo-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('inverno-brentonico-1280.webp')).toBe(`${aptCredit}Tommaso Prugnola`)
    expect(creditOf('castello-avio-1280.webp')).toBe(`${aptCredit}Martina Vanzo`)
    expect(creditOf('monte-altissimo-1200.webp')).toBe('360gardalife. Foto di Angela Trawoeger')
    for (const ownerPhoto of ['bosco-1920.webp', 'casa-1600.webp', 'primavera-prato-1280.webp', 'estate-arcobaleno-1280.webp', 'autunno-nuvole-1280.webp', 'inverno-nuvole-1280.webp'])
      expect(creditOf(ownerPhoto)).toBe('Photo Mara')
  })

  it('ends the garden carousel with the house and leaves the Lampone balcony out', async () => {
    const wrapper = await mountHome()
    const gardenSources = [...wrapper.element.querySelectorAll('.garden .photo-row figure:not([aria-hidden]) img')].map(image => image.getAttribute('src'))

    expect(gardenSources.at(-1)).toBe('/images/home/casa-1600.webp')
    expect(gardenSources.filter(source => source?.includes('lampone-balcone'))).toEqual([])
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
