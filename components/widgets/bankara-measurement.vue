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
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bangs {
  @apply inline-block;
  @apply bg-black rounded-full;
  @apply px-1 w-max py-0;

  @apply space-x-0.5 leading-3;
}

.win, .lose, .placeholder {
  @apply inline-block;
}
.win img {
  @apply inline-block;
  transform: scale(1.1);
}
.lose img {
  filter: brightness(120%);
}
</style>

<script setup lang="ts">
import { BankaraMatchChallenge } from "~/types/bankara";

const { measurement } = defineProps<{
  measurement: BankaraMatchChallenge,
}>();
</script>
