import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import {
  CreateUpdateGroupParams,
  GetGroupsParams,
  ListAllGroupsResponse,
  ListAllSubscribersResponse,
  SingleGroupResponse,
  SubscriberParams,
} from "./groups.types.ts";
import { getRandomInt } from "../../utils/helpers.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Groups", async (t) => {
  let createdGroupId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all groups", async () => {
    const params: GetGroupsParams = {
      limit: 5,
      page: 1,
      sort: "name", // name, total, open_rate, click_rate, created_at,
    };

    const response = await mailerlite.groups.get(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllGroupsResponse>();
    }
  });

  await t.step("Create a group", async () => {
    const randomInt = getRandomInt();
    const params: CreateUpdateGroupParams = {
      name: `Test group nodejs ${randomInt}`,
    };

    const response = await mailerlite.groups.create(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleGroupResponse>();
      createdGroupId = response.data.data.id;
    }
  });

  await t.step("Update a group", async () => {
    const randomInt = getRandomInt();
    const params: CreateUpdateGroupParams = {
      name: `Test group updated nodejs ${randomInt}`,
    };

    const response = await mailerlite.groups.update(createdGroupId, params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleGroupResponse>();
    }
  });

  await t.step("Get subscribers belonging to a group", async () => {
    const params: SubscriberParams = {
      filter: {
        status: "active", // active, unsubscribed, unconfirmed, bounced or junk
      },
      limit: 5,
      page: 1,
    };

    const response = await mailerlite.groups.getSubscribers(
      createdGroupId,
      params,
    );

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllSubscribersResponse>();
    }
  });

  await t.step("Delete a group", async () => {
    const response = await mailerlite.groups.delete(createdGroupId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
    }
  });

  await stopServer();
});
