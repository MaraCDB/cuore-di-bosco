<template>
  <div class="carousel" role="region" :aria-roledescription="$t('site.carousel')" :aria-label="label">
    <div ref="track" class="photo-row" :class="{ 'is-dragging': isDragging }" tabindex="0" @scroll.passive="onScroll" @pointerenter="onPointerEnter" @pointerleave="onPointerLeave" @pointerdown="onPointerDown" @pointermove="onPointerMove" @pointerup="onPointerRelease" @pointercancel="onPointerRelease" @focusin="onFocusIn" @focusout="onFocusOut">
      <figure v-for="(photo, index) in loopPhotos" :key="index" :aria-hidden="index >= photos.length ? 'true' : undefined"><img :src="photo.src" :alt="photo.alt" loading="lazy" draggable="false"><figcaption v-if="photo.caption || photo.credit">{{ photo.caption }}<span v-if="photo.credit" class="photo-credit">{{ photo.credit }}</span></figcaption></figure>
    </div>
    <div class="carousel-controls">
      <button type="button" :aria-label="$t('site.photo-previous')" @click="scrollByPhoto(-1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
      <button type="button" :aria-label="isPlaying ? $t('site.scroll-pause') : $t('site.scroll-start')" @click="togglePlaying"><svg v-if="isPlaying" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg><svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg></button>
      <button type="button" :aria-label="$t('site.photo-next')" @click="scrollByPhoto(1)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CarouselPhoto {
  src: string
  alt: string
  caption?: string
  credit?: string
}

const props = defineProps<{ photos: CarouselPhoto[], label: string }>()

const autoScrollPixelsPerSecond = 30
const resumeDelayMs = 4000
const wrapDelayMs = 200
const dragThresholdPx = 5
const velocityWindowMs = 100
const glideTimeConstantMs = 325
const glideStopPixelsPerMs = 0.02

const track = ref<HTMLElement | null>(null)
const isPlaying = ref(true)
const isDragging = ref(false)
const loopPhotos = computed(() => [...props.photos, ...props.photos])

let isHovered = false
let isPressed = false
let hasKeyboardFocus = false
let isOnScreen = false
let resumeAt = 0
let position = 0
let lastFrameTime = 0
let animationFrame = 0
let dragPointerId: number | undefined
let dragAnchorX = 0
let dragAnchorScrollLeft = 0
let pointerSamples: Array<{ time: number, x: number }> = []
let glideVelocity = 0
let lastGlideTime = 0
let glideFrame = 0
let wrapTimer: ReturnType<typeof setTimeout> | undefined
let visibilityObserver: IntersectionObserver | undefined

function photoOffsets(element: HTMLElement): number[] {
  const items = [...element.children] as HTMLElement[]
  return items.map(item => item.offsetLeft - items[0].offsetLeft)
}

function loopWidth(element: HTMLElement): number {
  return photoOffsets(element)[props.photos.length] ?? element.scrollWidth
}

function holdAutoScroll() {
  resumeAt = performance.now() + resumeDelayMs
}

function wrapIntoFirstSet(element: HTMLElement) {
  if (isDragging.value || glideFrame) return
  const width = loopWidth(element)
  if (element.scrollLeft >= width) element.scrollLeft -= width
  position = element.scrollLeft
}

function advance(time: number) {
  animationFrame = requestAnimationFrame(advance)
  const elapsed = Math.min(time - lastFrameTime, 50)
  lastFrameTime = time
  const element = track.value
  if (!element || !isPlaying.value || isHovered || isPressed || glideFrame || hasKeyboardFocus || !isOnScreen || time < resumeAt) return
  position += autoScrollPixelsPerSecond * elapsed / 1000
  const width = loopWidth(element)
  if (position >= width) position -= width
  element.scrollLeft = position
}

function onScroll() {
  const element = track.value
  if (!element) return
  if (Math.abs(element.scrollLeft - position) > 2) {
    position = element.scrollLeft
    holdAutoScroll()
  }
  clearTimeout(wrapTimer)
  wrapTimer = setTimeout(() => wrapIntoFirstSet(element), wrapDelayMs)
}

function scrollByPhoto(direction: 1 | -1) {
  const element = track.value
  if (!element) return
  const width = loopWidth(element)
  if (direction < 0 && element.scrollLeft < 1) element.scrollLeft += width
  if (direction > 0 && element.scrollLeft >= width) element.scrollLeft -= width
  const current = element.scrollLeft
  const offsets = photoOffsets(element)
  const target = direction > 0
    ? offsets.find(offset => offset > current + 1)
    : [...offsets].reverse().find(offset => offset < current - 1)
  position = current
  holdAutoScroll()
  element.scrollTo({ left: target ?? 0, behavior: 'smooth' })
}

function togglePlaying() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) resumeAt = 0
}

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'mouse') isHovered = true
}

function onPointerLeave() {
  isHovered = false
}

function stopGlide() {
  cancelAnimationFrame(glideFrame)
  glideFrame = 0
}

