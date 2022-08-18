import express from "express";
const finAccount = require("./finAccountController");
const userfinAccountRouter = express.Router();

//api 7.3 최근 회계 4개 조회 api
/**
 * @swagger
 * paths:
 *  /user/finAccount:
 *   get:
 *     tags: [user 회계 관리]
 *     summary: 최근 회계항목 4개 조회 api
 *     parameters:
 *         - name: adminIdx
 *           in: header
 *           description: an authorization header
 *           default: 1
 *           required: true
 *           type: integer
 *     responses:
 *       "1000":
 *         description: 최근 회계 4개 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *
 */
userfinAccountRouter.get("/", finAccount.getFinAccount);

//api 7.4 월별 회계 조회 api
/**
 * @swagger
 * paths:
 *  /user/finAccount/month?year={year}&month={month}:
 *   get:
 *     tags: [user 회계 관리]
 *     summary: 월별 회계 조회 api
 *     parameters:
 *         - in: header
 *           name: adminIdx
 *           description: an authorization header
 *           default: 1
 *           required: true
 *           type: integer
 *         - in: query
 *           name: year
 *           schema:
 *            type: integer
 *           description: 조회 년도
 *           default: 2022
 *         - in: query
 *           name: month
 *           schema:
 *            type: integer
 *           description: 조회 월
 *           default: 8
 *     responses:
 *       "1000":
 *         description: 최근 회계 4개 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5014":
 *         description: 날짜의 year 비어있음.
 *       "5015":
 *         description: 날짜의 month 비어있음.
 *
 *
 */
userfinAccountRouter.get("/month", finAccount.getFinAccountMonthly);

//api 7.5 일자별 회계 조회 api
/**
 * @swagger
 * paths:
 *  /user/finAccount/day?year={year}&month={month}&day={day}:
 *   get:
 *     tags: [user 회계 관리]
 *     summary: 일자별 회계 조회 api
 *     parameters:
 *         - in: header
 *           name: adminIdx
 *           description: an authorization header
 *           default: 1
 *           required: true
 *           type: integer
 *         - in: query
 *           name: year
 *           default: 2022
 *           schema:
 *            type: integer
 *           description: 조회 년도
 *         - in: query
 *           name: month
 *           default: 8
 *           schema:
 *            type: integer
 *           description: 조회 월
 *         - in: query
 *           name: day
 *           default: 15
 *           schema:
 *            type: integer
 *           description: 조회 일자
 *     responses:
 *       "1000":
 *         description: 최근 회계 4개 조회 api 성공
 *       "5001":
 *         description: admin Idx 비어있음.
 *       "5014":
 *         description: 날짜의 year 비어있음.
 *       "5015":
 *         description: 날짜의 month 비어있음.
 *       "5016":
 *         description: 날짜의 day 비어있음.
 *
 *
 */
userfinAccountRouter.get("/day", finAccount.getFinAccountDaily);

export default userfinAccountRouter;
