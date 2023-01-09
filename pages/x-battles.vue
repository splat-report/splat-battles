<template>
  <div>
    <div class="h-20">
      <div class="overflow-x-scroll">
        <div class="w-max">
          <button
            @click="refreshContents"
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
        </div>
        <div class="ml-0.5 mt-0.5">
          <label
            ><input
              v-model="enableAutoFetch"
              type="checkbox"
              class="mr-1"
            />every</label
          >
          <input
            v-model="autoFetchInterval"
            type="number"
            max="3600"
            min="10"
            step="10"
            class="ml-2 w-8"
            :class="{ error: autoFetchInterval < MIN_INTERVAL_SECODNS }"
          />
          sec.
        </div>
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
import { PersistedQuery } from "~/ours/splat/api/constants/query";

const enableAutoFetch = ref(true);
const autoFetchInterval = ref(60);

let timerId: NodeJS.Timer | undefined = void 0;

const MIN_INTERVAL_SECODNS = 3;
watch(
  [enableAutoFetch, autoFetchInterval],
  ([enabled, interval]) => {
    clearInterval(timerId);
    timerId = void 0;
    if (!enabled) {
      return;
    }
    if (interval < MIN_INTERVAL_SECODNS) {
      return;
    }

    timerId = setInterval(refresh, interval * 1000);
  },
  { immediate: true }
);

async function refresh() {
  try {
    await refreshContents();
  } catch (e) {
    console.error("Caught a error. need to refresh token.", e);
    await refreshToken();
    // await refreshContents(); // NOTE: automatically triggerd by token refresh
  }
}

const {
  data: bulletToken,
  refresh: refreshToken,
  pending: pendingToken,
  error: errorToken,
} = useBulletToken();

const query = {
  persistedQuery: PersistedQuery.XMatch,
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

async function refreshContents() {
  await refreshBattles();
  if (unref(anyError)) {
    throw unref(anyError);
  }
}

/*
onMounted(async() => {
  if (unref(bulletToken)) {
    await refresh();
  }
});
*/
</script>
