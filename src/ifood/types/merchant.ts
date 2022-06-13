import { Address } from './address';
import { Order } from './order';
import { Sales } from './sales';

export type MerchantSalesInput = {
  merchantId: string;
  periodId?: string;
  beginLastProcessingDate?: Date;
  endLastProcessingDate?: Date;
  beginOrderDate?: Date;
  endOrderDate?: Date;
  orderStatus?: string;
};

export type MerchantSalesCancellationsInput = {
  merchantId: string;
  periodId?: string;
  beginCancellationDate?: Date;
  endCancellationDate?: Date;
};

export type MerchantSalesChargeCancellationsInput = {
  merchantId: string;
  periodId?: string;
  transactionDateBegin?: Date;
  transactionDateEnd?: Date;
};

export type MerchantReviewsInput = {
  merchantId: string;
  page: number;
  sort: 'DESC' | 'ASC';
  sortBy: 'CREATED_AT' | 'ORDER_DATE';
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

export type Merchant = {
  id: string;
  name: string;
  corporateName: string;
  details?: MerchantDetails;
  operations?: MerchantOperation[];
  interruptions?: MerchantInterruption[];
  orders?: Order[]
  sales?: Sales[]
}
