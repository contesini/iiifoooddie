import Logger from '../../../utils/logger'
import IfoodClientAuth from '../auth/index'
import axios, { AxiosResponse } from 'axios'
import IfoodClientUtils from '../../utils'
import { Review, ReviewResponse } from '../../types/reviews'
import { IfoodGetReviewError, IfoodGetReviewsError, IfoodInvalidClientToken } from '../../errors'
import { MerchantReviewInput, MerchantReviewsInput } from '../../types/merchant'

export default class IfoodClientReviews {
  private static logger = new Logger('ifood-client-review')

  private static MERCHANT_REVIEWS_GET_PATH = (id: string) =>
    IfoodClientUtils.formatURL(`/review/v1.0/merchants/${id}/reviews`)

  private static MERCHANT_REVIEW_GET_PATH = (args: MerchantReviewInput) =>
    IfoodClientUtils.formatURL(
      `/review/v1.0/merchants/${args.merchantId}/${args.reviewId}`,
    )

  private static getMerchantReviewParams(args: MerchantReviewsInput) {
    this.logger.info('get merchant review params')
    const params = new URLSearchParams()
    const argsKeys = Object.keys(args) as []
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index]
      params.append(argKey, args[argKey])
    }
    const dateFrom = new Date(
      new Date().setDate(new Date().getDate() - 90),
    ).toISOString()
    const dateTo = new Date().toISOString()
    params.append('dateFrom', dateFrom)
    params.append('dateTo', dateTo)
    params.append('pageSize', '10')
    params.append('addCount', 'true')
    return params
  }

  public static async getAllReviews(
    args: MerchantReviewsInput,
    pageSize: number,
    token: string,
  ): Promise<AxiosResponse<any, any>[]> {
    this.logger.info('get all reviews')
    const promises = []
    try {
      for (let index = 1; index + 1 < pageSize; index++) {
        const params = this.getMerchantReviewParams({
          ...args,
          page: 1 + index,
        })
        const reviewPromise = axios({
          url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
          headers: IfoodClientUtils.getHeaders(token),
          method: 'GET',
          params,
        })
        promises.push(reviewPromise)
      }

      return  Promise.all(promises)
    } catch (error) {
      this.logger.error(error)
    }
    throw new IfoodGetReviewsError(
      `Get error when request all reviews from merchant ${args.merchantId}`,
    )
  }

  public static async getMerchantReviews(
    args: MerchantReviewsInput,
    token: string
  ): Promise<ReviewResponse[]> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getMerchantReviews for id: ${args.merchantId}`)
    const params = this.getMerchantReviewParams(args)
    try {
      const firstReviewResponse = await axios({
        url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      })
      const firstReviewResponseData = await IfoodClientUtils.handlerResponse<ReviewResponse>(
        firstReviewResponse,
      ) 
      const reviews = (await this.getAllReviews(
        args,
        firstReviewResponseData.pageCount,
        token,
      ))
      return [firstReviewResponseData, ...reviews.map(r => IfoodClientUtils.handlerResponse<ReviewResponse>(r))]
    } catch (error) {
        this.logger.error(error)
    }
    throw new IfoodGetReviewsError(
      `Get error when trying to get merchant reviews from merchant ${args.merchantId}`,
    )
  }

  public static async getReview(
    args: MerchantReviewInput,
    token: string
  ): Promise<Review> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    this.logger.info(`getReview for id: ${args.merchantId}`)
    const params = IfoodClientUtils.getParamsFromArgs(args)
    try {
      const response = await axios({
        url: this.MERCHANT_REVIEW_GET_PATH(args),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      })
      return IfoodClientUtils.handlerResponse(response) as Review
    } catch (error) {
      this.logger.error(error)
    }
    throw new IfoodGetReviewError("get error when request getReview")
  }
}
