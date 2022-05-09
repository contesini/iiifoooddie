import axios from "axios";
import IfoodClientAuth from "../../../../src/ifood/modules/auth";
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../.env') })

jest.mock("axios");

describe("ifood-client-auth", () => {
    it("should authenticate and generate token", async () => {
      // given
      const token = {
        status: 200,
        data: "xpto-token"
      };

      (axios as unknown as jest.Mock).mockResolvedValueOnce(token);

      // when
      const result = await IfoodClientAuth.authenticate()

      expect(result).toEqual(token.data);


    });
    it("should return error when credentials is invalid", async() => {
      // given
      const token = {
        status: 403,
        data: undefined
      };

      (axios as unknown as jest.Mock).mockResolvedValueOnce(token);

      try {
        await IfoodClientAuth.authenticate()
        
      } catch (error) {
        
        expect(error.message).toBe("Please check IFOOD_CLIENT_ID and IFOOD_CLIENT_SECRET are valid")
      }
      // when

    });

});
