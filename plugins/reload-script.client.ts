export default defineNuxtPlugin((nuxtApp) => {
 const router = useRouter()

  router.beforeEach((to, from, next) => {
    const reloadRoutes = ['/it/prenota', "/en/booking", '/de/buchen'];

    if (reloadRoutes.includes(to.path) && from.path !== to.path) {
      window.location.href = to.fullPath;
      return;
    }

    next();
  })
})
