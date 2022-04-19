export interface Sales {
    orderId: string;
    orderDate: string;
    lastProcessingDate: string;
    orderStatus: string;
    companyName: string;
    documentNumber: string;
    businessModelOrder: string;
    periodId: string;
    orderDateTime: string;
    lastProcessingDateTime: string;
    deliveryProviderType: string;
    payment: Payment;
    billing: Billing;
    transfer: Transfer;
  }
  
  export interface Transfer {
    expectedTransferDate: string;
    expectedBankAccount: ExpectedBankAccount;
  }
  
  export interface ExpectedBankAccount {
    bankNumber: string;
    bankName: string;
    branchCode: string;
    branchCodeDigit: string;
    accountNumber: string;
    accountNumberDigit: string;
  }
  
  export interface Billing {
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
    anticipationFee: number;
    anticipationFeeRate: number;
    smallOrderFee: number;
    totalDebit: number;
    totalCredit: number;
  }
  
  export interface Payment {
    type: string;
    method: string;
    brand: string;
    liability: string;
    cardNumber: string;
    nsu: string;
  }