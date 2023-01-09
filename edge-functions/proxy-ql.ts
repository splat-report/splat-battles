import { Context } from 'https://edge.netlify.com/'
import { PersistedQuery } from '../ours/splat/api/constants/query.ts';


export type TokenResponse = {
  iksmToken: {
    token: string;
    expiresIn: number;
    expiresAt: number;
  };
  bulletToken: {
    token: string;
  };
};


export type TokenCache = TokenResponse;



export type Query = {
  persistedQuery: PersistedQuery;
  variables: { [key: string]: any };
};


type QueryResponse__XMatch = {
  data: {
    detail: {
      xBattleHistories: {
        [key: string]: any;
      };
    };
  };
};


interface PersistedQueryResponse {
  [PersistedQuery.XMatch]: QueryResponse__XMatch;
}


class KnownError extends Error {
  constructor(underlying, public status = 400) {
    super(underlying);
  }
}


export default async function(request: Request, _context: Context) {
  if (['HEAD', 'OPTIONS'].includes(request.method)) {
    return await onRequestOptions(request);
  }
  if (request.method !== 'POST') {
    return new Response("Method Not Allowed", {
      status: 405,
    });
  }
  const isDev = Deno.env.get("NETLIFY_DEV") === "true";
  return await onRequestPost(request, isDev);
}


async function onRequestOptions(request: Request) {
  return new Response(null, {
    headers: {
      "Allow": "OPTIONS, HEAD, POST",
    },
  });
}


async function onRequestPost(request: Request, isDev = false) {

  try {
    const query = await request.json<Query>().catch((error) => {
      throw asErrRes("Failed to parse request body");
    });
    if (!Reflect.has(query, "persistedQuery")) {
      return asErrRes("Invalid query: must be in the form of { persistedQuery: ..., variables: ...}");
    }

    const bulletToken = getBulletToken(request);
    if (!bulletToken) {
      return asErrRes("`Authorization' header is missing or invalid");
    }

    const data = await fetchQL(query, bulletToken, isDev);
    Response.error;
    return Response.json(data);
  } catch (error) {
    if (error instanceof KnownError) {
      return asErrRes("" + error, error.status);
    }
    if (isDev) {
      console.error(error);
    }
    return asErrRes("Something wrong");
  }
}

function asErrRes(message: string, status = 400) {
  return Response.json({
    success: false,
    error: [message],
  }, {
    status,
  });
}

function getBulletToken(request: Request) {
  const bearer = request.headers.get("Authorization");
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return null;
  }
  return bearer.substring("Bearer ".length);
}

const URL = "https://api.lp1.av5ja.srv.nintendo.net/api/graphql";

const LANG = "ja-JP";
const IKSM_WEBVIEW_VERSION = "2.0.0-1b57b7ac";

async function buildBulletHeaders(token: string) {
  return {
    "Authorization": `Bearer ${token}`,
    "Accept-Language": LANG,
    "X-Web-View-Ver": IKSM_WEBVIEW_VERSION,
    "Content-Type": "application/json",
    "X-Requested-With": "com.nintendo.znca",
  };
}

async function fetchQL<
  Q extends Query,
  ResT extends PersistedQueryResponse[Q["persistedQuery"]],
>(query: Query, token: string, isDev = false) {
  const headers = await buildBulletHeaders(token);

  const persistedQueryHash = query.persistedQuery;
  const variables = query.variables;

  const body = {
    variables,
    "extensions": {
      "persistedQuery": {
        "version": 1,
        "sha256Hash": persistedQueryHash,
      },
    },
  };

  const res = await fetch(URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    throw new KnownError("Bullet token is invalid, maybe expired or network error.", 401);
  }
  if (res.status !== 200) {
    if (isDev) {
      console.error(res.statusText);
    }
    throw new KnownError("Something wrong in proxying response.", res.status);
  }

  const data: {errors?: {message: string}[]} = await res.json();

  if (Array.isArray(data.errors) && data.errors.length && isDev) {
    throw new KnownError(data.errors[0].message, 400);
  }

  return data as ResT;
}
