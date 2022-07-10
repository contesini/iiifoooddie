import { AxiosInstance } from "axios";
import {
  Merchant,
  MerchantDetails,
  MerchantInterruption,
  MerchantOperation
} from "../../types/merchant";
import {
  IfoodGetMerchantDetailsError,
  IfoodGetMerchantInterruptionsError,
  IfoodGetMerchantsError,
  IfoodGetMerchantStatusError
} from "../../errors";
import { handleResponse } from "../../utils";
import { IfoodModule } from "../module";

const MERCHANTS_GET_PATH = "/merchant/v1.0/merchants";

const MERCHANTS_DETAILS_GET_PATH = (id: string) =>
  `/merchant/v1.0/merchants/${id}`;

const MERCHANTS_STATUS_GET_PATH = (id: string) =>
  `/merchant/v1.0/merchants/${id}/status`;

const MERCHANTS_INTERRUPTIONS_GET_PATH = (id: string) =>
  `/merchant/v1.0/merchants/${id}/interruptions`;
export class IfoodMerchantModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-merchant");
  }

  public async getMerchants(): Promise<Merchant[]> {
    try {
      const resp = await this.client.get(MERCHANTS_GET_PATH, {
        params: {
          page: 1,
          size: 2000,
        },
      });
      return handleResponse<Merchant[]>(resp);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantsError(
      `Get error when trying to get merchants from ifood api`
    );
  }

  public async getMerchantDetails(id: string): Promise<MerchantDetails> {
    this.logger.debug("getMerchantDetails");
    this.logger.debug(`getMerchantDetails for id: ${id}`);
    try {
      const resp = await this.client.get(MERCHANTS_DETAILS_GET_PATH(id));
      return handleResponse<MerchantDetails>(resp);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantDetailsError(
      `Get error when trying to get merchant details from merchant ${id}`
    );
  }

  public async getMerchantStatus(id: string): Promise<MerchantOperation[]> {
    this.logger.debug(`getMerchantStatus for id: ${id}`);
    try {
      const resp = await this.client.get(MERCHANTS_STATUS_GET_PATH(id));
      return handleResponse<MerchantOperation[]>(resp);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantStatusError(
      `Get error when trying to get merchant status for merchant ${id}`
    );
  }

  public async getMerchantInterruptions(
    id: string
  ): Promise<MerchantInterruption[]> {
    this.logger.debug(`getMerchantInterruptions for id: ${id}`);
    try {
      const resp = await this.client.get(MERCHANTS_INTERRUPTIONS_GET_PATH(id));
      return handleResponse<MerchantInterruption[]>(resp);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetMerchantInterruptionsError(
      `Get error when trying to get merchant interruptions from merchant ${id}`
    );
  }
}
