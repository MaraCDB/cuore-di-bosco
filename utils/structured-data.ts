import type { SiteLocale } from './site-links'

export const SITE_ORIGIN = 'https://www.cuoredibosco.it'

const sharedLodgingBusiness: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "BedAndBreakfast",
  "@id": `${SITE_ORIGIN}/#bnb`,
  "name": "B&B Cuore di Bosco",
  "alternateName": "Bed and Breakfast Cuore di Bosco",
  "telephone": "+393494960228",
  "email": "info@cuoredibosco.it",
  "image": `${SITE_ORIGIN}/images/cuore-casa.webp`,
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
    "longitude": 10.9562,
    "elevation": 776
  },
  "hasMap": "https://www.google.com/maps/place/Via+Gardesani,+15,+38060+Prada+TN",
  "checkinTime": "15:00",
  "checkoutTime": "10:30",
  "priceRange": "$$",
  "currenciesAccepted": "EUR",
  "numberOfRooms": 2,
  "petsAllowed": false,
  "smokingAllowed": false,
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61583661897314",
    "https://www.instagram.com/bbcuoredibosco/"
  ]
}

const italianLodgingBusiness: Record<string, unknown> = {
  ...sharedLodgingBusiness,
  "url": `${SITE_ORIGIN}/it`,
  "description": "B&B a Prada di Brentonico, 776 m, sul bivio per Polsa: colazioni genuine, kit bimbo e sentieri del Monte Baldo, vicino a Rovereto e al Lago di Garda.",
  "paymentAccepted": "Contanti, Carta di credito, Bancomat, Bonifico bancario",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Wi-Fi gratuito", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Colazione inclusa", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Parcheggio gratuito nelle vicinanze", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Servizi per famiglie", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Biciclette in prestito", "value": true },
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
  "tourBookingPage": `${SITE_ORIGIN}/it/prenota`
}

const englishLodgingBusiness: Record<string, unknown> = {
  ...sharedLodgingBusiness,
  "url": `${SITE_ORIGIN}/en`,
  "description": "B&B in Prada di Brentonico, 776 m, at the Polsa junction: genuine breakfasts, baby kit and Monte Baldo trails, near Rovereto and Lake Garda.",
  "paymentAccepted": "Cash, Credit card, Debit card, Bank transfer",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Free Wi-Fi", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Breakfast included", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free parking nearby", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Family-friendly services", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Bikes on loan", "value": true },
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
  "tourBookingPage": `${SITE_ORIGIN}/en/booking`
}

const germanLodgingBusiness: Record<string, unknown> = {
  ...sharedLodgingBusiness,
  "url": `${SITE_ORIGIN}/de`,
  "description": "B&B in Prada di Brentonico, 776 m, an der Abzweigung nach Polsa: natürliches Frühstück, Babyausstattung und Monte-Baldo-Wege, nahe Rovereto und Gardasee.",
  "paymentAccepted": "Bargeld, Kreditkarte, Debitkarte, Banküberweisung",
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Kostenloses WLAN", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Frühstück inklusive", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Kostenlose Parkplätze in der Nähe", "value": true },
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
  "tourBookingPage": `${SITE_ORIGIN}/de/buchen`
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
