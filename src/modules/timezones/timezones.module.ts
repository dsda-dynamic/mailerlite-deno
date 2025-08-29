import {
  discriminatedRequest,
  DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import {
  ListAllTimezonesResponse,
  TimezonesInterface,
} from "./timezones.types.ts";

export default class Timezone implements TimezonesInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description List all timezones
   *
   * @see https://developers.mailerlite.com/docs/timezones.html#response
   */
  public get(): Promise<DiscriminatedResponse<ListAllTimezonesResponse>> {
    return discriminatedRequest<ListAllTimezonesResponse>(`/api/timezones`, {
      method: "GET",
    }, this.config);
  }
}
