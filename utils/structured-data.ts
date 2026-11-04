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

/**
 * Returns the schema.org LodgingBusiness description of the B&B in the given language.
 */
export function lodgingBusinessJsonLd(locale: SiteLocale): Record<string, unknown> {
  return locale === 'en' ? englishLodgingBusiness : italianLodgingBusiness
}
