import express from "express";

const userAttendanceRouter = express.Router();
const attendance = require("./attendanceController");

// 7.1 출석코드 인증 API
userAttendanceRouter.post("/code", attendance.postAttendanceCode);

export default userAttendanceRouter;
