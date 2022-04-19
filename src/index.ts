import { IfoodClient } from './ifood/index'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { Merchant } from './ifood/types/merchant'

dotenv.config({ path: path.join(__dirname, '../.env') })

const main = async () => {
  const ifoodClient = new IfoodClient()
  const merchantsIds = (await ifoodClient.getMerchants()) as Merchant[]
  const merchants = []
  for (let index = 0; index < merchantsIds.length; index++) {
    console.log(
      `start getting merchantsInfos for ${JSON.stringify(merchantsIds[index])}`,
    )
    console.time('start getting merchantsInfos')
    const merchant = await ifoodClient.getMerchantDetailsStatusAndInterruptions(
      merchantsIds[index],
    )
    console.timeEnd('start getting merchantsInfos')
    console.log(`catchau ${JSON.stringify(merchantsIds[index])}`)
    merchants.push(merchant)
  }
  console.log(merchants.length)
}

main()
