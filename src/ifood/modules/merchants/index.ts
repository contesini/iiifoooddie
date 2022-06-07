import Logger from '../../../utils/logger'
import axios, { AxiosResponse } from 'axios'
import IfoodClientUtils from '../../utils'
import {
  IfoodGetMerchantDetailsError,
  IfoodGetMerchantInterruptionsError,
  IfoodGetMerchantsError,
  IfoodGetMerchantStatusError,
  IfoodInvalidClientToken,
} from '../../errors'
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });
export default class IfoodClientMerchant {
  private static logger = new Logger('ifood-client-merchant')

  private static MERCHANTS_GET_PATH = () =>
    new IfoodClientUtils().formatURL('/merchant/v1.0/merchants')

  private static MERCHANTS_DETAILS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`/merchant/v1.0/merchants/${id}`)

  private static MERCHANTS_STATUS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`/merchant/v1.0/merchants/${id}/status`)

  private static MERCHANTS_INTERRUPTIONS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(
      `/merchant/v1.0/merchants/${id}/interruptions`,
    )

  private static getMerchantsParams(): URLSearchParams {
    IfoodClientMerchant.logger.info('get merchantsParams')
    const params = new URLSearchParams()
    params.append('page', '1')
    params.append('size', '2000')
    return params
  }

  public static async getMerchants(
    token: string,
  ): Promise<AxiosResponse<any, any>> {
    IfoodClientMerchant.logger.info('getMerchants')
    if (token === undefined || token === '')
      throw new IfoodInvalidClientToken('invalid token')
    try {
      const params = IfoodClientMerchant.getMerchantsParams()
      const resp = await axios({
        url: IfoodClientMerchant.MERCHANTS_GET_PATH(),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      })
      return resp
    } catch (error) {
      IfoodClientMerchant.logger.error(error)
    }
    throw new IfoodGetMerchantsError(
      `Get error when trying to get merchants from ifood api`,
    )
  }

  public static async getMerchantDetails(
    id: string,
    token: string,
  ): Promise<AxiosResponse<any, any>> {
    IfoodClientMerchant.logger.info('getMerchantDetails')
    IfoodClientMerchant.logger.info(`getMerchantDetails for id: ${id}`)
    try {
      const resp = await axios({
        url: IfoodClientMerchant.MERCHANTS_DETAILS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      })
      return resp
    } catch (error) {
      IfoodClientMerchant.logger.error(error)
    }
    throw new IfoodGetMerchantDetailsError(
      `Get error when trying to get merchant details from merchant ${id}`,
    )
  }

  public static async getMerchantStatus(
    id: string,
    token: string,
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '')
      throw new IfoodInvalidClientToken('invalid token')
    IfoodClientMerchant.logger.info(`getMerchantStatus for id: ${id}`)
    try {
      const resp = await axios({
        url: IfoodClientMerchant.MERCHANTS_STATUS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      })
      return resp
    } catch (error) {
      IfoodClientMerchant.logger.error(error)
    }
    throw new IfoodGetMerchantStatusError(
      `Get error when trying to get merchant status from merchant ${id}`,
    )
  }

  public static async getMerchantInterruptions(
    id: string,
    token: string,
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '')
      throw new IfoodInvalidClientToken('invalid token')
    IfoodClientMerchant.logger.info(`getMerchantInterruptions for id: ${id}`)
    try {
      const resp = await axios({
        url: IfoodClientMerchant.MERCHANTS_INTERRUPTIONS_GET_PATH(id),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
      })
      return resp
    } catch (error) {
      IfoodClientMerchant.logger.error(error)
    }
    throw new IfoodGetMerchantInterruptionsError(
      `Get error when trying to get merchant interruptions from merchant ${id}`,
    )
  }
}
