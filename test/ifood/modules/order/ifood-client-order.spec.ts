import axios from "axios";
import { orderDetailsMockData } from "./static";
import { IfoodOrderModule } from "../../../../src/ifood/modules/order";
jest.mock("axios");
const mockedClient = axios as jest.Mocked<typeof axios>;

describe("ifood-client-order", () => {
  let orderModule: IfoodOrderModule;

  beforeAll(() => {
    orderModule = new IfoodOrderModule(mockedClient);
  });
  describe("getOrderById", () => {
    it("should get getMerchantDetails", async () => {
      // given
      mockedClient.get.mockResolvedValueOnce(orderDetailsMockData);
      // when
      const result = await orderModule.getOrderById("id");
      expect(result).toEqual(orderDetailsMockData.data);
    });

    it("should throw IfoodGetMerchantsError when response is invalid", async () => {
      // given
      const merchants = {
        status: 400,
        data: orderDetailsMockData.data,
      };
      mockedClient.get.mockResolvedValueOnce(merchants);
      const id = "id";
      try {
        // when
        await orderModule.getOrderById(id);
      } catch (error) {
        let errorMessage = "Failed to do something exceptional";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        expect(errorMessage).toEqual(
          `Get error when trying to get order ${id}`
        );
      }
    });
  });
});
