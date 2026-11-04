import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'

/**
 * Scroll behavior that gives the URL hash priority over scroll-to-top when the page changes,
 * which Nuxt's default skips (it returns the top position before looking at the hash).
 */
export default <RouterConfig>{
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition) {
    if (to.path === from.path) {
      if (to.hash) {
        return document.querySelector(to.hash) ? { el: to.hash, behavior: 'auto' } : { left: 0, top: 0 }
      }
      return from.hash ? { left: 0, top: 0 } : false
    }

    const resolvePosition = () => savedPosition
      ?? (to.hash && document.querySelector(to.hash) ? { el: to.hash, behavior: 'instant' as const } : { left: 0, top: 0, behavior: 'instant' as const })

    const nuxtApp = useNuxtApp()
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(resolvePosition())
        return
      }
      const hookToWait = nuxtApp._runningTransition ? 'page:transition:finish' : 'page:loading:end'
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(resolvePosition()))
      })
    })
  },
}
