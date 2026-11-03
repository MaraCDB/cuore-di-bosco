import { afterEach, describe, expect, it, vi } from 'vitest'
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
})
