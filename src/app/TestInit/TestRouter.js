import express from "express";
import { getTest, postTest, getDatabaseTest } from "./TestController";

const testRouter = express.Router();

testRouter.get("/", getTest).post("/", postTest);
testRouter.get("/db", getDatabaseTest);
export default testRouter;
