import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta } from "../../utils/types.ts";

export interface WebhooksInterface {
  /**
   * @description List all webhooks
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#list-all-webhooks
   */
  get: () => Promise<DiscriminatedResponse<ListAllWebhooksResponse>>;
  /**
   * @description Get a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#get-a-webhook
   *
   * @webhook_id {String} - Webhook ID
   */
  find: (
    webhook_id: string,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
  /**
   * @description Create a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#create-a-webhook
   *
   * @requestBody {Object} - Webhook data for create
   */
  create: (
    params: CreateWebhookParams,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
  /**
   * @description Update a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#update-a-webhook
   *
   * @requestBody {Object} - Webhook data for update
   */
  update: (
    webhook_id: string,
    params: UpdateWebhookParams,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
  /**
   * @description Delete a webhook
   *
   * @see https://developers.mailerlite.com/docs/webhooks.html#delete-a-webhook
   *
   * @webhook_id {String} - Webhook ID
   */
  delete: (webhook_id: string) => Promise<DiscriminatedResponse<null>>;
}

export interface ListAllWebhooksResponse {
  data: Array<WebhookObject>;
  links: Links;
  meta: Meta;
}

export interface SingleWebhookResponse {
  data: WebhookObject;
}

export interface CreateWebhookParams {
  name?: string;
  events: Array<string>;
  url: string;
  enabled?: boolean;
}

export interface UpdateWebhookParams {
  name?: string;
  events?: Array<string>;
  url?: string;
  enabled?: boolean;
}

export interface WebhookObject {
  id: string;
  name: string;
  url: string;
  events: Array<string>;
  enabled: true;
  secret: string;
  created_at: string;
  updated_at: string;
}
