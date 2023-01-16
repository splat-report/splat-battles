<template>
  <span class="material-symbols-outlined">{{ props.i }}</span>
</template>

<style lang="scss" scoped>
.material-symbols-outlined {
  font-size: 1.5em;
}
</style>

<script setup lang="ts">
type AnySymbol = "sync" | "sync_problem" | "magnification_small" | "settings";

const props = defineProps<{
  i: AnySymbol;
}>();
</script>
