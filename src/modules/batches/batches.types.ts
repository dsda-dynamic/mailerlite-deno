import type { DiscriminatedResponse } from "../../utils/fetch.ts";

export interface BatchesInterface {
  send: (params: BatchParams) => Promise<DiscriminatedResponse<BatchResponses>>;
}

export interface BatchParams {
  requests: Array<BatchRequestObject>;
}

export interface BatchRequestObject {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body: object;
}

export interface BatchResponses {
  total: number;
  successful: number;
  failed: number;
  responses: Array<BatchResponseObject>;
}

export interface BatchResponseObject {
  code: number;
  body: {
    data: Array<object>;
  };
}
