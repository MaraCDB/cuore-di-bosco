<template>
    <SiteHeader />

    <CookieBanner above-dock redesign />

    <main :class="{ redesign: isRedesignedRoute }">
        <slot />
    </main>

    <SiteFooter />
    <SiteDock />
    <SiteToTop />
</template>


<script setup lang="ts">
const { setLocale } = useI18n();
setLocale("it");

const route = useRoute();
const isRedesignedRoute = computed(() => route.path === '/it' || route.path === '/it/');

useHead({
  htmlAttrs: { lang: 'it' },
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
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        "name": "B&B Cuore di Bosco",
        "alternateName": "Bed and Breakfast Cuore di Bosco",
        "description": "B&B per famiglie con bambini sull'Altopiano di Brentonico, Trentino. Colazioni genuine, kit bimbo, bici e servizi dedicati alle famiglie immersi nella natura del Parco del Monte Baldo.",
        "url": "https://www.cuoredibosco.it",
        "telephone": "+393494960228",
        "email": "info@cuoredibosco.it",
        "image": "https://www.cuoredibosco.it/images/cuore-casa.webp",
        "identifier": {
          "@type": "PropertyValue",
          "name": "CIN",
          "value": "IT022025C1W3ZHJVK4"
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Via Gardesani, 15",
          "addressLocality": "Brentonico",
          "addressRegion": "TN",
          "postalCode": "38060",
          "addressCountry": "IT"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 45.8015,
          "longitude": 10.9562
        },
        "hasMap": "https://www.google.com/maps/place/Via+Gardesani,+15,+38060+Prada+TN",
        "checkinTime": "15:00",
        "checkoutTime": "10:30",
        "priceRange": "$$",
        "currenciesAccepted": "EUR",
        "paymentAccepted": "Contanti, Carta di credito, Bancomat, Bonifico bancario",
        "numberOfRooms": 2,
        "petsAllowed": false,
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Wi-Fi gratuito", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Colazione inclusa", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Parcheggio gratuito", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Servizi per famiglie", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Noleggio biciclette", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Servizio lavanderia", "value": true }
        ],
        "containedInPlace": {
          "@type": "Place",
          "name": "Altopiano di Brentonico",
          "description": "L'Altopiano di Brentonico, conosciuto come il Giardino d'Europa, si trova nel Parco Naturale del Monte Baldo in Trentino.",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.8175,
            "longitude": 10.9575
          },
          "containedInPlace": {
            "@type": "AdministrativeArea",
            "name": "Trentino-Alto Adige, Italia"
          }
        },
        "tourBookingPage": "https://www.cuoredibosco.it/it/prenota",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61583661897314",
          "https://www.instagram.com/bbcuoredibosco/"
        ]
      }),
    },
  ],
});
</script>
