import type { DiscriminatedResponse } from "../../utils/fetch.ts";
import type { Links, Meta, SubscriberObject } from "../../utils/types.ts";

export interface SegmentsInterface {
  /**
   * @description List all segments
   *
   * @see https://developers.mailerlite.com/docs/segments.html#list-all-segments
   *
   * @params {Object} - List segment params
   */
  get: (
    params: GetSegmentsParams,
  ) => Promise<DiscriminatedResponse<ListAllSegmentsResponse>>;
  /**
   * @description Get subscribers belonging to a segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#get-subscribers-belonging-to-a-segment
   *
   * @segment_id {String} - Segment ID
   * @params {Object} - Segment params
   */
  getSubscribers: (
    segment_id: string,
    params: GetSegmentSubscribersParams,
  ) => Promise<DiscriminatedResponse<ListAllSubscribers>>;
  /**
   * @description Update segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#update-segment
   *
   * @segment_id {String} - Segment ID
   * @requestBody {Object} - Segment data for update
   */
  update: (
    segment_id: string,
    params: UpdateSegmentParams,
  ) => Promise<DiscriminatedResponse<SingleSegmentResponse>>;
  /**
   * @description Delete segment
   *
   * @see https://developers.mailerlite.com/docs/segments.html#delete-segment
   *
   * @segment_id {String} - Form ID
   */
  delete: (segment_id: string) => Promise<DiscriminatedResponse<null>>;
}

export interface GetSegmentsParams {
  limit?: number;
  page?: number;
}

export interface GetSegmentSubscribersParams {
  filter?: {
    status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
  };
  limit?: number;
  after?: number;
  cursor?: string;
}

export interface ListAllSegmentsResponse {
  data: Array<SegmentObject>;
  links: Links;
  meta: Meta;
}

export interface ListAllSubscribers {
  data: Array<SubscriberObject>;
  meta: {
    total: number;
    count: number;
    last: number;
  };
}

export interface SingleSegmentResponse {
  data: SegmentObject;
}

export interface UpdateSegmentParams {
  name: string;
}

export interface SegmentObject {
  id: string;
  name: string;
  total: number;
  open_rate: {
    float: number;
    string: string;
  };
  click_rate: {
    float: number;
    string: string;
  };
  created_at: string;
}
