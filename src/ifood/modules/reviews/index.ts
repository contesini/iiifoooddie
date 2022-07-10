import { AxiosInstance } from "axios";
import { getDateBefore, handleResponse } from "../../utils";
import { IfoodGetReviewError } from "../../errors";
import {
  MerchantReviewInput,
  MerchantReviewsInput,
} from "../../types/merchant";
import { Review, ReviewResponse } from "../../types/reviews";
import { IfoodModule } from "../module";

const PATH_GET_REVIEWS = (id: string) => `/review/v1.0/merchants/${id}/reviews`;

const PATH_GET_REVIEW_BY_ID = (args: MerchantReviewInput) =>
  `/review/v1.0/merchants/${args.merchantId}/${args.reviewId}`;

export class IfoodReviewModule extends IfoodModule {
  constructor(client: AxiosInstance) {
    super(client, "ifood-client-review");
  }

  public async getMerchantReviews(
    { merchantId, ...args }: MerchantReviewsInput,
    reviews: Review[] = []
  ): Promise<Review[]> {
    try {
      this.logger.debug(`get all reviews page: ${args.page || 1}`);
      const defaultParams = {
        dateFrom: getDateBefore(90).toISOString(),
        dateTo: new Date().toISOString(),
        pageSize: 10,
        addCount: true,
      };
      const params = { ...defaultParams, ...args };
      const response = await this.client.get(PATH_GET_REVIEWS(merchantId), {
        params,
      });
      const reviewResponse = handleResponse<ReviewResponse>(response);
      reviews = [...reviews, ...reviewResponse.reviews];
      if (reviewResponse.pageCount < reviewResponse.page) {
        const newArgs = { merchantId, ...args, page: reviewResponse.page + 1 };
        return await this.getMerchantReviews(newArgs, reviews);
      }
      return reviews;
    } catch (error) {
      this.logger.error(error);
    }

    throw new IfoodGetReviewError(`An error occurred requesting Merchant Reviews of ${merchantId}`);
  }

  public async getReview(args: MerchantReviewInput): Promise<Review> {
    this.logger.debug(`getReview for id: ${args.merchantId}`);
    try {
      const response = await this.client.get(PATH_GET_REVIEW_BY_ID(args), {
        params: args,
      });
      return handleResponse<Review>(response);
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodGetReviewError("get error when request getReview");
  }
}
