const QUERY_PARAM = "interval";
const DISABLE_VALUE = 'off';

const DEFAULT_ENABLED = true;
const DEFAULT_INTERVAL = 60; // evenry 60 seconds

const route = useRoute();

const MIN_INTERVAL_SECODNS = 3;

const enabled = ref(DEFAULT_ENABLED);
const interval = ref(DEFAULT_INTERVAL);

const trigger = ref(0);

export function useAutoRefresh() {
  return {
    enabled,
    interval,
    trigger,
    MIN_INTERVAL_SECODNS,
  };
}

function refresh() {
  trigger.value++;
}

let timerId: NodeJS.Timer | undefined = void 0;

watch(
  [enabled, interval],
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
  { immediate: true },
);

watch(toRef(route, "query"), (query) => {
  const val =  query[QUERY_PARAM];
  if (!val) {
    return;
  }
  if (val === DISABLE_VALUE) {
    enabled.value = false;
    return;
  }

  const n = Number.parseInt('' + val);
  enabled.value = true;
  interval.value = Math.max(n, MIN_INTERVAL_SECODNS);
}, { immediate: true });

watch([enabled, interval], ([enabled, interval]) => {
  const router = useRouter();
  if (!router) {
    return;
  }

  router.replace({
    query: {
      ...route.query,
      [QUERY_PARAM]: makeQueryParam(unref(enabled), unref(interval)),
    },
  });
});

function makeQueryParam(enabled: boolean, interval: number) {
  if (enabled === DEFAULT_ENABLED && interval === DEFAULT_INTERVAL) {
    return void 0;
  }
  if (enabled === false) {
    return DISABLE_VALUE;
  }
  return '' + interval;
}
