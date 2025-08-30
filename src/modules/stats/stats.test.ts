import { expectTypeOf } from "expect-type";
import { expect } from "jsr:@std/expect";
import MailerLite from "../../index.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";
import type {
  AutomationSubsParams,
  AutomationSubsResponse,
  GetAutomationsParams,
  ListAutomationsResponse,
} from "../automations/automations.types.ts";
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
  CampaignSubscribersActivityParams,
  CampaignSubscribersActivityResponse,
  FormsSubscribersParams,
} from "./stats.types.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Stats", async (t) => {
  let campaignId: string;
  let formId: string;
  let automationId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  //Campaigns
  await t.step("Get a list of sent campaigns", async () => {
    const params: GetCampaignsParams = {
      filter: {
        status: "sent",
        type: "regular",
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.stats.getSentCampaigns(params);

    expect(response).not.toBeNull();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBeTruthy();
    expectTypeOf(response).toEqualTypeOf<ListCampaignsResponse>();

    if (response.data.length) campaignId = response.data[0].id;
  });

  await t.step("Get stats for a sent campaign", async () => {
    if (!campaignId) {
      throw "No campaign found. Wrong test setup.";
    }
    const response = await mailerlite.stats.getSentCampaignStats(campaignId);

    expect(response).not.toBeNull();
    expect(response).toBeDefined();
    expectTypeOf(response).toEqualTypeOf<
      CampaignStats
    >();
  });

  await t.step("Get subscribers of sent campaign", async () => {
    if (!campaignId) {
      throw "No campaign found. Wrong test setup.";
    }
    const params: CampaignSubscribersActivityParams = {
      filter: {
        // type: "opened",  // "opened" | "unopened" | "clicked" | "unsubscribed" | "forwarded" | "hardbounced" | "softbounced" | "junk"
        // search: "",
      },
      limit: 10, // 10 | 25 | 50 | 100;
      sort: "id", // "id" | "updated_at" | "clicks_count" | "opens_count";
      page: 1,
    };

    const response = await mailerlite.stats.getSentCampaignSubscribers(
      campaignId,
      params,
    );

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<
        CampaignSubscribersActivityResponse
      >();
    }
  });

  //Forms
  await t.step("Get a list of forms by type", async () => {
    const formType: FormTypes = "popup";
    const params: GetFormsParams = {
      limit: 25,
      page: 1,
      filter: {
        name: "nodejs",
      },
      sort: "created_at",
    };

    const response = await mailerlite.stats.getFormsByType(formType, params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListFormsResponse>();

      if (response.data.data.length) formId = response.data.data[0].id;
    }
  });

  await t.step("Get a stats (count) of a form by type", async () => {
    const formType: FormTypes = "popup";
    const response = await mailerlite.stats.getFormsCountByType(formType);

    expect(response).not.toBeNull();
    expect(response).toBeDefined();
    expectTypeOf(response).toEqualTypeOf<number>();
  });

  await t.step("Get subscribers of a form", async () => {
    const params: FormsSubscribersParams = {
      filter: {
        status: "active", // "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.stats.getFormSubscribers(
      formId,
      params,
    );

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListSubscribersResponse>();
    }
  });

  //Automations
  await t.step("List all automations", async () => {
    const params: GetAutomationsParams = {
      filter: {
        enabled: true,
        name: "nodejs",
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.stats.getAutomations(params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAutomationsResponse>();

      if (response.data.data.length) automationId = response.data.data[0].id;
    }
  });

  await t.step("Get stats for a specific automation", async () => {
    if (!automationId) {
      throw "No automation found. Wrong test setup.";
    }

    const response = await mailerlite.stats.getAutomationStats(automationId);

    expect(response).not.toBeNull();
    expect(response).toBeDefined();
  });

  await t.step("Get the subscriber activity for an automation", async () => {
    if (!automationId) {
      throw "No automation found. Wrong test setup";
    }
    const params: AutomationSubsParams = {
      filter: {
        status: "active",
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.stats.getAutomationSubscribers(
      automationId,
      params,
    );

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<AutomationSubsResponse>();
    }
  });

  await stopServer();
});
