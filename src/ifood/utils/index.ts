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
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export function getDefaultAuthHeaders(): { [key: string]: string } {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };
}

export async function sleep(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}

export function splitter<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
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

export function addDateInterceptor(instance: AxiosInstance) {
  instance.interceptors.response.use((originalResponse) => {
    handleDates(originalResponse.data);
    return originalResponse;
  });
}

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

function isIsoDateString(value: any): boolean {
  return value && typeof value === "string" && isoDateFormat.test(value);
}

export function handleDates(body: any) {
  if (body === null || body === undefined || typeof body !== "object")
    return body;

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) body[key] = parseISO(value);
    else if (typeof value === "object") handleDates(value);
  }
}

function parseISO(value: string): Date {
  return new Date(value);
}