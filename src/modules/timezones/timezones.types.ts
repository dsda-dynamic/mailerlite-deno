import type { DiscriminatedResponse } from "../../utils/fetch.ts";

export interface TimezonesInterface {
  /**
   * @description List all timezones
   *
   * @see https://developers.mailerlite.com/docs/timezones.html#response
   */
  get: () => Promise<DiscriminatedResponse<ListAllTimezonesResponse>>;
}

export interface ListAllTimezonesResponse {
  data: Array<TimezoneObject>;
}

export interface TimezoneObject {
  id: string;
  name: string;
  name_for_humans: string;
  offset_name: string;
  offset: number;
}
