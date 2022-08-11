import express from "express";

const scheduleRouter = express.Router();
const schedule = require("./scheduleController");
const jwtMiddleware = require("../../../config/jwtMiddleWare");

// 5.1 스케줄 생성 API
/**
 * @swagger
 * paths:
 *  /admin/schedule:
 *   post:
 *     tags: [ADMIN 스케줄]
 *     summary: 스케줄 생성 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: body
 *           name: schedule
 *           description: 스케줄 파라미터
 *           required:
 *              - groupIdx
 *              - scheduleDate
 *              - init_time
 *              - end_time
 *              - introduction
 *              - place
 *              - scheduleName
 *              - adminIdx
 *           schema:
 *              type: object
 *              properties:
 *                  groupIdx:
 *                      default: 1
 *                      descrpition: 그룹 인덱스
 *                      type: integer
 *                  scheduleDate:
 *                      default: 2022-08-10
 *                      description: Date in YYYY-MM-DD or YYYY/MM/DD format
 *                      type: string
 *                      format: date
 *                  init_time:
 *                      default: 2022-08-10 14:00:00
 *                      description: DateTime in YYYY-MM-DD HH:mm:ss or YYYY/MM/DD HH:mm:ss format
 *                      type: string
 *                      format: LocalDate
 *                  end_time:
 *                      default: 2022-08-10 15:00:00
 *                      description: DateTime in YYYY-MM-DD HH:mm:ss or YYYY/MM/DD HH:mm:ss format
 *                      type: string
 *                      format: LocalDate
 *                  introduction:
 *                      description: 스케줄 소개
 *                      type: string
 *                  place:
 *                      description: 장소
 *                      type: string
 *                  scheduleName:
 *                      description: 스케줄 이름
 *                      type: string
 *                  adminIdx:
 *                      default: 1
 *                      description: 단체 회원 인덱스
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 생성 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2003":
 *         description: 파라미터(groupIdx, scheduleDate, init_time, end_time, introduction, place, scheduleName, adminIdx)를 모두 입력하세요.
 *       "2011":
 *         description: 스케줄 소개는 150자 이하로 입력가능합니다.
 *       "2012":
 *         description: 스케줄 장소는 50자 이하로 입력가능합니다.
 *       "2013":
 *         description: 스케줄 이름은 100자 이하로 입력가능합니다.
 *       "2014":
 *         description: 스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요.
 *       "2015":
 *         description: 스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.
 *       "2016":
 *         description: 스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.
 *       "2017":
 *         description: groupIdx를 입력해주세요.
 *       "2018":
 *         description: groupIdx는 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
scheduleRouter.post("/", jwtMiddleware, schedule.postSchedule);

// 5.2 스케줄 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /admin/schedule/list?adminIdx=#&groupIdx=#&curPage=#:
 *   get:
 *     tags: [ADMIN 스케줄]
 *     summary: 스케줄 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: groupIdx
 *           description: 그룹 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: curPage
 *           description: 현재 페이지
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 리스트 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2017":
 *         description: groupIdx를 입력해주세요.
 *       "2018":
 *         description: groupIdx는 0보다 큰 값으로 입력해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
scheduleRouter.get("/list", jwtMiddleware, schedule.getSchedule);

// 5.3 스케줄 상세 조회 API
/**
 * @swagger
 * paths:
 *  /admin/schedule?scheduleIdx=#&adminIdx=#:
 *   get:
 *     tags: [ADMIN 스케줄]
 *     summary: 스케줄 상세 조회 API
 *     parameters:
 *         - in: query
 *           name: scheduleIdx
 *           description: 스케줄 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *         - in: query
 *           name: adminIdx
 *           description: 단체 회원 인덱스
 *           required: true
 *           schema:
 *              type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 상세 조회 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: scheduleIdx는 0보다 큰 값으로 입력해주세요.
 *       "3001":
 *         description: 이미 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
scheduleRouter.get("/", jwtMiddleware, schedule.getScheduleInfo);

// 5.4 스케줄 수정 API
/**
 * @swagger
 * paths:
 *  /admin/schedule/{scheduleIdx}:
 *   patch:
 *     tags: [ADMIN 스케줄]
 *     summary: 스케줄 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: path
 *           name: scheduleIdx
 *           schema :
 *              type: integer
 *           example: 3
 *           required: true
 *           description: 스케줄 인덱스
 *         - in: body
 *           name: schedule
 *           description: 스케줄 수정 파라미터
 *           schema:
 *              type: object
 *              properties:
 *                  scheduleDate:
 *                      default: 2022-08-10
 *                      description: Date in YYYY-MM-DD or YYYY/MM/DD format
 *                      type: string
 *                      format: date
 *                  init_time:
 *                      default: 2022-08-10 14:00:00
 *                      description: DateTime in YYYY-MM-DD HH:mm:ss or YYYY/MM/DD HH:mm:ss format
 *                      type: string
 *                      format: LocalDate
 *                  end_time:
 *                      default: 2022-08-10 15:00:00
 *                      description: DateTime in YYYY-MM-DD HH:mm:ss or YYYY/MM/DD HH:mm:ss format
 *                      type: string
 *                      format: LocalDate
 *                  introduction:
 *                      description: 스케줄 소개
 *                      type: string
 *                  place:
 *                      description: 스케줄 장소
 *                      type: string
 *                  scheduleName:
 *                      description: 스케줄 이름
 *                      type: string
 *                  adminIdx:
 *                      description: 단체 회원 인덱스
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 수정 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: scheduleIdx는 0보다 큰 값으로 입력해주세요.
 *       "2011":
 *         description: 스케줄 소개는 150자 이하로 입력가능합니다.
 *       "2012":
 *         description: 스케줄 장소는 50자 이하로 입력가능합니다.
 *       "2013":
 *         description: 스케줄 이름은 100자 이하로 입력가능합니다.
 *       "2014":
 *         description: 스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요.
 *       "2015":
 *         description: 스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.
 *       "2016":
 *         description: 스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.
 *       "3001":
 *         description: 이미 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 *
 */
scheduleRouter.patch("/:scheduleIdx", jwtMiddleware, schedule.patchSchedule);

// 5.5 스케줄 삭제 API
/**
 * @swagger
 * paths:
 *  /admin/schedule/{scheduleIdx}/status:
 *   patch:
 *     tags: [ADMIN 스케줄]
 *     summary: 스케줄 삭제 API
 *     parameters:
 *         - in: path
 *           name: scheduleIdx
 *           schema :
 *              type: integer
 *           example: 3
 *           required: true
 *           description: 스케줄 인덱스
 *         - in: body
 *           name: adminIdx
 *           description: 단체 회원 인덱스
 *           required:
 *              - adminIdx
 *           schema:
 *              type: object
 *              properties:
 *                  adminIdx:
 *                      default: 1
 *                      description: 단체 회원 인덱스
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 스케줄 삭제 API 성공
 *       "2001":
 *         description: adminIdx를 입력해주세요.
 *       "2002":
 *         description: adminIdx를 0보다 큰 수로 입력해주세요.
 *       "2020":
 *         description: adminIdx를 값을 확인해주세요.
 *       "2021":
 *         description: 스케줄 인덱스를 입력해주세요.
 *       "2022":
 *         description: scheduleIdx는 0보다 큰 값으로 입력해주세요.
 *       "3001":
 *         description: 이미 삭제된 스케줄입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
scheduleRouter.patch(
  "/:scheduleIdx/status",
  jwtMiddleware,
  schedule.patchScheduleStatus
);

export default scheduleRouter;
