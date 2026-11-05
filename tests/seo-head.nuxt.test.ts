import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '~/layouts/default.vue'
import { alternateLinks, openGraphLocale } from '../utils/seo'
import { SITE_ORIGIN } from '../utils/structured-data'

const mountedWrappers: Array<{ unmount: () => void }> = []

async function mountDefaultLayout(path: string) {
  const wrapper = await mountSuspended(DefaultLayout, { route: path, attachTo: document.body })
  mountedWrappers.push(wrapper)
  return wrapper
}

function hreflangHrefs(): Record<string, string> {
  const links = [...document.head.querySelectorAll('link[rel="alternate"][hreflang]')]
  return Object.fromEntries(links.map(link => [link.getAttribute('hreflang') as string, link.getAttribute('href') as string]))
}

function metaContents(property: string): string[] {
  return [...document.head.querySelectorAll(`meta[property="${property}"]`)].map(meta => meta.getAttribute('content') as string)
}

afterEach(async () => {
  mountedWrappers.splice(0).forEach(wrapper => wrapper.unmount())
  await useRouter().push('/it')
  await useNuxtApp().$i18n.setLocale('it')
})

describe('alternateLinks', () => {
  it('maps a page to its twins in the three languages and x-default to the Italian twin', () => {
    expect(alternateLinks('/en/rules')).toEqual([
      { rel: 'alternate', hreflang: 'it', href: `${SITE_ORIGIN}/it/regolamento` },
      { rel: 'alternate', hreflang: 'en', href: `${SITE_ORIGIN}/en/rules` },
      { rel: 'alternate', hreflang: 'de', href: `${SITE_ORIGIN}/de/hausordnung` },
      { rel: 'alternate', hreflang: 'x-default', href: `${SITE_ORIGIN}/it/regolamento` },
    ])
  })

  it('gives a trailing-slash path the same set as its slash-less twin', () => {
    expect(alternateLinks('/it/esplora/')).toEqual(alternateLinks('/it/esplora'))
  })

  it('maps the root to the three home pages with no trailing slash', () => {
    const links = alternateLinks('/')
    expect(links.map(link => link.href)).toEqual([`${SITE_ORIGIN}/it`, `${SITE_ORIGIN}/en`, `${SITE_ORIGIN}/de`, `${SITE_ORIGIN}/it`])
    links.forEach(link => expect(link.href.endsWith('/')).toBe(false))
  })
})

describe('openGraphLocale', () => {
  it('returns the Open Graph code of each language', () => {
    expect([openGraphLocale('it'), openGraphLocale('en'), openGraphLocale('de')]).toEqual(['it_IT', 'en_GB', 'de_DE'])
  })
})

describe('default layout head', () => {
  it('emits four hreflang links and the German Open Graph locale on a German page', async () => {
    await mountDefaultLayout('/de/entdecken')
    await vi.waitFor(() => expect(metaContents('og:locale')).toEqual(['de_DE']))
    expect(document.head.querySelectorAll('link[rel="alternate"][hreflang]')).toHaveLength(4)
    expect(hreflangHrefs()).toEqual({
      'it': `${SITE_ORIGIN}/it/esplora`,
      'en': `${SITE_ORIGIN}/en/explore`,
      'de': `${SITE_ORIGIN}/de/entdecken`,
      'x-default': `${SITE_ORIGIN}/it/esplora`,
    })
    expect(metaContents('og:locale:alternate').sort()).toEqual(['en_GB', 'it_IT'])
    expect(metaContents('og:site_name')).toEqual(['B&B Cuore di Bosco'])
  })

  it('updates hreflang and og:locale when the route changes language', async () => {
    await mountDefaultLayout('/it')
    await vi.waitFor(() => expect(metaContents('og:locale')).toEqual(['it_IT']))
    expect(hreflangHrefs().en).toBe(`${SITE_ORIGIN}/en`)

    await useRouter().push('/en/rules')
    await vi.waitFor(() => expect(metaContents('og:locale')).toEqual(['en_GB']))
    expect(hreflangHrefs().de).toBe(`${SITE_ORIGIN}/de/hausordnung`)
    expect(hreflangHrefs().it).toBe(`${SITE_ORIGIN}/it/regolamento`)
    expect(metaContents('og:locale:alternate').sort()).toEqual(['de_DE', 'it_IT'])
  })
})

describe('catch-all page', () => {
  it('asks search engines not to index it', () => {
    expect(readFileSync('pages/[...slug].vue', 'utf8')).toMatch(/name:\s*'robots',\s*content:\s*'noindex'/)
  })
})

describe('sitemap', () => {
  const sitemap = readFileSync('public/sitemap.xml', 'utf8')
  const prerenderBlock = readFileSync('nuxt.config.ts', 'utf8').match(/routes:\s*\[([^\]]*)\]/)?.[1] ?? ''
  const prerenderRoutes = [...prerenderBlock.matchAll(/'([^']+)'/g)].map(match => match[1])

  it('lists exactly the prerendered routes', () => {
    const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])
    expect(prerenderRoutes).toHaveLength(15)
    expect(locations.sort()).toEqual(prerenderRoutes.map(route => `${SITE_ORIGIN}${route}`).sort())
  })

  it('uses one ISO date for every lastmod', () => {
    const dates = new Set([...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(match => match[1]))
    expect(dates.size).toBe(1)
    expect([...dates][0]).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
