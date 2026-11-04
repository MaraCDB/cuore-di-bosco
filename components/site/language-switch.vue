<template>
  <div class="language-switch" role="group" :aria-label="$t('site.languages')">
    <NuxtLink v-for="language in languages" :key="language.locale" :to="twinPath(route.path, language.locale)"
      :lang="language.locale" :hreflang="language.locale" :aria-label="language.name"
      :aria-current="language.locale === i18nLocale ? 'true' : undefined" no-prefetch
      @click="rememberLanguage(language.locale)"><img :src="language.flag" alt="">{{ language.code }}</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { locale: i18nLocale } = useI18n()

const languages: Array<{ locale: SiteLocale, name: string, code: string, flag: string }> = [
  { locale: 'it', name: 'Italiano', code: 'IT', flag: '/images/flags/it.svg' },
  { locale: 'en', name: 'English', code: 'EN', flag: '/images/flags/gb.svg' },
  { locale: 'de', name: 'Deutsch', code: 'DE', flag: '/images/flags/de.svg' },
]
</script>

<style scoped>
.language-switch{display:flex;align-items:center;gap:14px}
.language-switch a{display:inline-flex;align-items:center;gap:6px;min-height:44px;font-family:var(--sub);font-size:var(--step-nav);font-weight:600;text-transform:uppercase;color:inherit;text-decoration:none}
.language-switch img{height:0.9em;aspect-ratio:3/2;object-fit:cover}
.language-switch a[aria-current=true]{text-decoration-line:underline;text-decoration-color:var(--lime);text-decoration-thickness:2px;text-underline-offset:0.3em}
@media (hover:hover){.language-switch a:hover{text-decoration-line:underline}}
</style>
