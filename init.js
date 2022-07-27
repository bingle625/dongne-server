const app = require("./config/express");
import "dotenv/config";
const { logger } = require("./config/winston");

let PORTNUM = 3000;

app().listen(PORTNUM, () => {
  logger.info(`✅Start Express Server on port ${PORTNUM} `);
  console.log(`✅ Check it out! at here --> http://localhost:${PORTNUM}/`);
});
