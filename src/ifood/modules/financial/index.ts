import { IfoodGetMerchantSalesError } from "../../errors";
import {
  ChargeCancellations,
  MerchantSalesCancellationsInput,
  MerchantSalesChargeCancellationsInput,
  MerchantSalesInput,
  SalesAdjustments
} from "../../types/merchant";
import { Sales, SalesCancellations } from "../../types/sales";
import { getDateBefore, handleResponse, toDate } from "../../utils";
import { IfoodModule } from "../module";
import { AxiosInstance } from "axios";

const MERCHANTS_SALES_GET_PATH = (id: string) =>
  `/financial/v2.0/merchants/${id}/sales`;

const MERCHANTS_SALES_CHARGE_CANCELLATIONS_GET_PATH = (id: string) =>
  `financial/v1.0/merchants/${id}/chargeCancellations`;

const MERCHANTS_SALES_CANCELLATIONS_GET_PATH = (id: string) =>
  `financial/v1.0/merchants/${id}/cancellations`;

const MERCHANTS_SALES_ADJUSTMENTS_GET_PATH = (id: string) =>
  `financial/v2.0/merchants/${id}/salesAdjustments`;

export class IfoodFinancialModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-financial");
  }

  public async getMerchantSales(args: MerchantSalesInput): Promise<Sales[]> {
    this.logger.debug(`getMerchantSales for id: ${args.merchantId}`);

    const defaultParams = {
      beginOrderDate: toDate(getDateBefore(8)),
      endOrderDate: toDate(new Date()),
    };

    const params = { ...defaultParams, ...args };

    try {
      const resp = await this.client.get(
        MERCHANTS_SALES_GET_PATH(args.merchantId),
        {
          params,
        }
      );
      return handleResponse<Sales[]>(resp);
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales from merchant ${args.merchantId}`
    );
  }

  public async getMerchantSalesCancellations({
    merchantId,
    ...args
  }: MerchantSalesCancellationsInput): Promise<SalesCancellations[]> {
    this.logger.debug(
      `getMerchantSalesCancellations for merchantId: ${merchantId}`
    );

    const defaultParams = {
      beginCancellationDate: toDate(getDateBefore(8)),
      endCancellationDate: toDate(new Date()),
    };
    const params = { ...defaultParams, ...args };

    try {
      const resp = await this.client.get(
        MERCHANTS_SALES_CANCELLATIONS_GET_PATH(merchantId),
        {
          params,
        }
      );
      return handleResponse<SalesCancellations[]>(resp);
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales cancellations from merchant ${merchantId}`
    );
  }

  public async getMerchantSalesChargeCancellations({
    merchantId,
    ...args
  }: MerchantSalesChargeCancellationsInput): Promise<ChargeCancellations[]> {
    this.logger.debug(
      `getMerchantSalesChargeCancellations for merchantId: ${merchantId}`
    );

    const defaultParams = {
      transactionDateBegin: toDate(getDateBefore(8)),
      transactionDateEnd: toDate(new Date()),
    };

    const params = { ...defaultParams, ...args };

    try {
      const resp = await this.client.get(
        MERCHANTS_SALES_CHARGE_CANCELLATIONS_GET_PATH(merchantId),
        {
          params,
        }
      );
      return handleResponse<ChargeCancellations[]>(resp);
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales charge cancellations from merchant ${merchantId}`
    );
  }

  public async getMerchantSalesAdjustments({
    merchantId,
    ...args
  }: MerchantSalesChargeCancellationsInput): Promise<SalesAdjustments[]> {
    this.logger.debug(
      `getMerchantSalesChargeCancellations for merchantId: ${merchantId}`
    );
    const defaultParams = {
      beginUpdateDate: toDate(getDateBefore(8)),
      endUpdateDate: toDate(new Date()),
    };

    const params = { ...defaultParams, ...args };

    try {
      const resp = await this.client.get(
        MERCHANTS_SALES_ADJUSTMENTS_GET_PATH(merchantId),
        {
          params,
        }
      );
      return handleResponse<SalesAdjustments[]>(resp);
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales adjustments from merchant ${merchantId}`
    );
  }
}
