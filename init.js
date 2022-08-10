const app = require("./config/express");
import "dotenv/config";
const { logger } = require("./config/winston");

// AWS EC2 포트리스닝
const http = require('http');
const hostname = '3.38.55.57';
let PORTNUM = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 2000;
  res.setHeader('동네 백엔드');
  res.end('동네 백엔드 개발자 화이팅!\n');
});


server.listen(PORTNUM,hostname,() => {
  logger.info(`✅Start Express Server on port ${PORTNUM} `);
  console.log(`✅ Check it out! at here --> http://${hostname}:${PORTNUM}/`);
});
