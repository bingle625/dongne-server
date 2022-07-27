const express = require("express");
import testRouter from "../src/app/TestInit/TestRouter";

module.exports = function () {
  const app = express();

  app.get("/", function (req, res) {
    res.send("Hi");
  });
  //해당 줄 아래에 추가할 도메인 추가
  app.use("/test", testRouter);

  return app;
};