function glide(time: number) {
  const element = track.value
  if (!element) return
  const elapsed = Math.min(time - lastGlideTime, 50)
  lastGlideTime = time
  glideVelocity *= Math.exp(-elapsed / glideTimeConstantMs)
  const target = position - glideVelocity * elapsed
  position = Math.min(Math.max(target, 0), element.scrollWidth - element.clientWidth)
  element.scrollLeft = position
  if (position !== target || Math.abs(glideVelocity) < glideStopPixelsPerMs) {
    glideFrame = 0
    wrapIntoFirstSet(element)
    return
  }
  glideFrame = requestAnimationFrame(glide)
}

function releaseVelocity(): number {
  const now = performance.now()
  const recentSamples = pointerSamples.filter(sample => now - sample.time <= velocityWindowMs)
  const first = recentSamples[0]
  const last = recentSamples[recentSamples.length - 1]
  if (recentSamples.length < 2 || now <= first.time) return 0
  return (last.x - first.x) / (now - first.time)
}

function onPointerDown(event: PointerEvent) {
  isPressed = true
  stopGlide()
  if (event.pointerType !== 'mouse' || event.button !== 0 || !track.value) return
  dragPointerId = event.pointerId
  dragAnchorX = event.clientX
  dragAnchorScrollLeft = track.value.scrollLeft
  pointerSamples = [{ time: performance.now(), x: event.clientX }]
}

function onPointerMove(event: PointerEvent) {
  const element = track.value
  if (!element || event.pointerId !== dragPointerId || !(event.buttons & 1)) return
  const distance = event.clientX - dragAnchorX
  if (!isDragging.value) {
    if (Math.abs(distance) < dragThresholdPx) return
    isDragging.value = true
    element.setPointerCapture(event.pointerId)
    window.getSelection()?.removeAllRanges()
  }
  element.scrollLeft = dragAnchorScrollLeft - distance
  position = element.scrollLeft
  dragAnchorScrollLeft = position + distance
  const now = performance.now()
  pointerSamples = [...pointerSamples.filter(sample => now - sample.time <= velocityWindowMs), { time: now, x: event.clientX }]
}

function onPointerRelease(event: PointerEvent) {
  isPressed = false
  holdAutoScroll()
  if (event.pointerId !== dragPointerId) return
  dragPointerId = undefined
  const element = track.value
  if (!isDragging.value || !element) return
  isDragging.value = false
  const velocity = releaseVelocity()
  if (Math.abs(velocity) < glideStopPixelsPerMs || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wrapIntoFirstSet(element)
    return
  }
  glideVelocity = velocity
  glideFrame = requestAnimationFrame((time) => {
    lastGlideTime = time
    glide(time)
  })
}

function onFocusIn(event: FocusEvent) {
  hasKeyboardFocus = (event.target as HTMLElement).matches(':focus-visible')
}

function onFocusOut() {
  hasKeyboardFocus = false
}

onMounted(() => {
  isPlaying.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  visibilityObserver = new IntersectionObserver(([entry]) => {
    isOnScreen = entry.isIntersecting
  })
  if (track.value) visibilityObserver.observe(track.value)
  animationFrame = requestAnimationFrame((time) => {
    lastFrameTime = time
    advance(time)
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrame)
  stopGlide()
  clearTimeout(wrapTimer)
  visibilityObserver?.disconnect()
})
</script>

<style scoped>
.photo-row{display:flex;align-items:flex-start;gap:6px;margin:24px auto 0;max-width:var(--page-max);padding:0 var(--margin);overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none}
.photo-row::-webkit-scrollbar{display:none}
.photo-row.is-dragging{cursor:grabbing;user-select:none}
.photo-row figure{flex:none;margin:0;display:flex;flex-direction:column;gap:10px}
.photo-row img{height:calc(min(64svh,620px) - 36px);width:auto;object-fit:cover}
.photo-row figcaption{width:0;min-width:100%;font-size:var(--step-small);color:var(--carousel-caption,var(--muted))}
.photo-credit{display:block;margin-top:2px;max-width:calc(100vw - 2 * var(--margin));font-size:var(--step-micro);line-height:1.4;color:var(--carousel-credit,var(--muted))}
.carousel-controls{display:flex;justify-content:flex-end;gap:8px;max-width:var(--page-max);margin:12px auto 0;padding:0 var(--margin)}
.carousel-controls button{display:grid;place-items:center;width:44px;height:44px;padding:0;border-radius:50%;border:2px solid var(--carousel-control,var(--forest));background:transparent;color:var(--carousel-control,var(--forest));cursor:pointer;transition:background 200ms var(--ease-out),color 200ms var(--ease-out)}
.carousel-controls button:focus-visible{outline:2px solid var(--carousel-control,var(--forest));outline-offset:3px}
.carousel-controls svg{width:18px;height:18px}
@media (hover:hover) and (pointer:fine){.photo-row{cursor:grab}}
@media (hover:hover){.carousel-controls button:hover{background:var(--carousel-control,var(--forest));color:var(--carousel-control-ink,var(--on-forest))}}
@media (min-width:901px){
  .photo-row{margin:17px auto 0}
  .photo-row figure{gap:7px}
  .photo-row img{height:calc(min(30.8svh,294px) - 25px)}
}
@media (max-width:900px){
  .photo-row img{height:calc(56svh - 36px)}
}
</style>
