import express from "express";
const auth = require("./authController");
const authRouter = express.Router();

//2.1 로그인 api
authRouter.post("/login", auth.login);

export default authRouter;
