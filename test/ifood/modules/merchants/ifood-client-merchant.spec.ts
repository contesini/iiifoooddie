import axios from 'axios'
import IfoodClientMerchant from '../../../../src/ifood/modules/merchants'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { merchantDetailsMockData, merchantInterruptionsMockData, merchantMockData, merchantStatusMockData } from './static'

dotenv.config({ path: path.join(__dirname, '../.env') })

jest.mock('axios')

describe('ifood-client-merchant', () => {
  describe('getMerchants', () => {
    it('should get merchants', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchantMockData)

      // when
      const result = await IfoodClientMerchant.getMerchants('authorized')

      expect(result.data).toEqual(merchantMockData.data)
      expect(result.status).toEqual(merchantMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchantMockData)

      try {
        // when
        await IfoodClientMerchant.getMerchants('')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientMerchant.getMerchants('authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchants from ifood api`,
        )
      }
    })
  })

  describe('getMerchantStatus', () => {
    it('should get getMerchantStatus', async () => {
      // given
      ;((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantStatusMockData)
        .mockReturnValueOnce(merchantStatusMockData)

      // when
      const result = await IfoodClientMerchant.getMerchantStatus(
        'id',
        'authorized',
      )

      expect(result.data).toEqual(merchantStatusMockData.data)
      expect(result.status).toEqual(merchantStatusMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantStatusMockData,
      )

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantStatusMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchants from ifood api`,
        )
      }
    })
  })

  describe('getMerchantInterruptions', () => {
    it('should get getMerchantInterruptions', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantInterruptionsMockData)
        .mockReturnValueOnce(merchantInterruptionsMockData)

      // when
      const result = await IfoodClientMerchant.getMerchantInterruptions(
        'id',
        'authorized',
      )

      expect(result.data).toEqual(merchantInterruptionsMockData.data)
      expect(result.status).toEqual(merchantInterruptionsMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantInterruptionsMockData,
      )

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantInterruptionsMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchants from ifood api`,
        )
      }
    })
  })


  describe('getMerchantDetails', () => {
    it('should get getMerchantDetails', async () => {
      // given
      ((axios as unknown) as jest.Mock)
        .mockResolvedValueOnce(merchantDetailsMockData)
        .mockReturnValueOnce(merchantDetailsMockData)

      // when
      const result = await IfoodClientMerchant.getMerchantDetails(
        'id',
        'authorized',
      )

      expect(result.data).toEqual(merchantDetailsMockData.data)
      expect(result.status).toEqual(merchantDetailsMockData.status)
    })

    it('should get throw IfoodInvalidClientToken when token is invalid', async () => {
      // given
      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(
        merchantDetailsMockData,
      )

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', '')
      } catch (error) {
        expect(error.message).toEqual('invalid token')
      }
    })

    it('should throw IfoodGetMerchantsError when response is invalid', async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantDetailsMockData.data,
      }

      ;((axios as unknown) as jest.Mock).mockResolvedValueOnce(merchants)

      try {
        // when
        await IfoodClientMerchant.getMerchantStatus('id', 'authorized')
      } catch (error) {
        expect(error.message).toEqual(
          `Get error when trying to get merchants from ifood api`,
        )
      }
    })
    
  })

})
