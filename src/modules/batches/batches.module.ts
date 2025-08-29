import {
  discriminatedRequest,
  DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import {
  BatchesInterface,
  BatchParams,
  BatchResponses,
} from "./batches.types.ts";

export default class Batch implements BatchesInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description Make multiple request to api in a single call
   *
   * @see https://developers.mailerlite.com/docs/batching.html
   */
  public send(
    requestBody: BatchParams,
  ): Promise<DiscriminatedResponse<BatchResponses>> {
    return discriminatedRequest<BatchResponses>(`/api/batch`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }
}
