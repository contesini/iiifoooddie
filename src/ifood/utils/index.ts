import { AxiosResponse } from 'axios'

import Logger from '../../utils/logger'
import {IfoodResponseFailedError} from '../errors/index'

export default class IfoodClientUtils {

  private static logger = new Logger('ifood-client-utils')

  public static IFOOD_MERCHANT_API_URL = process.env.IFOOD_MERCHANT_API_URL;

  public formatURL = (path: string) => `${IfoodClientUtils.IFOOD_MERCHANT_API_URL}${path}`;

  public static getParamsFromArgs(args: any) {
    IfoodClientUtils.logger.info('get params from args')
    const params = new URLSearchParams();
    const argsKeys = Object.keys(args);
    for (let index = 0; index < argsKeys.length; index++) {
      const argKey = argsKeys[index];
      params.append(argKey, args[argKey]);
    }
    return params;
  }

  public static getHeaders(token?: string): any {
    IfoodClientUtils.logger.info('get headers')
    if (token) {
      return {
        'Content-Type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    };
  }

  public static handlerResponse<T>(resp: AxiosResponse<any, any>): T {
    if (resp.status === 200) {
      IfoodClientUtils.logger.log('debug', `get reponse ${JSON.stringify(resp)}`)
      return resp.data
    } else {
      IfoodClientUtils.logger.log('info', `get response status ${resp.status}`)
      throw new IfoodResponseFailedError(
        `response from ifood return status code ${resp.status}`,
      )
    }
  }

  public static appendKeyIfNoExists(
    params: URLSearchParams,
    key: string,
    value: string,
  ) {
    if (!params.get(key)) {
      IfoodClientUtils.logger.info(`append key ${key} with value: ${value}`)
      params.append(key, value);
    }
  }
  
}
