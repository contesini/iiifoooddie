import { Event } from "@ifood/types/polling";
import axios, { AxiosInstance } from "axios";
import { IfoodGetOrderError, IfoodPollingError } from "../../errors";

import { Order } from "../../types/order";
import { handleResponse, splitter } from "../../utils";
import { IfoodModule } from "../module";

const ORDER_GET_PATH = (id: string) => `/order/v1.0/orders/${id}`;
const CONFIRM_ORDER_POST_PATH = (id: string) => `${ORDER_GET_PATH(id)}/confirm`;
const START_PREP_POST_PATH = (id: string) =>
  `${ORDER_GET_PATH(id)}/startPreparation`;
const READY_PICKUP_POST_PATH = (id: string) =>
  `${ORDER_GET_PATH(id)}/readyToPickup`;
const DISPATCH_POST_PATH = (id: string) => `${ORDER_GET_PATH(id)}/dispatch`;
const REQUEST_CANCELLATION_POST_PATH = (id: string) =>
  `${ORDER_GET_PATH(id)}/requestCancellation`;
const ACCEPT_CANCELATION_POST_PATH = (id: string) =>
  `${ORDER_GET_PATH(id)}/acceptCancellation`;
const DENY_CANCELATION_POST_PATH = (id: string) =>
  `${ORDER_GET_PATH(id)}/denyCancellation`;

const POLLING_GET_PATH = "/order/v1.0/events:polling";
const ACK_POST_PATH = "/order/v1.0/events/acknowledgment";

const POLLING_MAX_STORE_IDS = 100;
const ACK_MAX_EVENTS = 2000;
export class IfoodOrderModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-order");
  }

  public async polling(storeIds?: string[]): Promise<Event[]> {
    try {
      let events: Event[] = [];
      let requests: string[][] = [];
      if (!storeIds) {
        const response = await this.client.get(POLLING_GET_PATH);
        if (response.status === 200) {
          events = events.concat(handleResponse<Event[]>(response));
        }
      } else {
        requests = splitter(storeIds, POLLING_MAX_STORE_IDS);
        const promises = [];
        for (const storeIdsChunk of requests) {
          let headers: Record<string, string | number | boolean> = {
            "x-polling-merchants": storeIdsChunk.join(","),
          };
          promises.push(
            this.client.get(POLLING_GET_PATH, {
              headers,
            })
          );
        }
        const responses = await Promise.all(promises);
        const e = responses.flatMap((response) => {
          if (response.status === 204) return [];
          return handleResponse<Event>(response);
        });
        events = events.concat(e);
      }
      return events;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`${error.code} - ${error.message}`);
      } else {
        this.logger.error(error);
      }
    }
    throw new IfoodPollingError(`Get error when trying to execute polling`);
  }

  public async ack(events: Event[]): Promise<boolean> {
    try {
      if (events.length == 0) return true;

      const eventIds = splitter(
        events.map((event) => {
          return { id: event.id };
        }),
        ACK_MAX_EVENTS
      );

      const promises = [];
      for (const eventIdsChunk of eventIds) {
        promises.push(this.client.post(ACK_POST_PATH, eventIdsChunk));
      }

      const responses = await Promise.all(promises);

      return responses
        .map((r) => r.status === 202)
        .reduce((prev, curr) => prev && curr);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`${error.code} - ${error.message}`);
      } else {
        this.logger.error(error);
      }
    }
    throw new IfoodPollingError(`Get error when trying to execute polling`);
  }

  public async getOrderById(id: string): Promise<Order> {
    this.logger.debug(`getOrderById id: ${id}`);
    try {
      const response = await this.client.get(ORDER_GET_PATH(id), {
        params: {
          id,
        },
      });
      return handleResponse<Order>(response);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetOrderError(`Get error when trying to get order ${id}`);
  }

  public async confirmOrder(id: string): Promise<boolean> {
    return await this.executePostRequest(CONFIRM_ORDER_POST_PATH(id));
  }

  public async startPreparation(id: string): Promise<boolean> {
    return await this.executePostRequest(START_PREP_POST_PATH(id));
  }

  public async readyToPickup(id: string): Promise<boolean> {
    return await this.executePostRequest(READY_PICKUP_POST_PATH(id));
  }

  public async dispatchOrder(id: string): Promise<boolean> {
    return await this.executePostRequest(DISPATCH_POST_PATH(id));
  }

  // public async requestCancellation(id: string): Promise<boolean> {
  //   // TODO: implement
  // }

  public async acceptCancellation(id: string): Promise<boolean> {
    return await this.executePostRequest(ACCEPT_CANCELATION_POST_PATH(id));
  }
  public async denyCancellation(id: string): Promise<boolean> {
    return await this.executePostRequest(DENY_CANCELATION_POST_PATH(id));
  }

  private async executePostRequest(path: string): Promise<boolean> {
    this.logger.debug(`executePostRequest path: ${path}`);
    try {
      const response = await this.client.post(path);
      return response.status === 202;
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetOrderError(`Get error when trying to execute ${path}`);
  }
}
