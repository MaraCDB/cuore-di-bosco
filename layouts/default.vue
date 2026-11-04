<template>
    <SiteHeader />

    <CookieBanner />

    <main :class="{ redesign: isRedesignedRoute }">
        <slot />
    </main>

    <SiteFooter />
    <SiteDock />
    <SiteToTop />
</template>


<script setup lang="ts">
const { setLocale } = useI18n();
const route = useRoute();
const locale = computed(() => siteLocale(route.path));

await setLocale(locale.value);
watch(locale, siteLanguage => setLocale(siteLanguage).catch(() => {}));

const redesignedRoutes = new Set(['/it', '/it/', '/it/esplora', '/it/esplora/', '/it/regolamento', '/it/regolamento/', '/it/privacy-policy', '/it/privacy-policy/', '/it/prenota', '/it/prenota/', '/en', '/en/', '/en/explore', '/en/explore/', '/en/rules', '/en/rules/', '/en/privacy-policy', '/en/privacy-policy/', '/en/booking', '/en/booking/', '/de/buchen', '/de/buchen/']);
const isRedesignedRoute = computed(() => redesignedRoutes.has(route.path));
const structuredData = computed(() => JSON.stringify(lodgingBusinessJsonLd(locale.value)));

useHead({
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'geo.position', content: '45.8015;10.9562' },
    { name: 'geo.placename', content: 'Prada di Brentonico, Trentino' },
    { name: 'geo.region', content: 'IT-TN' },
    { name: 'ICBM', content: '45.8015, 10.9562' },
    { name: 'place:location:latitude', content: '45.8015' },
    { name: 'place:location:longitude', content: '10.9562' },
  ],
  link: [
    { rel: 'alternate', hreflang: 'it', href: 'https://www.cuoredibosco.it/it' },
    { rel: 'alternate', hreflang: 'en', href: 'https://www.cuoredibosco.it/en' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://www.cuoredibosco.it/it' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: structuredData,
    },
  ],
});
</script>
