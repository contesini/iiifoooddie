import { AxiosInstance } from "axios";
import Logger from "../../utils/logger";


export class IfoodModule {
    protected logger: Logger;
    protected client: AxiosInstance;

    constructor(client: AxiosInstance, logger: string) {
        this.client = client;
        this.logger = new Logger(logger);
        this.logger.debug("Initializing module");
    }
}