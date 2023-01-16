import {
  PersistedQuery,
  PersistedResponse,
  PersistedSuccessResponse,
} from "~~/ours/splat/api/constants/query";

type Query = {
  persistedQuery: PersistedQuery,
  variables: {[name: string]: any},
}

const { data: token, refresh } = useBulletToken();
const { trigger: autoRefreshTrigger } = useAutoRefresh();
const { enabled: allowDataCollection, session: dataCollectionSession } = useDataCollection();

export function useFetchQL<DataT extends PersistedSuccessResponse<Q['persistedQuery']>, Q extends Query>(query: Q) {

  return useFetch<DataT>("https://proxy-ql-splat-report.netlify.app/api/proxy-ql", {
    key: `useFetchQL:${query}`,
    method: "POST",
    query: {
      'allow-data-collection': unref(allowDataCollection) ? 'on' : void 0,
      'data-collection-session': (unref(allowDataCollection) && unref(dataCollectionSession)) || void 0,
    },
    headers: {
      'Authorization': computed(() => `Bearer ${unref(token)}`),
    },
    body: query,
    transform(res: PersistedResponse<Q['persistedQuery']>): DataT {
      if (res.errors) {
        throw new Error(res.errors);
      }
      return res;
    },
    onResponseError(error) {
      enqueueTokenRefresh();
    },
    immediate: !!unref(token),
    watch: [autoRefreshTrigger],
  });
}


const MIN_INTERVAL = 10000;
let lastTokenRefresh = 0;
async function enqueueTokenRefresh() {
  if (lastTokenRefresh + MIN_INTERVAL < Date.now()) {
    lastTokenRefresh = Date.now();
    console.info("proxy-ql failed. refreshing token.");
    refresh();
  }
}
