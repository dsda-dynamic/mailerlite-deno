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

  /**
   * @description List all automations
   *
   * @see https://developers.mailerlite.com/docs/automations.html#list-all-automations
   *
   * @params {Object} - List automations params
   */
  public get(
    params: GetAutomationsParams,
  ): Promise<DiscriminatedResponse<ListAutomationsResponse>> {
    return discriminatedRequest<ListAutomationsResponse>("/api/automations", {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Get an automation
   *
   * @see https://developers.mailerlite.com/docs/automations.html#get-an-automation
   *
   * @automation_id {String} - Automation ID
   */
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
