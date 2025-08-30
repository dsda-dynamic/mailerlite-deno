import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  BatchesInterface,
  BatchParams,
  BatchResponses,
} from "./batches.types.ts";

export default class Batch implements BatchesInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public send(
    requestBody: BatchParams,
  ): Promise<DiscriminatedResponse<BatchResponses>> {
    return discriminatedRequest<BatchResponses>(`/api/batch`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }
}
