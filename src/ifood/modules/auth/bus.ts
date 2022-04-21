import Logger from '../../../utils/logger'
import IfoodClientAuth from './index'

export default class AuthEventBus {
    
  private static instance: AuthEventBus

  private static staticLoggger = new Logger('auth-event-bus')

  private logger = new Logger('auth-event-bus')

  private token: string = ''

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {}

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): AuthEventBus {
    if (!AuthEventBus.instance) {
      this.staticLoggger.info('create instance')
      AuthEventBus.instance = new AuthEventBus()
    }

    return AuthEventBus.instance
  }

  public setToken(token?: string) {
    this.logger.info('set new token')
    if (token === undefined || token === '') throw new Error('Invalid token')
    this.token = token
  }

  public async getToken() {
    if (this.token === '') {
      this.token = await IfoodClientAuth.authenticate()
    }
    return this.token
  }

}
