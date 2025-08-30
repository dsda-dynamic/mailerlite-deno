import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta, SubscriberObject } from "../../utils/types.ts";

export interface GroupsInterface {
  /**
   * @description List all groups
   *
   * @see https://developers.mailerlite.com/docs/groups.html#list-all-groups
   *
   * @params {Object} - List groups params
   */
  get: (
    params: GetGroupsParams,
  ) => Promise<DiscriminatedResponse<ListAllGroupsResponse>>;
  /**
   * @description Create a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#create-a-group
   *
   * @requestBody {Object} - Campaign data for create
   */
  create: (
    params: CreateUpdateGroupParams,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  /**
   * @description Update a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#update-a-group
   *
   * @group_id {String} - Group ID
   * @requestBody {Object} - Group data for update
   */
  update: (
    group_id: string,
    params: CreateUpdateGroupParams,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  /**
   * @description Delete a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#delete-group
   *
   * @group_id {String} - Group ID
   */
  delete: (
    group_id: string,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  /**
   * @description Get subscribers belonging to a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#get-subscribers-belonging-to-a-group
   *
   * @group_id {String} - Group ID
   * @params {Object} - List subscribers params
   */
  getSubscribers: (
    group_id: string,
    params: SubscriberParams,
  ) => Promise<DiscriminatedResponse<ListAllSubscribersResponse>>;
  /**
   * @description Assign subscriber to a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#assign-subscriber-to-a-group
   *
   * @subscriber_id {String} - Subscriber ID
   * @group_id {String} - Group ID
   */
  assignSubscriber: (
    subscriber_id: string,
    group_id: string,
  ) => Promise<DiscriminatedResponse<SingleGroupResponse>>;
  /**
   * @description Unassign subscriber from a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#unassign-subscriber-from-a-group
   *
   * @subscriber_id {String} - Subscriber ID
   * @group_id {String} - Group ID
   */
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
