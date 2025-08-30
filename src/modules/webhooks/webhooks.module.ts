import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CreateWebhookParams,
  ListAllWebhooksResponse,
  SingleWebhookResponse,
  UpdateWebhookParams,
  WebhooksInterface,
} from "./webhooks.types.ts";

export default class Webhook implements WebhooksInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description List all webhooks
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#list-all-webhooks
   */
  public get(): Promise<DiscriminatedResponse<ListAllWebhooksResponse>> {
    return discriminatedRequest<ListAllWebhooksResponse>(`/api/webhooks`, {
      method: "GET",
    }, this.config);
  }

  /**
   * @description Get a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#get-a-webhook
   *
   * @webhook_id {String} - Webhook ID
   */
  public find(
    webhook_id: string,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    validateId(webhook_id);

    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "GET",
    }, this.config);
  }

  /**
   * @description Create a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#create-a-webhook
   *
   * @requestBody {Object} - Webhook data for create
   */
  public create(
    requestBody: CreateWebhookParams,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    return discriminatedRequest(`/api/webhooks`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Update a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#update-a-webhook
   *
   * @requestBody {Object} - Webhook data for update
   */
  public update(
    webhook_id: string,
    requestBody: UpdateWebhookParams,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "PUT",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Delete a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#delete-a-webhook
   *
   * @webhook_id {String} - Webhook ID
   */
  public delete(webhook_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(webhook_id);

    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
