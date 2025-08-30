import { validateId } from "../../utils/helpers.ts";
import request, {
  discriminatedRequest,
  type DiscriminatedResponse,
  type FetchResponse,
  unwrapIfOk,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CampaignSubscribersActivityParams,
  CampaignSubscribersActivityResponse,
  StatsInterface,
} from "./stats.types.ts";
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
import type { FormsSubscribersParams } from "./stats.types.ts";
import type { ListSubscribersResponse } from "../subscribers/subscribers.types.ts";
import type {
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

  public getFormsByType(
    type: FormTypes,
    params: GetFormsParams,
  ): Promise<DiscriminatedResponse<ListFormsResponse>> {
    return discriminatedRequest<ListFormsResponse>(`/api/forms/${type}`, {
      method: "GET",
      params: params,
    }, this.config);
  }

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

  public getAutomations(
    params: GetAutomationsParams,
  ): Promise<DiscriminatedResponse<ListAutomationsResponse>> {
    return discriminatedRequest<ListAutomationsResponse>("/api/automations", {
      method: "GET",
      params: params,
    }, this.config);
  }

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
