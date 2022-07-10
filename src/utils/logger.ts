import {
  createLogger,
  format,
  Logger as WinstonLogger,
  transports,
} from "winston";
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }: any) => {
  return `${level} - [${label}] - ${timestamp}: ${message}`;
});

enum LogLevel {
  debug = "debug",
  info = "info",
  warn = "warn",
  error = "error",
  none = "none",
}
export default class Logger {
  private logger: WinstonLogger;
  private LEVEL = process.env.IFOOD_LOG_LEVEL || "info";

  constructor(labelString: string) {
    this.logger = createLogger({
      level: this.LEVEL,
      format: combine(label({ label: labelString }), timestamp(), myFormat),
      transports: [new transports.Console()],
    });
  }

  public log(level: LogLevel, message: any): void {
    this.logger.log({ level, message });
  }

  public info(message: any): void {
    this.log(LogLevel.info, message);
  }

  public debug(message: any): void {
    this.log(LogLevel.debug, message);
  }

  public error(message: any): void {
    this.log(LogLevel.error, message);
  }
}
