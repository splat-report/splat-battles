<template>
  <label class="text-xs">
    <input v-model="enabled" type="checkbox" class="mr-1" />
    Allow the site owner to collect my battle data.
  </label>
</template>

<script setup lang="ts">
const { enabled } = useDataCollection();
</script>
