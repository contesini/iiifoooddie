import { Event } from "@ifood/types/polling";
import axios, { AxiosInstance } from "axios";
import { IfoodGetOrderError, IfoodPollingError } from "../../errors";

import { Order } from "../../types/order";
import { handleResponse } from "../../utils";
import { IfoodModule } from "../module";

const ORDER_GET_PATH = (id: string) => `/order/v1.0/orders/${id}`;
const POLLING_GET_PATH = "/order/v1.0/events:polling";
const ACK_POST_PATH = "/order/v1.0/events/acknowledgment";
export class IfoodOrderModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-order");
  }

  public async polling(): Promise<Event[]> {
    try {
      const response = await this.client.get(POLLING_GET_PATH);
      if (response.status === 204) return [];
      return handleResponse<Event[]>(response);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`${error.code} - ${error.message}`);
      } else {
        this.logger.error(error);
      }
    }
    throw new IfoodPollingError(`Get error when trying to execute polling`);
  }

  public async ack(events?: Event[]): Promise<boolean> {
    try {
      const response = await this.client.post(
        ACK_POST_PATH,
        events?.map((event) => event.id)
      );
      return response.status === 202;
    } catch (error) {
      this.logger.error(error);
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
}
