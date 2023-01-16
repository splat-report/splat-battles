<template>
  <div>
    <label><input v-model="enabled" type="checkbox" class="mr-1" />every</label>
    <input v-model="interval" type="number" max="3600" min="10" step="10" class="ml-2 w-8"
      :class="{ error: interval < MIN_INTERVAL_SECODNS }" />
    sec.
  </div>
</template>

<script setup lang="ts">
const { enabled, interval, MIN_INTERVAL_SECODNS } = useAutoRefresh();
</script>
