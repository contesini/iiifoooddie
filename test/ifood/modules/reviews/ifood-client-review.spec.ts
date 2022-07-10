import axios from "axios";
import * as path from "path";
import { MerchantReviewsInput } from "../../../../src/ifood/types/merchant";
import { IfoodReviewModule } from "../../../../src/ifood/modules/reviews";

import { merchantsReviewsMockData, reviewDetailsMockData } from "./static";

jest.mock("axios");
const mockedClient = axios as jest.Mocked<typeof axios>;

const args = {
  merchantId: "id",
  reviewId: "id",
};

const argsReviewsMerchant: MerchantReviewsInput = {
  merchantId: "id",
  page: 0,
  sort: "ASC",
  sortBy: "ORDER_DATE",
  dateFrom: new Date(),
  dateTo: new Date(),
  pageSize: 10,
};

describe("ifood-client-order", () => {
  let reviewModule: IfoodReviewModule;

  beforeAll(() => {
    reviewModule = new IfoodReviewModule(mockedClient);
  });

  describe("getReview", () => {
    it("should get getReview", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(reviewDetailsMockData);
      // when
      const result = await reviewModule.getReview(args);
      expect(result).toEqual(reviewDetailsMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const order = {
        status: 400,
        data: reviewDetailsMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(order);
      try {
        // when
        await reviewModule.getReview(args);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(`get error when request getReview`);
      }
    });
  });

  describe("getMerchantReviews", () => {
    it("should get getMerchantReviews", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantsReviewsMockData);
      // when
      const result = await reviewModule.getMerchantReviews(argsReviewsMerchant);
      expect(result).toEqual(merchantsReviewsMockData.data.reviews);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const order = {
        status: 400,
        data: merchantsReviewsMockData,
      };
      mockedClient.get.mockResolvedValueOnce(order);
      try {
        // when
        await reviewModule.getMerchantReviews(argsReviewsMerchant);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `An error occurred requesting Merchant Reviews of ${argsReviewsMerchant.merchantId}`
        );
      }
    });
  });
});
