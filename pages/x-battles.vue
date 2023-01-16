<template>
  <div>
    <div class="mb-4 h-20">
      <div class="overflow-x-scroll">
        <div class="w-full">
          <button
            @click="refreshBattles"
            :disabled="!bulletToken"
            class="mr-4"
          >
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
            <button class="text-xs"><MaSym i="settings" class="text"></MaSym></button>
          </span>
        </div>
        <Settings class="ml-0.5 mt-0.5" />
      </div>
    </div>
    <WidgetsXPowers :summary="battles?.data.xBattleHistories.summary" />
    <div class="main">
      <div class="line"></div>
      <div v-if="battles">
        <div
          v-for="history in battles.data.xBattleHistories.historyGroups.nodes"
          class="mt-1"
        >
          <BattleResultModeXSummary :history="history" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
} = useFetchQL(query);

const anyPending = computed(() => {
  return unref(pendingToken) || unref(pendingModeX);
});

const anyError = computed(() => {
  return unref(errorToken) || unref(errorModeX);
});
</script>
