<template>
  <div>
    <div class="font-mono text-sm mb-0.5">
      <WidgetsBattleModesIcon
        :rule="history.xMatchMeasurement.vsRule"
        class="inline-block w-6 mr-1"
      />
      <WidgetsXMeasurement
        :measurement="history.xMatchMeasurement"
        class="inline-block"
      />
    </div>
    <div v-for="detail in history.historyDetails.nodes">
      <BattleResultSummary :detail="detail" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import type { HistoryGroupsNode } from "~~/nintendo-types/alias-x";

const props = defineProps<{
  history: HistoryGroupsNode;
}>();
</script>
