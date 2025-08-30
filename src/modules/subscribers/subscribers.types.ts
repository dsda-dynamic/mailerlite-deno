import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, SubscriberObject } from "../../utils/types.ts";

export interface SubscriberInterface {
  get: (
    params: GetSubscribersParams,
  ) => Promise<DiscriminatedResponse<ListSubscribersResponse>>;
  createOrUpdate: (
    params: CreateOrUpdateSubscriberParams,
  ) => Promise<
    DiscriminatedResponse<SingleSubscriberResponse>
  >;
  update: (
    subscriber_id: string,
    params: UpdateSubscriberParams,
  ) => Promise<DiscriminatedResponse<SingleSubscriberResponse>>;
  find: (
    subscriber_id: string,
  ) => Promise<DiscriminatedResponse<SingleSubscriberResponse>>;
  getCount: () => Promise<DiscriminatedResponse<CountSubscribersResponse>>;
  delete: (subscriber_id: string) => Promise<DiscriminatedResponse<null>>;
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
