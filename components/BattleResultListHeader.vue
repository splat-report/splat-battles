<template>
  <div>
    <span>victory/defeat</span>
    <span> = </span>
    <span>{{ normalWinCount }}</span> / <span>{{ normalLoseCount }}</span>
  </div>
</template>

<script setup lang="ts">
import type { LatestBattleHistories } from "~/ours/nintendo-types/alias";
import { isBankaraChallenge, isXMatch } from "~/ours/splat/history";

const props = defineProps<{
  histories: LatestBattleHistories;
}>();

/** Count only BANKARA CHALLENGE */
function countJudgement(judgement: string) {
  let count = 0;
  props.histories.historyGroups.nodes.forEach((group) => {
    group.historyDetails.nodes
      .filter((x) => isBankaraChallenge(x) || isXMatch(x))
      .forEach((detail) => {
        if (detail.judgement === judgement) {
          count++;
        }
      });
  });
  return count;
}

const normalWinCount = computed(() => {
  return countJudgement("WIN");
});
const normalLoseCount = computed(() => {
  return countJudgement("LOSE");
});
</script>
