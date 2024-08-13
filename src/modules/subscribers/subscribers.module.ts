import { validateId } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    GetSubscribersParams,
    CreateOrUpdateSubscriberParams,
    SubscriberInterface,
    ListSubscribersResponse,
    SingleSubscriberResponse,
    CountSubscribersResponse,
    ForgetSubscriberResponse,
    UpdateSubscriberParams
} from './subscribers.types.js';

export default class Subscriber implements SubscriberInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List Subscribers
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers
     *
     * @params {Object} - List Subscribers params
     */
    public get(params: GetSubscribersParams): Promise<AxiosResponse<ListSubscribersResponse>> {
        return request(`/api/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Create or update a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber
     *
     * @requestBody {Object} - Subscriber data for create or update
     */
    public createOrUpdate(requestBody: CreateOrUpdateSubscriberParams): Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateSubscriberParams>> {
        return request(`/api/subscribers`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#update-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     * @requestBody {Object} - Subscriber data for update
     */
    public update(subscriber_id: string, requestBody: UpdateSubscriberParams): Promise<AxiosResponse<SingleSubscriberResponse, UpdateSubscriberParams>> {
        validateId(subscriber_id);

        return request(`/api/subscribers/${subscriber_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Fetch a subscriber by ID
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public find(subscriber_id: string): Promise<AxiosResponse<SingleSubscriberResponse>> {

        validateId(subscriber_id);

        return request(`/api/subscribers/${subscriber_id}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Fetch total subscribers count
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#fetch-total-subscribers-count
     */
    public getCount(): Promise<AxiosResponse<CountSubscribersResponse>> {
        const params = {
            limit: 0
        }

        return request(`/api/subscribers`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Delete a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#delete-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public delete(subscriber_id: string): Promise<AxiosResponse<null>> {
        validateId(subscriber_id);

        return request(`/api/subscribers/${subscriber_id}`, {
            method: "DELETE"
        }, this.config);
    }

    /**
     * @description Forget a subscriber
     *
     * @see https://developers.mailerlite.com/docs/subscribers.html#forget-a-subscriber
     *
     * @subscriber_id {String} - Subscriber ID
     */
    public forget(subscriber_id: string): Promise<AxiosResponse<ForgetSubscriberResponse>> {
        validateId(subscriber_id);
        return request(`/api/subscribers/${subscriber_id}/forget`, {
            method: "POST"
        }, this.config);
    }
};
