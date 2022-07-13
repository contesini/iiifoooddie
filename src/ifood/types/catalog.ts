export type MerchantCatalogsInput = {
    merchantId: string;
}

export type CatalogChangelogInput = MerchantCatalogsInput & {
    catalogId: string;
    startDate: Date;
    endDate: Date;
}

export type CatalogChangelogResponse = CatalogChangelog[]

export interface CatalogChangelog {
  ownerId: string
  catalogId: string
  categoryId: string
  categoryStatus: string
  modifiedAt: string
  changelogIngestedAt: string
  systemId: string
}


export type ResponseCatalog = Catalog[]

export type Catalog = {
  catalogId: string
  status: string
  context: string[]
  modifiedAt: string
  groupId: string
}

export type UnsellableItemsInput = Pick<CatalogChangelogInput, 'merchantId' | 'catalogId'>

export type SellableItemsInput = Pick<CatalogChangelogInput, 'merchantId' | 'catalogId'>


export interface UnsellableItemResponse {
  categories: Category[]
}

export interface Category {
  id: string
  status: string
  template: string
  restrictions: string[]
  unsellableItems: UnsellableItem[]
  unsellablePizzaItems: UnsellablePizzaItems
}

export interface UnsellableItem {
  id: string
  productId: string
  restrictions: string[]
}

export interface UnsellablePizzaItems {
  toppings: Topping[]
  crusts: Crust[]
  edges: Edge[]
  sizes: Size[]
}

export interface Topping {
  id: string
  restrictions: string[]
}

export interface Crust {
  id: string
  restrictions: string[]
}

export interface Edge {
  id: string
  restrictions: string[]
}

export interface Size {
  id: string
  restrictions: string[]
}

export type SellableItemsResponse = SellableItem[]

export interface SellableItem {
  itemId: string
  categoryId: string
  itemEan: string
  itemExternalCode: string
  categoryName: string
  categoryIndex: number
  itemName: string
  itemDescription: string
  itemAdditionalInformation: string
  logosUrls: string[]
  itemIndex: number
  itemPrice: ItemPrice
  itemMinSalePrice: number
  itemSchedules: ItemSchedules
  itemPackaging: string
  itemQuantity: number
  itemUnit: string
  itemOptionGroups: ItemOptionGroups
  itemSellingOption: ItemSellingOption
  itemGeneralTags: string[]
  itemProductTags: string[]
}

export interface ItemPrice {
  value: number
  originalValue: number
  scalePrices: ScalePrices
}

export interface ScalePrices {
  minQuantity: number
  price: number
}

export interface ItemSchedules {}

export interface ItemOptionGroups {
  optionGroupId: string
  name: string
  minQuantity: number
  maxQuantity: number
  optionGroupIndex: number
  options: Options
}

export interface Options {
  optionId: string
  name: string
  externalCode: string
  description: string
  logosUrls: string[]
  packaging: string
  quantity: number
  unit: string
  price: Price
}

export interface Price {
  value: number
  originalValue: number
  scalePrices: ScalePrices
}

export interface ItemSellingOption {
  minimum: number
  incremental: number
  availableUnits: string[]
}

