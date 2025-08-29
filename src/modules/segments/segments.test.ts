import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import {
  GetSegmentsParams,
  GetSegmentSubscribersParams,
  ListAllSegmentsResponse,
  ListAllSubscribers,
} from "./segments.types.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

Deno.test("Segments", async (t) => {
  let segmentId: string;

  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  await t.step("List all segments", async () => {
    const params: GetSegmentsParams = {
      limit: 25,
      page: 1,
    };

    const response = await mailerlite.segments.get(params);

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllSegmentsResponse>();

      if (response.data.data.length) segmentId = response.data.data[0].id;
    }
  });

  await t.step("Get subscribers belonging to a segment", async () => {
    if (!segmentId) {
      throw "No segments found. Wrong test setup.";
    }

    const params: GetSegmentSubscribersParams = {
      filter: {
        status: "active",
      },
      limit: 3,
    };

    const response = await mailerlite.segments.getSubscribers(
      segmentId,
      params,
    );

    expect(response.success).toBe(true);
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListAllSubscribers>();
    }
  });

  await stopServer();
});
