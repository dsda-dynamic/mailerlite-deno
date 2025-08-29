import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import {
  CreateFieldParams,
  GetFieldsParams,
  ListFieldsResponse,
  SingleFieldResponse,
  UpdateFieldParams,
} from "./fields.types.ts";

import { getRandomInt } from "../../utils/helpers.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Fields", async (t) => {
  let createdFieldId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all fields", async () => {
    const params: GetFieldsParams = {
      limit: 5,
      page: 1,
      filter: {
        type: "text", // text, number, date
      },
      sort: "name", // name, -name, type, -type
    };

    const response = await mailerlite.fields.get(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListFieldsResponse>();
    }
  });

  await t.step("Create a field", async () => {
    const randomInt: number = getRandomInt();
    const params: CreateFieldParams = {
      name: `Test field nodejs ${randomInt}`,
      type: "text", // text, number, date
    };

    const response = await mailerlite.fields.create(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleFieldResponse>();
      createdFieldId = response.data.data.id;
    }
  });

  await t.step("Update a field", async () => {
    const randomInt: number = getRandomInt();
    const params: UpdateFieldParams = {
      name: `Test field nodejs updated ${randomInt}`,
    };

    const response = await mailerlite.fields.update(createdFieldId, params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleFieldResponse>();
    }
  });

  await t.step("Delete a field", async () => {
    const response = await mailerlite.fields.delete(createdFieldId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
    }
  });

  await stopServer();
});
