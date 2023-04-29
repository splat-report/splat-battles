<template>
  <div>
    <div class="mb-4">
      <div class="overflow-x-scroll">
        <div class="w-full">
          <button @click="refreshBattles" :disabled="!bulletToken" class="mr-4">
            fetch
          </button>
          <button @click="refreshToken">refresh token</button>
          <span v-if="anyError">
            <MaSym
              i="sync_problem"
              class="text-red-500 align-middle animate-shake-x"
            />
          </span>
          <span v-if="anyPending">
            <MaSym
              i="sync"
              class="text-4xl align-middle animate-spin-counterclock"
            />
          </span>

          <span class="float-right">
            <button @click="showSettings = !showSettings" class="text-xs">
              <MaSym i="settings" class="text"></MaSym>
            </button>
          </span>
        </div>
        <div v-if="showSettings" class="ml-0.5 mt-1">
          <Settings />
        </div>
      </div>
    </div>
    <WidgetsXPowers :summary="battles?.data.xBattleHistories.summary" />
    <div class="main">
      <div class="line"></div>
      <div v-if="battles">
        <div
          v-for="history in battles.data.xBattleHistories.historyGroups.nodes"
          :key="makeHistoryGroupKey(history)"
          class="mt-1"
        >
          <BattleResultModeXSummary :history="history" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

input.error {
  @apply outline-none border-red-500;
}

.line {
  border-bottom: thin dotted silver;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.body {
  color: azure;
  margin-top: 0.5em;
}
</style>

<script setup lang="ts">
import { XBattleHistories } from "~/types/battles";

const showSettings = ref(false);

const {
  data: bulletToken,
  refresh: refreshToken,
  pending: pendingToken,
  error: errorToken,
} = useBulletToken();

const query = {
  persistedQuery: "6796e3cd5dc3ebd51864dc709d899fc5",
  variables: {},
};

const {
  data: battles,
  refresh: refreshBattles,
  pending: pendingModeX,
  error: errorModeX,
} = useFetchQL<{ data: XBattleHistories }>(query);

const anyPending = computed(() => {
  return unref(pendingToken) || unref(pendingModeX);
});

const anyError = computed(() => {
  return unref(errorToken) || unref(errorModeX);
});

function makeHistoryGroupKey(
  history: XBattleHistories["xBattleHistories"]["historyGroups"]["nodes"][0]
) {
  return history.historyDetails.nodes[0].id;
}
</script>
