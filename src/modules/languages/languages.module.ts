import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  LanguagesInterface,
  ListAllLanguagesResponse,
} from "./languages.types.ts";

export default class Language implements LanguagesInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description Campaign languages
   *
   * @see https://developers.mailerlite.com/docs/campaign-languages.html
   */
  public get(): Promise<DiscriminatedResponse<ListAllLanguagesResponse>> {
    return discriminatedRequest<ListAllLanguagesResponse>(
      `/api/campaigns/languages`,
      {
        method: "GET",
      },
      this.config,
    );
  }
}
