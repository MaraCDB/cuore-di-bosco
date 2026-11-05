import { SITE_ORIGIN } from './structured-data'
import type { SiteLocale } from './site-links'

export interface FaqLink {
  text: string
  label: string
  href: string
}

export interface FaqItem {
  question: string
  answer: string
  link?: FaqLink
}

export interface HomeFaqContent {
  heading: string
  lead: string
  items: FaqItem[]
}

const visitRoveretoHref = 'https://www.visitrovereto.it/info/guide/percorsi-trekking-monte-baldo/'

const homeFaqByLocale: Record<SiteLocale, HomeFaqContent> = {
  it: {
    heading: 'Domande frequenti',
    lead: 'Le domande che ci fate più spesso prima di arrivare.',
    items: [
      {
        question: 'Dove si trova il B&B e a che altitudine?',
        answer: 'Siamo a Prada di Brentonico, a 776 metri s.l.m., sul bivio per Polsa: sull’Altopiano di Brentonico, il giardino d’Europa, in Vallagarina, nel Parco Naturale Monte Baldo, in Trentino. Attorno a noi la catena del Monte Baldo, con vista su una delle sue cime più alte e famose, il Monte Altissimo di Nago.',
      },
      {
        question: 'Ci sono passeggiate e sentieri?',
        answer: 'Il Monte Baldo offre una fitta rete di sentieri tra il Lago di Garda e la Vallagarina, adatti a ogni livello di esperienza. Inoltre il Cammino di San Rocco passa proprio davanti a casa: siamo un suo punto di sosta ufficiale.',
        link: { text: 'Alcuni percorsi sono descritti su', label: 'Visit Rovereto', href: visitRoveretoHref },
      },
      {
        question: 'Dove si mangia nei dintorni?',
        answer: 'A Brentonico, a pochi minuti, ci sono diversi ristoranti, poi rifugi, agriturismi e malghe; giù ad Ala, Mori e Rovereto c’è un po’ di tutto. In paese un piccolo alimentari fa panini e vende generi alimentari e di necessità.',
      },
      {
        question: 'Cosa si raggiunge da qui?',
        answer: 'Polsa in 10 minuti, San Giacomo in 15, San Valentino in 20, Rovereto in 25 e il Lago di Garda in circa 30.',
      },
      {
        question: 'C’è un parcheggio gratuito?',
        answer: 'Ci sono parcheggi liberi e gratuiti disponibili a pochi minuti dalla struttura, alla chiesa e in fondo alla via, con ampia disponibilità. Vi preghiamo gentilmente di non parcheggiare in strada di fronte alla struttura.',
      },
      {
        question: 'Si arriva senza auto?',
        answer: 'Sì: l’autobus B305 Saccone-Brentonico-Mori-Rovereto ferma all’entrata di Prada. La stazione dei treni più vicina è Rovereto.',
      },
    ],
  },
  en: {
    heading: 'Frequently asked questions',
    lead: 'The questions you ask us most often before you arrive.',
    items: [
      {
        question: 'Where is the B&B, and at what altitude?',
        answer: 'We are in Prada di Brentonico, 776 metres above sea level, at the turn-off for Polsa: on the Brentonico Plateau, Europe’s Garden, in the Vallagarina, in Monte Baldo Nature Park, in Trentino. All around us is the Monte Baldo range, with a view of one of its highest and best-known peaks, Monte Altissimo di Nago.',
      },
      {
        question: 'Are there walks and trails?',
        answer: 'Monte Baldo has a dense network of trails between Lake Garda and the Vallagarina, suitable for every level of experience. The Cammino di San Rocco also passes right in front of the house: we are one of its official rest stops.',
        link: { text: 'Some routes are described on', label: 'Visit Rovereto', href: visitRoveretoHref },
      },
      {
        question: 'Where can we eat nearby?',
        answer: 'In Brentonico, a few minutes away, there are several restaurants, as well as mountain huts, farm stays and alpine pasture huts; down in Ala, Mori and Rovereto there is a bit of everything. In the village a small grocery shop makes sandwiches and sells food and everyday necessities.',
      },
      {
        question: 'What can we reach from here?',
        answer: 'Polsa in 10 minutes, San Giacomo in 15, San Valentino in 20, Rovereto in 25 and Lake Garda in about 30.',
      },
      {
        question: 'Is there free parking?',
        answer: 'There are free parking areas a few minutes from the property, by the church and at the end of the street, with plenty of space. We kindly ask you not to park on the street in front of the property.',
      },
      {
        question: 'Can we get here without a car?',
        answer: 'Yes: bus B305 Saccone-Brentonico-Mori-Rovereto stops at the entrance to Prada. The nearest railway station is Rovereto.',
      },
    ],
  },
  de: {
    heading: 'Häufig gestellte Fragen',
    lead: 'Die Fragen, die Sie uns vor der Anreise am häufigsten stellen.',
    items: [
      {
        question: 'Wo liegt das B&B und auf welcher Höhe?',
        answer: 'Wir sind in Prada di Brentonico, 776 Meter über dem Meeresspiegel, an der Abzweigung nach Polsa: auf der Hochebene von Brentonico, dem Garten Europas, in der Vallagarina, im Naturpark Monte Baldo, im Trentino. Um uns herum erhebt sich die Bergkette des Monte Baldo, mit Blick auf einen seiner höchsten und bekanntesten Gipfel, den Monte Altissimo di Nago.',
      },
      {
        question: 'Gibt es Spazierwege und Wanderwege?',
        answer: 'Der Monte Baldo bietet ein dichtes Netz von Wegen zwischen dem Gardasee und der Vallagarina, geeignet für jedes Erfahrungsniveau. Außerdem führt der Cammino di San Rocco direkt am Haus vorbei: Wir sind eine offizielle Etappenstation des Cammino di San Rocco.',
        link: { text: 'Einige Routen sind beschrieben auf', label: 'Visit Rovereto', href: visitRoveretoHref },
      },
      {
        question: 'Wo kann man in der Umgebung essen?',
        answer: 'In Brentonico, nur wenige Minuten entfernt, gibt es mehrere Restaurants, außerdem Berghütten, Agriturismi und Almen; unten in Ala, Mori und Rovereto gibt es von allem etwas. Im Ort bietet ein kleiner Lebensmittelladen belegte Brötchen an und verkauft Lebensmittel und Dinge des täglichen Bedarfs.',
      },
      {
        question: 'Was ist von hier aus erreichbar?',
        answer: 'Polsa in 10 Minuten, San Giacomo in 15, San Valentino in 20, Rovereto in 25 und der Gardasee in etwa 30.',
      },
      {
        question: 'Gibt es einen kostenlosen Parkplatz?',
        answer: 'Es gibt freie, kostenlose Parkplätze, nur wenige Minuten von der Unterkunft entfernt, bei der Kirche und am Ende der Straße, mit reichlich Platz. Wir bitten Sie freundlich, nicht auf der Straße vor der Unterkunft zu parken.',
      },
      {
        question: 'Kann man ohne Auto anreisen?',
        answer: 'Ja: Der Bus B305 Saccone-Brentonico-Mori-Rovereto hält am Ortseingang von Prada. Der nächstgelegene Bahnhof ist Rovereto.',
      },
    ],
  },
}

/**
 * Returns the heading, lead and six questions with answers of the home page FAQ in the given language.
 */
export function homeFaq(locale: SiteLocale): HomeFaqContent {
  return homeFaqByLocale[locale]
}

/**
 * Returns the answer of an FAQ item as plain text, with the link sentence appended when the item has a link.
 */
export function faqPlainAnswer(item: FaqItem): string {
  return item.link ? `${item.answer} ${item.link.text} ${item.link.label}.` : item.answer
}

/**
 * Returns the schema.org FAQPage JSON-LD of the home page FAQ in the given language.
 */
export function faqPageJsonLd(locale: SiteLocale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/${locale}#faq`,
    'mainEntity': homeFaqByLocale[locale].items.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': faqPlainAnswer(item) },
    })),
  }
}
