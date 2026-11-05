import { readFileSync } from 'node:fs'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import BookingPage from '~/pages/it/prenota.vue'

const pageSource = readFileSync('pages/it/prenota.vue', 'utf8')
const pageStyles = readFileSync('assets/css/pages/booking.css', 'utf8')
const legacyTexts: string[] = JSON.parse(readFileSync('tests/fixtures/prenota-legacy-text.json', 'utf8'))

const iconCaptions = ['FREE WIFI', 'ASCIUGAMANI E BIANCHERIA INCLUSI', 'DOTAZIONI DI CORTESIA PER GLI OSPITI', 'DOCCIA E BAGNO PRIVATI', 'COLAZIONE DOLCE E SALATA', 'SET BOLLITORE', 'LAVANDERIA', 'BICICLETTE A DISPOSIZIONE', 'GIOCHI PER BAMBINI', 'DOTAZIONI PER BAMBINI', 'CULLA PER BAMBINI', 'MATERIALI PER BAMBINI', 'SUPPORTI PER PORTARE', 'LIBRERIA PER ADULTI E BAMBINI', 'PIC-NIC']
const ownerCarouselPhotos = ['casa-portone-960', 'terrazza-neve-1280', 'terrazza-estate-1280', 'terrazza-tramonto-1280', 'mirtillo-letto-960', 'mirtillo-relax-960', 'mirtillo-balcone-960', 'lampone-letti-1280', 'lampone-angolo-960', 'colazione-dolci-1280', 'sala-colazione-1280', 'colazione-frutta-1280', 'colazione-bancone-1280', 'sala-tavolo-960', 'colazione-yogurt-1280', 'ingresso-mappe-960']
const carouselSources = [...ownerCarouselPhotos.map(name => `/images/home/${name}.webp`), '/images/home/casa-1600.webp', '/images/lampone/1.webp', '/images/lampone/2.webp', '/images/lampone/3.webp', '/images/lampone/5.webp', '/images/home/lampone-balcone-1200.webp', '/images/mirtillo/1.webp', '/images/mirtillo/2.webp', '/images/mirtillo/3.webp', '/images/mirtillo/4.webp', '/images/home/colazione-1280.webp']
const carouselAlts = [
  'Il portone in legno della casa sotto l’arco in pietra, con la ghirlanda',
  'La terrazza coperta di neve con le luci accese e un albero carico di neve',
  'La terrazza con la vista sui prati e sulle montagne in una giornata di sole',
  'La terrazza al tramonto, con il cielo rosa sopra le montagne',
  'Il letto matrimoniale della camera Mirtillo con il copriletto a fiori',
  'La zona relax della camera Mirtillo con il divano azzurro e la scrivania',
  'Il balcone della camera Mirtillo con la vista sugli alberi e sulle montagne',
  'La camera Lampone con il letto matrimoniale, il letto singolo e l’armadio dipinto',
  'L’angolo in legno con il bollitore nella camera Lampone',
  'Il bancone della colazione con torte, dolci e marmellate',
  'La sala colazioni con i tavoli e la panca lungo la parete',
  'Il bancone della colazione con frutta, succhi e dolci',
  'Il bancone della sala colazioni con bicchieri, tazze e piatti',
  'Un tavolo della sala colazioni accanto alla finestra',
  'Yogurt, succhi, marmellate e una torta sul bancone della colazione',
  'L’ingresso con il porta-depliant e le mappe del territorio',
  'La casa in pietra del B&B Cuore di Bosco a Prada',
  ...[1, 2, 3, 5].map(number => `Camera Lampone foto ${number}`),
  'Il Monte Baldo innevato visto dal balcone della camera Lampone',
  ...[1, 2, 3, 4].map(number => `Camera Mirtillo foto ${number}`),
  'La colazione con la torta fatta in casa',
]

const mountedWrappers: Array<{ unmount: () => void }> = []

function normalize(text: string): string {
  return text.replace(/\xa0/g, ' ').replace(/\s+/g, ' ').trim()
}

