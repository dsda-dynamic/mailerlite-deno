import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  type DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import type {
  GetSegmentsParams,
  GetSegmentSubscribersParams,
  ListAllSegmentsResponse,
  ListAllSubscribers,
  SegmentsInterface,
  SingleSegmentResponse,
  UpdateSegmentParams,
} from "./segments.types.ts";

export default class Segment implements SegmentsInterface {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public get(
    params: GetSegmentsParams,
  ): Promise<DiscriminatedResponse<ListAllSegmentsResponse>> {
    return discriminatedRequest<ListAllSegmentsResponse>(`/api/segments`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  public getSubscribers(
    segment_id: string,
    params: GetSegmentSubscribersParams,
  ): Promise<DiscriminatedResponse<ListAllSubscribers>> {
    validateId(segment_id);

    return discriminatedRequest<ListAllSubscribers>(
      `/api/segments/${segment_id}/subscribers`,
      {
        method: "GET",
        params: params,
      },
      this.config,
    );
  }

  public update(
    segment_id: string,
    requestBody: UpdateSegmentParams,
  ): Promise<DiscriminatedResponse<SingleSegmentResponse>> {
    validateId(segment_id);

    return discriminatedRequest<SingleSegmentResponse>(
      `/api/segments/${segment_id}`,
      {
        method: "PUT",
        body: requestBody,
      },
      this.config,
    );
  }

  public delete(segment_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(segment_id);

    return discriminatedRequest<null>(`/api/segments/${segment_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
