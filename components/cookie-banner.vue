<template>
    <div v-if="isBannerOpen" class="cookie-banner redesign">
        <div class="cookie-text">
            {{ bannerMessage }}
            <a :href="policyPage" class="link">
                {{ $t("cookies-banner-read-policy") }}
            </a>
        </div>
        <div class="cookie-buttons">
            <button ref="acceptButton" @click="accept" class="button button-light">{{ $t("common.accept") }}</button>
            <button @click="decline" class="button button-quiet">{{ $t("common.reject") }}</button>
        </div>
    </div>
</template>

<script setup>
const route = useRoute();
const policyPage = computed(() => localePath(siteLocale(route?.path ?? ''), 'privacy-policy'));

const { t } = useI18n();
const bannerMessage = computed(() => t('cookies-banner-message').replace('. ', '.\n'));

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
    bottom: calc(var(--dock-height) + env(safe-area-inset-bottom));
    left: 0;
    right: 0;
    z-index: 9999;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px 32px;
    padding: 16px var(--margin);
    background: var(--forest);
    color: var(--on-forest);
    box-shadow: 0 -8px 24px rgba(36, 71, 44, 0.18);
    text-align: left;
}

.cookie-text {
    flex: 0 1 60ch;
    margin: 0;
    font-family: var(--sub);
    font-size: var(--step-small);
    line-height: 1.5;
    color: inherit;
    white-space: pre-line;
}

.cookie-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.cookie-banner a {
    color: var(--on-forest);
    font-weight: 600;
}

.cookie-banner .button {
    min-height: 44px;
    padding: 0 24px;
    border: 0;
    cursor: pointer;
    font-size: var(--step-small);
}

.cookie-banner :focus-visible {
    outline-color: var(--lime);
}

@media (min-width: 901px) {
    .cookie-banner {
        gap: 8px 22px;
        padding: 11px var(--margin);
    }

    .cookie-banner .button {
        padding: 0 17px;
    }
}

@media (max-width: 600px) {
    .cookie-text {
        flex-basis: 100%;
    }
}
</style>
