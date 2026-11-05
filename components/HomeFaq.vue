<template>
  <section class="faq" id="faq">
    <div class="wrap">
      <div class="faq-grid">
        <div class="faq-head" data-reveal>
          <h2>{{ faq.heading }}</h2>
          <p class="lead">{{ faq.lead }}</p>
        </div>
        <div class="faq-list" data-reveal>
          <details v-for="(item, index) in faq.items" :key="item.question" :open="index === 0">
            <summary><span>{{ item.question }}</span></summary>
            <p>{{ item.answer }}<template v-if="item.link">{{ ' ' + item.link.text + ' ' }}<a :href="item.link.href" target="_blank" rel="noopener">{{ item.link.label }}</a>.</template></p>
          </details>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { faqPageJsonLd, homeFaq } from '~/utils/home-faq'
import type { SiteLocale } from '~/utils/site-links'

const props = defineProps<{ locale: SiteLocale }>()

const faq = homeFaq(props.locale)

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(faqPageJsonLd(props.locale)) }],
})
</script>

<style scoped>
.faq{padding:var(--band-pad) 0}
.faq-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:clamp(32px,5vw,96px);align-items:start}
.faq-head h2{margin-bottom:16px}
.faq-head .lead{margin:0}
.faq-list{display:grid;gap:12px}
.faq details{background:var(--champagne);border-radius:16px}
.faq summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 24px;cursor:pointer;list-style:none;font-family:var(--sub);font-size:var(--step-lead);font-weight:600;line-height:1.3;color:var(--forest-deep)}
.faq summary::-webkit-details-marker{display:none}
.faq summary span{min-width:0;overflow-wrap:anywhere}
.faq summary::after{content:'+';flex:none;font-size:var(--step-title);font-weight:400;line-height:1;color:var(--meadow)}
.faq details[open] summary::after{content:'\2212'}
.faq details p{max-width:68ch;margin:0;padding:0 24px 20px;text-align:justify;hyphens:auto}
@media (max-width:900px){
  .faq-grid{grid-template-columns:minmax(0,1fr)}
}
@media (max-width:520px){
  .faq details p{text-align:left}
}
</style>
