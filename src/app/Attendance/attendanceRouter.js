import express from "express";

const attendanceRouter = express.Router();
const attendance = require("./attendanceController");

// 6.1 출석한 회원 리스트 조회 API
attendanceRouter.get("/:scheduleIdx", attendance.getAttendance);

// 6.2 결석한 회원 리스트 조회 API
attendanceRouter.get("/absence/:scheduleIdx", attendance.getAbsence);

// 6.3 출석코드 API 조회
attendanceRouter.get("/code/:scheduleIdx", attendance.getAttendCode);

export default attendanceRouter;
