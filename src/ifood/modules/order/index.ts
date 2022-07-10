import { AxiosInstance } from "axios";
import { IfoodGetOrderError } from "../../errors";

import { Order } from "../../types/order";
import { handleResponse } from "../../utils";
import { IfoodModule } from "../module";

const ORDER_GET_PATH = (id: string) => `/order/v1.0/orders/${id}`;
export class IfoodOrderModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-order");
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
    throw new IfoodGetOrderError(
      `Get error when trying to get order ${id}`
    );
  }
}
