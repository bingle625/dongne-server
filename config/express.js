const express = require("express");
import testRouter from "../src/app/TestInit/TestRouter";
import scheduleRouter from "../src/app/Schedule/scheduleRouter";
const { swaggerUi, specs } = require("../modules/swagger");

module.exports = function () {
  const app = express();

  app.get("/", function (req, res) {
    res.send("Hi");
  });
  //해당 줄 아래에 추가할 도메인 추가
  app.use("/test", testRouter);
  app.use("/schedule", scheduleRouter);

  // swagger
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

  return app;
};
