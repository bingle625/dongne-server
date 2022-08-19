const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");

import testRouter from "../src/app/TestInit/TestRouter";
import scheduleRouter from "../src/app/Schedule/scheduleRouter";
import attendanceRouter from "../src/app/Attendance/attendanceRouter";
const { swaggerUi, specs } = require("../modules/swagger");
const bodyParser = require("body-parser");
import groupRouter from "../src/app/Group/groupRoute";
import memberRouter from "../src/app/Member/memberRoute";
import authRouter from "../src/app/Auth/authRouter";
import adminRouter from "../src/app/Admin/adminRouter";



module.exports = function () {
  const app = express();

  //json 설정
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //compression 설정
  app.use(compression());

  //method-override 설정
  app.use(methodOverride());

  //cors 설정
  app.use(cors());

  /*
    해당 줄부터 도메인 추가
   */	
  // 0. test API
  app.use("/test", testRouter);
  app.use("/schedule", scheduleRouter);
  app.use("/attendance", attendanceRouter);

  // 1. 회원 명단 API
  app.use("/member", memberRouter);

  // 2. 출결 그룹 API
  app.use("/group", groupRouter);

  // 3. 인증 도메인
  app.use("/auth", authRouter);
  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  // 4. Admin API
  app.use("/admin", adminRouter);

  return app;
};
