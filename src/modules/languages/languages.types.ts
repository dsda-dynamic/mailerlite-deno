import type { DiscriminatedResponse } from "../../utils/fetch.ts";

export interface LanguagesInterface {
  /**
   * @description Campaign languages
   *
   * @see https://developers.mailerlite.com/docs/campaign-languages.html
   */
  get: () => Promise<DiscriminatedResponse<ListAllLanguagesResponse>>;
}

export interface ListAllLanguagesResponse {
  data: Array<LanguageObject>;
}

export interface LanguageObject {
  id: string;
  shortcode: string;
  iso639: string;
  name: string;
  direction: string;
}