function blockTexts(root: ParentNode, selector: string): string[] {
  return [...root.querySelectorAll(selector)].map((node) => {
    const copy = node.cloneNode(true) as Element
    copy.querySelectorAll('br').forEach(lineBreak => lineBreak.replaceWith(' '))
    return normalize(copy.textContent ?? '')
  })
}

async function mountBooking() {
  const wrapper = await mountSuspended(BookingPage, { attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

async function mountedPageText(): Promise<string> {
  const wrapper = await mountBooking()
  return blockTexts(wrapper.element, 'h1, h2, h3, p, figcaption').join(' ')
}

function ruleBody(selector: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return pageStyles.match(new RegExp(`(?:^|[\\s,}])${escaped}\\{([^}]*)\\}`, 'm'))?.[1]
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
})

describe('italian booking page', () => {
  it('keeps every legacy text word for word', async () => {
    const pageText = await mountedPageText()

    expect(legacyTexts.length).toBe(37)
    expect(legacyTexts.filter(text => !pageText.includes(text))).toEqual([])
  })

  it('applies the owners\' text fixes and drops the paid-service captions', async () => {
    const pageText = await mountedPageText()

    for (const removed of ['troverei', '(in realizzazione)', 'SERVIZIO LAVANDERIA', 'SERVIZIO PIC-NIC', 'SCRIVICI!', 'Giornata grigia?', 'NOLEGGIO BICI', 'PIC NIC DAY', 'a pagamento', 'in balcone (clima permettendo)', 'Omaggio di benvenuto', 'Bicchieri e tazze a disposizione', 'zona relax con divano e scrivania.', '(con cauzione)', 'lavanderia express']) {
      expect(pageText).not.toContain(removed)
    }
    expect(pageText).toContain('Nell’apposito stand inoltre troverai tutte le mappe')
    expect(pageText).toContain('libreria ed angolo giochi attrezzato.')
  })

  it('shows no payment or cancellation conditions', async () => {
    const pageText = (await mountedPageText()).toLowerCase()

    for (const forbidden of ['acconto', 'cancellazion', 'rimbors', 'caparra']) {
      expect(pageText).not.toContain(forbidden)
    }
  })

  it('titles the page and its sections', async () => {
    const wrapper = await mountBooking()
    const titles = (selector: string) => blockTexts(wrapper.element, selector)

    expect(titles('h1')).toEqual(['PRENOTA'])
    expect(titles('h2')).toEqual(['Scopri le nostre camere', 'I nostri servizi'])
    expect(titles('h3')).toEqual(['Lampone', 'Mirtillo', 'Servizi per famiglie', 'Servizi in camera', 'Altri servizi per te!'])
  })

  it('opens with the photo carousel on the forest band', async () => {
    const wrapper = await mountBooking()
    const band = wrapper.element.firstElementChild
    const images = [...(band?.querySelectorAll('img') ?? [])].slice(0, carouselSources.length)

    expect(band?.matches('.band.booking-carousel')).toBe(true)
    expect(band?.querySelector('.carousel')?.getAttribute('aria-label')).toBe('Fotografie delle camere e della casa')
    expect(images.map(image => image.getAttribute('src'))).toEqual(carouselSources)
    expect(images.map(image => image.getAttribute('alt'))).toEqual(carouselAlts)
  })

  it('never shows the same photo twice in the carousel', () => {
    expect(new Set(carouselSources).size).toBe(carouselSources.length)
    expect(carouselSources).not.toContain('/images/lampone/4.webp')
  })

  it('puts the snowy house photo beside the welcome text', async () => {
    const wrapper = await mountBooking()
    const intro = wrapper.element.querySelector('.booking-intro')
    const photo = intro?.querySelector('.booking-intro-photo > img')

    expect(photo?.getAttribute('src')).toBe('/images/home/casa-neve-1600.webp')
    expect(photo?.getAttribute('srcset')).toBe('/images/home/casa-neve-900.webp 900w, /images/home/casa-neve-1600.webp 1600w')
    expect(photo?.getAttribute('alt')).toBe('Neve in montagna in Trentino')
    expect(intro?.querySelectorAll('.booking-intro-text > p')).toHaveLength(4)
    expect(ruleBody('.booking-intro')).toContain('grid-template-columns:minmax(0,1fr) minmax(0,1fr)')
    expect(ruleBody('.booking-intro-photo img')).toContain('position:absolute;inset:0')
  })

  it('keeps the last section margin inside the linen page so no white strip shows above the footer', async () => {
    const wrapper = await mountBooking()

    expect(wrapper.element.classList.contains('booking-page')).toBe(true)
    expect(ruleBody('.booking-page')).toBe('display:flow-root')
  })

  it('fills the space beside the rooms intro with the logo on desktop only', async () => {
    const wrapper = await mountBooking()
    const logo = wrapper.element.querySelector('.rooms-head > img.rooms-logo')
    const desktopRules = pageStyles.match(/@media \(min-width:901px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(logo?.getAttribute('src')).toContain('logo_400')
    expect(logo?.getAttribute('alt')).toBe('')
    expect(ruleBody('.rooms-logo')).toBe('display:none')
    expect(desktopRules).toContain('.rooms-logo{display:block;grid-column:2')
  })

  it('keeps the booking widget container exactly as before', async () => {
    const wrapper = await mountBooking()
    const container = wrapper.element.querySelector('.booking-strip .js-booking-engine-container')

    expect(container?.classList.contains('booking-widget')).toBe(true)
    expect(container?.getAttribute('data-idstruttura')).toBe('68002')
    expect(container?.getAttribute('data-tipostruttura')).toBe('bbit')
    expect(container?.getAttribute('data-tipo')).toBe('widget')
    expect(container?.getAttribute('data-lingua')).toBe('it')
    expect(container?.getAttribute('data-action')).toBe('https://www.bed-and-breakfast.it/it/trentino-alto-adige/bb-cuore-di-bosco-brentonico/68002')
    expect(container?.getAttribute('data-colore')).toBe('green')
    expect(container?.getAttribute('data-wl')).toBe('true')
    expect(ruleBody('.booking-strip')).toContain('background:var(--lime)')
    expect(ruleBody('.booking-strip')).not.toContain('text-align')
    expect(ruleBody('.booking-strip h1')).toContain('text-align:center')
    expect(pageStyles).toContain('.booking-widget :deep(button){font-family:inherit}')
    expect(wrapper.element.querySelector('.booking-strip h1')?.textContent).toBe('PRENOTA')
    expect(wrapper.element.querySelectorAll('.booking-carousel [data-reveal], .booking-carousel[data-reveal], .booking-strip [data-reveal], .booking-strip[data-reveal]')).toHaveLength(0)
  })

  it.each(['lampone', 'mirtillo'])('gives the %s card its anchor, texts and four photos', async (roomId) => {
    const wrapper = await mountBooking()
    const room = wrapper.element.querySelector(`article.room#${roomId}`)
    const roomName = roomId === 'lampone' ? 'Lampone' : 'Mirtillo'
    const images = [...(room?.querySelectorAll('.room-photos img') ?? [])]

    expect(room).not.toBeNull()
    expect(images.map(image => image.getAttribute('src'))).toEqual([1, 2, 3, 4].map(number => `/images/${roomId}/${number}.webp`))
    expect(images.map(image => image.getAttribute('alt'))).toEqual([1, 2, 3, 4].map(number => `Camera ${roomName} foto ${number}`))
    expect(room?.querySelector('p.beds')?.textContent).toBe('Da 2 a 4 posti letto adulti')
  })

  it('puts the family line under the two room cards', async () => {
    const wrapper = await mountBooking()
    const familyLine = wrapper.element.querySelector('.booking-rooms p.rooms-family')
    const lastRoom = wrapper.element.querySelector('#mirtillo')

    expect(familyLine?.textContent).toBe('Culla gratis · 1° bambino gratis · 2° bambino al 50% · <12 anni')
    expect((lastRoom?.compareDocumentPosition(familyLine as Node) ?? 0) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    expect(ruleBody('.booking-rooms')).toContain('background:var(--champagne)')
  })

  it('shows the fifteen service icons in one panel', async () => {
    const wrapper = await mountBooking()
    const figures = [...wrapper.element.querySelectorAll('.services.band .service-icons > figure')]
    const desktopRules = pageStyles.match(/@media \(min-width:901px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(figures.map(figure => normalize(figure.querySelector('figcaption')?.textContent ?? ''))).toEqual(iconCaptions)
    expect(figures.map(figure => figure.querySelector('img')?.getAttribute('alt'))).toEqual(iconCaptions.map(() => ''))
    expect(desktopRules).toContain('.service-icons{grid-template-columns:repeat(8,minmax(0,1fr))')
  })

  it('sets the service texts in three columns with a meadow top border', async () => {
    const wrapper = await mountBooking()
    const columns = [...wrapper.element.querySelectorAll('.service-texts > .service-column')]
    const desktopRules = pageStyles.match(/@media \(min-width:901px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(columns).toHaveLength(3)
    expect(columns.map(column => column.querySelector('h3')?.textContent)).toEqual(['Servizi per famiglie', 'Servizi in camera', 'Altri servizi per te!'])
    expect(ruleBody('.service-column')).toContain('border-top:3px solid var(--meadow)')
    expect(desktopRules).toContain('.service-texts{grid-template-columns:repeat(3,minmax(0,1fr))')
  })

  it('never sets width or height on images and drops the legacy heroes', async () => {
    const wrapper = await mountBooking()
    const images = [...wrapper.element.querySelectorAll('img')]

    expect(images.filter(image => image.hasAttribute('width') || image.hasAttribute('height'))).toEqual([])
    expect(images.filter(image => /camere|colazioni|separator/.test(image.getAttribute('src') ?? ''))).toEqual([])
    expect(pageSource).not.toContain('v-html')
    expect(pageSource).not.toMatch(/<style(?![^>]*scoped)[^>]*>/)
  })

  it('justifies the long paragraphs within 68ch and aligns them left on phones', () => {
    const phoneRules = pageStyles.match(/@media \(max-width:520px\)\{([\s\S]*?)\n\}/)?.[1] ?? ''

    expect(pageStyles).toMatch(/\.booking-intro p,\.rooms-head p,\.room-text p:not\(\.lead\),\.service-column p\{max-width:68ch;text-align:justify;hyphens:auto\}/)
    expect(phoneRules).toContain('.booking-intro p,.rooms-head p,.room-text p:not(.lead),.service-column p{text-align:left}')
  })
})

describe('room photo lightbox', () => {
  const lightboxElement = () => document.body.querySelector<HTMLElement>('.lightbox')
  const lightboxButton = (selector: string) => document.body.querySelector<HTMLButtonElement>(`.lightbox ${selector}`)
  const lightboxImage = () => document.body.querySelector<HTMLImageElement>('.lightbox img.lightbox-img')
  const counterText = () => document.body.querySelector('.lightbox .lightbox-counter')?.textContent?.trim()
  const roomPhoto = (roomId: string, position: number) => document.body.querySelectorAll<HTMLButtonElement>(`#${roomId} button.room-photo`)[position - 1]

  async function pressKey(key: string) {
    window.dispatchEvent(new KeyboardEvent('keydown', { key }))
    await nextTick()
  }

  async function clickElement(element: HTMLElement | null | undefined) {
    element?.click()
    await nextTick()
  }

  it('opens the clicked photo full screen with its counter', async () => {
    await mountBooking()
    await clickElement(roomPhoto('lampone', 2))

    expect(lightboxElement()).not.toBeNull()
    expect(lightboxImage()?.getAttribute('src')).toBe('/images/lampone/2.webp')
    expect(lightboxImage()?.getAttribute('alt')).toBe('Camera Lampone foto 2')
    expect(counterText()).toBe('2 / 4')
  })

  it('loops through the room photos with the arrows', async () => {
    await mountBooking()
    await clickElement(roomPhoto('lampone', 4))

    await clickElement(lightboxButton('.lightbox-next'))
    expect(counterText()).toBe('1 / 4')
    expect(lightboxImage()?.getAttribute('src')).toBe('/images/lampone/1.webp')

    await clickElement(lightboxButton('.lightbox-prev'))
    expect(counterText()).toBe('4 / 4')

    await pressKey('ArrowRight')
    expect(counterText()).toBe('1 / 4')

    await pressKey('ArrowLeft')
    expect(counterText()).toBe('4 / 4')
  })

  it('closes with the close button, the backdrop and Esc', async () => {
    await mountBooking()

    await clickElement(roomPhoto('lampone', 1))
    await clickElement(lightboxButton('.lightbox-close'))
    expect(lightboxElement()).toBeNull()

    await clickElement(roomPhoto('lampone', 1))
    await clickElement(lightboxImage())
    expect(lightboxElement()).not.toBeNull()
    await clickElement(lightboxElement())
    expect(lightboxElement()).toBeNull()

    await clickElement(roomPhoto('lampone', 1))
    await pressKey('Escape')
    expect(lightboxElement()).toBeNull()
  })

  it('moves focus to the close button and back to the opening photo', async () => {
    await mountBooking()
    const openingPhoto = roomPhoto('lampone', 2)
    await clickElement(openingPhoto)
    await nextTick()

    expect(document.activeElement).toBe(lightboxButton('.lightbox-close'))

    await pressKey('Escape')
    expect(document.activeElement).toBe(openingPhoto)
  })

  it('ignores the arrow keys while the lightbox is closed', async () => {
    await mountBooking()

    await pressKey('ArrowRight')
    await pressKey('Escape')
    expect(lightboxElement()).toBeNull()
  })

  it('lightbox root carries the redesign class', async () => {
    await mountBooking()
    await clickElement(roomPhoto('lampone', 1))

    expect(lightboxElement()?.classList.contains('redesign')).toBe(true)
    expect(lightboxImage()?.hasAttribute('width')).toBe(false)
    expect(lightboxImage()?.hasAttribute('height')).toBe(false)
    expect(ruleBody('.lightbox')).toContain('z-index:10001')
  })

  it('announces itself as a modal dialog named after the photo shown', async () => {
    await mountBooking()
    await clickElement(roomPhoto('lampone', 3))

    expect(lightboxElement()?.getAttribute('role')).toBe('dialog')
    expect(lightboxElement()?.getAttribute('aria-modal')).toBe('true')
    expect(lightboxElement()?.getAttribute('aria-label')).toBe('Camera Lampone foto 3')

    await pressKey('ArrowRight')
    expect(lightboxElement()?.getAttribute('aria-label')).toBe('Camera Lampone foto 4')
  })

  it('keeps Tab and Shift+Tab inside the dialog', async () => {
    await mountBooking()
    await clickElement(roomPhoto('lampone', 1))
    const closeButton = lightboxButton('.lightbox-close')
    const lastButton = lightboxButton('.lightbox-next')

    lastButton?.focus()
    const forward = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
    window.dispatchEvent(forward)
    expect(forward.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(closeButton)

    const backward = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, cancelable: true })
    window.dispatchEvent(backward)
    expect(backward.defaultPrevented).toBe(true)
    expect(document.activeElement).toBe(lastButton)

    lightboxButton('.lightbox-prev')?.focus()
    const middle = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true })
    window.dispatchEvent(middle)
    expect(middle.defaultPrevented).toBe(false)
  })

  it('opens the Mirtillo photos on their own', async () => {
    await mountBooking()
    await clickElement(roomPhoto('mirtillo', 1))

    expect(lightboxImage()?.getAttribute('src')).toBe('/images/mirtillo/1.webp')
    expect(counterText()).toBe('1 / 4')
  })
})
