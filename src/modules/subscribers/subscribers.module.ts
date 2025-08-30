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

  /**
   * @description List Subscribers
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers
   *
   * @params {Object} - List Subscribers params
   */
  public get(
    params: GetSubscribersParams,
  ): Promise<DiscriminatedResponse<ListSubscribersResponse>> {
    return discriminatedRequest<ListSubscribersResponse>(`/api/subscribers`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Create or update a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber
   *
   * @requestBody {Object} - Subscriber data for create or update
   */
  public createOrUpdate(
    requestBody: CreateOrUpdateSubscriberParams,
  ): Promise<DiscriminatedResponse<SingleSubscriberResponse>> {
    return discriminatedRequest<SingleSubscriberResponse>(`/api/subscribers`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Update a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#update-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   * @requestBody {Object} - Subscriber data for update
   */
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

  /**
   * @description Fetch a subscriber by ID
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
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

  /**
   * @description Fetch total subscribers count
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-total-subscribers-count
   */
  public getCount(): Promise<DiscriminatedResponse<CountSubscribersResponse>> {
    return discriminatedRequest<CountSubscribersResponse>(`/api/subscribers`, {
      method: "GET",
      params: { limit: 0 },
    }, this.config);
  }

  /**
   * @description Delete a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#delete-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
  public delete(subscriber_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(subscriber_id);

    return discriminatedRequest<null>(`/api/subscribers/${subscriber_id}`, {
      method: "DELETE",
    }, this.config);
  }

  /**
   * @description Forget a subscriber
   *
   * @see https://developers.mailerlite.com/docs/subscribers.html#forget-a-subscriber
   *
   * @subscriber_id {String} - Subscriber ID
   */
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
