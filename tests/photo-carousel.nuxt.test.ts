import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PhotoCarousel from '~/components/site/photo-carousel.vue'
import carouselSource from '~/components/site/photo-carousel.vue?raw'

const carouselStyles = carouselSource.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ''

const photos = [
  { src: '/images/home/bosco-1920.webp', alt: 'Il sentiero nel bosco', caption: 'Il bosco' },
  { src: '/images/home/forra-sorna-1280.webp', alt: 'Un tuffo nelle acque della Forra della Sorna', caption: 'Forra della Sorna', credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Tommaso Prugnola' },
  { src: '/images/home/castello-avio-1280.webp', alt: 'Il castello di Avio tra i cipressi', credit: 'Archivio Fotografico APT Rovereto Vallagarina Monte Baldo. Foto di Martina Vanzo' },
]

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountCarousel() {
  const wrapper = await mountSuspended(PhotoCarousel, { props: { photos, label: 'Fotografie di prova' }, attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function ruleBody(selector: string): string | undefined {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return carouselStyles.match(new RegExp(`(?:^|[\\s,}])${escaped}\\{([^}]*)\\}`, 'm'))?.[1]
}

function pointer(type: string, clientX: number, init: PointerEventInit = {}): PointerEvent {
  return new PointerEvent(type, { bubbles: true, pointerId: 1, pointerType: 'mouse', button: 0, buttons: 1, clientX, ...init })
}

function controlTime() {
  const clock = { now: 1000 }
  const frames: FrameRequestCallback[] = []
  vi.spyOn(performance, 'now').mockImplementation(() => clock.now)
  const requestFrame = vi.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => frames.push(callback))
  return { clock, frames, requestFrame }
}

async function mountSizedTrack() {
  const wrapper = await mountCarousel()
  const track = wrapper.find('.photo-row').element as HTMLElement
  Object.defineProperty(track, 'scrollWidth', { value: 5000 })
  Object.defineProperty(track, 'clientWidth', { value: 400 })
  return { wrapper, track }
}

function flingLeft(track: HTMLElement, clock: { now: number }) {
  track.dispatchEvent(pointer('pointerdown', 300))
  for (const clientX of [260, 220, 180]) {
    clock.now += 16
    track.dispatchEvent(pointer('pointermove', clientX))
  }
  clock.now += 2
  track.dispatchEvent(pointer('pointerup', 180, { buttons: 0 }))
}

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  vi.restoreAllMocks()
})

describe('photo carousel', () => {
  it('labels itself as a carousel region', async () => {
    const wrapper = await mountCarousel()
    const region = wrapper.element as HTMLElement

    expect(region.getAttribute('role')).toBe('region')
    expect(region?.getAttribute('aria-roledescription')).toBe('carosello')
    expect(region?.getAttribute('aria-label')).toBe('Fotografie di prova')
  })

  it('shows each photo once with its caption and credit, then a hidden copy for the seamless loop', async () => {
    const wrapper = await mountCarousel()
    const figures = [...wrapper.element.querySelectorAll('.photo-row > figure')]
    const visibleFigures = figures.filter(figure => !figure.hasAttribute('aria-hidden'))
    const hiddenFigures = figures.filter(figure => figure.getAttribute('aria-hidden') === 'true')

    expect(visibleFigures.map(figure => figure.querySelector('img')?.getAttribute('src'))).toEqual(photos.map(photo => photo.src))
    expect(hiddenFigures.map(figure => figure.querySelector('img')?.getAttribute('src'))).toEqual(photos.map(photo => photo.src))
    expect(visibleFigures.map(figure => figure.querySelector('.photo-credit')?.textContent ?? null)).toEqual(photos.map(photo => photo.credit ?? null))
    expect(visibleFigures[0].querySelector('figcaption')?.textContent).toBe('Il bosco')
    expect(figures.filter(figure => figure.querySelector('img')?.hasAttribute('width') || figure.querySelector('img')?.hasAttribute('height'))).toEqual([])
  })

  it('offers previous, pause and next buttons', async () => {
    const wrapper = await mountCarousel()
    const labels = [...wrapper.element.querySelectorAll('.carousel-controls button')].map(button => button.getAttribute('aria-label'))

    expect(labels).toEqual(['Foto precedente', 'Ferma lo scorrimento', 'Foto successiva'])
  })

  it('toggles the auto scroll with the pause button', async () => {
    const wrapper = await mountCarousel()
    const toggle = wrapper.findAll('.carousel-controls button')[1]

    await toggle.trigger('click')
    expect(toggle.attributes('aria-label')).toBe('Avvia lo scorrimento')
    await toggle.trigger('click')
    expect(toggle.attributes('aria-label')).toBe('Ferma lo scorrimento')
  })

  it('stays still for visitors who ask for reduced motion', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const wrapper = await mountCarousel()

    expect(wrapper.findAll('.carousel-controls button')[1].attributes('aria-label')).toBe('Avvia lo scorrimento')
  })

  it('hides the scrollbar and keeps each credit inside the visible width', () => {
    expect(ruleBody('.photo-row')).toContain('scrollbar-width:none')
    expect(ruleBody('.photo-row::-webkit-scrollbar')).toBe('display:none')
    expect(ruleBody('.photo-credit')).toContain('max-width:calc(100vw - 2 * var(--margin))')
  })

  it('keeps the control buttons at least 44px wide for touch', () => {
    expect(ruleBody('.carousel-controls button')).toContain('width:44px;height:44px')
  })

  it('follows the mouse while dragging and marks the track as dragging', async () => {
    const { clock } = controlTime()
    const { wrapper, track } = await mountSizedTrack()

    track.dispatchEvent(pointer('pointerdown', 300))
    clock.now += 16
    track.dispatchEvent(pointer('pointermove', 220))
    await nextTick()

    expect(track.scrollLeft).toBe(80)
    expect(wrapper.find('.photo-row').classes()).toContain('is-dragging')

    clock.now += 500
    track.dispatchEvent(pointer('pointerup', 220, { buttons: 0 }))
    await nextTick()

    expect(track.scrollLeft).toBe(80)
    expect(wrapper.find('.photo-row').classes()).not.toContain('is-dragging')
  })

  it('ignores a mouse press that moves less than the drag threshold', async () => {
    controlTime()
    const { wrapper, track } = await mountSizedTrack()

    track.dispatchEvent(pointer('pointerdown', 300))
    track.dispatchEvent(pointer('pointermove', 297))
    await nextTick()

    expect(track.scrollLeft).toBe(0)
    expect(wrapper.find('.photo-row').classes()).not.toContain('is-dragging')
  })

  it('leaves touch scrolling to the browser', async () => {
    controlTime()
    const { wrapper, track } = await mountSizedTrack()

    track.dispatchEvent(pointer('pointerdown', 300, { pointerType: 'touch' }))
    track.dispatchEvent(pointer('pointermove', 200, { pointerType: 'touch' }))
    await nextTick()

    expect(track.scrollLeft).toBe(0)
    expect(wrapper.find('.photo-row').classes()).not.toContain('is-dragging')
  })

  it('keeps the photos from being dragged as images', async () => {
    const wrapper = await mountCarousel()

    expect(wrapper.findAll('.photo-row img').map(image => image.attributes('draggable'))).toEqual(Array(photos.length * 2).fill('false'))
  })

  it('keeps gliding after a fast release', async () => {
    const { clock, frames } = controlTime()
    const { track } = await mountSizedTrack()

    flingLeft(track, clock)
    const releasedAt = track.scrollLeft
    frames.at(-1)?.(2000)
    frames.at(-1)?.(2016)

    expect(releasedAt).toBe(120)
    expect(track.scrollLeft).toBeGreaterThan(releasedAt)
  })

  it('stops after the release for visitors who ask for reduced motion', async () => {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: true } as MediaQueryList)
    const { clock, requestFrame } = controlTime()
    const { track } = await mountSizedTrack()
    const framesBeforeFling = requestFrame.mock.calls.length

    flingLeft(track, clock)

    expect(track.scrollLeft).toBe(120)
    expect(requestFrame.mock.calls.length).toBe(framesBeforeFling)
  })

  it('shows a grab cursor on mouse devices and blocks text selection while dragging', () => {
    expect(carouselStyles).toContain('@media (hover:hover) and (pointer:fine){.photo-row{cursor:grab}}')
    expect(ruleBody('.photo-row.is-dragging')).toBe('cursor:grabbing;user-select:none')
  })
})
