import { Ref } from "vue";

const BULLET_TOKEN_CACHE_KEY = "cache:bullet-token";

const QUERY_SESSION_TOKEN = "sessionToken"; // ?sessionToken=...

const IKSM_BULLET_URL = "https://splat-iksm-token.netlify.app/bullet"; // TODO: useRuntimeConfig()
type BulletTokenRes = { bulletToken: { token: string } };

const sessionToken: Ref<string | null> = ref(getFirstQueryParameterValue(QUERY_SESSION_TOKEN));
let onceLoaded = false;

const { data: bulletToken, refresh, pending, error } = useFetch<BulletTokenRes>(
  IKSM_BULLET_URL,
  {
    method: "POST",
    body: { sessionToken },
    immediate: false,
  },
);

export function useBulletToken() {
  if (!onceLoaded) {
    onceLoaded = true;
    console.assert(unref(bulletToken) === null);

    const cache = loadCache(BULLET_TOKEN_CACHE_KEY);
    if (cache && !unref(bulletToken)) {
      console.debug("Using cached bullet token");
      bulletToken.value = cache;
      pending.value = false;
    } else {
      refresh();
    }
  }

  return {
    data: computed(() => unref(bulletToken)?.bulletToken.token),
    refresh,
    pending,
    error,
  };
}

watch(bulletToken, (t) => storeCache(BULLET_TOKEN_CACHE_KEY, t));
