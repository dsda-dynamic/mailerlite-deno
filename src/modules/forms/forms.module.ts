import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  FormsInterface,
  FormTypes,
  GetFormsParams,
  ListFormsResponse,
  SingleFormResponse,
  UpdateFormParams,
} from "./forms.types.ts";

export default class Form implements FormsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description List all forms
   *
   * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
   *
   * @type {String} - Form type
   * @params {Object} - List forms params
   */
  public get(
    type: FormTypes,
    params: GetFormsParams,
  ): Promise<DiscriminatedResponse<ListFormsResponse>> {
    return discriminatedRequest<ListFormsResponse>(`/api/forms/${type}`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Update a form
   *
   * @see https://developers.mailerlite.com/docs/forms.html#update-a-form
   *
   * @form_id {String} - Form ID
   * @requestBody {Object} - Form data for update
   */
  public update(
    form_id: string,
    requestBody: UpdateFormParams,
  ): Promise<DiscriminatedResponse<SingleFormResponse>> {
    validateId(form_id);

    return discriminatedRequest<SingleFormResponse>(`/api/forms/${form_id}`, {
      method: "PUT",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Delete a form
   *
   * @see https://developers.mailerlite.com/docs/forms.html#delete-a-form
   *
   * @form_id {String} - Form ID
   */
  public delete(form_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(form_id);

    return discriminatedRequest<null>(`/api/forms/${form_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
