<template>
  <a class="redesign to-top" :class="{ 'is-visible': isVisible }" href="#top" aria-label="Torna all'inizio"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></a>
</template>

<script setup lang="ts">
const isVisible = ref(false)

function updateVisibility() {
  isVisible.value = window.scrollY > window.innerHeight
}

onMounted(() => {
  window.addEventListener('scroll', updateVisibility, { passive: true })
  updateVisibility()
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateVisibility))
</script>

<style scoped>
.to-top{position:fixed;right:var(--margin);bottom:calc(64px + env(safe-area-inset-bottom) + 16px);z-index:50;display:grid;place-items:center;width:48px;height:48px;border-radius:50%;border:2px solid var(--on-forest);background:var(--forest-deep);color:var(--on-forest);opacity:0;visibility:hidden;transition:opacity 240ms var(--ease-out),visibility 240ms}
.to-top.is-visible{opacity:1;visibility:visible}
.to-top svg{width:22px;height:22px}
@media (hover:hover){.to-top:hover{background:var(--forest)}}
</style>
