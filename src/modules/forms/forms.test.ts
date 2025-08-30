import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import type {
  FormTypes,
  GetFormsParams,
  ListFormsResponse,
  SingleFormResponse,
} from "./forms.types.ts";
import { getRandomInt } from "../../utils/helpers.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Forms", async (t) => {
  let formId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all forms", async () => {
    const formType: FormTypes = "popup";
    const params: GetFormsParams = {
      limit: 25,
      page: 1,
      filter: {
        name: "nodejs",
      },
      sort: "created_at",
    };

    const response = await mailerlite.forms.get(formType, params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListFormsResponse>();

      if (response.data.data.length) formId = response.data.data[0].id;
    }
  });

  await t.step("Update a form", async () => {
    if (!formId) {
      throw 'No forms found with name "nodejs"';
    }

    const randomInt = getRandomInt();
    const params = {
      name: `[Do not delete] nodejs popup ${randomInt}`,
    };

    const response = await mailerlite.forms.update(formId, params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleFormResponse>();
    }
  });

  await stopServer();
});
