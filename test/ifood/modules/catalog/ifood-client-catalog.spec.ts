import axios from "axios";
import { IfoodCatalogModule } from "../../../../src/ifood/modules/catalog/";
import { merchantCatalogsData } from "./static";

const args = {
  merchantId: "id",
};
jest.mock("axios");

const mockedClient = axios as jest.Mocked<typeof axios>;

describe("ifood-client-catalog", () => {
  let catalogModule: IfoodCatalogModule;

  beforeAll(() => {
    catalogModule = new IfoodCatalogModule(mockedClient);
  });

  describe("", () => {
    it("should get getMerchantCatalogs", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(merchantCatalogsData);
      // when
      const result = await catalogModule.getMerchantCatalogs(args);
      expect(result).toEqual(merchantCatalogsData.data);
    });

    it("should throw IfoodGetCatalogError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: merchantCatalogsData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      try {
        // when
        await catalogModule.getMerchantCatalogs(args);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get merchant catalogs from merchant ${args.merchantId}`
        );
      }
    });

    
  });
});
