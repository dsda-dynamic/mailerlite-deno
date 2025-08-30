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

  public get(
    type: FormTypes,
    params: GetFormsParams,
  ): Promise<DiscriminatedResponse<ListFormsResponse>> {
    return discriminatedRequest<ListFormsResponse>(`/api/forms/${type}`, {
      method: "GET",
      params: params,
    }, this.config);
  }

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

  public delete(form_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(form_id);

    return discriminatedRequest<null>(`/api/forms/${form_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
