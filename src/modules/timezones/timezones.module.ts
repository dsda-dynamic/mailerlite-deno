import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  ListAllTimezonesResponse,
  TimezonesInterface,
} from "./timezones.types.ts";

export default class Timezone implements TimezonesInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(): Promise<DiscriminatedResponse<ListAllTimezonesResponse>> {
    return discriminatedRequest<ListAllTimezonesResponse>(`/api/timezones`, {
      method: "GET",
    }, this.config);
  }
}
