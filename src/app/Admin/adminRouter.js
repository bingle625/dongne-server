import express from "express";
import { getDatabaseTest, postAdminLogin } from "./adminController";

const testRouter = express.Router();

testRouter.get("/db", getDatabaseTest);

//로그인 api

export default testRouter;
