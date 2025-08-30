import { expectTypeOf } from "expect-type";
import { expect } from "jsr:@std/expect";
import MailerLite from "../../index.ts";
import { getRandomInt } from "../../utils/helpers.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";
import type {
  CreateWebhookParams,
  ListAllWebhooksResponse,
  SingleWebhookResponse,
  UpdateWebhookParams,
} from "./webhooks.types.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Webhooks", async (t) => {
  let createdWebhookId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all webhooks", async () => {
    const response = await mailerlite.webhooks.get();

    expect(response.success);
    if (response.success) {
      expect(response).not.toBeNull();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllWebhooksResponse>();
    }
  });

  await t.step("Create a webhook", async () => {
    const randomInt = getRandomInt();

    const params: CreateWebhookParams = {
      name: `Test webhook nodejs ${randomInt}`,
      events: ["subscriber.updated"],
      url:
        "http://www.marvin.com/omnis-accusamus-est-rem-delectus-quaerat.html",
    };

    const response = await mailerlite.webhooks.create(params);

    expect(response.success);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>();

      createdWebhookId = response.data.data.id;
    }
  });

  await t.step("Get a webhook", async () => {
    const response = await mailerlite.webhooks.find(createdWebhookId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expect(typeof response.data.data.id).toBe("string");
      expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>();
    }
  });

  await t.step("Update a webhook", async () => {
    const randomInt = getRandomInt();

    const params: UpdateWebhookParams = {
      name: `Test webhook nodejs updated ${randomInt}`,
      enabled: false,
    };

    const response = await mailerlite.webhooks.update(
      createdWebhookId,
      params,
    );

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response).not.toBeNull();
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleWebhookResponse>();
    }
  });

  await t.step("Delete a webhook", async () => {
    const response = await mailerlite.webhooks.delete(createdWebhookId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeNull();
    }
  });

  await stopServer();
});
