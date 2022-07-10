// import IfoodClientMerchant from '../../../../src/ifood/modules/merchants'
import { IfoodMerchantModule } from "../../../../src/ifood/modules/merchants";
import axios from "axios";
import {
  merchantDetailsMockData,
  merchantInterruptionsMockData,
  merchantMockData,
  merchantStatusMockData,
} from "./static";

jest.mock("axios");

const mockedClient = axios as jest.Mocked<typeof axios>;

describe("ifood-client-merchant", () => {
  let merchantModule: IfoodMerchantModule;

  beforeAll(() => {
    merchantModule = new IfoodMerchantModule(mockedClient);
  });

  describe("getMerchants", () => {
    it("should get merchants", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantMockData);
      // when
      const result = await merchantModule.getMerchants();
      expect(result).toEqual(merchantMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      try {
        // when
        await merchantModule.getMerchants();
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchants from ifood api`
        );
      }
    });
  });

  describe("getMerchantStatus", () => {
    it("should get getMerchantStatus", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantStatusMockData);
      // when
      const result = await merchantModule.getMerchantStatus("id");
      expect(result).toEqual(merchantStatusMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantStatusMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      const id = "id";
      try {
        // when
        await merchantModule.getMerchantStatus(id);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchant status for merchant ${id}`
        );
      }
    });
  });

  describe("getMerchantInterruptions", () => {
    it("should get getMerchantInterruptions", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantInterruptionsMockData);
      // when
      const result = await merchantModule.getMerchantInterruptions("id");
      expect(result).toEqual(merchantInterruptionsMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantInterruptionsMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      const id = "id";
      try {
        // when
        await merchantModule.getMerchantInterruptions(id);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchant interruptions from merchant ${id}`
        );
      }
    });
  });

  describe("getMerchantDetails", () => {
    it("should get getMerchantDetails", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantDetailsMockData);
      // when
      const result = await merchantModule.getMerchantDetails("id");
      expect(result).toEqual(merchantDetailsMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantDetailsMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      const id = "id";
      try {
        // when
        await merchantModule.getMerchantStatus(id);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchant status for merchant ${id}`
        );
      }
    });
  });
});
