import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CampaignsInterface,
  CreateUpdateCampaignParams,
  GetCampaignsParams,
  ListCampaignsResponse,
  ScheduleCampaignParams,
  SingleCampaignResponse,
} from "./campaigns.types.ts";

export default class Campaign implements CampaignsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(
    params: GetCampaignsParams,
  ): Promise<DiscriminatedResponse<ListCampaignsResponse>> {
    return discriminatedRequest<ListCampaignsResponse>(`/api/campaigns`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  public find(
    campaign_id: string,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<SingleCampaignResponse>(
      `/api/campaigns/${campaign_id}`,
      {
        method: "GET",
      },
      this.config,
    );
  }

  public create(
    requestBody: CreateUpdateCampaignParams,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    return discriminatedRequest<SingleCampaignResponse>(`/api/campaigns`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  public update(
    campaign_id: string,
    requestBody: CreateUpdateCampaignParams,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<SingleCampaignResponse>(
      `/api/campaigns/${campaign_id}`,
      {
        method: "PUT",
        body: requestBody,
      },
      this.config,
    );
  }

  public schedule(
    campaign_id: string,
    requestBody: ScheduleCampaignParams,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<SingleCampaignResponse>(
      `/api/campaigns/${campaign_id}/schedule`,
      {
        method: "POST",
        body: requestBody,
      },
      this.config,
    );
  }

  public cancel(
    campaign_id: string,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<SingleCampaignResponse>(
      `/api/campaigns/${campaign_id}/cancel`,
      {
        method: "POST",
      },
      this.config,
    );
  }

  public delete(
    campaign_id: string,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    validateId(campaign_id);

    return discriminatedRequest<SingleCampaignResponse>(
      `/api/campaigns/${campaign_id}`,
      {
        method: "DELETE",
      },
      this.config,
    );
  }
}
