// import IfoodClientFinancial from '../../../../src/ifood/modules/financial'
import axios from "axios";
import { IfoodFinancialModule } from "../../../../src/ifood/modules/financial";
import { merchantFinancialDetailsMockData } from "./static";

const args = {
  merchantId: "id",
};
jest.mock("axios");

const mockedClient = axios as jest.Mocked<typeof axios>;

describe("ifood-client-financial", () => {
  let financialModule: IfoodFinancialModule;

  beforeAll(() => {
    financialModule = new IfoodFinancialModule(mockedClient);
  });

  describe("", () => {
    it("should get getMerchantDetails", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantFinancialDetailsMockData);
      // when
      const result = await financialModule.getMerchantSales(args);
      expect(result).toEqual(merchantFinancialDetailsMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantFinancialDetailsMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      try {
        // when
        await financialModule.getMerchantSales(args);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchant sales from merchant ${args.merchantId}`
        );
      }
    });
  });
});
