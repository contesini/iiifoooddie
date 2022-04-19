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

export class IfoodAuthFailedError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "IfoodAuthFailedError"
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

