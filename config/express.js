const express = require("express");
<<<<<<< HEAD
import testRouter from "../src/app/TestInit/TestRouter";
import scheduleRouter from "../src/app/Schedule/scheduleRouter";
=======
>>>>>>> 72fb2581d3d2ac1ba2ae25431ea1a60d63f15371
const { swaggerUi, specs } = require("../modules/swagger");
import groupRouter from "../src/app/Group/groupRoute";
import memberRouter from "../src/app/Member/memberRoute";


module.exports = function () {
  const app = express();

  app.get("/", function (req, res) {
    res.send("Hi");
  });
  
  //해당 줄 아래에 추가할 도메인 추가
<<<<<<< HEAD
  app.use("/test", testRouter);
  app.use("/schedule", scheduleRouter);
=======

  // 1. 회원 명단 API
  app.use("/member", memberRouter);

  // 2. 출결 그룹 API
  app.use("/group", groupRouter);
>>>>>>> 72fb2581d3d2ac1ba2ae25431ea1a60d63f15371

  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
