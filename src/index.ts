import {
  Merchant,
  MerchantDetails,
  MerchantInterruption,
  MerchantOperation,
  MerchantReviewInput,
  MerchantReviewsInput,
  MerchantSalesInput,
} from './ifood/types/merchant'

import AuthEventBus from './ifood/modules/auth/bus'
import IfoodClientFinancial from './ifood/modules/financial'
import IfoodClientMerchant from './ifood/modules/merchants'
import Logger from './utils/logger'
import IfoodClientOrder from './ifood/modules/order'
import IfoodClientReview from './ifood/modules/reviews'
import IfoodClientUtils from './ifood/utils'
import { Sales } from './ifood/types/sales'
import { Order, Review } from './ifood/types/reviews'
import IfoodClientAuth from './ifood/modules/auth'
export default class IfoodClient {
  private logger = new Logger('ifood-client')

  private authEventBus = AuthEventBus.getInstance()

  private token = async () => await this.authEventBus.getToken()

  private financial = () => IfoodClientFinancial

  private merchants = () => IfoodClientMerchant

  private order = () => IfoodClientOrder

  private reviews = () => IfoodClientReview

  constructor() {
    
  }

    /**
   * Se clientId e clientSecret não forem passados via parametro como fallback
   * tenta ler os valores das variaveis de ambiente
   * @param  {string=} clientId [description]
   * @param  {string=} clientSecret [description]

   * @return {Promise<void>}     [description]
   */
  public async authenticate(clientId?: string, clientSecret?: string): Promise<void> {
    const token = await IfoodClientAuth.authenticate(clientId, clientSecret)
    this.authEventBus.setToken(token)
  }

  public async getMerchantSales(args: MerchantSalesInput) {
    return await this.financial()
      .getMerchantSales(args, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<Sales[]>(r))
  }

  public async getMerchantReviews(args: MerchantReviewsInput) {
    return await this.reviews().getMerchantReviews(args, await this.token())
  }

  public async getMerchants() {
    return await this.merchants()
      .getMerchants(await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<Merchant[]>(r))
  }

  public async getMerchantDetails(id: string) {
    return await this.merchants()
      .getMerchantDetails(id, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<MerchantDetails>(r))
  }

  public async getMerchantDetailsStatusAndInterruptions(merchant: Merchant) {
    merchant.details = await this.getMerchantDetails(merchant.id)
    merchant.operations = await this.getMerchantStatus(merchant.id)
    merchant.interruptions = await this.getMerchantInterruptions(merchant.id)

    merchant.sales = await this.getMerchantSales({ merchantId: merchant.id })

    merchant.orders = await this.getOrders([
      ...merchant.sales.map((sale) => sale.orderId),
    ])
    return merchant
  }

  public async getMerchantInterruptions(id: string) {
    return await this.merchants()
      .getMerchantInterruptions(id, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<MerchantInterruption[]>(r))
  }

  public async getMerchantStatus(id: string) {
    return await this.merchants()
      .getMerchantStatus(id, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<MerchantOperation[]>(r))
  }


  private async getOrders(ordersIds: string[]) {
    const orders = []
    for (let index = 0; index < ordersIds.length; index++) {
      const orderId = ordersIds[index]
      orders.push(await this.getOrderById(orderId))
    }
    return orders
  }

  public async getOrderById(id: string) {
    return await this.order()
      .getOrderById(id, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<Order>(r))
  }

  public async getAllReviews(args: MerchantReviewsInput, pageSize: number) {
    return this.reviews()
      .getAllReviews(args, pageSize, await this.token())
      .then((r) => r.map(reviewResponse => reviewResponse.reviews))
  }

  public async getReview(args: MerchantReviewInput) {
    return this.reviews()
      .getReview(args, await this.token())
      .then((r) => IfoodClientUtils.handlerResponse<Review>(r))
  }
}
