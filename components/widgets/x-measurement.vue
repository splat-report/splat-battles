<template>
  <div>
    <div class="bangs">
      <span v-for="i in measurement.winCount" class="win">
        <img src="~/assets/icons/icon-bang-win.svg" />
      </span>
      <span
        v-for="i in measurement.maxWinCount - measurement.winCount"
        class="placeholder"
      >
        <img src="~/assets/icons/icon-bang-placeholder.svg" />
      </span>
      <span class="mr-2"></span>
      <span v-for="i in measurement.loseCount" class="lose">
        <img src="~/assets/icons/icon-bang-lose.svg" />
      </span>
      <span
        v-for="i in measurement.maxLoseCount - measurement.loseCount"
        class="placeholder"
      >
        <img src="~/assets/icons/icon-bang-placeholder.svg" />
      </span>
      <!--
    <span v-if="measurement.state === 'COMPLETED'" class="ml-1">
      <span v-if="measurement.winCount === measurement.maxWinCount">🥳</span>
      <span v-if="measurement.loseCount === measurement.maxLoseCount">😭</span>
    </span>
  -->
    </div>
    <span v-if="xPowerAfter" class="ml-2">⇢ {{ xPowerAfter }}</span>
  </div>
</template>

<style lang="scss" scoped>
.bangs {
  @apply inline-block;
  @apply bg-black rounded-full;
  @apply px-1 w-max py-0;

  @apply space-x-0.5 leading-3;
}

img {
  .win & {
    @apply w-2.5;
  }

  .lose & {
    @apply w-2;
  }

  .placeholder & {
    @apply w-2;
  }
}
</style>

<script setup lang="ts">
import { HistoryGroupsNode } from "~~/nintendo-types/alias-x";

const { measurement } = defineProps<{
  measurement: HistoryGroupsNode["xMatchMeasurement"];
}>();

const xPowerAfter = computed(() => {
  return Math.floor(measurement.xPowerAfter || 0);
});
</script>
