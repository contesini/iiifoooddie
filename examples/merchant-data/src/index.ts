import { IfoodClient } from "iiifoooddie";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Hello World!");
  const ifoodClient = new IfoodClient();
  console.log("Ifood client created");
  const merchants = await ifoodClient.getMerchants();
  console.log("Merchants returned");

  for (const merchant of merchants) {
    const merchantStatus = await ifoodClient.getMerchantStatus(merchant.id);
    console.log(merchantStatus);
  }
}

main();
