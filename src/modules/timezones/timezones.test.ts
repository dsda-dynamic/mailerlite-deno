import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import { ListAllTimezonesResponse } from "./timezones.types.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Timezones", async (t) => {
  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all timezones", async () => {
    const response = await mailerlite.timezones.get();

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllTimezonesResponse>();
    }
  });

  await stopServer();
});
