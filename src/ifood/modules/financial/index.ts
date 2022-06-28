import { MerchantResume, MerchantSalesAdjustmentsParams, MerchantSalesCancellationsInput, MerchantSalesCancellationsParams, MerchantSalesChargeCancellationsInput, MerchantSalesChargeCancellationsParams, MerchantSalesInput, MerchantSalesParams } from '../../types/merchant'

import Logger from '../../../utils/logger'
import axios, { AxiosError, AxiosResponse } from 'axios'
import axiosRetry from 'axios-retry';
import IfoodClientUtils from '../../utils'
import { IfoodGetMerchantSalesError, IfoodInvalidClientToken } from '../../errors'

axiosRetry(axios, {
  retries: 3,
  retryCondition: (error: AxiosError) => {
    if (error.code == "429") {
      console.error("[Ifood] - Too many requests...");
      return false;
    }
    return true
  }
});

export default class IfoodClientFinancial {
  private static logger = new Logger('ifood-client-financial')

  private static MERCHANTS_SALES_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`/financial/v2.0/merchants/${id}/sales`);

  private static MERCHANTS_SALES_CHARGE_CANCELLATIONS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`financial/v1.0/merchants/${id}/chargeCancellations`);

  private static MERCHANTS_SALES_CANCELLATIONS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`financial/v1.0/merchants/${id}/cancellations`);

  private static MERCHANTS_SALES_ADJUSTMENTS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`financial/v2.0/merchants/${id}/salesAdjustments`);

  private static getMerchantSalesParams(args: MerchantSalesParams) {
    this.logger.info('getMerchantSalesParams')
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    // const beginLastProcessingDate = new Date(
    //   new Date().setDate(new Date().getDate() - 8),
    // )
    //   .toISOString()
    //   .split('T')[0];
    // const endLastProcessingDate = new Date().toISOString().split('T')[0];
    const beginOrderDate = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const endOrderDate = new Date().toISOString().split('T')[0];

    // IfoodClientUtils.appendKeyIfNoExists(
    //   params,
    //   'beginLastProcessingDate',
    //   beginLastProcessingDate,
    // );
    // IfoodClientUtils.appendKeyIfNoExists(
    //   params,
    //   'endLastProcessingDate',
    //   endLastProcessingDate,
    // );
    IfoodClientUtils.appendKeyIfNoExists(params, 'beginOrderDate', beginOrderDate);
    IfoodClientUtils.appendKeyIfNoExists(params, 'endOrderDate', endOrderDate);

    return params;
  }

  private static getMerchantSalesCancellationsParams(args: MerchantSalesCancellationsParams) {
    this.logger.info('getMerchantSalesCancellationsParams')
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    const beginCancellationDate = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const endCancellationDate = new Date().toISOString().split('T')[0];

    IfoodClientUtils.appendKeyIfNoExists(params, 'beginCancellationDate', beginCancellationDate);
    IfoodClientUtils.appendKeyIfNoExists(params, 'endCancellationDate', endCancellationDate);
    return params;
  }

  private static getMerchantSalesChargeCancellationsParams(args: MerchantSalesChargeCancellationsParams) {
    this.logger.info('getMerchantSalesChargeCancellationsParams')
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    const transactionDateBegin = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const transactionDateEnd = new Date().toISOString().split('T')[0];

    IfoodClientUtils.appendKeyIfNoExists(params, 'transactionDateBegin', transactionDateBegin);
    IfoodClientUtils.appendKeyIfNoExists(params, 'transactionDateEnd', transactionDateEnd);

    return params;
  }

  private static getMerchantSalesAdjustmentsParams(args: MerchantSalesAdjustmentsParams) {
    this.logger.info('getMerchantSalesAdjustmentsParams')
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    const beginUpdateDate = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const endUpdateDate = new Date().toISOString().split('T')[0];

    IfoodClientUtils.appendKeyIfNoExists(params, 'beginUpdateDate', beginUpdateDate);
    IfoodClientUtils.appendKeyIfNoExists(params, 'endUpdateDate', endUpdateDate);

    return params;
  }

  public static async getMerchantSales(
    args: MerchantSalesInput,
    token: string
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantSales for id: ${args.merchantId}`);
    const params = this.getMerchantSalesParams(args);

    try {
      const resp = await axios({
        url: this.MERCHANTS_SALES_GET_PATH(args.merchantId),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      });
      return resp
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales from merchant ${args.merchantId}`,
    );
  }

  public static async getMerchantSalesCancellations({ merchantId, ...args }: MerchantSalesCancellationsInput,
    token: string): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantSalesCancellations for merchantId: ${merchantId}`);
    const params = this.getMerchantSalesCancellationsParams(args);

    try {
      const resp = await axios({
        url: this.MERCHANTS_SALES_CANCELLATIONS_GET_PATH(merchantId),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params
      });
      return resp
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales cancellations from merchant ${merchantId}`,
    );
  }

  public static async getMerchantSalesChargeCancellations({ merchantId, ...args }: MerchantSalesChargeCancellationsInput,
    token: string): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantSalesChargeCancellations for merchantId: ${merchantId}`);
    const params = this.getMerchantSalesChargeCancellationsParams(args);

    try {
      const resp = await axios({
        url: this.MERCHANTS_SALES_CHARGE_CANCELLATIONS_GET_PATH(merchantId),
        method: 'GET',
        headers: IfoodClientUtils.getHeaders(token),
        params,
      });
      return resp
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales charge cancellations from merchant ${merchantId}`,
    );
  }

  public static async getMerchantSalesAdjustments({ merchantId, ...args }: MerchantSalesChargeCancellationsInput,
    token: string): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantSalesChargeCancellations for merchantId: ${merchantId}`);
    const params = this.getMerchantSalesAdjustmentsParams(args);

    try {
      const resp = await axios({
        url: this.MERCHANTS_SALES_ADJUSTMENTS_GET_PATH(merchantId),
        method: 'GET',
        headers: IfoodClientUtils.getHeaders(token),
        params,
      });
      return resp
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales adjustments from merchant ${merchantId}`,
    );
  }
}