import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
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

  public get(
    params: GetFieldsParams,
  ): Promise<DiscriminatedResponse<ListFieldsResponse>> {
    return discriminatedRequest<ListFieldsResponse>(`/api/fields`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  public create(
    requestBody: CreateFieldParams,
  ): Promise<DiscriminatedResponse<SingleFieldResponse>> {
    return discriminatedRequest<SingleFieldResponse>(`/api/fields`, {
      method: "POST",
      body: requestBody,
    }, this.config);
  }

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
