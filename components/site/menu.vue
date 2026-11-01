<template>
  <Teleport to="body">
    <div v-if="open" id="site-menu" ref="panel" class="redesign menu-panel" role="dialog" aria-modal="true"
      aria-label="Menu">
      <button ref="closeButton" type="button" class="menu-close" @click="emit('close')">Chiudi</button>
      <nav aria-label="Menu">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" no-prefetch @click="emit('close')">{{ link.label }}</NuxtLink>
      </nav>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const route = useRoute()
const panel = ref<HTMLElement | null>(null)
const closeButton = ref<HTMLButtonElement | null>(null)

const links = computed<SiteLink[]>(() => [
  { label: 'Home', to: '/it' },
  ...primaryLinks(),
  { label: 'English', to: englishTwin(route.path) },
])

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
    return
  }
  if (event.key !== 'Tab' || !panel.value) return
  const focusable = panel.value.querySelectorAll<HTMLElement>('a[href], button')
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}

watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', handleKeydown)
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.removeEventListener('keydown', handleKeydown)
  }
})

onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.menu-panel{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:flex-start;gap:clamp(24px,6vw,48px);padding:var(--margin);overflow-y:auto;overscroll-behavior:contain;background:var(--forest-deep);color:var(--on-forest)}
.menu-panel :focus-visible{outline-color:var(--lime)}
.menu-close{align-self:flex-end;min-height:48px;padding:0 24px;border:0;border-radius:999px;background:var(--lime);color:var(--ink);cursor:pointer;font-family:var(--sub);font-size:var(--step-small);font-weight:600;text-transform:uppercase;letter-spacing:0.08em}
nav{display:flex;flex-direction:column;gap:clamp(12px,3vw,20px)}
nav a{font-family:var(--display);font-weight:var(--display-weight);font-size:var(--step-head);line-height:1.1;color:var(--on-forest);text-decoration:none}
@media (hover:hover){nav a:hover{text-decoration:underline}}
</style>
