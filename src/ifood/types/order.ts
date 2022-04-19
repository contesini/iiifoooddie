export interface Order {
    benefits: Benefit[];
    orderType: string;
    payments: Payments;
    merchant: Merchant;
    salesChannel: string;
    picking: Picking;
    orderTiming: string;
    createdAt: string;
    total: Total;
    preparationStartDateTime: string;
    id: string;
    displayId: string;
    items: Item[];
    customer: Customer;
    extraInfo: string;
    additionalFees: AdditionalFee[];
    delivery: Delivery;
    schedule: Schedule;
    indoor: Indoor;
    takeout: Takeout;
  }
  
  export interface Takeout {
    mode: string;
    takeoutDateTime: string;
  }
  
  export interface Indoor {
    mode: string;
    deliveryDateTime: string;
    table: string;
  }
  
  export interface Schedule {
    deliveryDateTimeStart: string;
    deliveryDateTimeEnd: string;
  }
  
  export interface Delivery {
    mode: string;
    deliveredBy: string;
    deliveryAddress: DeliveryAddress;
    deliveryDateTime: string;
  }
  
  export interface DeliveryAddress {
    reference: string;
    country: string;
    streetName: string;
    formattedAddress: string;
    streetNumber: string;
    city: string;
    postalCode: string;
    coordinates: Coordinates;
    neighborhood: string;
    state: string;
    complement: string;
  }
  
  export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
  export interface AdditionalFee {
    type: string;
    value: number;
  }
  
  export interface Customer {
    phone: Phone;
    documentNumber: string;
    name: string;
    ordersCountOnMerchant: number;
    id: string;
  }
  
  export interface Phone {
    number: string;
    localizer: string;
    localizerExpiration: string;
  }
  
  export interface Item {
    unitPrice: number;
    quantity: number;
    externalCode: string;
    totalPrice: number;
    index: number;
    unit: string;
    ean: string;
    price: number;
    scalePrices: ScalePrices;
    observations: string;
    imageUrl: string;
    name: string;
    options: Option[];
    id: string;
    optionsPrice: number;
  }
  
  export interface Option {
    unitPrice: number;
    unit: string;
    ean: string;
    quantity: number;
    externalCode: string;
    price: number;
    name: string;
    index: number;
    id: string;
    addition: number;
  }
  
  export interface ScalePrices {
    defaultPrice: number;
    scales: Scale[];
  }
  
  export interface Scale {
    minQuantity: number;
    price: number;
  }
  
  export interface Total {
    benefits: number;
    deliveryFee: number;
    orderAmount: number;
    subTotal: number;
    additionalFees: number;
  }
  
  export interface Picking {
    picker: string;
    replacementOptions: string;
  }
  
  export interface Merchant {
    name: string;
    id: string;
  }
  
  export interface Payments {
    methods: Method[];
    pending: number;
    prepaid: number;
  }
  
  export interface Method {
    wallet: Wallet;
    method: string;
    prepaid: boolean;
    currency: string;
    type: string;
    value: number;
    cash: Cash;
    card: Card;
  }
  
  export interface Card {
    brand: string;
  }
  
  export interface Cash {
    changeFor: number;
  }
  
  export interface Wallet {
    name: string;
  }
  
  export interface Benefit {
    targetId: string;
    sponsorshipValues: SponsorshipValue[];
    value: number;
    target: string;
  }
  
  export interface SponsorshipValue {
    name: string;
    value: number;
  }