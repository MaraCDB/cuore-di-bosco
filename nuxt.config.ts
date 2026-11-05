// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxt/scripts',
    '@nuxt/eslint',
  ],
  css: ['@/assets/css/global.css', '@/assets/css/legacy.css'],
  googleFonts: {
    families: {
      Cardo: [400, 700],
      Yesteryear: [400, 700],
      'Mountains of Christmas': [400, 700],
      Montserrat: [300, 400, 500, 600, 700],
    },
    display: 'swap',
    preconnect: true,
    download: true,
    inject: true,
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it.json' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.json' }
    ],
    defaultLocale: 'it',
    lazy: true,
    detectBrowserLanguage: false,
    strategy: 'no_prefix' // puoi anche usare 'prefix' se vuoi sempre il prefisso /en /it
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/it',
        '/it/prenota',
        '/it/esplora',
        '/it/regolamento',
        '/it/privacy-policy',
        '/en',
        '/en/booking',
        '/en/explore',
        '/en/rules',
        '/en/privacy-policy',
        '/de/buchen',
        '/de',
        '/de/entdecken',
      ],
    },
  },
});
