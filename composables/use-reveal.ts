const REVEAL_SELECTOR = '[data-reveal]'
const REVEALED_CLASS = 'is-in'
const READY_CLASS = 'reveal-ready'
const OBSERVER_OPTIONS = { rootMargin: '0px 0px -8% 0px' }

/**
 * Fades in `[data-reveal]` elements inside `root` as they enter the viewport.
 * Elements already in the viewport are revealed immediately; hiding is only
 * enabled once `reveal-ready` is set on `root`, so nothing stays hidden without JavaScript.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const container = root.value
    if (!container) {
      return
    }

    const belowTheFold: Element[] = []
    container.querySelectorAll(REVEAL_SELECTOR).forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add(REVEALED_CLASS)
      }
      else {
        belowTheFold.push(element)
      }
    })

    container.classList.add(READY_CLASS)

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(REVEALED_CLASS)
          revealObserver.unobserve(entry.target)
        }
      })
    }, OBSERVER_OPTIONS)
    belowTheFold.forEach(element => revealObserver.observe(element))
    observer = revealObserver
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
