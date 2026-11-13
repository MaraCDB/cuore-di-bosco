import type { SiteLocale } from '~/utils/site-links'

export interface BookingGuideCopy {
  summary: string
  paragraphs: string[]
  closing: { before: string; linkLabel: string; to: string; after: string }
}

const bookingGuideByLocale: Record<SiteLocale, BookingGuideCopy> = {
  it: {
    summary: 'Come funziona la prenotazione?',
    paragraphs: [
      'Usa il modulo qui sopra per vedere le date libere e prenotare. Ti porterà sul portale sicuro Bed-and-breakfast.it, dove inserisci la carta di credito solo a garanzia: oggi non paghi nulla (0 €).',
      'Puoi cancellare gratis fino a 7 giorni prima dell’arrivo. Da quel momento l’importo del soggiorno viene bloccato sulla carta, senza addebito: assicurati solo che sia disponibile. L’addebito avviene al check-in.',
      'Se cancelli negli ultimi 7 giorni o non arrivi, viene addebitato l’intero importo del soggiorno. Se cancelli negli ultimi 7 giorni possiamo offrirti un buono pari all’importo pagato, valido per un altro soggiorno entro 12 mesi, escluse le settimane di Ferragosto, Natale e Capodanno.',
      'Il check-in è online: carichi i documenti in un’area protetta e riservata.',
    ],
    closing: {
      before: 'Preferisci prenotare per telefono o email? In quel caso valgono le condizioni del ',
      linkLabel: 'Regolamento',
      to: '/it/regolamento',
      after: '.',
    },
  },
  en: {
    summary: 'How does booking work?',
    paragraphs: [
      'Use the form above to check available dates and book. It will take you to the secure Bed-and-breakfast.it booking page, where you enter your credit card details as a guarantee only: you pay nothing today (€0).',
      'You can cancel free of charge up to 7 days before arrival. From then on, the amount of your stay is held on your card, not charged: please just make sure the funds are available. Payment is taken at check-in.',
      'If you cancel in the last 7 days or do not turn up, the full amount of the stay is charged. If you cancel in the last 7 days, we can offer you a voucher for the amount paid, valid for another stay within 12 months, excluding the weeks of Ferragosto (mid-August), Christmas and New Year.',
      'Check-in is online: you upload your documents to a secure, private area.',
    ],
    closing: {
      before: 'Would you rather book by phone or email? In that case the conditions in our ',
      linkLabel: 'Rules',
      to: '/en/rules',
      after: ' apply.',
    },
  },
  de: {
    summary: 'Wie funktioniert die Buchung?',
    paragraphs: [
      'Nutzen Sie das Formular oben, um freie Termine zu sehen und zu buchen. Es führt Sie zum sicheren Portal Bed-and-breakfast.it, wo Sie Ihre Kreditkartendaten nur als Garantie angeben: Heute zahlen Sie nichts (0 €).',
      'Bis 7 Tage vor der Anreise können Sie kostenlos stornieren. Ab diesem Zeitpunkt wird der Betrag Ihres Aufenthalts auf der Karte reserviert, aber nicht abgebucht: Bitte sorgen Sie nur für ausreichende Deckung. Die Abbuchung erfolgt beim Check-in.',
      'Bei einer Stornierung in den letzten 7 Tagen oder bei Nichtanreise wird der volle Betrag des Aufenthalts abgebucht. Bei einer Stornierung in den letzten 7 Tagen können wir Ihnen einen Gutschein über den gezahlten Betrag anbieten, gültig für einen anderen Aufenthalt innerhalb von 12 Monaten, ausgenommen die Wochen um Ferragosto (Mitte August), Weihnachten und Neujahr.',
      'Der Check-in erfolgt online: Sie laden Ihre Dokumente in einen geschützten, vertraulichen Bereich hoch.',
    ],
    closing: {
      before: 'Sie buchen lieber per Telefon oder E-Mail? Dann gelten die Bedingungen unserer ',
      linkLabel: 'Hausordnung',
      to: '/de/hausordnung',
      after: '.',
    },
  },
}

/**
 * Returns the booking explanation shown under the booking widget for a locale.
 */
export function bookingGuide(locale: SiteLocale): BookingGuideCopy {
  return bookingGuideByLocale[locale]
}
