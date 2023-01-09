export const IS_DEV = process.env.NODE_ENV === "development";

export function getFirstQueryParameterValue(name: string): string | null {
  const route = useRoute();

  const value = route.query[name];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}


function nowInSeconds() {
  return Math.floor(Date.now() / 1000);
}

type CacheItem = {
  value: any,
  expiresAt: number,
};


function makeCacheItem(value: any, ttl = 1800/*seconds*/): CacheItem {
  const expiresAt = nowInSeconds() + ttl;
  return {
    value,
    expiresAt,
  };
}


export function storeCache<T>(cacheKey: string, data: T) {
  const item = makeCacheItem(data);
  window.sessionStorage.setItem(cacheKey, JSON.stringify(item));
}

export function loadCache<T>(cacheKey: string) {
  const itemSource = window.sessionStorage.getItem(cacheKey);
  if (!itemSource) {
    return null;
  }
  const item: CacheItem = JSON.parse(itemSource);

  if (nowInSeconds() > item.expiresAt) {
    return null;
  }

  return item.value;
}
