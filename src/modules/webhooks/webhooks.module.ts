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

  public get(): Promise<DiscriminatedResponse<ListAllWebhooksResponse>> {
    return discriminatedRequest<ListAllWebhooksResponse>(`/api/webhooks`, {
      method: "GET",
    }, this.config);
  }

  public find(
    webhook_id: string,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    validateId(webhook_id);

    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "GET",
    }, this.config);
  }

  public create(
    requestBody: CreateWebhookParams,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    return discriminatedRequest(`/api/webhooks`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  public update(
    webhook_id: string,
    requestBody: UpdateWebhookParams,
  ): Promise<DiscriminatedResponse<SingleWebhookResponse>> {
    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "PUT",
      body: requestBody,
    }, this.config);
  }

  public delete(webhook_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(webhook_id);

    return discriminatedRequest(`/api/webhooks/${webhook_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
