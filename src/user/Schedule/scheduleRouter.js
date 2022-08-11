import express from "express";

const userScheduleRouter = express.Router();
const schedule = require("./scheduleController");

// 6.1 스케줄 리스트 조회 API
userScheduleRouter.get("/list/", schedule.getSchedule);

// 6.2 스케줄 상세 조회 API
userScheduleRouter.get("/", schedule.getScheduleInfo);

export default userScheduleRouter;
