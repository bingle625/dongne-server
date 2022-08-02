import express from "express";

const scheduleRouter = express.Router();
const schedule = require("./scheduleController");

// 5.1 스케줄 생성 API

// 5.2 스케줄 리스트 조회 API
scheduleRouter.get("/list/:groupIdx", schedule.getSchedule);

// 5.3 스케줄 상세 조회 API
scheduleRouter.get("/:scheduleIdx", schedule.getScheduleInfo);

// 5.4 스케줄 수정 API
scheduleRouter.patch("/:scheduleIdx", schedule.patchSchedule);

// 5.5 스케줄 삭제 API
scheduleRouter.patch("/:scheduleIdx/status", schedule.patchScheduleStatus);

export default scheduleRouter;
