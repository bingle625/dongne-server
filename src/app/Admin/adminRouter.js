import express from "express";
import { getDatabaseTest } from "./adminController";

const testRouter = express.Router();

testRouter.get("/db", getDatabaseTest);

export default testRouter;
