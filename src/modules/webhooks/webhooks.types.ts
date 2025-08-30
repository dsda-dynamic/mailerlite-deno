import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta } from "../../utils/types.ts";

export interface WebhooksInterface {
  get: () => Promise<DiscriminatedResponse<ListAllWebhooksResponse>>;
  find: (
    webhook_id: string,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
  create: (
    params: CreateWebhookParams,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
  update: (
    webhook_id: string,
    params: UpdateWebhookParams,
  ) => Promise<DiscriminatedResponse<SingleWebhookResponse>>;
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
