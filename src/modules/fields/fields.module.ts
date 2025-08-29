import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  CreateFieldParams,
  FieldsInterface,
  GetFieldsParams,
  ListFieldsResponse,
  SingleFieldResponse,
  UpdateFieldParams,
} from "./fields.types.ts";

export default class Field implements FieldsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  /**
   * @description List all fields
   *
   * @see https://developers.mailerlite.com/docs/fields.html#list-all-fields
   *
   * @params {Object} - List fields params
   */
  public get(
    params: GetFieldsParams,
  ): Promise<DiscriminatedResponse<ListFieldsResponse>> {
    return discriminatedRequest<ListFieldsResponse>(`/api/fields`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Create a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#create-a-field
   *
   * @requestBody {Object} - Field data for create
   */
  public create(
    requestBody: CreateFieldParams,
  ): Promise<DiscriminatedResponse<SingleFieldResponse>> {
    return discriminatedRequest<SingleFieldResponse>(`/api/fields`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

  /**
   * @description Update a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#update-a-field
   *
   * @field_id {String} - Field ID
   * @requestBody {Object} - Field data for update
   */
  public update(
    field_id: string,
    requestBody: UpdateFieldParams,
  ): Promise<DiscriminatedResponse<SingleFieldResponse>> {
    validateId(field_id);

    return discriminatedRequest<SingleFieldResponse>(
      `/api/fields/${field_id}`,
      {
        method: "PUT",
        body: requestBody,
      },
      this.config,
    );
  }

  /**
   * @description Delete a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#delete-a-field
   *
   * @field_id {String} - Field ID
   */
  public delete(
    field_id: string,
  ): Promise<DiscriminatedResponse<SingleFieldResponse>> {
    validateId(field_id);

    return discriminatedRequest<SingleFieldResponse>(
      `/api/fields/${field_id}`,
      {
        method: "DELETE",
      },
      this.config,
    );
  }
}
