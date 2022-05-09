import axios from 'axios'
import IfoodClientReview from '../../../../src/ifood/modules/reviews'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { merchantsReviewsMockData, reviewDetailsMockData } from './static'
import { MerchantReviewsInput } from '../../../../src/ifood/types/merchant'

dotenv.config({ path: path.join(__dirname, '../.env') })

jest.mock('axios')

const args = {
  merchantId: "id",
  reviewId: "id"
}

const argsReviewsMerchant: MerchantReviewsInput = {
  merchantId: "id",
  page: 0,
  sort:  "ASC",
  sortBy: "ORDER_DATE"
}

describe('ifood-client-order', () => {
  describe('getReview', () => {
    it('should get getReview', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(reviewDetailsMockData)
        .mockReturnValueOnce(reviewDetailsMockData)

      // when
      const result = await IfoodClientReview.getReview(args, 'authorized')

      expect(result.data).toEqual(reviewDetailsMockData.data)
      expect(result.status).toEqual(reviewDetailsMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        reviewDetailsMockData,
      )

      try {
        // when
        await IfoodClientReview.getReview(args, '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const order = {
        status: 400,
        data: reviewDetailsMockData.data,
      };

      ((axios as unknown) as jest.Mock).mockResolvedValueOnce(order)

      try {
        // when
        await IfoodClientReview.getReview(args, 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `get error when request getReview`,
        )
      }
    })
  })

  describe('getMerchantReviews', () => {
    it('should get getMerchantReviews', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantsReviewsMockData)
        .mockReturnValueOnce(merchantsReviewsMockData)

      // when
      const result = await IfoodClientReview.getMerchantReviews(argsReviewsMerchant, 'authorized')

      expect(result).toEqual([merchantsReviewsMockData.data])
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantsReviewsMockData,
      )

      try {
        // when
        await IfoodClientReview.getMerchantReviews(argsReviewsMerchant, '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const order = {
        status: 400,
        data: merchantsReviewsMockData,
      };

      ((axios as unknown) as jest.Mock).mockResolvedValueOnce(order)

      try {
        // when
        await IfoodClientReview.getMerchantReviews(argsReviewsMerchant, 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `get error when request getReview`,
        )
      }
    })
  })

  describe('getAllReviews', () => {
    it('should get getAllReviews', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantsReviewsMockData)
        .mockReturnValueOnce(merchantsReviewsMockData)

      // when
      const result = await IfoodClientReview.getAllReviews(argsReviewsMerchant, 0, 'authorized')

      expect(result).toEqual([])
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantsReviewsMockData,
      )

      try {
        // when
        await IfoodClientReview.getAllReviews(argsReviewsMerchant, 1, '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const order = {
        status: 400,
        data: merchantsReviewsMockData,
      };

      ((axios as unknown) as jest.Mock).mockResolvedValueOnce(order)

      try {
        // when
        await IfoodClientReview.getAllReviews(argsReviewsMerchant, 1, 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `get error when request getReview`,
        )
      }
    })
  })

})
