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
  /**
   * @description Get a list of sent campaigns
   *
   * @params {Object} - 'limit' & 'page' params
   */
  getSentCampaigns: (
    params: GetCampaignsParams,
  ) => Promise<ListCampaignsResponse>;
  /**
   * @description Get stats for a sent campaign
   *
   * @campaign_id {String} - Campaign ID
   */
  getSentCampaignStats: (campaign_id: string) => Promise<CampaignStats>;
  /**
   * @description Get subscribers' activity of a sent campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#get-subscribers-activity-of-a-sent-campaign
   *
   * @campaign_id {String} - Campaign ID
   * @requestBody {Object} - Subscriber data for create or update
   */
  getSentCampaignSubscribers: (
    campaign_id: string,
    requestBody: CampaignSubscribersActivityParams,
  ) => Promise<DiscriminatedResponse<CampaignSubscribersActivityResponse>>;

  /**
   * @description Get a list of forms by type
   *
   * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
   *
   * @type {String} - Form type
   * @params {Object} - List forms params
   */
  getFormsByType: (
    type: FormTypes,
    params: GetFormsParams,
  ) => Promise<DiscriminatedResponse<ListFormsResponse>>;
  /**
   * @description Get a stats (count) of a form by type
   *
   * @form_id {String} - Form ID
   */
  getFormsCountByType: (type: FormTypes) => Promise<number>;
  /**
   * @description Get subscribers of a form
   *
   * @form_id {String} - Form ID
   * @params {Object} - List forms subscribers params
   */
  getFormSubscribers: (
    form_id: string,
    params: FormsSubscribersParams,
  ) => Promise<DiscriminatedResponse<ListSubscribersResponse>>;

  /**
   * @description List all automations
   *
   * @see https://developers.mailerlite.com/docs/automations.html#list-all-automations
   *
   * @params {Object} - List automations params
   */
  getAutomations: (
    params: GetAutomationsParams,
  ) => Promise<DiscriminatedResponse<ListAutomationsResponse>>;
  /**
   * @description Get stats for a specific automation
   *
   * @automation_id {String} - Automation ID
   */
  getAutomationStats: (
    automation_id: string,
    // deno-lint-ignore no-explicit-any
  ) => Promise<AutomationStats | FetchResponse<any>>;
  /**
   * @description Get the subscriber activity for an automation
   *
   * @see https://developers.mailerlite.com/docs/automations.html#get-the-subscriber-activity-for-an-automation
   *
   * @automation_id {String} - Automation ID
   * @params {Object} - List automation subscribers params
   */
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
