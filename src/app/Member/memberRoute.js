import express from "express";
import { getDatabaseTest } from "./memberController";

const memberRouter = express.Router();

memberRouter.get("/db", getDatabaseTest);

export default memberRouter;
