<template>
  <details class="booking-guide">
    <summary><span>{{ guide.summary }}</span></summary>
    <p v-for="paragraph in guide.paragraphs" :key="paragraph">{{ paragraph }}</p>
    <p>{{ guide.closing.before }}<NuxtLink :to="guide.closing.to" no-prefetch>{{ guide.closing.linkLabel }}</NuxtLink>{{ guide.closing.after }}</p>
  </details>
</template>

<script setup lang="ts">
import { bookingGuide } from '~/utils/booking-guide'
import type { SiteLocale } from '~/utils/site-links'

const props = defineProps<{ locale: SiteLocale }>()

const guide = bookingGuide(props.locale)
</script>

<style scoped>
.booking-guide{max-width:960px;margin:20px auto 0;background:var(--champagne);border-radius:16px}
.booking-guide summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 24px;cursor:pointer;list-style:none;font-family:var(--sub);font-size:var(--step-lead);font-weight:600;line-height:1.3;color:var(--forest-deep)}
.booking-guide summary::-webkit-details-marker{display:none}
.booking-guide summary span{min-width:0;overflow-wrap:anywhere}
.booking-guide summary::after{content:'+';flex:none;font-size:var(--step-title);font-weight:400;line-height:1;color:var(--meadow)}
.booking-guide[open] summary::after{content:'\2212'}
.booking-guide p{margin:0;padding:0 24px 16px;text-align:justify;hyphens:auto}
.booking-guide p:last-child{padding-bottom:20px}
@media (max-width:520px){
  .booking-guide p{text-align:left}
}
</style>
