<template>
  <div class="x-powers">
    <span>
      <WidgetsBattleRulesIcon rule="AREA" /> =
      <span class="num">{{ formatXPower(summary?.xPowerAr?.lastXPower) }}</span>
    </span>
    <span>
      <WidgetsBattleRulesIcon rule="TOWER" /> =
      <span class="num">{{ formatXPower(summary?.xPowerLf?.lastXPower) }}</span>
    </span>
    <span>
      <WidgetsBattleRulesIcon rule="RAINMAKER" /> =
      <span class="num">{{ formatXPower(summary?.xPowerGl?.lastXPower) }}</span>
    </span>
    <span>
      <WidgetsBattleRulesIcon rule="CLAM" /> =
      <span class="num">{{ formatXPower(summary?.xPowerCl?.lastXPower) }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.x-powers {
  @apply text-base;
  @apply grid grid-cols-2;
  @apply gap-x-3 w-max;
}
.num {
  @apply font-spla;
}
</style>

<script setup lang="ts">
type Power = {
  lastXPower: number;
};
const { summary } = defineProps<{
  summary?: {
    xPowerAr: Power; // area
    xPowerLf: Power; // tower
    xPowerGl: Power; // rainmaker
    xPowerCl: Power; // clam
  };
}>();

function formatXPower(power: number | null | void) {
  if (!power) {
    return "----";
  }
  return Math.floor(power);
}
</script>
