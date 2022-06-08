const IfoodClient = require('./lib').default
const client = new IfoodClient()

const main = async () => {
    const merchants = await client.create()
    console.log(`get merchants ${JSON.stringify(merchants)}`)
}

main()
