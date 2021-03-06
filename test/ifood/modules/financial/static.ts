export const merchantFinancialDetailsMockData = {
  status: 200,
  data: [
    {
      orderId: 'ce19c622-954c-498a-ba6b-60cd0b1889f9',
      orderDate: '2020-01-01',
      lastProcessingDate: '2020-01-01',
      orderStatus: 'CONCLUDED',
      companyName: 'BK',
      documentNumber: '123456789',
      businessModelOrder: 'MARKETPLACE',
      periodId: '100',
      orderDateTime: '2021-04-29T18:32:30.455Z',
      lastProcessingDateTime: '2021-04-29T18:32:30.455Z',
      deliveryProviderType: 'IFOOD',
      payment: {
        type: 'ONLINE',
        method: 'CREDIT',
        brand: 'MASTERCARD',
        liability: 'MERCHANT',
        cardNumber: '1234',
        nsu: '2121254',
      },
      billing: {
        gmv: 105,
        totalBag: 100,
        deliveryFee: 0,
        benefitIfood: 0,
        benefitMerchant: 0,
        commission: 0,
        acquirerFee: 0,
        deliveryCommission: 5,
        commissionRate: 0,
        acquirerFeeRate: 0.5,
        anticipationFee: 0,
        anticipationFeeRate: 0,
        smallOrderFee: 0,
        totalDebit: 10,
        totalCredit: 95,
      },
      transfer: {
        expectedTransferDate: '2020-01-01',
        expectedBankAccount: {
          bankNumber: '033',
          bankName: 'Bank',
          branchCode: '123',
          branchCodeDigit: '1',
          accountNumber: '1234',
          accountNumberDigit: '1',
        },
      },
    },
  ],
}
