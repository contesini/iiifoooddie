require("module-alias/register");

import {
  MerchantReviewInput,
  MerchantReviewsInput,
  MerchantSalesAdjustmentsInput,
  MerchantSalesCancellationsInput,
  MerchantSalesChargeCancellationsInput,
  MerchantSalesInput,
} from "./ifood/types/merchant";

import axios, { AxiosInstance } from "axios";
import { IfoodAuthConfig, IfoodClientAuth } from "./ifood/modules/auth";
import { IfoodFinancialModule } from "./ifood/modules/financial";
import { IfoodMerchantModule } from "./ifood/modules/merchants";
import { IfoodOrderModule } from "./ifood/modules/order";
import { IfoodReviewModule } from "./ifood/modules/reviews";
import { Order } from "@ifood/types/order";
import { Review } from "@ifood/types/reviews";
import {
  addDateInterceptor,
  addRetryInterceptor,
  getDefaultHeaders,
  sleep,
} from "./ifood/utils";
import Logger from "./utils/logger";
import { IfoodCatalogModule } from "./ifood/modules/catalog";
import {
  CatalogChangelogInput,
  CatalogChangelogResponse,
  MerchantCatalogsInput,
  ResponseCatalog,
  SellableItemsResponse,
  UnsellableItemResponse,
  UnsellableItemsInput,
} from "@ifood/types/catalog";
import { Event } from "@ifood/types/polling";

export type IfoodClientConfig = {
  auth?: IfoodAuthConfig;
  apiUrl?: string;
};

const IFOOD_MERCHANT_API_URL =
  process.env.IFOOD_MERCHANT_API_URL || "https://merchant-api.ifood.com.br";
export class IfoodClient {
  private instance: AxiosInstance;

  private logger = new Logger("ifood-client");

  private authClient: IfoodClientAuth;

  private financialModule: IfoodFinancialModule;

  private orderModule: IfoodOrderModule;

  private reviewModule: IfoodReviewModule;

  private merchantsModule: IfoodMerchantModule;

  private catalogModule: IfoodCatalogModule;

  constructor(ifoodClientConfig?: IfoodClientConfig) {
    const defaultConfig = {
      apiUrl: ifoodClientConfig?.apiUrl || IFOOD_MERCHANT_API_URL,
    };
    const config = { ...defaultConfig, ...ifoodClientConfig };
    this.logger.debug("Creating Ifood client");
    this.instance = axios.create({
      baseURL: config.apiUrl,
      headers: getDefaultHeaders(),
    });
    addRetryInterceptor(this.instance);
    addDateInterceptor(this.instance);
    this.authClient = new IfoodClientAuth(config.apiUrl, config.auth);
    this.authClient.loadAuthInterceptor(this.instance);

    this.orderModule = new IfoodOrderModule(this.instance);
    this.reviewModule = new IfoodReviewModule(this.instance);
    this.merchantsModule = new IfoodMerchantModule(this.instance);
    this.financialModule = new IfoodFinancialModule(this.instance);
    this.catalogModule = new IfoodCatalogModule(this.instance);
    this.logger.debug("Ifood client created");
  }

  public async getMerchantSales(args: MerchantSalesInput) {
    return await this.financialModule.getMerchantSales(args);
  }

  public async getMerchantSalesCancellations(
    args: MerchantSalesCancellationsInput
  ) {
    return await this.financialModule.getMerchantSalesCancellations(args);
  }

  public async getMerchantSalesChargeCancellations(
    args: MerchantSalesChargeCancellationsInput
  ) {
    return await this.financialModule.getMerchantSalesChargeCancellations(args);
  }

  public async getMerchantSalesAdjustments(
    args: MerchantSalesAdjustmentsInput
  ) {
    return await this.financialModule.getMerchantSalesAdjustments(args);
  }

  public async getMerchants() {
    return await this.merchantsModule.getMerchants();
  }

  public async getMerchantDetails(id: string) {
    return await this.merchantsModule.getMerchantDetails(id);
  }

  public async getMerchantInterruptions(id: string) {
    return await this.merchantsModule.getMerchantInterruptions(id);
  }

  public async getMerchantStatus(id: string) {
    return this.merchantsModule.getMerchantStatus(id);
  }

  public async getOrders(ordersIds: string[]) {
    let chunks: any[] = [];
    const chunkSize = 30;
    for (let i = 0; i < ordersIds.length; i += chunkSize) {
      const chunk = ordersIds.slice(i, i + chunkSize);
      chunks = [
        ...chunks,
        chunk.map(async (orderId: string) => this.getOrderById(orderId)),
      ];
    }

    let chunks_resp: any[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const resp = await Promise.all(chunks[i]);
      await sleep(1000);
      chunks_resp = [...chunks_resp, ...resp];
    }
    return chunks_resp;
  }

  public async getOrderById(id: string): Promise<Order> {
    return await this.orderModule.getOrderById(id);
  }

  public async polling(storeIds?: string[]): Promise<Event[]> {
    return await this.orderModule.polling(storeIds);
  }

  public async ack(events: Event[]): Promise<boolean> {
    return await this.orderModule.ack(events);
  }

  public async confirmOrder(id: string): Promise<boolean> {
    return await this.orderModule.confirmOrder(id);
  }

  public async startPreparation(id: string): Promise<boolean> {
    return this.orderModule.startPreparation(id);
  }

  public async readyToPickup(id: string): Promise<boolean> {
    return this.orderModule.readyToPickup(id);
  }

  public async dispatchOrder(id: string): Promise<boolean> {
    return this.orderModule.dispatchOrder(id);
  }

  public async acceptCancellation(id: string): Promise<boolean> {
    return this.orderModule.acceptCancellation(id);
  }

  public async denyCancellation(id: string): Promise<boolean> {
    return this.orderModule.denyCancellation(id);
  }

  public async getMerchantReviews(
    args: MerchantReviewsInput
  ): Promise<Review[]> {
    return await this.reviewModule.getMerchantReviews(args);
  }

  public async getReview(args: MerchantReviewInput): Promise<Review> {
    return this.reviewModule.getReview(args);
  }

  public async getMerchantCatalogs(
    args: MerchantCatalogsInput
  ): Promise<ResponseCatalog> {
    return await this.catalogModule.getMerchantCatalogs(args);
  }

  public async getCatalogChangelog(
    args: CatalogChangelogInput
  ): Promise<CatalogChangelogResponse> {
    return await this.catalogModule.getCatalogChangelog(args);
  }

  public async getUnsellableItemsFromCatalog(
    args: UnsellableItemsInput
  ): Promise<UnsellableItemResponse> {
    return await this.catalogModule.getUnsellableItemsFromCatalog(args);
  }

  public async getSellableItemsFromCatalog(
    args: UnsellableItemsInput
  ): Promise<SellableItemsResponse> {
    return await this.catalogModule.getSellableItemsFromCatalog(args);
  }
}
