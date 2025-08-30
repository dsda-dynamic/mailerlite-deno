import type { DiscriminatedResponse } from "../../utils/fetch.ts";

export interface LanguagesInterface {
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
