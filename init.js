const app = require("./config/express");
import "dotenv/config";
const { logger } = require("./config/winston");

// AWS EC2 포트리스닝
const hostname = '3.38.55.57';
const PORTNUM = 3000;
const PORTNUM_HTTP = 80;

<<<<<<< HEAD


=======
>>>>>>> 65bcda6416f199039f00a25d733a72e62923f61a
app().get('/', (req, res) => {
  res.send("너무 늦게 배포 해드려서 죄송합니다 ㅠㅠ...\n 동네 백엔드 화이팅!!! 🎉🎉🎉");
});

<<<<<<< HEAD



=======
>>>>>>> 65bcda6416f199039f00a25d733a72e62923f61a
app().listen(PORTNUM, () => {
});


app().listen(PORTNUM_HTTP, () => {
  logger.info(`✅Start Express Server on port ${PORTNUM} `);
  console.log(`✅ Check it out! at here --> http://localhost:${PORTNUM}/`);
<<<<<<< HEAD
});

=======
});
>>>>>>> 65bcda6416f199039f00a25d733a72e62923f61a
