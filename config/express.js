const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");

// admin Side's Router
import testRouter from "../src/admin/TestInit/TestRouter";
import scheduleRouter from "../src/admin/Schedule/scheduleRouter";
import attendanceRouter from "../src/admin/Attendance/attendanceRouter";
const { swaggerUi, specs } = require("../modules/swagger");
const bodyParser = require("body-parser");
import groupRouter from "../src/admin/Group/groupRoute";
import memberRouter from "../src/admin/Member/memberRoute";
import authRouter from "../src/admin/Auth/authRouter";
import adminRouter from "../src/admin/Admin/adminRouter";

// User Side's Router
import UserGroupRouter from "../src/user/Group/groupRouter";
import UserMemberRouter from "../src/user/Member/memberRouter";

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

  // admin Side's API
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


  // user Side's API

  app.use("/user/member", UserMemberRouter);
  app.use("/user/group", UserGroupRouter);

  return app;
};
