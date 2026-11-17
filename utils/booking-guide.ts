import type { SiteLocale } from '~/utils/site-links'

export interface BookingGuideSection {
  title: string
  paragraphs: string[]
  numbered?: boolean
}

export interface BookingGuideCopy {
  sections: BookingGuideSection[]
  closing: { before: string; linkLabel: string; to: string; after: string }
}

export interface TextPart {
  text: string
  strong: boolean
}

const bookingGuideByLocale: Record<SiteLocale, BookingGuideCopy> = {
  it: {
    sections: [
      {
        title: 'Come funziona la prenotazione?',
        numbered: true,
        paragraphs: [
          'Usa il modulo qui sopra per vedere le date libere e prenotare. Ti porterà sul portale sicuro Bed-and-breakfast.it, dove inserisci la carta di credito solo a garanzia.',
          'Puoi cancellare gratis **fino a 7 giorni prima dell’arrivo**. Da quel momento l’importo del soggiorno viene **bloccato sulla carta**, senza addebito: assicurati solo che sia disponibile. Per **cancellare** o **modificare** la prenotazione usa il link nella mail di conferma della prenotazione, oppure accedi al tuo account su Bed-and-breakfast.it per ritrovare le tue prenotazioni e i tuoi dati.',
          'L’**addebito effettivo avviene il giorno previsto del check-in**. Se cancelli negli ultimi 7 giorni o non arrivi, viene addebitato l’intero importo del soggiorno il giorno previsto di arrivo.',
        ],
      },
      {
        title: 'Se volessi cancellare all’ultimo momento?',
        paragraphs: [
          'Se decidi di spostare il soggiorno nei 7 giorni precedenti alla data di arrivo, ad esempio per malattia, infortunio, maltempo o esigenze lavorative, previo accordi, possiamo offrirti un **buono pari all’importo della prenotazione**, valido per un altro **soggiorno entro 12 mesi**, escluse le settimane di Ferragosto, Natale e Capodanno. Tale buono è personale e non rivendibile. L’importo dalla carta sarà in ogni caso prelevato il giorno del check-in.',
        ],
      },
      {
        title: 'CHECK-IN',
        paragraphs: [
          'Dopo la prenotazione è possibile fare il check-in online caricando i documenti in sicurezza sul sito Bed-and-breakfast.it con il link che riceverai via mail.',
          'In ogni caso porta con te un **documento d’identità in corso di validità per ogni ospite soggiornante**, bambini compresi: per legge senza non è possibile soggiornare. Ti ricordiamo che non è possibile far accedere alla struttura altre persone non registrate.',
        ],
      },
    ],
    closing: {
      before: 'Preferisci prenotare per telefono o email? In quel caso valgono le condizioni del ',
      linkLabel: 'Regolamento',
      to: '/it/regolamento',
      after: '.',
    },
  },
  en: {
    sections: [
      {
        title: 'How does booking work?',
        numbered: true,
        paragraphs: [
          'Use the form above to check available dates and book. It will take you to the secure Bed-and-breakfast.it booking page, where you enter your credit card details as a guarantee only.',
          'You can cancel free of charge **up to 7 days before arrival**. From then on, the amount of your stay is **held on your card**, not charged: please just make sure the funds are available. To **cancel** or **change** your booking, use the link in your booking confirmation email, or log in to your account on Bed-and-breakfast.it to access your bookings and details.',
          '**Payment is actually taken on the scheduled check-in day**. If you cancel in the last 7 days or do not turn up, the full amount of the stay is charged on the scheduled arrival day.',
        ],
      },
      {
        title: 'What if I need to cancel at the last minute?',
        paragraphs: [
          'If you decide to postpone your stay in the last 7 days before arrival, for example because of illness, injury, bad weather or work commitments, by prior arrangement we can offer you a **voucher for the amount of the booking**, valid for another **stay within 12 months**, excluding the weeks of Ferragosto (mid-August), Christmas and New Year. The voucher is personal and cannot be resold. The amount on your card will be taken on the check-in day in any case.',
        ],
      },
      {
        title: 'CHECK-IN',
        paragraphs: [
          'After booking, you can check in online by uploading your documents securely to the Bed-and-breakfast.it website, using the link you will receive by email.',
          'Either way, please bring **a valid ID document for every guest staying**, children included: by law, you cannot stay without one. Please note that people who are not registered cannot be let into the property.',
        ],
      },
    ],
    closing: {
      before: 'Would you rather book by phone or email? In that case the conditions in our ',
      linkLabel: 'Rules',
      to: '/en/rules',
      after: ' apply.',
    },
  },
  de: {
    sections: [
      {
        title: 'Wie funktioniert die Buchung?',
        numbered: true,
        paragraphs: [
          'Nutzen Sie das Formular oben, um freie Termine zu sehen und zu buchen. Es führt Sie zum sicheren Portal Bed-and-breakfast.it, wo Sie Ihre Kreditkartendaten nur als Garantie angeben.',
          'Sie können **bis 7 Tage vor der Anreise** kostenlos stornieren. Ab diesem Zeitpunkt wird der Betrag Ihres Aufenthalts **auf der Karte reserviert**, aber nicht abgebucht: Bitte sorgen Sie nur für ausreichende Deckung. Um Ihre Buchung zu **stornieren** oder zu **ändern**, nutzen Sie den Link in der Bestätigungs-E-Mail Ihrer Buchung oder melden Sie sich in Ihrem Konto auf Bed-and-breakfast.it an: Dort finden Sie Ihre Buchungen und Ihre Daten.',
          'Die **tatsächliche Abbuchung erfolgt am geplanten Check-in-Tag**. Bei einer Stornierung in den letzten 7 Tagen oder bei Nichtanreise wird der volle Betrag des Aufenthalts am geplanten Anreisetag abgebucht.',
        ],
      },
      {
        title: 'Und wenn ich kurzfristig stornieren muss?',
        paragraphs: [
          'Wenn Sie Ihren Aufenthalt in den letzten 7 Tagen vor der Anreise verschieben möchten, zum Beispiel wegen Krankheit, Verletzung, schlechten Wetters oder beruflicher Verpflichtungen, können wir Ihnen nach vorheriger Absprache einen **Gutschein über den Buchungsbetrag** anbieten, gültig für einen anderen **Aufenthalt innerhalb von 12 Monaten**, ausgenommen die Wochen um Ferragosto (Mitte August), Weihnachten und Neujahr. Der Gutschein ist persönlich und nicht weiterverkäuflich. Der Betrag wird in jedem Fall am Check-in-Tag von der Karte abgebucht.',
        ],
      },
      {
        title: 'CHECK-IN',
        paragraphs: [
          'Nach der Buchung können Sie online einchecken und Ihre Dokumente über den Link, den Sie per E-Mail erhalten, sicher auf der Website Bed-and-breakfast.it hochladen.',
          'Bringen Sie in jedem Fall **für jeden übernachtenden Gast einen gültigen Ausweis** mit, auch für Kinder: Ohne Ausweis ist ein Aufenthalt gesetzlich nicht möglich. Bitte beachten Sie, dass nicht angemeldete Personen die Unterkunft nicht betreten dürfen.',
        ],
      },
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

/**
 * Splits a copy string on `**` markers into plain and strong parts.
 */
export function splitStrongText(text: string): TextPart[] {
  return text
    .split('**')
    .map((part, index) => ({ text: part, strong: index % 2 === 1 }))
    .filter((part) => part.text !== '')
}

/**
 * Returns a copy string without its `**` markers.
 */
export function plainText(text: string): string {
  return text.replaceAll('**', '')
}
