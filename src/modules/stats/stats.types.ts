import type {
  CampaignStats,
  GetCampaignsParams,
  ListCampaignsResponse,
} from "../campaigns/campaigns.types.ts";
import type {
  FormTypes,
  GetFormsParams,
  ListFormsResponse,
} from "../forms/forms.types.ts";
import type { ListSubscribersResponse } from "../subscribers/subscribers.types.ts";
import type {
  AutomationStats,
  AutomationSubsParams,
  AutomationSubsResponse,
  GetAutomationsParams,
  ListAutomationsResponse,
} from "../automations/automations.types.ts";
import type { Links, Meta, SubscriberObject } from "../../utils/types.ts";
import type {
  DiscriminatedResponse,
  FetchResponse,
} from "../../utils/fetch.ts";

export interface StatsInterface {
  getSentCampaigns: (
    params: GetCampaignsParams,
  ) => Promise<ListCampaignsResponse>;
  getSentCampaignStats: (campaign_id: string) => Promise<CampaignStats>;
  getSentCampaignSubscribers: (
    campaign_id: string,
    requestBody: CampaignSubscribersActivityParams,
  ) => Promise<DiscriminatedResponse<CampaignSubscribersActivityResponse>>;

  getFormsByType: (
    type: FormTypes,
    params: GetFormsParams,
  ) => Promise<DiscriminatedResponse<ListFormsResponse>>;
  getFormsCountByType: (type: FormTypes) => Promise<number>;
  getFormSubscribers: (
    form_id: string,
    params: FormsSubscribersParams,
  ) => Promise<DiscriminatedResponse<ListSubscribersResponse>>;

  getAutomations: (
    params: GetAutomationsParams,
  ) => Promise<DiscriminatedResponse<ListAutomationsResponse>>;
  getAutomationStats: (
    automation_id: string,
    // deno-lint-ignore no-explicit-any
  ) => Promise<AutomationStats | FetchResponse<any>>;
  getAutomationSubscribers: (
    automation_id: string,
    params: AutomationSubsParams,
  ) => Promise<DiscriminatedResponse<AutomationSubsResponse>>;
}

export interface CampaignSubscribersActivityParams {
  filter?: {
    type?:
      | "opened"
      | "unopened"
      | "clicked"
      | "unsubscribed"
      | "forwarded"
      | "hardbounced"
      | "softbounced"
      | "junk";
    search?: string;
  };
  /**
   * @default "ready"
   */
  limit?: 10 | 25 | 50 | 100;
  /**
   * @default "id"
   */
  sort?: "id" | "updated_at" | "clicks_count" | "opens_count";
  page?: number;
  include?: "subscriber";
}

export interface FormsSubscribersParams {
  /**
   * @default active
   */
  filter?: {
    status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
  };
  /**
   * @default 25
   */
  limit?: number;
  /**
   * @default 1
   */
  page?: number; // deprecated
  cursor?: string;
}

export interface CampaignSubscribersActivityResponse {
  data: Array<ActivityObject>;
  links: Links;
  meta: StatsMeta;
}

export interface ActivityObject {
  id: string;
  opens_count: number;
  clicks_count: number;
  subscriber?: SubscriberObject; // Subscriber data excluded by default
}

export interface StatsMeta extends Meta {
  counts: {
    all: number;
    opened: number;
    unopened: number;
    clicked: number;
    unsubscribed: number;
    forwarded: number;
    hardbounced: number;
    softbounced: number;
    junk: number;
  };
}
