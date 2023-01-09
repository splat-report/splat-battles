<template>
  <span>
    <img v-if="rule === 'AREA'" src="~/assets/icons/icon-area.svg" />
    <img v-if="rule === 'CLAM'" src="~/assets/icons/icon-clam.svg" />
    <img v-if="rule === 'TOWER'" src="~/assets/icons/icon-tower.svg" />
    <img v-if="rule === 'RAINMAKER'" src="~/assets/icons/icon-rainmaker.svg" />
  </span>
</template>

<style lang="scss" scoped>
img {
  @apply h-6;
}
</style>

<script setup lang="ts">
type AnyRule =
  | "AREA"
  | "CLAM"
  | "TOWER"
  | /*TOWER*/ "LOFT"
  | "RAINMAKER"
  | /*RAINMAKER*/ "GOAL";
const UNALIAS: { [key: string]: string } = {
  LOFT: "TOWER",
  GOAL: "RAINMAKER",
};

const props = defineProps<{
  rule: AnyRule | { rule: AnyRule };
}>();

const rule = computed(() => {
  if (typeof props.rule === "string") {
    return unalias(props.rule);
  }
  return unalias(props.rule.rule);
});

function unalias(rule: AnyRule) {
  return UNALIAS[rule] || rule;
}
</script>
