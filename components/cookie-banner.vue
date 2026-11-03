<template>
    <div v-if="isBannerOpen" class="cookie-banner" :class="{ 'above-dock': props.aboveDock, redesign: props.redesign }">
        <div class="cookie-text">
            {{ bannerMessage }}
            <a :href="policyPage" class="link">
                {{ $t("cookies-banner-read-policy") }}
            </a>
        </div>
        <div class="cookie-buttons">
            <button ref="acceptButton" @click="accept" :class="props.redesign ? 'button button-light' : 'accept-button'">{{ $t("common.accept") }}</button>
            <button @click="decline" :class="props.redesign ? 'button button-quiet' : 'decline-button'">{{ $t("common.reject") }}</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    aboveDock: { type: Boolean, default: false },
    redesign: { type: Boolean, default: false },
});

const route = useRoute();
const currentLocale = computed(() => route?.path?.split('/')[1]);
const policyPage = computed(() => `/${currentLocale.value || 'it'}/privacy-policy`);

const { t } = useI18n();
const bannerMessage = computed(() => {
    const message = t('cookies-banner-message');
    return props.redesign ? message.replace('. ', '.\n') : message;
});

const acceptButton = ref(null);
const { isBannerOpen, shouldFocusBanner, accept, decline } = useCookieConsent();

watch(shouldFocusBanner, async (isFocusRequested) => {
    if (!isFocusRequested) return;
    await nextTick();
    acceptButton.value?.focus();
    shouldFocusBanner.value = false;
});
</script>

<style scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fefefe;
    border-top: 1px solid #ccc;
    padding: 16px;
    z-index: 9999;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.cookie-banner.above-dock {
    bottom: calc(64px + env(safe-area-inset-bottom));
}

@media (min-width: 901px) {
    .cookie-banner.above-dock {
        bottom: calc(72px + env(safe-area-inset-bottom));
    }
}

.cookie-text {
    margin-bottom: 12px;
    font-size: 12px;
    color: #333;
}

.cookie-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.accept-button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
}

.accept-button:hover {
    background-color: #43a047;
}

.decline-button {
    background-color: #e0e0e0;
    color: #333;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
}

.decline-button:hover {
    background-color: #d5d5d5;
}

.cookie-banner.redesign {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px 32px;
    padding: 16px var(--margin);
    background: var(--forest);
    color: var(--on-forest);
    border-top: 0;
    box-shadow: 0 -8px 24px rgba(36, 71, 44, 0.18);
    text-align: left;
}

.cookie-banner.redesign .cookie-text {
    flex: 0 1 60ch;
    margin: 0;
    font-family: var(--sub);
    font-size: var(--step-small);
    line-height: 1.5;
    color: inherit;
    white-space: pre-line;
}

.cookie-banner.redesign a {
    color: var(--on-forest);
    font-weight: 600;
}

.cookie-banner.redesign .button {
    min-height: 44px;
    padding: 0 24px;
    border: 0;
    cursor: pointer;
    font-size: var(--step-small);
}

.cookie-banner.redesign :focus-visible {
    outline-color: var(--lime);
}

@media (max-width: 600px) {
    .cookie-banner.redesign .cookie-text {
        flex-basis: 100%;
    }
}
</style>
