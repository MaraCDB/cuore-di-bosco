import type { SiteLocale } from './site-links'

const italianLodgingBusiness: Record<string, unknown> = {
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
}

const englishLodgingBusiness: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "B&B Cuore di Bosco",
  "alternateName": "Bed and Breakfast Cuore di Bosco",
  "description": "Family-friendly B&B with children on the Brentonico Plateau, Trentino. Homemade breakfasts, baby kit, bikes and family-oriented services surrounded by Monte Baldo Nature Park.",
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
  "paymentAccepted": "Cash, Credit card, Debit card, Bank transfer",
  "numberOfRooms": 2,
  "petsAllowed": false,
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Family-friendly services", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bicycle rental", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Laundry service", "value": true }
  ],
  "containedInPlace": {
    "@type": "Place",
    "name": "Brentonico Plateau",
    "description": "The Brentonico Plateau, known as Europe's Garden, is located in Monte Baldo Nature Park in Trentino, Italy.",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.8175,
      "longitude": 10.9575
    },
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Trentino-Alto Adige, Italy"
    }
  },
  "tourBookingPage": "https://www.cuoredibosco.it/en/booking",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61583661897314",
    "https://www.instagram.com/bbcuoredibosco/"
  ]
}

const germanLodgingBusiness: Record<string, unknown> = {
  ...italianLodgingBusiness,
  "description": "B&B für Familien mit Kindern auf der Hochebene von Brentonico im Trentino. Natürliches Frühstück, Babyausstattung, Fahrräder und Angebote für Familien, mitten in der Natur des Naturparks Monte Baldo.",
  "paymentAccepted": "Bargeld, Kreditkarte, Debitkarte, Banküberweisung",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Kostenloses WLAN", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Frühstück inklusive", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kostenlose Parkmöglichkeit", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Angebote für Familien", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Fahrräder zur Verfügung", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wäscheservice", "value": true }
  ],
  "containedInPlace": {
    "@type": "Place",
    "name": "Hochebene von Brentonico",
    "description": "Die Hochebene von Brentonico, bekannt als Garten Europas, liegt im Naturpark Monte Baldo im Trentino, Italien.",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.8175,
      "longitude": 10.9575
    },
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Trentino-Südtirol, Italien"
    }
  },
  "tourBookingPage": "https://www.cuoredibosco.it/de/buchen"
}

const lodgingBusinessByLocale: Record<SiteLocale, Record<string, unknown>> = {
  it: italianLodgingBusiness,
  en: englishLodgingBusiness,
  de: germanLodgingBusiness,
}

/**
 * Returns the schema.org LodgingBusiness description of the B&B in the given language.
 */
export function lodgingBusinessJsonLd(locale: SiteLocale): Record<string, unknown> {
  return lodgingBusinessByLocale[locale]
}
