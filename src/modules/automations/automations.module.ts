import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";
import { validateId } from "../../utils/helpers.ts";

import type { Config } from "../../utils/types.ts";
import type {
  AutomationsInterface,
  AutomationSubsParams,
  AutomationSubsResponse,
  GetAutomationsParams,
  ListAutomationsResponse,
  SingleAutomationResponse,
} from "./automations.types.ts";

export default class Automation implements AutomationsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(
    params: GetAutomationsParams,
  ): Promise<DiscriminatedResponse<ListAutomationsResponse>> {
    return discriminatedRequest<ListAutomationsResponse>("/api/automations", {
      method: "GET",
      params: params,
    }, this.config);
  }

  public find(
    automation_id: string,
  ): Promise<DiscriminatedResponse<SingleAutomationResponse>> {
    validateId(automation_id);

    return discriminatedRequest<SingleAutomationResponse>(
      `/api/automations/${automation_id}`,
      {
        method: "GET",
      },
      this.config,
    );
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
