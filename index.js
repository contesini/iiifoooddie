const IfoodClient = require('./lib').default
const client = new IfoodClient()

const main = async () => {
    await client.authenticate(process.env.IFOOD_CLIENT_ID, process.env.IFOOD_CLIENT_SECRET)
    const [merchants, status] = await client.getMerchants()
    // const [merchantsOrg, banana] = await client.getMerchantDetailsStatusAndInterruptions(merchants[0])
    // const cancell = await client.getMerchantSalesCancellations({ merchantId: merchants[0].id, beginCancellationDate: '2022-07-19', endCancellationDate: '2022-06-20' })
    // const [rev, revStatus] = await client.getMerchantReviews({ merchantId: merchants[0].id, dateFrom: '2022-04-05T08:30:00Z', dateTO: '2022-06-05T09:30:00Z', pageSize: 50 })
    const [sales, sStatus] = await client.getMerchantSales({ merchantId: merchants[0].id, beginOrderDate: '2022-06-25', endOrderDate: '2022-06-28' })
    // const [order, orderStatus] = await client.getOrderById('2aaea4d0-7a13-4b22-b976-6cd13edd5ea3')
    // const [adj, adjStatus] = await client.getMerchantSalesAdjustments({ merchantId: merchants[0].id, beginUpdateDate: '2022-06-25', endUpdateDate: '2022-06-28' })
    console.log(sales)
}

main()
