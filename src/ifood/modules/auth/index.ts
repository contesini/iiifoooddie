import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import qs from "qs";
import {
  IfoodAuthForbidden,
  IfoodInvalidClientIdError,
  IfoodInvalidClientSecretError
} from "../../errors";
import { Authentication } from "../../types/auth";
import {
  getDefaultAuthHeaders, handleResponse
} from "../../utils";
import { IfoodModule } from "../module";

export type IfoodAuthConfig = {
  clientId?: string;
  clientSecret?: string;
  grantType?: string;
};

export const AUTHENTICATION_PATH = "/authentication/v1.0/oauth/token";
export class IfoodClientAuth extends IfoodModule {
  constructor(baseURL: string, config: IfoodAuthConfig | undefined) {
    super(
      axios.create({ baseURL, headers: getDefaultAuthHeaders() }),
      "ifood-client-auth"
    );
    this.logger.debug(`URL: ${baseURL}`);
    let defaultConfig: IfoodAuthConfig = {
      clientId: process.env.IFOOD_CLIENT_ID,
      clientSecret: process.env.IFOOD_CLIENT_SECRET,
      grantType: "client_credentials",
    };
    this.config = { ...defaultConfig, ...config };
    if (!this.config.clientId) {
      throw new IfoodInvalidClientIdError("Credentials Missing");
    }
    if (!this.config.clientSecret) {
      throw new IfoodInvalidClientSecretError("Credentials Missing");
    }
  }

  private config: IfoodAuthConfig;

  private token: string = "";
  private expiresIn: number = 0;

  async getToken(): Promise<string> {
    this.logger.debug("getToken");
    if (this.isValid()) {
      return this.token;
    }
    return await this.refreshToken();
  }

  isValid(): boolean {
    this.logger.debug(`Date: ${Date.now()} expiresIn: ${this.expiresIn}`);
    return this.token != "" && this.expiresIn > Date.now();
  }

  async refreshToken(): Promise<string> {
    this.logger.debug("refreshToken");
    this.logger.debug(qs.stringify(this.config));
    try {
      const resp = await this.client.post(
        AUTHENTICATION_PATH,
        qs.stringify(this.config)
      );
      const token = handleResponse<Authentication>(resp);
      if (token !== undefined) {
        this.logger.debug("get token with sucess");
        this.logger.debug(`expires in ${token.expiresIn}`);

        this.expiresIn = Date.now() + (token.expiresIn - 1) * 1000;
        this.token = token.accessToken;
        this.logger.debug(this.token);
        return this.token;
      }
    } catch (error) {
      this.logger.error(error);
    }
    throw new IfoodAuthForbidden(
      "Please check IFOOD_CLIENT_ID and IFOOD_CLIENT_SECRET are valid"
    );
  }

  loadAuthInterceptor(instance: AxiosInstance) {
    instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      if (!config.headers) config.headers = {};
      const token = await this.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }
}
