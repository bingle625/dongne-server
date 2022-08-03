const express = require("express");
const { swaggerUi, specs } = require("../modules/swagger");
const compression = require("compression");

import testRouter from "../src/app/TestInit/TestRouter";
import scheduleRouter from "../src/app/Schedule/scheduleRouter";
import groupRouter from "../src/app/Group/groupRoute";
import memberRouter from "../src/app/Member/memberRoute";

module.exports = function () {
  const app = express();

  //json 설정
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //compression 설정
  app.use(compression());

  //해당 줄 아래에 추가할 도메인 추가
  app.use("/test", testRouter);
  app.use("/schedule", scheduleRouter);

  // 1. 회원 명단 API
  app.use("/member", memberRouter);

  // 2. 출결 그룹 API
  app.use("/group", groupRouter);

  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
