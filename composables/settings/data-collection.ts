import { boolean as looksTrue } from "boolean";

const SESSION_STORAGE_KEY = "data-collection-session";

const QUERY_PARAM = "allow-data-collection";
const DEFAULT = false;

const route = useRoute();

const enabled = ref(DEFAULT);
const session = ref(getSessionId());

const appliedToUrl = ref(false);
let notificationTimer: NodeJS.Timer | 0 = 0;
watch(appliedToUrl, () => {
  clearTimeout(notificationTimer);
  notificationTimer = setTimeout(() => appliedToUrl.value = false, 2000);
});

watch(toRef(route, "query"), (query) => {
  enabled.value = looksTrue(query[QUERY_PARAM]);
});

watch(enabled, (allowing) => {
  const router = useRouter();
  if (!router) {
    return;
  }

  router.replace({
    query: {
      ...route.query,
      [QUERY_PARAM]: allowing === DEFAULT ? void 0 : (allowing ? "on" : "off"),
    },
  });
});

export function useDataCollection() {
  return {
    enabled,
    session,
  };
}

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }
  const id = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
}
