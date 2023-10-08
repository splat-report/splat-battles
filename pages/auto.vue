<script setup lang="ts">
import { HistoryGroups, BattleListNode } from "~~/types/battles";
import { RequestId } from "splatnet3-types/splatnet3";

type Response = {
  data: {
    vsResult: {
      historyGroups: HistoryGroups<BattleListNode>;
    };
  };
};

const query = {
    "extensions": {
        "persistedQuery": {
            "version": 1,
            "sha256Hash": RequestId.PagerLatestVsDetailQuery,
        }
    },
    "variables": {}
};
const { data: latest } = useFetchQL<Response>(query);

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
