import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, SubscriberObject } from "../../utils/types.ts";

export interface SubscriberInterface {
  /**
   * @description List Subscribers
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers
   *
   * @params {Object} - List Subscribers params
   */
  get: (
    params: GetSubscribersParams,
  ) => Promise<DiscriminatedResponse<ListSubscribersResponse>>;
  /**
   * @description Create or update a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber
   *
   * @requestBody {Object} - Subscriber data for create or update
   */
  createOrUpdate: (
    params: CreateOrUpdateSubscriberParams,
  ) => Promise<
    DiscriminatedResponse<SingleSubscriberResponse>
  >;
  /**
   * @description Update a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#update-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   * @requestBody {Object} - Subscriber data for update
   */
  update: (
    subscriber_id: string,
    params: UpdateSubscriberParams,
  ) => Promise<DiscriminatedResponse<SingleSubscriberResponse>>;
  /**
   * @description Fetch a subscriber by ID
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
  find: (
    subscriber_id: string,
  ) => Promise<DiscriminatedResponse<SingleSubscriberResponse>>;
  /**
   * @description Fetch total subscribers count
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-total-subscribers-count
   */
  getCount: () => Promise<DiscriminatedResponse<CountSubscribersResponse>>;
  /**
   * @description Delete a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#delete-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
  delete: (subscriber_id: string) => Promise<DiscriminatedResponse<null>>;
  /**
   * @description Forget a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#forget-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
  forget: (
    subscriber_id: string,
  ) => Promise<DiscriminatedResponse<ForgetSubscriberResponse>>;
}

export interface GetSubscribersParams {
  filter?: {
    status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk"; // because it should be looking like ?filter[status]=xxx
  };
  /**
   * @default 25
   */
  limit?: number;
  /**
   * @default 1
   */
  page?: number; // deprecated
  cursor?: string;
  include?: "groups";
}

export interface UpdateSubscriberParams {
  fields?: object;
  groups?: Array<string>;
  status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
  subscribed_at?: string;
  ip_address?: string;
  opted_in_at?: string;
  optin_ip?: string;
  unsubscribed_at?: string;
}

export interface CreateOrUpdateSubscriberParams extends UpdateSubscriberParams {
  email: string;
}

export interface ListSubscribersResponse {
  data: Array<SubscriberObject>;
  links: Links;
  meta: {
    path: string;
    per_page: number;
    next_cursor: string;
    prev_cursor: string;
  };
}

export interface SingleSubscriberResponse {
  data: SubscriberObject;
}

export interface CountSubscribersResponse {
  total: number;
}

export interface ForgetSubscriberResponse {
  message: string;
  data: SubscriberObject;
}
