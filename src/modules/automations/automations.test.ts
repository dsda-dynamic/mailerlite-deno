import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import type {
  AutomationSubsParams,
  AutomationSubsResponse,
  GetAutomationsParams,
  ListAutomationsResponse,
  SingleAutomationResponse,
} from "./automations.types.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}

const mailerlite = new MailerLite({
  api_key: MAILERLITE_API_KEY,
  base_path: CUSTOM_MAILERLITE_URL,
});

Deno.test("Automations", async (t) => {
  const stopServer = await startTalkbackServer();
  let automationId: string;

  await t.step("List all automations", async () => {
    const params: GetAutomationsParams = {
      filter: {
        enabled: true,
        name: "nodejs",
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.automations.get(params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAutomationsResponse>();

      if (response.data.data.length) automationId = response.data.data[0].id;
    }
  });

  await t.step("Get an automation", async () => {
    if (!automationId) {
      throw "No automation found. Wrong test setup.";
    }
    const response = await mailerlite.automations.find(automationId);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleAutomationResponse>();
    }
  });

  await t.step("Get the subscriber activity for an automation", async () => {
    if (!automationId) {
      throw "No automation found. Wrong test setup.";
    }
    const params: AutomationSubsParams = {
      filter: {
        status: "active",
      },
      limit: 10,
      page: 1,
    };

    const response = await mailerlite.automations.getAutomationSubscribers(
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
