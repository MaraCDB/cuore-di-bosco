import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import IndexPage from '~/pages/index.vue'
import { LANGUAGE_CHOICE_KEY, rootLanguage } from '~/utils/language-choice'

const mountedWrappers: Array<{ unmount: () => void }> = []

afterEach(() => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  localStorage.removeItem(LANGUAGE_CHOICE_KEY)
  vi.restoreAllMocks()
})

describe('rootLanguage', () => {
  it.each([
    ['en', ['de-DE'], 'en'], ['de', [], 'de'], [null, ['de-AT', 'en'], 'de'], [null, ['DE-ch'], 'de'],
    [null, ['en-US'], 'en'], [null, ['fr-FR'], 'it'], [null, ['fr-FR', 'en-GB'], 'en'], [null, [], 'it'],
    ['fr', ['en-US'], 'en'], ['english', [], 'it'], [null, ['it-CH', 'de'], 'it'],
  ])('stored %s with %j opens %s', (stored, languages, expected) => {
    expect(rootLanguage(stored, languages)).toBe(expected)
  })
})

describe('root page', () => {
  async function mountRootPage() {
    const replace = vi.spyOn(useRouter(), 'replace').mockResolvedValue(undefined)
    mountedWrappers.push(await mountSuspended(IndexPage, { route: false }))
    return replace
  }

  it('opens the stored language', async () => {
    localStorage.setItem(LANGUAGE_CHOICE_KEY, 'en')

    const replace = await mountRootPage()

    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith('/en')
  })

  it('opens the browser language when nothing is stored', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['de-DE'])

    const replace = await mountRootPage()

    expect(replace).toHaveBeenCalledTimes(1)
    expect(replace).toHaveBeenCalledWith('/de/buchen')
  })
})
