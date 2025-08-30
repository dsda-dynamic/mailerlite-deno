import type { Config } from "./utils/types.ts";

import Subscriber from "./modules/subscribers/subscribers.module.ts";
import type { SubscriberInterface } from "./modules/subscribers/subscribers.types.ts";

import Campaign from "./modules/campaigns/campaigns.module.ts";
import type { CampaignsInterface } from "./modules/campaigns/campaigns.types.ts";

import Form from "./modules/forms/forms.module.ts";
import type { FormsInterface } from "./modules/forms/forms.types.ts";

import Group from "./modules/groups/groups.module.ts";
import type { GroupsInterface } from "./modules/groups/groups.types.ts";

import Segment from "./modules/segments/segments.module.ts";
import type { SegmentsInterface } from "./modules/segments/segments.types.ts";

import Field from "./modules/fields/fields.module.ts";
import type { FieldsInterface } from "./modules/fields/fields.types.ts";

import Automation from "./modules/automations/automations.module.ts";
import type { AutomationsInterface } from "./modules/automations/automations.types.ts";

import Timezone from "./modules/timezones/timezones.module.ts";
import type { TimezonesInterface } from "./modules/timezones/timezones.types.ts";

import Language from "./modules/languages/languages.module.ts";
import type { LanguagesInterface } from "./modules/languages/languages.types.ts";

import Batch from "./modules/batches/batches.module.ts";
import type { BatchesInterface } from "./modules/batches/batches.types.ts";

import Webhook from "./modules/webhooks/webhooks.module.ts";
import type { WebhooksInterface } from "./modules/webhooks/webhooks.types.ts";

import Statistics from "./modules/stats/stats.module.ts";
import type { StatsInterface } from "./modules/stats/stats.types.ts";

export default class MailerLite {
  private config: Config;
  public subscribers: SubscriberInterface;
  public campaigns: CampaignsInterface;
  public forms: FormsInterface;
  public groups: GroupsInterface;
  public segments: SegmentsInterface;
  public fields: FieldsInterface;
  public automations: AutomationsInterface;
  public timezones: TimezonesInterface;
  public languages: LanguagesInterface;
  public batches: BatchesInterface;
  public webhooks: WebhooksInterface;
  public stats: StatsInterface;

  constructor(params: { api_key: string; base_path?: string }) {
    this.config = {
      api_key: params.api_key,
      basePath: params.base_path || "https://connect.mailerlite.com",
    };

    this.subscribers = new Subscriber(this.config);
    this.campaigns = new Campaign(this.config);
    this.forms = new Form(this.config);
    this.groups = new Group(this.config);
    this.segments = new Segment(this.config);
    this.fields = new Field(this.config);
    this.automations = new Automation(this.config);
    this.timezones = new Timezone(this.config);
    this.languages = new Language(this.config);
    this.batches = new Batch(this.config);
    this.webhooks = new Webhook(this.config);
    this.stats = new Statistics(this.config);
  }
}

export * from "./modules/subscribers/subscribers.types.ts";
export * from "./modules/campaigns/campaigns.types.ts";
export * from "./modules/forms/forms.types.ts";
export * from "./modules/groups/groups.types.ts";
export * from "./modules/segments/segments.types.ts";
export * from "./modules/fields/fields.types.ts";
export * from "./modules/automations/automations.types.ts";
export * from "./modules/timezones/timezones.types.ts";
export * from "./modules/languages/languages.types.ts";
export * from "./modules/batches/batches.types.ts";
export * from "./modules/webhooks/webhooks.types.ts";
export * from "./modules/stats/stats.types.ts";
export * from "./utils/types.ts";
