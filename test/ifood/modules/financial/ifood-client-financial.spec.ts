import axios from 'axios'
import IfoodClientFinancial from '../../../../src/ifood/modules/financial'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { merchantFinancialDetailsMockData } from './static'

dotenv.config({ path: path.join(__dirname, '../.env') })

const args = {
  merchantId: "id",
}

jest.mock('axios')

describe('ifood-client-financial', () => {
  describe('', () => {
    it('should get getMerchantDetails', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantFinancialDetailsMockData)
        .mockReturnValueOnce(merchantFinancialDetailsMockData)

      // when
      const result = await IfoodClientFinancial.getMerchantSales(args, 'authorized')

      expect(result.data).toEqual(merchantFinancialDetailsMockData.data)
      expect(result.status).toEqual(merchantFinancialDetailsMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantFinancialDetailsMockData,
      )

      try {
        // when
        await IfoodClientFinancial.getMerchantSales(args, 'authorized')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantFinancialDetailsMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientFinancial.getMerchantSales(args, 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchant reviews from merchant `,
        )
      }
    })
  })
})
