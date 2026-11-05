import { describe, expect, it } from 'vitest'
import { lodgingBusinessJsonLd } from '../utils/structured-data'
import type { SiteLocale } from '../utils/site-links'

interface LodgingJsonLd {
  '@type': string
  '@id': string
  url: string
  description: string
  geo: { elevation: number }
  smokingAllowed: boolean
  petsAllowed: boolean
  numberOfRooms: number
  amenityFeature: { name: string }[]
  sameAs: string[]
}

const forbiddenWords = ['noleggio', 'rental', 'hire', 'verleih', 'vermietung', 'pic nic', 'picnic day', 'picknick-tag', 'express', 'cauzione', 'deposit', 'kaution', 'kostenpflichtig', 'a pagamento', 'paid', 'washing machine', 'lavatrice', 'waschmaschine']

const expectedDescriptions: Record<SiteLocale, string> = {
  it: 'B&B a Prada di Brentonico, 776 m, sul bivio per Polsa: colazioni genuine, kit bimbo e sentieri del Monte Baldo, vicino a Rovereto e al Lago di Garda.',
  en: 'B&B in Prada di Brentonico, 776 m, at the Polsa junction: genuine breakfasts, baby kit and Monte Baldo trails, near Rovereto and Lake Garda.',
  de: 'B&B in Prada di Brentonico, 776 m, an der Abzweigung nach Polsa: natürliches Frühstück, Babyausstattung und Monte-Baldo-Wege, nahe Rovereto und Gardasee.',
}

const expectedAmenities: Record<SiteLocale, string[]> = {
  it: ['Biciclette in prestito', 'Servizio lavanderia', 'Parcheggio gratuito nelle vicinanze'],
  en: ['Bikes on loan', 'Laundry service', 'Free parking nearby'],
  de: ['Fahrräder zur Verfügung', 'Wäscheservice', 'Kostenlose Parkplätze in der Nähe'],
}

describe.each(['it', 'en', 'de'] as SiteLocale[])('lodgingBusinessJsonLd(%s)', (locale) => {
  const jsonLd = lodgingBusinessJsonLd(locale) as unknown as LodgingJsonLd

  it('identifies the business as a bed and breakfast with a shared id', () => {
    expect(jsonLd['@type']).toBe('BedAndBreakfast')
    expect(jsonLd['@id']).toBe('https://www.cuoredibosco.it/#bnb')
  })

  it('points the url at the home page of the language', () => {
    expect(jsonLd.url).toBe(`https://www.cuoredibosco.it/${locale}`)
  })

  it('states elevation, smoking, pets and rooms', () => {
    expect(jsonLd.geo.elevation).toBe(776)
    expect(jsonLd.smokingAllowed).toBe(false)
    expect(jsonLd.petsAllowed).toBe(false)
    expect(jsonLd.numberOfRooms).toBe(2)
  })

  it('uses the home meta description of the language', () => {
    expect(jsonLd.description).toBe(expectedDescriptions[locale])
    expect(expectedDescriptions[locale].length).toBeLessThanOrEqual(160)
  })

  it('lists the amenities of the language', () => {
    const amenityNames = jsonLd.amenityFeature.map(feature => feature.name)
    expect(amenityNames).toEqual(expect.arrayContaining(expectedAmenities[locale]))
  })

  it('contains no forbidden word and survives a JSON round trip', () => {
    const serialized = JSON.stringify(jsonLd)
    forbiddenWords.forEach(word => expect(serialized.toLowerCase()).not.toContain(word))
    expect(JSON.parse(serialized)).toEqual(jsonLd)
  })

  it('links the social profiles', () => {
    expect(jsonLd.sameAs).toEqual(expect.arrayContaining([
      'https://www.facebook.com/profile.php?id=61583661897314',
      'https://www.instagram.com/bbcuoredibosco/',
    ]))
  })
})

describe.each(['en', 'de'] as SiteLocale[])('lodgingBusinessJsonLd(%s) language purity', (locale) => {
  it('contains no Italian text', () => {
    const serialized = JSON.stringify(lodgingBusinessJsonLd(locale))
    ;['Altopiano', 'Parcheggio', 'Colazione', 'Contanti', 'Italia"'].forEach(word => expect(serialized).not.toContain(word))
  })
})
