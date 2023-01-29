<template>
  <div>
    <div class="font-mono text-sm mb-0.5">
      <WidgetsBattleModesIcon
        :rule="props.vsRule"
        class="inline-block w-6 mr-1"
      />
      <WidgetsBankaraMeasurement v-if="history.bankaraMatchChallenge"
        :measurement="history.bankaraMatchChallenge"
        class="inline-block"
      />
      <!--<span v-if="pointUp" class="font-mono ml-2 inline-block text-right w-10">+{{ pointUp }}</span>-->
      <span v-if="history.bankaraMatchChallenge?.isUdemaeUp" class="inline-block">
        {{ history.bankaraMatchChallenge.udemaeAfter }}
      </span>
    </div>
    <div v-for="detail in history.historyDetails.nodes">
      <BattleResultSummary :detail="detail" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script setup lang="ts">
import type { HistoryGroupItem, BattleListNode, VsRuleLike } from "~/types/bankara";

const props = defineProps<{
  history: HistoryGroupItem<BattleListNode>;
  vsRule: VsRuleLike,
}>();


const pointUp = computed(() => props.history.bankaraMatchChallenge?.earnedUdemaePoint);
</script>
