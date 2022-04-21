import Logger from '../../../utils/logger'
import axios from 'axios'
import IfoodClientUtils from '../../utils'
import { IfoodGetOrderError, IfoodInvalidClientToken } from '../../errors'
import { Order } from '../../types/reviews'


export default class IfoodClientOrder {
  private static logger = new Logger('ifood-client-order')

  public static ORDER_GET_PATH = (id: string) =>
    IfoodClientUtils.formatURL(`/order/v1.0/orders/${id}`);

  public static async getOrderById(id: string, token: string) {
    if (token === undefined) throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getOrderById id: ${id}`);
    const params = IfoodClientUtils.getParamsFromArgs({ id, token });
    try {
      const response = await axios({
        url: this.ORDER_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      });
      return response
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetOrderError(
      `Get error when trying to get merchant reviews from merchant ${id}`,
    );
  }
  
}