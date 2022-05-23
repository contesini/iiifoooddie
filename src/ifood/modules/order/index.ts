import Logger from '../../../utils/logger'
import axios from 'axios'
import IfoodClientUtils from '../../utils'
import { IfoodGetOrderError, IfoodInvalidClientToken } from '../../errors'
import { Order } from '../../types/reviews'


export default class IfoodClientOrder {
  private static logger = new Logger('ifood-client-order')

  public static ORDER_GET_PATH = (id: string) =>
   new IfoodClientUtils().formatURL(`/order/v1.0/orders/${id}`);

  private static async sleep(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  public static async getOrderById(id: string, token: string) {
    if (token === undefined) throw new IfoodInvalidClientToken("invalid token");
    IfoodClientOrder.logger.info(`getOrderById id: ${id}`);
    const params = IfoodClientUtils.getParamsFromArgs({ id, token });
    try {
      this.sleep(300)
      const response = await axios({
        url: IfoodClientOrder.ORDER_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      });
      return response
    } catch (error) {
      IfoodClientOrder.logger.error(error);
    }
    throw new IfoodGetOrderError(
      `Get error when trying to get merchant reviews from merchant ${id}`,
    );
  }
  
}