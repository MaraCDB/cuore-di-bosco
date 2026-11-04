<template>
</template>

<script lang="ts" setup>
const router = useRouter();

onMounted(() => {
  router.replace(homePath(rootLanguage(storedLanguage(), navigator.languages ?? [navigator.language])))
})
</script>

<style></style>