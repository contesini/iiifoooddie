import axios, { AxiosResponse } from 'axios';
import {
  Merchant,
  MerchantDetails,
  MerchantInterruption,
  MerchantOperation,
  MerchantReviewInput,
  MerchantReviewsInput,
  MerchantSalesInput,
} from './types/merchant';
import { Sales } from '../ifood/types/sales';
import { Order, Review, ReviewResponse } from './types/reviews';
import {
  IfoodAuthFailedError,
  IfoodGetMerchantDetailsError,
  IfoodGetMerchantInterruptionsError,
  IfoodGetMerchantSalesError,
  IfoodGetMerchantsError,
  IfoodGetMerchantStatusError,
  IfoodGetOrderError,
  IfoodGetReviewsError,
  IfoodInvalidClientIdError,
  IfoodInvalidClientSecretError,
  IfoodResponseFailedError,
} from './errors';

export class IfoodClient {
  private IFOOD_MERCHANT_API_URL = process.env.IFOOD_MERCHANT_API_URL;

  private clientId = process.env.IFOOD_CLIENT_ID;

  private clientSecret = process.env.IFOOD_CLIENT_SECRET;

  private token = undefined;

  private formatURL = (path: string) => `${this.IFOOD_MERCHANT_API_URL}${path}`;

  private AUTHENTICATION_PATH = () =>
    this.formatURL('/authentication/v1.0/oauth/token');

  private MERCHANTS_GET_PATH = () => this.formatURL('/merchant/v1.0/merchants');

  private MERCHANTS_DETAILS_GET_PATH = (id: string) =>
    this.formatURL(`/merchant/v1.0/merchants/${id}`);

  private MERCHANTS_STATUS_GET_PATH = (id: string) =>
    this.formatURL(`/merchant/v1.0/merchants/${id}/status`);

  private MERCHANTS_INTERRUPTIONS_GET_PATH = (id: string) =>
    this.formatURL(`/merchant/v1.0/merchants/${id}/interruptions`);

  private MERCHANTS_SALES_GET_PATH = (id: string) =>
    this.formatURL(`/financial/v1.0/merchants/${id}/sales`);

  private MERCHANT_REVIEWS_GET_PATH = (id: string) =>
    this.formatURL(`/review/v1.0/merchants/${id}/reviews`);

  private MERCHANT_REVIEW_GET_PATH = (args: MerchantReviewInput) =>
    this.formatURL(
      `/review/v1.0/merchants/${args.merchantId}/${args.reviewId}`,
    );

  private ORDER_GET_PATH = (id: string) =>
    this.formatURL(`/order/v1.0/orders/${id}`);

  private handlerResponse(resp: AxiosResponse<any, any>) {
    if (resp.status === 200) {
      return resp.data;
    } else {
      throw new IfoodResponseFailedError(
        `response from ifood return status code ${resp.status}`,
      );
    }
  }

