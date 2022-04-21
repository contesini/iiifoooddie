import Logger from '../../../utils/logger'
import IfoodClientUtils from '../../utils/index'

import {
  IfoodAuthForbidden,
  IfoodInvalidClientIdError,
  IfoodInvalidClientSecretError,
} from '../../errors/index'
import axios from 'axios'

export default class IfoodClientAuth  {
  private static logger = new Logger('ifood-client-auth')

  private static clientId = String(process.env.IFOOD_CLIENT_ID)

  private static clientSecret = String(process.env.IFOOD_CLIENT_SECRET)

  public static AUTHENTICATION_PATH = () =>
    new IfoodClientUtils().formatURL('/authentication/v1.0/oauth/token')

  private static validateIfoodClientIdAndSecret = () => {
    if (IfoodClientAuth.clientId === undefined) {
        IfoodClientAuth.logger.error('client id is undefined set env variable: IFOOD_CLIENT_ID')
      throw new IfoodInvalidClientIdError(
        'invalid client id, check env IFOOD_CLIENT_ID',
      )
    }
    if (IfoodClientAuth.clientSecret === undefined) {
        IfoodClientAuth.logger.error('client id is undefined set env variable: IFOOD_CLIENT_SECRET')
      throw new IfoodInvalidClientSecretError(
        'invalid client id, check env IFOOD_CLIENT_SECRET',
      )
    }
    IfoodClientAuth.logger.debug(`IFOOD_CLIENT_ID ${IfoodClientAuth.clientId}`)
    IfoodClientAuth.logger.debug(`IFOOD_CLIENT_SECRET ${IfoodClientAuth.clientSecret}`)

  }

  public static getAuthParams(): URLSearchParams {
    IfoodClientAuth.logger.info('get authparams')
    IfoodClientAuth.validateIfoodClientIdAndSecret()
    const params = new URLSearchParams()
    params.append('grantType', 'client_credentials')
    params.append('clientId', IfoodClientAuth.clientId)
    params.append('clientSecret', IfoodClientAuth.clientSecret)
    IfoodClientAuth.logger.debug(`get auth params ${JSON.stringify(params)}`)
    return params
  }

  public static authenticate = async () => {
    IfoodClientAuth.logger.info('authenticate')
    try {
      const params = IfoodClientAuth.getAuthParams();
      const resp = await axios({
        url: IfoodClientAuth.AUTHENTICATION_PATH(),
        method: 'POST',
        headers: IfoodClientUtils.getHeaders(),
        params,
      });
      const token = IfoodClientUtils.handlerResponse(resp)
      if (token !== undefined) {
        return token
      } 
    } catch (error) {
      IfoodClientAuth.logger.error(error);
    }
    throw new IfoodAuthForbidden("Please check IFOOD_CLIENT_ID and IFOOD_CLIENT_SECRET are valid")
  };
}
