import {
  Merchant,
  MerchantDetails,
  MerchantInterruption,
  MerchantOperation,
  MerchantReviewInput,
  MerchantReviewsInput,
  MerchantSalesAdjustmentsInput,
  MerchantSalesCancellationsInput,
  MerchantSalesChargeCancellationsInput,
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
import { Review } from './ifood/types/reviews'
import IfoodClientAuth from './ifood/modules/auth'
import { Order } from './ifood/types/order'
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

  private async sleep(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  public async getMerchantSales(args: MerchantSalesInput) {
    return await this.financial()
      .getMerchantSales(args, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Sales[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantSalesCancellations(args: MerchantSalesCancellationsInput) {
    return await this.financial()
      .getMerchantSalesCancellations(args, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Sales[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantSalesChargeCancellations(args: MerchantSalesChargeCancellationsInput) {
    return await this.financial()
      .getMerchantSalesChargeCancellations(args, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Sales[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantSalesAdjustments(args: MerchantSalesAdjustmentsInput) {
    return await this.financial()
      .getMerchantSalesAdjustments(args, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Sales[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchants() {
    return await this.merchants()
      .getMerchants(await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Merchant[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantDetails(id: string) {
    return await this.merchants()
      .getMerchantDetails(id, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<MerchantDetails>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantInterruptions(id: string) {
    return await this.merchants()
      .getMerchantInterruptions(id, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<MerchantInterruption[]>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantStatus(id: string) {
    return await this.merchants()
      .getMerchantStatus(id, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<MerchantOperation[]>(r), undefined])
      .catch(e => [undefined, e])
  }


  public async getOrders(ordersIds: string[]) {
    let chunks: any[] = []
    const chunkSize = 30;
    for (let i = 0; i < ordersIds.length; i += chunkSize) {
      const chunk = ordersIds.slice(i, i + chunkSize);
      chunks = [...chunks, chunk.map(async (orderId: string) => this.getOrderById(orderId).then(r => r[0]))]
    }

    let chunks_resp: any[] = []
    for (let i = 0; i < chunks.length; i++) {
      const resp = await Promise.all(chunks[i])
      await this.sleep(1000)
      chunks_resp = [...chunks_resp, ...resp]
    }
    return chunks_resp
  }

  public async getOrderById(id: string) {
    return await this.order()
      .getOrderById(id, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Order>(r), undefined])
      .catch(e => [undefined, e])
  }

  public async getMerchantReviews(args: MerchantReviewsInput) {
    return await this.reviews().getMerchantReviews(args, await this.token())
      .then(rev => [rev, undefined])
      .catch(e => [undefined, e])
  }

  public async getReview(args: MerchantReviewInput) {
    return this.reviews()
      .getReview(args, await this.token())
      .then((r) => [IfoodClientUtils.handlerResponse<Review>(r), undefined])
      .catch(e => [undefined, e])
  }
}
