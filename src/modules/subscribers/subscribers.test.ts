import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";

import MailerLite from "../../index.ts";
import { getRandomInt } from "../../utils/helpers.ts";
import type {
  CountSubscribersResponse,
  CreateOrUpdateSubscriberParams,
  GetSubscribersParams,
  ListSubscribersResponse,
  SingleSubscriberResponse,
  UpdateSubscriberParams,
} from "./subscribers.types.ts";
import { startTalkbackServer as startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY");
if (!MAILERLITE_API_KEY) {
  throw new Error("No MailerLite API key found in environment variables");
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Subscribers", async (t) => {
  let createdSubscriberId: string;

  const stopServer = startTalkbackServer();
  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  await t.step("List Subscribers", async () => {
    const params: GetSubscribersParams = {
      filter: {
        status: "active", // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
      },
      limit: 5,
    };

    const response = await mailerlite.subscribers.get(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListSubscribersResponse>();
    }
  });

  await t.step("Create or update a subscriber", async () => {
    const randomInt = getRandomInt();

    const params: CreateOrUpdateSubscriberParams = {
      email: `test${randomInt}@nodejs.com`,
      fields: {
        name: `Test name ${randomInt}`,
        last_name: `Test lastname ${randomInt}`,
        company: `test company ${randomInt}`,
        country: `test country ${randomInt}`,
        city: `test city ${randomInt}`,
      },
      status: "active",
      subscribed_at: "2022-11-23 09:59:56",
    };

    const response = await mailerlite.subscribers.createOrUpdate(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>();
      createdSubscriberId = response.data.data.id;
    }
  });

  await t.step("Update a subscriber", async () => {
    const randomInt = getRandomInt();

    const params: UpdateSubscriberParams = {
      fields: {
        name: `Test name ${randomInt}`,
        last_name: `Test lastname ${randomInt}`,
        company: `test company ${randomInt}`,
        country: `test country ${randomInt}`,
        city: `test city ${randomInt}`,
        email: `test${randomInt}@nodejs.com`,
      },
      status: "active",
      subscribed_at: "2022-11-23 09:59:56",
    };

    const response = await mailerlite.subscribers.update(
      createdSubscriberId,
      params,
    );

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>();
    }
  });

  await t.step("Fetch a subscriber by ID", async () => {
    const response = await mailerlite.subscribers.find(createdSubscriberId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleSubscriberResponse>();
    }
  });

  await t.step("Fetch total subscribers count", async () => {
    const response = await mailerlite.subscribers.getCount();

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expectTypeOf(response.data).toEqualTypeOf<CountSubscribersResponse>();
    }
  });

  // Forget endpoint test skipped. If sub is forgotten, it can't be deleted
  await t.step("Delete a subscriber", async () => {
    const response = await mailerlite.subscribers.delete(createdSubscriberId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeNull();
    }
  });

  await stopServer();
});
