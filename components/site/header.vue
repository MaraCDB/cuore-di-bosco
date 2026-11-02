<template>
  <div class="redesign masthead" id="top">
    <header class="topbar">
      <nav aria-label="Principale">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" no-prefetch>{{ link.label }}</NuxtLink>
        <NuxtLink :to="englishTwin(route.path)" no-prefetch>English</NuxtLink>
        <button ref="menuButton" type="button" class="button button-quiet menu" :aria-expanded="isMenuOpen"
          :aria-controls="isMenuOpen ? 'site-menu' : undefined" @click="isMenuOpen = true">Menu</button>
        <NuxtLink class="button button-light" to="/it/prenota" no-prefetch>Prenota</NuxtLink>
      </nav>
    </header>
    <SiteMenu :open="isMenuOpen" @close="closeMenu" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const links = primaryLinks()
const isMenuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)

async function closeMenu(restoreFocus: boolean) {
  isMenuOpen.value = false
  if (restoreFocus) {
    await nextTick()
    menuButton.value?.focus()
  }
}
</script>

<style scoped>
.masthead{background:var(--forest-deep);color:var(--on-forest)}
.masthead :focus-visible{outline-color:var(--lime)}
.topbar{max-width:var(--page-max);margin:0 auto;display:flex;align-items:center;justify-content:flex-end;gap:24px;padding:14px var(--margin)}
.topbar nav{display:flex;align-items:center;gap:28px}
.topbar nav a:not(.button){font-family:var(--sub);font-size:var(--step-small);text-decoration:none;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:inherit}
@media (hover:hover){.topbar nav a:not(.button):hover{text-decoration:underline}}
.topbar .menu{display:none;border:0;cursor:pointer;font-size:var(--step-body);line-height:1.65}
.topbar .button-light{font-size:var(--step-small);text-transform:uppercase;letter-spacing:0.08em}
@media (max-width:900px){
  .topbar nav a:not(.button){display:none}
  .topbar .menu{display:inline-flex}
}
</style>
