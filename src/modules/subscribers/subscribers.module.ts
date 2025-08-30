import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CountSubscribersResponse,
  CreateOrUpdateSubscriberParams,
  ForgetSubscriberResponse,
  GetSubscribersParams,
  ListSubscribersResponse,
  SingleSubscriberResponse,
  SubscriberInterface,
  UpdateSubscriberParams,
} from "./subscribers.types.ts";

export default class Subscriber implements SubscriberInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(
    params: GetSubscribersParams,
  ): Promise<DiscriminatedResponse<ListSubscribersResponse>> {
    return discriminatedRequest<ListSubscribersResponse>(`/api/subscribers`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  public createOrUpdate(
    requestBody: CreateOrUpdateSubscriberParams,
  ): Promise<DiscriminatedResponse<SingleSubscriberResponse>> {
    return discriminatedRequest<SingleSubscriberResponse>(`/api/subscribers`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  public update(
    subscriber_id: string,
    requestBody: UpdateSubscriberParams,
  ): Promise<DiscriminatedResponse<SingleSubscriberResponse>> {
    validateId(subscriber_id);

    return discriminatedRequest<SingleSubscriberResponse>(
      `/api/subscribers/${subscriber_id}`,
      {
        method: "PUT",
        body: requestBody,
      },
      this.config,
    );
  }

  public find(
    subscriber_id: string,
  ): Promise<DiscriminatedResponse<SingleSubscriberResponse>> {
    validateId(subscriber_id);

    return discriminatedRequest<SingleSubscriberResponse>(
      `/api/subscribers/${subscriber_id}`,
      {
        method: "GET",
      },
      this.config,
    );
  }

  public getCount(): Promise<DiscriminatedResponse<CountSubscribersResponse>> {
    return discriminatedRequest<CountSubscribersResponse>(`/api/subscribers`, {
      method: "GET",
      params: { limit: 0 },
    }, this.config);
  }

  public delete(subscriber_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(subscriber_id);

    return discriminatedRequest<null>(`/api/subscribers/${subscriber_id}`, {
      method: "DELETE",
    }, this.config);
  }

  public forget(
    subscriber_id: string,
  ): Promise<DiscriminatedResponse<ForgetSubscriberResponse>> {
    validateId(subscriber_id);
    return discriminatedRequest<ForgetSubscriberResponse>(
      `/api/subscribers/${subscriber_id}/forget`,
      {
        method: "POST",
      },
      this.config,
    );
  }
}
