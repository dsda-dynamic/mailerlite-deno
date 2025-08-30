import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta, SubscriberObject } from "../../utils/types.ts";

export interface GroupsInterface {
  get: (
    params: GetGroupsParams,
  ) => Promise<DiscriminatedResponse<ListAllGroupsResponse>>;
  create: (
    params: CreateUpdateGroupParams,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  update: (
    group_id: string,
    params: CreateUpdateGroupParams,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  delete: (
    group_id: string,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  getSubscribers: (
    group_id: string,
    params: SubscriberParams,
  ) => Promise<DiscriminatedResponse<ListAllSubscribersResponse>>;
  assignSubscriber: (
    subscriber_id: string,
    group_id: string,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  unAssignSubscriber: (
    subscriber_id: string,
    group_id: string,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
}

export interface GetGroupsParams {
  limit?: number;
  page?: number;
  filter?: {
    name?: string;
  };
  sort:
    | "name"
    | "total"
    | "open_rate"
    | "click_rate"
    | "created_at"
    | "-name"
    | "-total"
    | "-open_rate"
    | "-click_rate"
    | "-created_at";
}

export interface ListAllGroupsResponse {
  data: Array<GroupObject>;
  links: Links;
  meta: Meta;
}

export interface ListAllSubscribersResponse {
  data: Array<SubscriberObject>;
  links: Links;
  meta: Meta;
}

export interface SingleGroupResponse {
  data: GroupObject;
}

export interface CreateUpdateGroupParams {
  name: string;
}

export interface SubscriberParams {
  filter?: {
    /**
     * @default "active"
     */
    status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
  };
  limit?: number;
  page?: number; // deprecated
  cursor?: string;
}

export interface GroupObject {
  id: string;
  name: string;
  active_count: number;
  sent_count: number;
  opens_count: number;
  open_rate: {
    float: number;
    string: string;
  };
  clicks_count: number;
  click_rate: {
    float: number;
    string: string;
  };
  unsubscribed_count: number;
  unconfirmed_count: number;
  bounced_count: number;
  junk_count: number;
  created_at: string;
}
