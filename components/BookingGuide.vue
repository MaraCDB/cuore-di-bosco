<template>
  <div class="booking-guide">
    <details v-for="(section, index) in guide.sections" :key="section.title" :open="openSections[index]" @toggle="onSectionToggle(index, $event)">
      <summary><span>{{ section.title }}</span></summary>
      <ol v-if="section.numbered">
        <li v-for="paragraph in section.paragraphs" :key="paragraph"><template v-for="(part, partIndex) in splitStrongText(paragraph)" :key="partIndex"><strong v-if="part.strong">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></li>
      </ol>
      <template v-else>
        <p v-for="paragraph in section.paragraphs" :key="paragraph"><template v-for="(part, partIndex) in splitStrongText(paragraph)" :key="partIndex"><strong v-if="part.strong">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></p>
      </template>
    </details>
    <p class="booking-guide-closing">{{ guide.closing.before }}<NuxtLink :to="guide.closing.to" no-prefetch>{{ guide.closing.linkLabel }}</NuxtLink>{{ guide.closing.after }}</p>
  </div>
</template>

<script setup lang="ts">
import { bookingGuide, splitStrongText } from '~/utils/booking-guide'
import type { SiteLocale } from '~/utils/site-links'

const props = defineProps<{ locale: SiteLocale }>()

const guide = bookingGuide(props.locale)

const openSections = ref(guide.sections.map(() => false))

function onSectionToggle(index: number, event: Event) {
  const isOpen = (event.target as HTMLDetailsElement).open
  if (openSections.value[index] === isOpen) return
  openSections.value = openSections.value.map((wasOpen, sectionIndex) => (index === 0 || sectionIndex === index ? isOpen : wasOpen))
}
</script>

<style scoped>
.booking-guide{display:grid;gap:12px;max-width:960px;margin:20px auto 0}
.booking-guide details{background:var(--champagne);border-radius:16px}
.booking-guide summary{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px 24px;cursor:pointer;list-style:none;font-family:var(--sub);font-size:var(--step-lead);font-weight:600;line-height:1.3;color:var(--forest-deep)}
.booking-guide summary::-webkit-details-marker{display:none}
.booking-guide summary span{min-width:0;overflow-wrap:anywhere}
.booking-guide summary::after{content:'+';flex:none;font-size:var(--step-title);font-weight:400;line-height:1;color:var(--meadow)}
.booking-guide details[open] summary::after{content:'\2212'}
.booking-guide details p,.booking-guide li{text-align:justify;hyphens:auto}
.booking-guide details p{margin:0;padding:0 24px 16px}
.booking-guide details p:last-child{padding-bottom:20px}
.booking-guide ol{display:grid;gap:12px;margin:0;padding:0 24px 20px 48px}
.booking-guide-closing{margin:0;padding:0 24px}
@media (max-width:520px){
  .booking-guide details p,.booking-guide li{text-align:left}
}
</style>
