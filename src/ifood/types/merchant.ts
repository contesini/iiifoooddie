import { Address } from './address';
import { Order } from './order';
import { Review } from './reviews';
import { Sales } from './sales';

export type MerchantSalesInput = MerchantSalesParams & {
  merchantId: string;
};

export type MerchantSalesParams = {
  periodId?: string;
  beginLastProcessingDate?: Date;
  endLastProcessingDate?: Date;
  beginOrderDate?: Date;
  endOrderDate?: Date;
  orderStatus?: string;
};


export type MerchantSalesCancellationsParams = {
  periodId?: string;
  beginCancellationDate?: Date;
  endCancellationDate?: Date;
}

export type MerchantSalesCancellationsInput = MerchantSalesCancellationsParams & {
  merchantId: string;
};

export type MerchantSalesChargeCancellationsParams = {
  periodId?: string;
  transactionDateBegin?: Date;
  transactionDateEnd?: Date;
};

export type MerchantSalesAdjustmentsInput = MerchantSalesAdjustmentsParams & {
  merchantId: string;
};

export type MerchantSalesAdjustmentsParams = {
  periodId?: string;
  beginUpdateDate?: Date;
  endUpdateDate?: Date;
};

export type MerchantSalesChargeCancellationsInput = MerchantSalesChargeCancellationsParams & {
  merchantId: string;
};

export type MerchantReviewsInput = MerchantReviewsParams & {
  merchantId: string;
};

export type MerchantReviewsParams = {
  page?: number;
  sort?: 'DESC' | 'ASC';
  sortBy?: 'CREATED_AT' | 'ORDER_DATE';
  pageSize: number;
  dateFrom: Date;
  dateTo: Date;
};

export type MerchantReviewInput = {
  merchantId: string;
  reviewId: string;
};

export type MerchantInterruption = {
  id: string;
  description: string;
  start: Date;
  end: Date;
}

export type MerchantDetails = {
  id: string;
  name: string;
  corporateName: string;
  description: string;
  averageTicket: number;
  exclusive: boolean;
  type: string;
  status: string;
  createdAt: Date;
  address: Address;
  operations: {
    name: string;
    salesChannel: {
      name: string;
      enabled: string;
    };
  };
}

export type MerchantOperationValidation = {
  id: string;
  code: string;
  state?: string;
  message?: {
    title: string;
    subtitle: string;
    description: string;
    priority: number;
  };
}

export type MerchantOperation = {
  operation: string;
  salesChannel: string;
  available: boolean;
  state: string;
  reopenable: {
    identifier: string;
    type: string;
    reopenable: boolean;
  };
  validations: MerchantOperationValidation[];
  message: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export type MerchantResume = {
  id: string;
  name: string;
  corporateName: string;
}


export type Cancellations = {
  merchantName: string;
  merchantId: string;
  orderId: string;
  cancellationDate: Date;
  orderDate: Date;
  amount: number;
  liability: string;
  operationType: string
}
export type ChargeCancellations = {
  merchantName: string;
  paymentPlan: string;
  periodId: string;
  expectedPaymentDate: Date
  transactionId: string;
  transactionDate: Date
  amount: number;
  orderId: string;
  orderDate: Date;
}

export type SalesAdjustments = {
  orderId: string;
  billedOrderId: string;
  periodId: string;
  documentNumber: string;
  orderDate: Date;
  orderDateUpdate: Date;
  orderDateTimeUpdate: Date;
  adjustmentAmount: number;
  billedOrderUpdate: {
    gmv: number;
    totalBag: number;
    deliveryFee: number;
    benefitIfood: number;
    benefitMerchant: number;
    commission: number;
    acquirerFee: number;
    deliveryCommission: number;
    commissionRate: number;
    acquirerFeeRate: number;
    totalDebit: number;
    totalCredit: number;
    anticipationFee: number;
    anticipationFeeRate: number;
    smallOrderFee: number;
    benefitPaymentCredit: number;
    benefitAcquirerFee: number;
  }
}

export type Merchant = {
  id: string;
  name: string;
  corporateName: string;
  details?: MerchantDetails;
  operations?: MerchantOperation[];
  interruptions?: MerchantInterruption[];
  sales?: Sales[];
  cancellations?: Cancellations[];
  chargeCancellations?: ChargeCancellations[];
  reviews?: Review[];
  salesAdjustments?: SalesAdjustments[];
}
