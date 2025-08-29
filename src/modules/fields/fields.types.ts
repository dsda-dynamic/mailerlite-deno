import { DiscriminatedResponse } from "../../utils/fetch.ts";
import { Links, Meta } from "../../utils/types.ts";

export interface FieldsInterface {
  get: (
    params: GetFieldsParams,
  ) => Promise<DiscriminatedResponse<ListFieldsResponse>>;
  create: (
    params: CreateFieldParams,
  ) => Promise<DiscriminatedResponse<SingleFieldResponse>>;
  update: (
    field_id: string,
    params: UpdateFieldParams,
  ) => Promise<DiscriminatedResponse<SingleFieldResponse>>;
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
