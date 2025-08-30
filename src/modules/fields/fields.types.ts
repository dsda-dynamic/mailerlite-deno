import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta } from "../../utils/types.ts";

export interface FieldsInterface {
  /**
   * @description List all fields
   *
   * @see https://developers.mailerlite.com/docs/fields.html#list-all-fields
   *
   * @params {Object} - List fields params
   */
  get: (
    params: GetFieldsParams,
  ) => Promise<DiscriminatedResponse<ListFieldsResponse>>;
  /**
   * @description Create a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#create-a-field
   *
   * @requestBody {Object} - Field data for create
   */
  create: (
    params: CreateFieldParams,
  ) => Promise<DiscriminatedResponse<SingleFieldResponse>>;
  /**
   * @description Update a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#update-a-field
   *
   * @field_id {String} - Field ID
   * @requestBody {Object} - Field data for update
   */
  update: (
    field_id: string,
    params: UpdateFieldParams,
  ) => Promise<DiscriminatedResponse<SingleFieldResponse>>;
  /**
   * @description Delete a field
   *
   * @see https://developers.mailerlite.com/docs/fields.html#delete-a-field
   *
   * @field_id {String} - Field ID
   */
  delete: (
    field_id: string,
  ) => Promise<DiscriminatedResponse<SingleFieldResponse>>;
}

export type FilterTypes = "text" | "number" | "date";

export interface GetFieldsParams {
  limit?: number;
  page?: number;
  filter?: {
    keyword?: string;
    type?: FilterTypes;
  };
  sort?: "name" | "-name" | "type" | "-type";
}

export interface ListFieldsResponse {
  data: Array<FieldObject>;
  links: Links;
  meta: Meta;
}

export interface SingleFieldResponse {
  data: FieldObject;
}

export interface CreateFieldParams {
  name: string;
  type: string;
}

export interface UpdateFieldParams {
  name: string;
}

export interface FieldObject {
  id: string;
  name: string;
  key: string;
  type: string;
}
