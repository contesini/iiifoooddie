const IfoodClient = require('./lib').default
const client = new IfoodClient()

const main = async () => {
    await client.authenticate(process.env.IFOOD_CLIENT_ID, process.env.IFOOD_CLIENT_SECRET)
    const [merchants, status] = await client.getMerchants()
    // const [merchantsOrg, banana] = await client.getMerchantDetailsStatusAndInterruptions(merchants[0])
    const cancell = await client.getMerchantSalesCancellations({ merchantId: merchants[0].id })
    console.log(cancell)
}

main()
