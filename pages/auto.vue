<script setup lang="ts">
import { HistoryGroups, BattleListNode } from "~~/types/battles";

type Response = {
  data: {
    vsResult: {
      historyGroups: HistoryGroups<BattleListNode>;
    };
  };
};

const { data: latest } = useFetchQL<Response>({
  persistedQuery: "0329c535a32f914fd44251be1f489e24",
  variables: {},
});

const vsMode = computed(
  () =>
    latest.value?.data.vsResult.historyGroups.nodes[0].historyDetails.nodes[0]
      .vsMode
);
</script>

<template>
  <div>
    <div v-if="!vsMode">
      <MaSym
        i="sync"
        class="text-4xl align-middle animate-spin-counterclock"
      ></MaSym>
    </div>
    <div v-else-if="vsMode?.mode === 'BANKARA'">
      <MainBankaraBattles />
    </div>
    <div v-else-if="vsMode?.mode === 'X_MATCH'">
      <MainXBattles />
    </div>
    <div v-else>
      unknown: <code>{{ vsMode }}</code>
    </div>
  </div>
</template>