  private getHeaders(): any {
    if (this.token) {
      return {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      };
    }
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    };
  }

  private appendKeyIfNoExists(
    params: URLSearchParams,
    key: string,
    value: string,
  ) {
    if (!params.get(key)) {
      params.append(key, value);
    }
  }

  private getAuthParams(): URLSearchParams {
    if (this.clientId === undefined)
      throw new IfoodInvalidClientIdError(
        'invalid client id, check env IFOOD_CLIENT_ID',
      );
    if (this.clientSecret === undefined)
      throw new IfoodInvalidClientSecretError(
        'invalid client id, check env IFOOD_CLIENT_SECRET',
      );
    const params = new URLSearchParams();
    params.append('grantType', 'client_credentials');
    params.append('clientId', this.clientId);
    params.append('clientSecret', this.clientSecret);
    return params;
  }

  private getMerchantsParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('page', '1');
    params.append('size', '2000');
    return params;
  }

  private authenticate = async () => {
    if (this.token !== undefined) return;
    console.log(`invalid token, retry authenticate ifood api`);
    try {
      const params = this.getAuthParams();
      const resp = await axios({
        url: this.AUTHENTICATION_PATH(),
        method: 'POST',
        headers: this.getHeaders(),
        params,
      });
      if (resp.status === 200) {
        this.token = resp.data.accessToken;
      } else {
        throw new IfoodAuthFailedError(
          `get status ${resp.status} from ifood api`,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  private getMerchantSalesParams(args: MerchantSalesInput) {
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    const beginLastProcessingDate = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const endLastProcessingDate = new Date().toISOString().split('T')[0];
    const beginOrderDate = new Date(
      new Date().setDate(new Date().getDate() - 8),
    )
      .toISOString()
      .split('T')[0];
    const endOrderDate = new Date().toISOString().split('T')[0];

    this.appendKeyIfNoExists(
      params,
      'beginLastProcessingDate',
      beginLastProcessingDate,
    );
    this.appendKeyIfNoExists(
      params,
      'endLastProcessingDate',
      endLastProcessingDate,
    );
    this.appendKeyIfNoExists(params, 'beginOrderDate', beginOrderDate);
    this.appendKeyIfNoExists(params, 'endOrderDate', endOrderDate);

    return params;
  }

  private getMerchantReviewParams(args: MerchantReviewsInput) {
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args) as [];
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    const dateFrom = new Date(
      new Date().setDate(new Date().getDate() - 90),
    ).toISOString();
    const dateTo = new Date().toISOString();
    params.append('dateFrom', dateFrom);
    params.append('dateTo', dateTo);
    params.append('pageSize', '10');
    params.append('addCount', 'true');
    return params;
  }

  private async getAllReviews(
    args: MerchantReviewsInput,
    pageSize: number,
  ): Promise<ReviewResponse[] | void> {
    const promises = [];
    try {
      for (let index = 0; index < pageSize; index++) {
        const params = this.getMerchantReviewParams({
          ...args,
          page: 2 + index,
        });
        const reviewPromise = axios({
          url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
          headers: this.getHeaders(),
          method: 'GET',
          params,
        })
        .then((response => response.data as ReviewResponse ))
        promises.push(reviewPromise);
      }
      return await Promise.all(promises) as ReviewResponse[];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetReviewsError(
      `Get error when request all reviews from merchant ${args.merchantId}`,
    );
  }

  private getParamsFromArgs(args: any) {
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args);
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    return params;
  }

  public async getMerchants(): Promise<Merchant[] | void> {
    if (this.token === undefined) await this.authenticate();
    console.log('get merchants');
    try {
      const params = this.getMerchantsParams();
      const resp = await axios({
        url: this.MERCHANTS_GET_PATH(),
        headers: this.getHeaders(),
        method: 'GET',
        params,
      });
      return this.handlerResponse(resp) as Merchant[];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantsError(
      `Get error when trying to get merchants from ifood api`,
    );
  }

  public async getMerchantDetails(id: string): Promise<MerchantDetails | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getMerchantDetails for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_DETAILS_GET_PATH(id),
        headers: this.getHeaders(),
        method: 'GET',
      });
      return this.handlerResponse(resp) as MerchantDetails;
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantDetailsError(
      `Get error when trying to get merchant details from merchant ${id}`,
    );
  }

  public async getMerchantStatus(
    id: string,
  ): Promise<MerchantOperation[] | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getMerchantStatus for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_STATUS_GET_PATH(id),
        headers: this.getHeaders(),
        method: 'GET',
      });
      return this.handlerResponse(resp) as MerchantOperation[];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantStatusError(
      `Get error when trying to get merchant status from merchant ${id}`,
    );
  }

  public async getMerchantInterruptions(
    id: string,
  ): Promise<MerchantInterruption[] | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getMerchantInterruptions for id: ${id}`);
    try {
      const resp = await axios({
        url: this.MERCHANTS_INTERRUPTIONS_GET_PATH(id),
        headers: this.getHeaders(),
        method: 'GET',
      });
      return this.handlerResponse(resp) as MerchantInterruption[];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantInterruptionsError(
      `Get error when trying to get merchant interruptions from merchant ${id}`,
    );
  }

  public async getMerchantDetailsStatusAndInterruptions(merchant: Merchant) {
    merchant.details = (await this.getMerchantDetails(
      merchant.id,
    )) as MerchantDetails;
    merchant.operations = (await this.getMerchantStatus(
      merchant.id,
    )) as MerchantOperation[];
    merchant.interruptions = (await this.getMerchantInterruptions(
      merchant.id,
    )) as MerchantInterruption[];

    merchant.sales = await this.getMerchantSales({ merchantId: merchant.id }) as Sales[];

    merchant.orders = await this.getOrders( [...merchant.sales.map(sale => sale.orderId)] ) as Order[]
    
    return merchant;
  }

  private async getOrders(ordersIds: string[]): Promise<Order[] | void> {
    const promises = []
    for (let index = 0; index < ordersIds.length; index++) {
      const orderId = ordersIds[index];
      promises.push(this.getOrderById(orderId))
    }
    return await Promise.all(promises)
  }

  public async getMerchantSales(
    args: MerchantSalesInput,
  ): Promise<Sales[] | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getMerchantSales for id: ${args.merchantId}`);
    const params = this.getMerchantSalesParams(args);

    try {
      const resp = await axios({
        url: this.MERCHANTS_SALES_GET_PATH(args.merchantId),
        headers: this.getHeaders(),
        method: 'GET',
        params,
      });
      return this.handlerResponse(resp) as Sales[];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetMerchantSalesError(
      `Get error when trying to get merchant sales from merchant ${args.merchantId}`,
    );
  }

  public async getMerchantReviews(
    args: MerchantReviewsInput,
  ): Promise<ReviewResponse[] | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getMerchantReviews for id: ${args.merchantId}`);
    const params = this.getMerchantReviewParams(args);
    try {
      const firstReviewResponse = await axios({
        url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
        headers: this.getHeaders(),
        method: 'GET',
        params,
      });
      const firstReviewResponseData = this.handlerResponse(
        firstReviewResponse,
      ) as ReviewResponse;
      const reviews = (await this.getAllReviews(
        args,
        firstReviewResponseData.pageCount,
      )) as ReviewResponse[];
      return [firstReviewResponseData, ...reviews];
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetReviewsError(
      `Get error when trying to get merchant reviews from merchant ${args.merchantId}`,
    );
  }

  public async getReview(args: MerchantReviewInput): Promise<Review | void> {
    if (this.token === undefined) await this.authenticate();
    console.log(`getReview for id: ${args.merchantId}`);
    const params = this.getParamsFromArgs(args);
    try {
      const response = await axios({
        url: this.MERCHANT_REVIEW_GET_PATH(args),
        headers: this.getHeaders(),
        method: 'GET',
        params,
      });
      return this.handlerResponse(response) as Review;
    } catch (error) {
      console.error(error);
    }
  }

  public async getOrderById(id: string) {
    if (this.token === undefined) await this.authenticate();
    console.log(`getOrderById id: ${id}`);
    const params = this.getParamsFromArgs({ id });
    try {
      const response = await axios({
        url: this.ORDER_GET_PATH(id),
        headers: this.getHeaders(),
        method: 'GET',
        params,
      });
      return this.handlerResponse(response) as Order;
    } catch (error) {
      console.error(error);
    }
    throw new IfoodGetOrderError(
      `Get error when trying to get merchant reviews from merchant ${id}`,
    );
  }
}
