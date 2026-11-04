<template>
  <nav class="redesign dock" :aria-label="$t('site.dock-label')">
    <div class="dock-inner">
      <NuxtLink :to="homePath(locale) + '#top'" no-prefetch><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>{{ $t('site.home') }}</NuxtLink>
      <a href="tel:+393494960228"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>{{ $t('site.call') }}</a>
      <a href="https://wa.me/393494960228"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>WhatsApp</a>
      <a href="mailto:info@cuoredibosco.it"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>{{ $t('site.email') }}</a>
      <NuxtLink class="button button-light" :to="localePath(locale, 'booking')" no-prefetch>{{ $t('site.book') }}</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { locale: i18nLocale } = useI18n()
const locale = computed(() => i18nLocale.value as SiteLocale)
</script>

<style scoped>
.dock{position:fixed;left:0;right:0;bottom:0;z-index:50;background:var(--forest-deep);color:var(--on-forest);padding-bottom:env(safe-area-inset-bottom)}
.dock :focus-visible{outline-color:var(--lime)}
.dock-inner{max-width:var(--page-max);margin:0 auto;padding:8px var(--margin);min-height:var(--dock-height);display:flex;align-items:center;gap:clamp(16px,3vw,40px)}
.dock a:not(.button){display:inline-flex;align-items:center;gap:10px;min-height:48px;font-family:var(--sub);font-size:var(--step-nav);font-weight:600;color:inherit;text-decoration:none}
.dock svg{width:20px;height:20px;flex:none}
.dock .button{margin-left:auto;min-height:46px;font-size:var(--step-nav);text-transform:uppercase;letter-spacing:0.08em}
@media (hover:hover){.dock a:not(.button):hover{text-decoration:underline}}
@media (min-width:901px){
  .dock-inner{padding:6px var(--margin);gap:clamp(11px,2.1vw,28px)}
  .dock a:not(.button){gap:7px;min-height:44px}
  .dock .button{min-height:44px}
  .dock svg{width:18px;height:18px}
}
@media (max-width:520px){
  .dock-inner{gap:4px;padding:6px 12px}
  .dock a:not(.button){flex:1;flex-direction:column;justify-content:center;gap:2px;font-size:var(--step-micro)}
  .dock .button{padding:0 14px;letter-spacing:0.03em}
}
</style>
