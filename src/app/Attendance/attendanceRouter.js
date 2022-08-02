import express from "express";

const attendanceRouter = express.Router();
const attendance = require("./attendanceController");

// 6.1 출석한 회원 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /attendance/{scheduleIdx}:
 *   get:
 *     tags: [출석]
 *     summary: 출석한 회원 리스트 조회 API
 *     parameters:
 *         - in: path
 *           name: scheduleIdx
 *           schema :
 *              type: integer
 *           example: 3
 *           required: true
 *           description: 스케줄 인덱스
 *     responses:
 *       "1000":
 *         description: 출석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2002":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/:scheduleIdx", attendance.getAttendance);

// 6.2 결석한 회원 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /attendance/absence/{scheduleIdx}:
 *   get:
 *     tags: [출석]
 *     summary: 결석한 회원 리스트 조회 API
 *     parameters:
 *         - in: path
 *           name: scheduleIdx
 *           schema :
 *              type: integer
 *           example: 3
 *           required: true
 *           description: 스케줄 인덱스
 *     responses:
 *       "1000":
 *         description: 결석한 회원 리스트 조회 API 성공
 *       "2001":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2002":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/absence/:scheduleIdx", attendance.getAbsence);

// 6.3 출석코드 API 조회
/**
 * @swagger
 * paths:
 *  /attendance/code/{scheduleIdx}:
 *   get:
 *     tags: [출석]
 *     summary: 출석코드 API 조회
 *     parameters:
 *         - in: path
 *           name: scheduleIdx
 *           schema :
 *              type: integer
 *           example: 3
 *           required: true
 *           description: 스케줄 인덱스
 *     responses:
 *       "1000":
 *         description: 출석코드 조회 API 성공
 *       "2001":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2002":
 *         description: 스케줄 인덱스를 0보다 큰 값으로 입력해주세요.
 *       "3001":
 *         description: 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
attendanceRouter.get("/code/:scheduleIdx", attendance.getAttendCode);

export default attendanceRouter;
