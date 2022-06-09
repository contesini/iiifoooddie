import Logger from '../../../utils/logger'
import axios, { AxiosError, AxiosResponse } from 'axios'
import IfoodClientUtils from '../../utils'
import { Review, ReviewResponse } from '../../types/reviews'
import { IfoodGetReviewError, IfoodGetReviewsError, IfoodInvalidClientToken } from '../../errors'
import { MerchantReviewInput, MerchantReviewsInput } from '../../types/merchant'
import axiosRetry from 'axios-retry';

axiosRetry(axios, { 
  retries: 3,
  retryCondition: (error: AxiosError) => {
    if (error.code == "429"){
      console.error("[Ifood] - Too many requests...");
      return false;
    }
    return true
  }
});
export default class IfoodClientReview {
  private static logger = new Logger('ifood-client-review')

  private static MERCHANT_REVIEWS_GET_PATH = (id: string) =>
    new IfoodClientUtils().formatURL(`/review/v1.0/merchants/${id}/reviews`)

  private static MERCHANT_REVIEW_GET_PATH = (args: MerchantReviewInput) =>
    new IfoodClientUtils().formatURL(
      `/review/v1.0/merchants/${args.merchantId}/${args.reviewId}`,
    )

  private static async sleep(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

  private static getMerchantReviewParams(args: MerchantReviewsInput) {
    IfoodClientReview.logger.info('get merchant review params')
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
  ): Promise<ReviewResponse[]> {
    IfoodClientReview.logger.info('get all reviews')
    const reviews = []
    try {
      for (let index = 1; index < pageSize; index++) {
        const params = IfoodClientReview.getMerchantReviewParams({
          ...args,
          page: 1 + index,
        })
        this.sleep(45)

        const reviewResponse = await axios({
          url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
          headers: IfoodClientUtils.getHeaders(token),
          method: 'GET',
          params,
        })
        const review = IfoodClientUtils.handlerResponse<ReviewResponse[]>(reviewResponse)
        reviews.push(...review)
      }
      return reviews

    } catch (error) {
      IfoodClientReview.logger.error(error)
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
    IfoodClientReview.logger.info(`getMerchantReviews for id: ${args.merchantId}`)
    const params = this.getMerchantReviewParams(args)
    try {
      const firstReviewResponse = await axios({
        url: this.MERCHANT_REVIEWS_GET_PATH(args.merchantId),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      })
      const firstReviewResponseData = IfoodClientUtils.handlerResponse<ReviewResponse>(
        firstReviewResponse,
      )
      const reviews = (await this.getAllReviews(
        args,
        firstReviewResponseData.pageCount,
        token,
      ))
      return [
        firstReviewResponseData,
        ...reviews
      ]
    } catch (error) {
      IfoodClientReview.logger.error(error)
    }
    throw new IfoodGetReviewsError(
      `Get error when trying to get merchant reviews from merchant ${args.merchantId}`,
    )
  }

  public static async getReview(
    args: MerchantReviewInput,
    token: string
  ): Promise<AxiosResponse<any, any>> {
    if (token === undefined || token === '') throw new IfoodInvalidClientToken("invalid token");
    IfoodClientReview.logger.info(`getReview for id: ${args.merchantId}`)
    const params = IfoodClientUtils.getParamsFromArgs(args)
    try {
      const response = await axios({
        url: IfoodClientReview.MERCHANT_REVIEW_GET_PATH(args),
        headers: IfoodClientUtils.getHeaders(token),
        method: 'GET',
        params,
      })
      return response
    } catch (error) {
      IfoodClientReview.logger.error(error)
    }
    throw new IfoodGetReviewError("get error when request getReview")
  }
}
