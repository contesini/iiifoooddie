export type Changelog = {
    ownerId: string;
    catalogId: string;
    categoryId?: string;
    categoryStatus?: string;
    modifiedAt?: Date;
    changelogIngestedAt: Date;
    systemId: string;
}

// export type Unsellableitems = {
//     id: string;
//     status: string;
//     template: string;
//     restrictions: Array<string>;
//     unsellableItems * [UnsellableItemDto{
//     id*	string
//         productId*	string
//         restrictions*[
//         example: List["ITEM_PAUSED", "ITEM_HAS_VIOLATION" ]
// []]
// }]
// unsellablePizzaItems * UnsellablePizzaItemsDto{
//     toppings * [UnsellablePizzaItemDto{
//         id*	string
//         restrictions*[
//             example: List["ITEM_PAUSED", "ITEM_HAS_VIOLATION" ]
//     []]
// }]
// crusts * [UnsellablePizzaItemDto{
//     id*	string
//         restrictions*[
//         example: List["ITEM_PAUSED", "ITEM_HAS_VIOLATION" ]
// []]
//         }]
// edges * [UnsellablePizzaItemDto{
//     id*	string
//         restrictions*[
//         example: List["ITEM_PAUSED", "ITEM_HAS_VIOLATION" ]
// []]
//         }]
// sizes * [UnsellablePizzaItemDto{
//     id*	string
//         restrictions*[
//         example: List["ITEM_PAUSED", "ITEM_HAS_VIOLATION" ]
// []]
//         }]
//         }
//         }]
//         }
// }