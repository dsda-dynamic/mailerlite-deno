import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import { BatchParams, BatchResponses } from "./batches.types.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY");
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}

Deno.test("Batches", async (t) => {
  const stopServer = await startTalkbackServer();

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  await t.step("Make multiple request to api in a single call", async () => {
    const params: BatchParams = {
      requests: [
        {
          method: "POST",
          path: "api/fields",
          body: {
            name: "test batch field 1",
            type: "text",
          },
        },
        {
          method: "POST",
          path: "api/fields",
          body: {
            name: "test batch field 2",
            type: "text",
          },
        },
        {
          method: "GET",
          path: "/api/forms/popup",
          body: {
            filter: {
              name: "nodejs",
            },
          },
        },
      ],
    };

    const response = await mailerlite.batches.send(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expectTypeOf(response.data).toEqualTypeOf<BatchResponses>();
    }
  });
  await stopServer();
});
