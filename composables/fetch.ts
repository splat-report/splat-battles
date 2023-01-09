import type { Query } from '~/edge-functions/proxy-ql';


export function useFetchQL(query: Query) {
  const { data: token } = useBulletToken();

  return useFetch("/api/proxy-ql", {
    method: "POST",
    headers: {
      'Authorization': computed(() => `Bearer ${unref(token)}`),
    },
    body: query,
    immediate: !!unref(token),
  });
}
