import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CreateUpdateGroupParams,
  GetGroupsParams,
  GroupsInterface,
  ListAllGroupsResponse,
  ListAllSubscribersResponse,
  SingleGroupResponse,
  SubscriberParams,
} from "./groups.types.ts";

export default class Group implements GroupsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description List all groups
   *
   * @see https://developers.mailerlite.com/docs/groups.html#list-all-groups
   *
   * @params {Object} - List groups params
   */
  public get(
    params: GetGroupsParams,
  ): Promise<DiscriminatedResponse<ListAllGroupsResponse>> {
    return discriminatedRequest<ListAllGroupsResponse>(`/api/groups`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Create a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#create-a-group
   *
   * @requestBody {Object} - Campaign data for create
   */
  public create(
    requestBody: CreateUpdateGroupParams,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    return discriminatedRequest<SingleGroupResponse>(`/api/groups`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Update a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#update-a-group
   *
   * @group_id {String} - Group ID
   * @requestBody {Object} - Group data for update
   */
  public update(
    group_id: string,
    requestBody: CreateUpdateGroupParams,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    validateId(group_id);

    return discriminatedRequest<SingleGroupResponse>(
      `/api/groups/${group_id}`,
      {
        method: "PUT",
        body: requestBody,
      },
      this.config,
    );
  }

  /**
   * @description Delete a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#delete-group
   *
   * @group_id {String} - Group ID
   */
  public delete(
    group_id: string,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    validateId(group_id);

    return discriminatedRequest<SingleGroupResponse>(
      `/api/groups/${group_id}`,
      {
        method: "DELETE",
      },
      this.config,
    );
  }

  /**
   * @description Get subscribers belonging to a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#get-subscribers-belonging-to-a-group
   *
   * @group_id {String} - Group ID
   * @params {Object} - List subscribers params
   */
  public getSubscribers(
    group_id: string,
    params: SubscriberParams,
  ): Promise<DiscriminatedResponse<ListAllSubscribersResponse>> {
    validateId(group_id);

    return discriminatedRequest<ListAllSubscribersResponse>(
      `/api/groups/${group_id}/subscribers`,
      {
        method: "GET",
        params: params,
      },
      this.config,
    );
  }

  /**
   * @description Assign subscriber to a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#assign-subscriber-to-a-group
   *
   * @subscriber_id {String} - Subscriber ID
   * @group_id {String} - Group ID
   */
  public assignSubscriber(
    subscriber_id: string,
    group_id: string,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    validateId(subscriber_id);
    validateId(group_id);

    return discriminatedRequest<SingleGroupResponse>(
      `/api/subscribers/${subscriber_id}/groups/${group_id}`,
      {
        method: "POST",
      },
      this.config,
    );
  }

  /**
   * @description Unassign subscriber from a group
   *
   * @see https://developers.mailerlite.com/docs/groups.html#unassign-subscriber-from-a-group
   *
   * @subscriber_id {String} - Subscriber ID
   * @group_id {String} - Group ID
   */
  public unAssignSubscriber(
    subscriber_id: string,
    group_id: string,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    validateId(subscriber_id);
    validateId(group_id);

    return discriminatedRequest<SingleGroupResponse>(
      `/api/subscribers/${subscriber_id}/groups/${group_id}`,
      {
        method: "DELETE",
      },
      this.config,
    );
  }
}
