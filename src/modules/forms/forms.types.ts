import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta } from "../../utils/types.ts";

export interface FormsInterface {
  /**
   * @description List all forms
   *
   * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
   *
   * @type {String} - Form type
   * @params {Object} - List forms params
   */
  get: (
    type: FormTypes,
    params: GetFormsParams,
  ) => Promise<DiscriminatedResponse<ListFormsResponse>>;
  /**
   * @description Update a form
   *
   * @see https://developers.mailerlite.com/docs/forms.html#update-a-form
   *
   * @form_id {String} - Form ID
   * @requestBody {Object} - Form data for update
   */
  update: (
    form_id: string,
    params: UpdateFormParams,
  ) => Promise<DiscriminatedResponse<SingleFormResponse>>;
  /**
   * @description Delete a form
   *
   * @see https://developers.mailerlite.com/docs/forms.html#delete-a-form
   *
   * @form_id {String} - Form ID
   */
  delete: (form_id: string) => Promise<DiscriminatedResponse<null>>;
}

export type FormTypes = "popup" | "embedded" | "promotion";

export interface GetFormsParams {
  limit?: number;
  page?: number;
  filter?: {
    name?: string;
  };
  sort?:
    | "created_at"
    | "-created_at"
    | "name"
    | "-name"
    | "conversions_count"
    | "-conversions_count"
    | "opens_count"
    | "-opens_count"
    | "visitors"
    | "-visitors"
    | "conversion_rate"
    | "-conversion_rate"
    | "last_registration_at"
    | "-last_registration_at";
}

export interface ListFormsResponse {
  data: Array<FormObject>;
  links: Links;
  meta: FormsMeta;
}

export interface SingleFormResponse {
  data: FormObject;
}

export interface UpdateFormParams {
  name: string;
}

export interface FormObject {
  id: string;
  type: string;
  slug: string;
  name: string;
  created_at: string;
  conversions_count: number;
  opens_count: number;
  conversion_rate: {
    float: number;
    string: string;
  };
  settings: Array<string>;
  last_registration_at: string;
  active: boolean;
  is_broken: boolean;
  has_content: boolean;
  can: {
    update: boolean;
  };
  used_in_automations: boolean;
  warnings: Array<string>;
  double_optin: string;
  screenshot_url: string;
}

export interface FormsMeta extends Meta {
  aggregations: {
    popup: number;
    embedded: number;
    promotion: number;
  };
}
