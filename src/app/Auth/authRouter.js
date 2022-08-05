import express from "express";

const authRouter = express.Router();
const auth = require("./authController");

//2.1 로그인 api
auth.post("/auth/login", auth.login);

export default authRouter;
