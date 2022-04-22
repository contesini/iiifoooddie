const { createLogger, format, transports } = require('winston')
const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }: any) => {
  return `${level} - [${label}] - ${timestamp}: ${message}`
})

const ENV = process.env.ENV

export default class Logger {
  private logger: any

  constructor(labelString: any) {
    this.logger = new createLogger({
      format: combine(label({ label: labelString }), timestamp(), myFormat),
      transports: [new transports.Console()],
    })
  }

  public log(level: any, message: any): void {
    if(ENV === 'test') return
    this.logger.log({level, message})
  }

  public info(message: any): void {
    if(ENV === 'test') return
    this.logger.log({level: 'info', message})
  }

  public debug(message: any): void {
    if(ENV === 'test') return
    this.logger.log({level: 'debug', message})
  }

  public error(message: any): void {
    if(ENV === 'test') return
    this.logger.log({level: 'error', message})
  }

}
