<template>
    <div v-if="isBannerOpen" class="cookie-banner" :class="{ 'above-dock': props.aboveDock }">
        <div class="cookie-text">
            {{ $t("cookies-banner-message") }}
            <a :href="policyPage" class="link">
                {{ $t("cookies-banner-read-policy") }}
            </a>
        </div>
        <div class="cookie-buttons">
            <button @click="accept" class="accept-button">{{ $t("common.accept") }}</button>
            <button @click="decline" class="decline-button">{{ $t("common.reject") }}</button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    aboveDock: { type: Boolean, default: false },
});

const route = useRoute();
const currentLocale = computed(() => route?.path?.split('/')[1]);
const policyPage = computed(() => `/${currentLocale.value || 'it'}/privacy-policy`);

const { isBannerOpen, accept, decline } = useCookieConsent();
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
</style>
