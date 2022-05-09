import axios from 'axios'
import IfoodClientOrder from '../../../../src/ifood/modules/order'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { orderDetailsMockData } from './static'

dotenv.config({ path: path.join(__dirname, '../.env') })

jest.mock('axios')

describe('ifood-client-order', () => {
  describe('', () => {
    it('should get getMerchantDetails', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(orderDetailsMockData)
        .mockReturnValueOnce(orderDetailsMockData)

      // when
      const result = await IfoodClientOrder.getOrderById('id', 'authorized')

      expect(result.data).toEqual(orderDetailsMockData.data)
      expect(result.status).toEqual(orderDetailsMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        orderDetailsMockData,
      )

      try {
        // when
        await IfoodClientOrder.getOrderById('id', '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: orderDetailsMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientOrder.getOrderById('id', 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchant reviews from merchant `,
        )
      }
    })
  })
})
