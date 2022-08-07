import express from "express";
import { getDatabaseTest, postAdmin } from "./adminController";

const adminRouter = express.Router();

adminRouter.get("/db", getDatabaseTest);

// 1.1 회원 가입 api
adminRouter.post("/", postAdmin);

export default adminRouter;
