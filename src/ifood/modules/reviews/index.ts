import Logger from '../../../utils/logger'
import axios, { AxiosError, AxiosResponse } from 'axios'
import IfoodClientUtils from '../../utils'
import { Review, ReviewResponse } from '../../types/reviews'
import { IfoodGetReviewError, IfoodGetReviewsError, IfoodInvalidClientToken } from '../../errors'
import { MerchantReviewInput, MerchantReviewsInput, MerchantReviewsParams } from '../../types/merchant'
import axiosRetry from 'axios-retry';

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

  private static getMerchantReviewParams(args: MerchantReviewsParams) {
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

    IfoodClientUtils.appendKeyIfNoExists(params, 'dateFrom', dateFrom);
    IfoodClientUtils.appendKeyIfNoExists(params, 'dateTo', dateTo);
    IfoodClientUtils.appendKeyIfNoExists(params, 'pageSize', '10');
    IfoodClientUtils.appendKeyIfNoExists(params, 'addCount', 'true');
    return params
  }

  public static async getMerchantReviews({ merchantId, ...args }: MerchantReviewsInput, token: string, reviews: Review[] = []): Promise<any> {
    IfoodClientReview.logger.info(`get all reviews page: ${args.page || 1}`)
    const params = IfoodClientReview.getMerchantReviewParams(args)
    const response = await axios({
      url: this.MERCHANT_REVIEWS_GET_PATH(merchantId),
      headers: IfoodClientUtils.getHeaders(token),
      method: 'GET',
      params,
    })
    const reviewResponse = IfoodClientUtils.handlerResponse<ReviewResponse>(response)

    if (reviewResponse.pageCount > reviewResponse.page) {
      const newArgs = { merchantId, ...args, page: reviewResponse.page + 1 }
      return await this.getMerchantReviews(newArgs, token, [...reviews, ...reviewResponse.reviews])
    }

    const returner = [...reviews, ...reviewResponse.reviews]
    return returner
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
