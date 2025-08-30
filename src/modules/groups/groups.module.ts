import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
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

  public get(
    params: GetGroupsParams,
  ): Promise<DiscriminatedResponse<ListAllGroupsResponse>> {
    return discriminatedRequest<ListAllGroupsResponse>(`/api/groups`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  public create(
    requestBody: CreateUpdateGroupParams,
  ): Promise<DiscriminatedResponse<SingleGroupResponse>> {
    return discriminatedRequest<SingleGroupResponse>(`/api/groups`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

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
