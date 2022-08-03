import express from "express";
import { getDatabaseTest } from "./groupController";

const groupRouter = express.Router();

groupRouter.get("/db", getDatabaseTest);
export default groupRouter;

