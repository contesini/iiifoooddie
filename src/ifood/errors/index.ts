export class IfoodInvalidClientToken extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodInvalidClientToken"
    }
}

export class IfoodInvalidClientIdError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodInvalidClientIdError"
    }
}

export class IfoodInvalidClientSecretError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodInvalidClientSecretError"
    }
}

export class IfoodAuthForbidden extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodAuthForbidden"
    }
}

export class IfoodResponseFailedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodResponseFailedError"
    }
}

export class IfoodGetReviewsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetReviewsError"
    }
}

export class IfoodGetMerchantsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetMerchantsError"
    }
}

export class IfoodGetMerchantDetailsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetMerchantDetailsError"
    }
}

export class IfoodGetMerchantStatusError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetMerchantStatusError"
    }
}

export class IfoodGetMerchantInterruptionsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetMerchantInterruptionsError"
    }
}

export class IfoodGetMerchantSalesError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetMerchantSalesError"
    }
}

export class IfoodGetOrderError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetOrderError"
    }
}

export class IfoodGetReviewError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetReviewError"
    }
}

export class IfoodGetCatalogError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetCatalogError"
    }
}

export class IfoodGetCatalogsChangelogError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetCatalogsChangelogError"
    }
}

export class IfoodGetUnsellableItemsError extends  Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetUnsellableItemsError"
    }
}

export class IfoodGetSellableItemsError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodGetSellableItemsError"
    }
}

