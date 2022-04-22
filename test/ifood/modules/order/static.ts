export const orderDetailsMockData = {
  status: 200,
  data: {
    benefits: [
      {
        targetId: 'string',
        sponsorshipValues: [
          {
            name: 'string',
            value: 0,
          },
        ],
        value: 0,
        target: 'string',
      },
    ],
    orderType: 'DELIVERY',
    payments: {
      methods: [
        {
          wallet: {
            name: 'string',
          },
          method: 'string',
          prepaid: true,
          currency: 'string',
          type: 'ONLINE',
          value: 0,
          cash: {
            changeFor: 0,
          },
          card: {
            brand: 'string',
          },
        },
      ],
      pending: 0,
      prepaid: 0,
    },
    merchant: {
      name: 'string',
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    salesChannel: 'string',
    picking: {
      picker: 'string',
      replacementOptions: 'STORE_CHOOSE_OTHER_ITEMS',
    },
    orderTiming: 'IMMEDIATE',
    createdAt: '2022-04-22T10:50:57.852Z',
    total: {
      benefits: 0,
      deliveryFee: 0,
      orderAmount: 0,
      subTotal: 0,
      additionalFees: 0,
    },
    preparationStartDateTime: '2022-04-22T10:50:57.852Z',
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    displayId: 'string',
    items: [
      {
        unitPrice: 0,
        quantity: 0,
        externalCode: 'string',
        totalPrice: 0,
        index: 0,
        unit: 'string',
        ean: 'string',
        price: 0,
        scalePrices: {
          defaultPrice: 0,
          scales: [
            {
              minQuantity: 0,
              price: 0,
            },
          ],
        },
        observations: 'string',
        imageUrl: 'string',
        name: 'string',
        options: [
          {
            unitPrice: 0,
            unit: 'string',
            ean: 'string',
            quantity: 0,
            externalCode: 'string',
            price: 0,
            name: 'string',
            index: 0,
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            addition: 0,
          },
        ],
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        optionsPrice: 0,
      },
    ],
    customer: {
      phone: {
        number: 'string',
        localizer: 'string',
        localizerExpiration: '2022-04-22T10:50:57.852Z',
      },
      documentNumber: 'string',
      name: 'string',
      ordersCountOnMerchant: 0,
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    },
    extraInfo: 'string',
    additionalFees: [
      {
        type: 'string',
        value: 0,
      },
    ],
    delivery: {
      mode: 'DEFAULT',
      deliveredBy: 'IFOOD',
      deliveryAddress: {
        reference: 'string',
        country: 'string',
        streetName: 'string',
        formattedAddress: 'string',
        streetNumber: 'string',
        city: 'string',
        postalCode: 'string',
        coordinates: {
          latitude: 0,
          longitude: 0,
        },
        neighborhood: 'string',
        state: 'string',
        complement: 'string',
      },
      deliveryDateTime: '2022-04-22T10:50:57.852Z',
    },
    schedule: {
      deliveryDateTimeStart: '2022-04-22T10:50:57.852Z',
      deliveryDateTimeEnd: '2022-04-22T10:50:57.852Z',
    },
    indoor: {
      mode: 'DEFAULT',
      deliveryDateTime: '2022-04-22T10:50:57.852Z',
      table: 'string',
    },
    takeout: {
      mode: 'DEFAULT',
      takeoutDateTime: '2022-04-22T10:50:57.852Z',
    },
  },
}
