import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  AUTHENTICATION_PATH,
  IfoodClientAuth,
} from "../../../../src/ifood/modules/auth";

jest.mock("axios", () => {
  return {
    ...(jest.requireActual("axios") as object),
    create: jest.fn().mockReturnValue(jest.requireActual("axios")),
  };
});
jest.useFakeTimers();

const mockAdapter = new MockAdapter(axios);

describe("ifood-client-auth", () => {
  let authClient: IfoodClientAuth;
  beforeEach(() => {
    authClient = new IfoodClientAuth("https://merchant-api.ifood.com.br", {
      clientId: "clientid",
      clientSecret: "clientsecret",
    });
  });

  it("should authenticate and generate token", async () => {
    // given
    const token = {
      status: 200,
      data: {
        accessToken: "token",
        expiresIn: 3600,
        type: "bearer",
      },
    };

    mockAdapter.onPost(AUTHENTICATION_PATH).reply(token.status, token.data);

    // when
    const result = await authClient.getToken();
    expect(result).toEqual(token.data.accessToken);
  });

  it("should throw error when credentials are invalid", async () => {
    const error = {
      code: "Unauthorized",
      message: "Bad credentials",
    };

    mockAdapter.onPost(AUTHENTICATION_PATH).reply(401, { error });

    // when
    try {
      await authClient.refreshToken();
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      expect(errorMessage).toBe(
        "Please check IFOOD_CLIENT_ID and IFOOD_CLIENT_SECRET are valid"
      );
    }
  });

  it("should refresh token", async () => {
    const token1 = {
      accessToken: "token1",
      expiresIn: 3600,
      type: "bearer",
    };
    const token2 = {
      accessToken: "token2",
      expiresIn: 3600,
      type: "bearer",
    };

    mockAdapter.onPost(AUTHENTICATION_PATH).reply(200, token1);

    const result = await authClient.getToken();
    jest.advanceTimersByTime(10 * 1000);

    mockAdapter.onPost(AUTHENTICATION_PATH).reply(200, token2);

    const result2 = await authClient.getToken();

    expect(result).toEqual(token1.accessToken);
    expect(result2).toEqual(token1.accessToken);

    jest.setSystemTime(Date.now() + token1.expiresIn * 1000);
    const result3 = await authClient.getToken();

    expect(result3).toEqual(token2.accessToken);
  });
});
