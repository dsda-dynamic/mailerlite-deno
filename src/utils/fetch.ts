import type { Config } from "./types.ts";

interface Options {
  headers?: object;
  method: string;
  body?: null | object;
  params?: object;
}

export interface FetchResponse<ResponseT> {
  data: ResponseT | null;
  status: number;
  statusText: string;
  ok: boolean;
}

export default async function request<T>(
  endpoint: string,
  options: Options,
  config: Config,
): Promise<FetchResponse<T>> {
  const { headers = {}, method, body = null, params = {} } = options;

  let url = config.basePath + endpoint;
  const queryString = serializeQuery(params);
  if (queryString) {
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
    method: method,
    headers: {
      ...headers,
      "Authorization": `Bearer ${config.api_key}`,
      "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/json",
      "accept-encoding": "null", // needed for axios
    },
    body: body && JSON.stringify(body),
  });

  return {
    data: (res.body ?? null) && await exceptionToNull<T>(() => res.json()),
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
  };
}

export function discriminatedRequest<T>(
  endpoint: string,
  options: Options,
  config: Config,
): Promise<DiscriminatedResponse<T>> {
  return request<T>(endpoint, options, config)
    .then(toDiscriminatedUnion);
}

async function exceptionToNull<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (_) {
    return null;
  }
}
export function unwrapIfOk<T>(response: FetchResponse<T>): T {
  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`,
    );
  }
  return response.data!;
}

export type DiscriminatedResponse<T> = { success: true; data: T } | {
  success: false;
  response: FetchResponse<T>;
};

export function toDiscriminatedUnion<T>(
  response: FetchResponse<T>,
): DiscriminatedResponse<T> {
  if (response.ok) {
    return { success: true, data: response.data as T };
  }
  return { success: false, response };
}

function serializeQuery(params: object, prefix?: string): string {
  const queryParamsArray: string[] = Object.keys(params).map((key) => {
    const value = params[key as keyof typeof params];

    if (params.constructor === Array) {
      key = `${prefix}[]`;
    } else if (params.constructor === Object) {
      key = prefix ? `${prefix}[${key}]` : key;
    }

    if (typeof value === "object") {
      return serializeQuery(value, key);
    } else {
      return `${key}=${encodeURIComponent(value)}`;
    }
  });

  return queryParamsArray.flat(10).join("&");
}
