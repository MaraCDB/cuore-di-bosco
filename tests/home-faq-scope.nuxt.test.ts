import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ItalianExplorePage from '~/pages/it/esplora.vue'

describe('FAQ scope', () => {
  it('leaves the Esplora page without a FAQPage script', async () => {
    const wrapper = await mountSuspended(ItalianExplorePage, { attachTo: document.body })

    expect(document.head.innerHTML).not.toContain('FAQPage')
    wrapper.unmount()
  })
})
