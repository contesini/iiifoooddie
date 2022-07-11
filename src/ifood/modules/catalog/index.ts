import { IfoodGetCatalogError, IfoodGetCatalogsChangelogError, IfoodGetUnsellableItemsError, IfoodGetSellableItemsError } from "../../errors";
import { handleResponse } from "../../utils";
import { IfoodModule } from "../module";
import { AxiosInstance } from "axios";
import { CatalogChangelog, CatalogChangelogInput, MerchantCatalogsInput, ResponseIfoodCatalog, SellableItemsInput, SellableItemsResponse, UnsellableItemResponse, UnsellableItemsInput } from "@ifood/types/catalog";

const MERCHANTS_CATALOGS_GET_PATH = (merchantId: string) =>
    `/merchants/${merchantId}/catalogs`;

const CATALOG_CHANGELOG_GET_PATH = (merchantId: string, catalogId: string) =>
    `/merchants/${merchantId}/catalogs/${catalogId}/changelog`

const CATALOG_UNSELLABLE_ITEMS_GET_PATH = (merchantId: string, catalogId: string) =>
    `/merchants/${merchantId}/catalogs/${catalogId}/unsellableItems`

const CATALOG_SELLABLE_ITEMS_GET_PATH = (merchantId: string, catalogId: string) => 
`/merchants/${merchantId}/catalogs/${catalogId}/sellableItems`

export class IfoodCatalogModule extends IfoodModule {
    constructor(client: AxiosInstance) {
        super(client, "ifood-client-catalog");
    }

    /**
     * @returns List all available catalogs given a Merchant Id 
     */
    public async getMerchantCatalogs(params: MerchantCatalogsInput): Promise<ResponseIfoodCatalog[]> {
        this.logger.debug(`getMerchantCatalogs for id: ${params.merchantId}`);

        try {
            const resp = await this.client.get(
                MERCHANTS_CATALOGS_GET_PATH(params.merchantId),
            );
            return handleResponse<ResponseIfoodCatalog[]>(resp);
        } catch (error) {
            console.error(error);
        }
        throw new IfoodGetCatalogError(
            `Get error when trying to get merchant catalogs from merchant ${params.merchantId}`
        );
    }

    /**
     * 
     * @param params `merchantId`, `catalogId`, `startDate`, `endDate`
     * @returns List all changes made to a catalog given a time window These changes are currently indexed at category level, which means, in case something is changed within a category, there will be a registry indicating something has changed. There will be two fields in the response body: modifiedAt (date and time which a change has been made) and changelogIngestedAt (date and time which a change has been processed by Changelog system). Registries will be queried based on changelogIngestedAt from newest to oldest
     */
    public async getCatalogChangelog(params: CatalogChangelogInput): Promise<CatalogChangelog[]> {
        this.logger.debug(`getCatalogChangelog for id: ${params.merchantId}`);

        try {
            const resp = await this.client.get(
                CATALOG_CHANGELOG_GET_PATH(params.merchantId, params.catalogId),
                { params: { startDate: params.startDate, endDate: params.endDate } }
            );
            return handleResponse<CatalogChangelog[]>(resp);
        } catch (error) {
            console.error(error);
        }
        throw new IfoodGetCatalogsChangelogError(
            `Get error when trying to get merchant catalogs changelog from merchant: ${params.merchantId}, catalog: ${params.catalogId}`
        );
    }

    /**
     * @param params `merchantId`, `catalogId`
     * @return List all unsellable categories or categories containing unsellable items. That is, categories or items with violations, paused ones, etc.
    */
    public async getUnsellableItemsFromCatalog(params: UnsellableItemsInput): Promise<UnsellableItemResponse[]> {
        try {
            const resp = await this.client.get(
                CATALOG_UNSELLABLE_ITEMS_GET_PATH(params.merchantId, params.catalogId),
            );
            return handleResponse<UnsellableItemResponse[]>(resp);
        } catch {
            throw new IfoodGetUnsellableItemsError(
                `Get error when trying to get merchant sales from merchant: ${params.merchantId}`
            );
        }
    }


    /**
     * @param params `merchantId`, `catalogId`
     * @returns List all sellable items, it will return only items that can be sold using all attributes and schedule information.
     */
    public async getSellableItemsFromCatalog(params: SellableItemsInput): Promise<SellableItemsResponse[]> {
        try {
            const resp = await this.client.get(
                CATALOG_SELLABLE_ITEMS_GET_PATH(params.merchantId, params.catalogId),
            );
            return handleResponse<SellableItemsResponse[]>(resp);
        } catch {
            throw new IfoodGetSellableItemsError(
                `Get error when trying to get merchant sales from merchant: ${params.merchantId}`
            );
        }
    }

}
