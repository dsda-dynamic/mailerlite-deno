import { validateId } from "../../utils/helpers.ts";
import request, {
  discriminatedRequest,
  DiscriminatedResponse,
  FetchResponse,
  unwrapIfOk,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import {
  CampaignSubscribersActivityParams,
  CampaignSubscribersActivityResponse,
  StatsInterface,
} from "./stats.types.ts";
import {
  CampaignStats,
  GetCampaignsParams,
  ListCampaignsResponse,
} from "../campaigns/campaigns.types.ts";
import {
  FormTypes,
  GetFormsParams,
  ListFormsResponse,
} from "../forms/forms.types.ts";
import { FormsSubscribersParams } from "./stats.types.ts";
import { ListSubscribersResponse } from "../subscribers/subscribers.types.ts";
import {
  AutomationStats,
  AutomationSubsParams,
  AutomationSubsResponse,
  GetAutomationsParams,
  ListAutomationsResponse,
} from "../automations/automations.types.ts";

export default class Statistics implements StatsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description Get a list of sent campaigns
   *
   * @params {Object} - 'limit' & 'page' params
   */
  public getSentCampaigns(
    params: GetCampaignsParams,
  ): Promise<ListCampaignsResponse> {
    params.filter = {
      status: "sent",
    };

    return request<ListCampaignsResponse>(`/api/campaigns`, {
      method: "GET",
      params: params,
    }, this.config).then(unwrapIfOk);
  }

  /**
   * @description Get stats for a sent campaign
   *
   * @campaign_id {String} - Campaign ID
   */
  public async getSentCampaignStats(
    campaign_id: string,
  ): Promise<CampaignStats> {
    validateId(campaign_id);

    // deno-lint-ignore no-explicit-any
    const response = await request<any>(`/api/campaigns/${campaign_id}`, {
      method: "GET",
    }, this.config).then(unwrapIfOk);

    if (response && response.data && response.data.stats) {
      return response.data.stats;
    } else if (
      response && response.data &&
      response.data.status !== "sent"
    ) {
      throw new Error(
        "No stats available. See if ID of a sent campaign was provided.",
      );
    } else {
      throw new Error("No stats available. See if correct ID was provided.");
    }
  }

  /**
   * @description Get subscribers' activity of a sent campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#get-subscribers-activity-of-a-sent-campaign
   *
   * @campaign_id {String} - Campaign ID
   * @requestBody {Object} - Subscriber data for create or update
   */
  public getSentCampaignSubscribers(
    campaign_id: string,
    requestBody: CampaignSubscribersActivityParams,
  ): Promise<DiscriminatedResponse<CampaignSubscribersActivityResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<CampaignSubscribersActivityResponse>(
      `/api/campaigns/${campaign_id}/reports/subscriber-activity`,
      {
        method: "POST",
        body: requestBody,
      },
      this.config,
    );
  }

  /**
   * @description Get a list of forms by type
   *
   * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
   *
   * @type {String} - Form type
   * @params {Object} - List forms params
   */
  public getFormsByType(
    type: FormTypes,
    params: GetFormsParams,
  ): Promise<DiscriminatedResponse<ListFormsResponse>> {
    return discriminatedRequest<ListFormsResponse>(`/api/forms/${type}`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Get a stats (count) of a form by type
   *
   * @form_id {String} - Form ID
   */
  public async getFormsCountByType(
    type: FormTypes,
  ): Promise<number> {
    const response = await request(`/api/forms/${type}`, {
      method: "GET",
    }, this.config);

    const data = response.data as unknown;
    if (data && typeof data === "object" && data !== null && "meta" in data) {
      const meta = (data as { meta?: unknown }).meta;
      if (
        meta && typeof meta === "object" && meta !== null &&
        "aggregations" in meta
      ) {
        const aggregations = (meta as { aggregations?: unknown }).aggregations;
        if (
          aggregations && typeof aggregations === "object" &&
          aggregations !== null && type in aggregations
        ) {
          return (aggregations as Record<string, number>)[type];
        }
      }
    }
    throw new Error("No stats available.");
  }

  /**
   * @description Get subscribers of a form
   *
   * @form_id {String} - Form ID
   * @params {Object} - List forms subscribers params
   */
  public getFormSubscribers(
    form_id: string,
    params: FormsSubscribersParams,
  ): Promise<DiscriminatedResponse<ListSubscribersResponse>> {
    return discriminatedRequest<ListSubscribersResponse>(
      `/api/forms/${form_id}/subscribers`,
      {
        method: "GET",
        params: params,
      },
      this.config,
    );
  }

  /**
   * @description List all automations
   *
   * @see https://developers.mailerlite.com/docs/automations.html#list-all-automations
   *
   * @params {Object} - List automations params
   */
  public getAutomations(
    params: GetAutomationsParams,
  ): Promise<DiscriminatedResponse<ListAutomationsResponse>> {
    return discriminatedRequest<ListAutomationsResponse>("/api/automations", {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Get stats for a specific automation
   *
   * @automation_id {String} - Automation ID
   */
  public async getAutomationStats(
    automation_id: string,
    // deno-lint-ignore no-explicit-any
  ): Promise<AutomationStats | FetchResponse<any>> {
    validateId(automation_id);

    const response = await request(`/api/automations/${automation_id}`, {
      method: "GET",
    }, this.config);

    // deno-lint-ignore no-explicit-any
    const data = response.data as any;
    if (data && data.data && data.data.stats) {
      return data.data.stats;
    } else {
      throw new Error("No stats available.");
    }
  }

  /**
   * @description Get the subscriber activity for an automation
   *
   * @see https://developers.mailerlite.com/docs/automations.html#get-the-subscriber-activity-for-an-automation
   *
   * @automation_id {String} - Automation ID
   * @params {Object} - List automation subscribers params
   */
  public getAutomationSubscribers(
    automation_id: string,
    params: AutomationSubsParams,
  ): Promise<DiscriminatedResponse<AutomationSubsResponse>> {
    validateId(automation_id);

    return discriminatedRequest<AutomationSubsResponse>(
      `/api/automations/${automation_id}/activity`,
      {
        method: "GET",
        params: params,
      },
      this.config,
    );
  }
}
