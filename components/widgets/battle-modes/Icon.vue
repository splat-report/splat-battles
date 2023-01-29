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
import { VsRuleLike, VsRuleRule } from '~~/types/bankara';

const idMap = {
  'VnNSdWxlLTE=': 'AREA',
  'VnNSdWxlLTI=': 'LOFT',
  'VnNSdWxlLTM=': 'RAINMAKER',
  'VnNSdWxlLTQ=': 'CLAM',
}
type IdMap = typeof idMap;
const UNALIAS: { [key: string]: string } = {
  LOFT: "TOWER",
  GOAL: "RAINMAKER",
};

const props = defineProps<{
  rule: VsRuleLike | VsRuleRule['rule'];
}>();

const rule = computed(() => {
  if (typeof props.rule === "string") {
    return unalias(props.rule);
  }
  if (props.rule.id) {
    return idMap[props.rule.id];
  }
  return unalias(props.rule.rule);
});

function unalias(rule: AnyRule) {
  return UNALIAS[rule] || rule;
}
</script>
