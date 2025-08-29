import { validateId } from "../../utils/helpers.ts";
import {
  discriminatedRequest,
  DiscriminatedResponse,
} from "../../utils/fetch.ts";

import type { Config } from "../../utils/types.ts";
import {
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

  /**
   * @description List all segments
   *
   * @see https://developers.mailerlite.com/docs/segments.html#list-all-segments
   *
   * @params {Object} - List segment params
   */
  public get(
    params: GetSegmentsParams,
  ): Promise<DiscriminatedResponse<ListAllSegmentsResponse>> {
    return discriminatedRequest<ListAllSegmentsResponse>(`/api/segments`, {
      method: "GET",
      params: params,
    }, this.config);
  }

  /**
   * @description Get subscribers belonging to a segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#get-subscribers-belonging-to-a-segment
   *
   * @segment_id {String} - Segment ID
   * @params {Object} - Segment params
   */
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

  /**
   * @description Update segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#update-segment
   *
   * @segment_id {String} - Segment ID
   * @requestBody {Object} - Segment data for update
   */
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

  /**
   * @description Delete segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#delete-segment
   *
   * @segment_id {String} - Form ID
   */
  public delete(segment_id: string): Promise<DiscriminatedResponse<null>> {
    validateId(segment_id);

    return discriminatedRequest<null>(`/api/segments/${segment_id}`, {
      method: "DELETE",
    }, this.config);
  }
}
