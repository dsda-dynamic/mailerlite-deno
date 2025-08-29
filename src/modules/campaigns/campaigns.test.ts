import { expect } from "jsr:@std/expect";
import { expectTypeOf } from "expect-type";
import MailerLite from "../../index.ts";
import {
  CreateUpdateCampaignParams,
  GetCampaignsParams,
  ListCampaignsResponse,
  ScheduleCampaignParams,
  SingleCampaignResponse,
} from "./campaigns.types.ts";

import { getRandomInt } from "../../utils/helpers.ts";
import { startTalkbackServer } from "../../utils/setup-teardown-hooks.ts";

const MAILERLITE_API_KEY = Deno.env.get("API_KEY") as string;
const MAILERLITE_VERIFIED_EMAIL = Deno.env.get("VERIFIED_EMAIL") as string;
const CUSTOM_MAILERLITE_URL = Deno.env.get("CUSTOM_MAILERLITE_URL")!;

if (!MAILERLITE_API_KEY) {
  throw "No MailerLite API key found in environment variables";
}
if (!MAILERLITE_VERIFIED_EMAIL) {
  throw "No MailerLite verified email found in environment variables";
}

Deno.test("Campaigns", async (t) => {
  const mailerlite = new MailerLite({
    api_key: MAILERLITE_API_KEY,
    base_path: CUSTOM_MAILERLITE_URL,
  });

  const stopServer = await startTalkbackServer();

  let createdCampaignId: string;

  await t.step("List campaigns", async () => {
    const params: GetCampaignsParams = {
      filter: {
        status: "sent", // possible statuses: sent, draft, ready
        type: "regular", // possible types: regular, ab, resend, rss
      },
      limit: 25,
      page: 1,
    };

    const response = await mailerlite.campaigns.get(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data.data)).toBeTruthy();
      expectTypeOf(response.data).toEqualTypeOf<ListCampaignsResponse>();
    }
  });

  await t.step("Create a campaign", async () => {
    const randomInt: number = getRandomInt();
    const params: CreateUpdateCampaignParams = {
      name: `Test campaign nodejs ${randomInt}`,
      language_id: 4,
      type: "regular",
      emails: [{
        subject: "Dummy subject",
        from_name: "Dummy Testerson",
        from: MAILERLITE_VERIFIED_EMAIL,
        content:
          '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n  <meta name="format-detection" content="address=no" />\n  <meta name="format-detection" content="telephone=no" />\n  <meta name="format-detection" content="email=no" />\n  <meta name="x-apple-disable-message-reformatting" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type="text/css">\n\n  </style>\n</head>\n<body style="margin: 0; padding: 0;">\n<!-- Main table -->\n<table border="0" cellspacing="0" cellpadding="0" width="100%">\n  <tr>\n    <td style="padding: 0 40px;">\n      <!-- Child table -->\n      <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; min-width: 100%;">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href="{$unsubscribe}">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>',
      }],
    };

    const response = await mailerlite.campaigns.create(params);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
      createdCampaignId = response.data.data.id;
    }
  });

  await t.step("Fetch a campaign by ID", async () => {
    const response = await mailerlite.campaigns.find(createdCampaignId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
    }
  });

  await t.step("Update a campaign", async () => {
    const randomInt: number = getRandomInt();
    const params: CreateUpdateCampaignParams = {
      name: `Test campaign updated nodejs ${randomInt}`,
      language_id: 4,
      type: "regular",
      emails: [{
        subject: "Dummy subject updated",
        from_name: "Dummy Testerson updated",
        from: MAILERLITE_VERIFIED_EMAIL,
        content:
          '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n  <meta name="format-detection" content="address=no" />\n  <meta name="format-detection" content="telephone=no" />\n  <meta name="format-detection" content="email=no" />\n  <meta name="x-apple-disable-message-reformatting" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type="text/css">\n\n  </style>\n</head>\n<body style="margin: 0; padding: 0;">\n<!-- Main table -->\n<table border="0" cellspacing="0" cellpadding="0" width="100%">\n  <tr>\n    <td style="padding: 0 40px;">\n      <!-- Child table -->\n      <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; min-width: 100%;">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href="{$unsubscribe}">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>',
      }],
    };

    const response = await mailerlite.campaigns.update(
      createdCampaignId,
      params,
    );

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
    }
  });

  await t.step("Schedule a campaign", async () => {
    const dateObj = new Date();
    const year = dateObj.getUTCFullYear() + 1; // scheduled for the next year
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // months from 01-12
    const day = dateObj.getUTCDate();

    const params: ScheduleCampaignParams = {
      delivery: "scheduled",
      schedule: {
        date: `${year}-${month}-${day}`,
        hours: "12",
        minutes: "12",
        timezone_id: 50,
      },
    };

    const response = await mailerlite.campaigns.schedule(
      createdCampaignId,
      params,
    );

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
    }
  });

  await t.step("Cancel a ready campaign", async () => {
    const response = await mailerlite.campaigns.cancel(createdCampaignId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
      expect(response.data.data.id).not.toBeNull();
      expectTypeOf(response.data).toEqualTypeOf<SingleCampaignResponse>();
    }
  });

  await t.step("Delete a campaign", async () => {
    const response = await mailerlite.campaigns.delete(createdCampaignId);

    expect(response.success).toBeTruthy();
    if (response.success) {
      expect(response.data).toBeDefined();
    }
  });

  await stopServer();
});
