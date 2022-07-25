import {
  getDateBefore,
  handleDates,
  splitter,
  toDate,
} from "../../../../src/ifood/utils";

// import axios from "axios";

// jest.mock("axios", () => ({
//   __esModule: true,
//   default: {
//     interceptors: {
//       request: { use: jest.fn(() => {}) },
//       response: { use: jest.fn(() => {}) },
//     },
//   },
// }));
// const mockedClient = axios as jest.Mocked<typeof axios>;

// const mockRequestCallback = (axios.interceptors.request.use as jest.Mock).mock
//   .calls[0][0];

describe("Utils", () => {
  describe("Date conversion", () => {
    it("should convert Date() to YYYY-MM-DD", () => {
      const date = new Date(2020, 0, 1);
      const result = toDate(date);
      expect(result).toEqual("2020-01-01");
    });
    it("should convert ISO string to date", () => {
      const obj = {
        test: "2020-01-01T00:00:00.000Z",
        nestObj: {
          test2: "2020-01-02T00:00:00.000Z",
        },
      };
      handleDates(obj);
      expect(obj.test).toBeInstanceOf(Date);
      expect(obj.nestObj.test2).toBeInstanceOf(Date);
    });
    it("should return X days before", () => {
      const check = new Date(new Date().setDate(new Date().getDate() - 10));

      const dateBefore = getDateBefore(10);

      expect(dateBefore).toEqual(check);
    });
  });
  describe("splitter", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    it("should split array of five", () => {
      const result = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
      ];
      const splitted = splitter(array, 5);
      expect(splitted).toEqual(result);
    });
    it("should split array of three", () => {
      const result = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
      const splitted = splitter(array, 3);
      expect(splitted).toEqual(result);
    });
    it("should split empty array", () => {
      const result: string[] = [];
      const array: string[] = [];
      const splitted = splitter(array, 3);
      expect(splitted).toEqual(result);
    });
  });
  //   describe("Interceptors", () => {
  //     it("should add retry interceptor", () => {
  //       addRetryInterceptor(mockedClient);

  //       mockedClient.get.mockImplementationOnce(async () => "test");

  //       mockedClient.get("/test");

  //       expect(mockRequestCallback).toBeInstanceOf(Function);
  //     });
  //   });
});
