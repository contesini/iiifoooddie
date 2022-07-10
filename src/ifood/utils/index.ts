import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import axiosRetry from "axios-retry";

import Logger from "../../utils/logger";
import { IfoodResponseFailedError } from "../errors";

const logger = new Logger("ifood-client-utils");

export function handleResponse<T>(resp: AxiosResponse<any, any>): T {
  if (resp.status === 200) {
    return resp.data;
  } else {
    logger.debug(`get reponse ${JSON.stringify(resp.status)}`);
    throw new IfoodResponseFailedError(
      `Request to '${resp.config.url}' returned status code ${resp.status}`
    );
  }
}

export function getDefaultHeaders(): { [key: string]: string } {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    accept: "application/json",
  };
}

export async function sleep(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDateBefore(days: number): Date {
  return new Date(new Date().setDate(new Date().getDate() - days));
}

export function toDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function addRetryInterceptor(instance: AxiosInstance) {
  axiosRetry(instance, {
    retries: 3,
    retryCondition: (error: AxiosError) => {
      if (error.code == "429") {
        console.error("[Ifood] - Too many requests...");
        return false;
      }
      return true;
    },
  });
}