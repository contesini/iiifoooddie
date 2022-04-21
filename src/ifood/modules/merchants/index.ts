import {Merchant, MerchantDetails, MerchantInterruption, MerchantOperation} from '../../types/merchant'

import Logger from '../../../utils/logger'
import IfoodClientAuth from '../auth/index'
import axios, { AxiosResponse } from 'axios'
import IfoodClientUtils from '../../utils'
import { IfoodGetMerchantDetailsError, IfoodGetMerchantInterruptionsError, IfoodGetMerchantsError, IfoodGetMerchantStatusError, IfoodInvalidClientToken } from '../../errors'
import { Sales } from '../../types/sales'
import { Order } from '../../types/reviews'
import IfoodClientFinancial from '../financial'
import IfoodClientOrder from '../order'


export default class IfoodClientMerchant {
  private static logger = new Logger('ifood-client-merchant')

  private static MERCHANTS_GET_PATH = () => IfoodClientUtils.formatURL('/merchant/v1.0/merchants');

  private static MERCHANTS_DETAILS_GET_PATH = (id: string) =>
  IfoodClientUtils.formatURL(`/merchant/v1.0/merchants/${id}`);

  private static MERCHANTS_STATUS_GET_PATH = (id: string) =>
  IfoodClientUtils.formatURL(`/merchant/v1.0/merchants/${id}/status`);

  private static MERCHANTS_INTERRUPTIONS_GET_PATH = (id: string) =>
  IfoodClientUtils.formatURL(`/merchant/v1.0/merchants/${id}/interruptions`);

  private static getMerchantsParams(): URLSearchParams {
    this.logger.info('get merchantsParams')
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('size', '2000');
    return params;
  }

  public static async getMerchants(token: string ): Promise<AxiosResponse<any, any>> {
    this.logger.info('getMerchants')
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    try {
      const params = this.getMerchantsParams();
      const resp = await axios({
        url: this.MERCHANTS_GET_PATH(),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      });
      return resp
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantsError(
      `Get error when trying to get merchants from ifood api`,
    );
  }

  public static async getMerchantDetails(id: string, token: string): Promise<AxiosResponse<any, any>> {
    this.logger.info('getMerchantDetails')
    this.logger.info(`getMerchantDetails for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_DETAILS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      });
      return resp
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantDetailsError(
      `Get error when trying to get merchant details from merchant ${id}`,
    );
  }

  public static async getMerchantStatus(
    id: string,
    token: string
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantStatus for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_STATUS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      });
      return resp
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantStatusError(
      `Get error when trying to get merchant status from merchant ${id}`,
    );
  }

  public static async getMerchantInterruptions(
    id: string,
    token: string
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantInterruptions for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_INTERRUPTIONS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      });
      return resp
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantInterruptionsError(
      `Get error when trying to get merchant interruptions from merchant ${id}`,
    );
  }

}