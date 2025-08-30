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

  /**
   * @description List campaigns
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#campaign-list
   *
   * @params {Object} - List campaigns params
   */
  public get(
    params: GetCampaignsParams,
  ): Promise<DiscriminatedResponse<ListCampaignsResponse>> {
    return discriminatedRequest<ListCampaignsResponse>(`/api/campaigns`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Fetch a campaign by ID
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#get-a-campaign
   *
   * @campaign_id {String} - Campaign ID
   */
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

  /**
   * @description Create a campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#create-a-campaign
   *
   * @requestBody {Object} - Campaign data for create
   */
  public create(
    requestBody: CreateUpdateCampaignParams,
  ): Promise<DiscriminatedResponse<SingleCampaignResponse>> {
    return discriminatedRequest<SingleCampaignResponse>(`/api/campaigns`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Update a campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#update-campaign
   *
   * @campaign_id {String} - Campaign ID
   * @requestBody {Object} - Campaign data for update
   */
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

  /**
   * @description Schedule a campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#schedule-a-campaign
   *
   * @campaign_id {String} - Campaign ID
   * @requestBody {Object} - Campaign data for schedule
   */
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

  /**
   * @description Cancel a ready campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#cancel-a-ready-campaign
   *
   * @campaign_id {String} - Campaign ID
   */
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

  /**
   * @description Delete a campaign
   *
   * @see https://developers.mailerlite.com/docs/campaigns.html#delete-a-campaign
   *
   * @campaign_id {String} - Campaign ID
   */
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
