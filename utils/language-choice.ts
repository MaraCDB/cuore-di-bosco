export const LANGUAGE_CHOICE_KEY = 'cdb-language'

/**
 * Stores the language picked by the visitor on this device, ignoring storage that is blocked or full.
 */
export function rememberLanguage(locale: SiteLocale): void {
  try {
    localStorage.setItem(LANGUAGE_CHOICE_KEY, locale)
  }
  catch {
    return
  }
}

/**
 * Reads the language stored on this device, or `null` when there is none or storage is blocked.
 */
export function storedLanguage(): string | null {
  try {
    return localStorage.getItem(LANGUAGE_CHOICE_KEY)
  }
  catch {
    return null
  }
}
