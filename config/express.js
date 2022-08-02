const express = require("express");
import testRouter from "../src/app/TestInit/TestRouter";
import scheduleRouter from "../src/app/Schedule/scheduleRouter";
import attendanceRouter from "../src/app/Attendance/attendanceRouter";
const { swaggerUi, specs } = require("../modules/swagger");
const bodyParser = require("body-parser");

module.exports = function () {
  const app = express();

  // json
  app.use(bodyParser.json());

  app.get("/", function (req, res) {
    res.send("Hi");
  });
  //해당 줄 아래에 추가할 도메인 추가
  app.use("/test", testRouter);
  app.use("/schedule", scheduleRouter);
  app.use("/attendance", attendanceRouter);

  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
