import express from "express";
// import { getDatabaseTest } from "./groupController";
const group = require("./groupController");
const groupRouter = express.Router();

// Route Test
groupRouter.get("/db", group.getDatabaseTest);



// 5.1 유저가 속한 그룹 조회
groupRouter.get("/", group.getGroupList);




// 5.2 유저가 속한 그룹 상세 조회
// 그룹 이름, 내용 조회 - part 1
// Query String
/**
 * @swagger
 * paths:
 *  /user/group/info?groupIdx={groupIdx}:
 *   get:
 *     tags: [출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용) 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *     responses:
 *       "1000":
 *         description: 그룹 정보(그룹이름, 내용) 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/info", group.getGroupInfo);

// 그룹 소속회원 조회 - part 2
// Query String
/**
 * @swagger
 * paths:
 *  /user/group/members?groupIdx={groupIdx}:
 *   get:
 *     tags: [출석 그룹]
 *     summary: 그룹 소속회원 조회 API
 *     parameters:
 *         - in: query
 *           name: groupIdx
 *           securitySchemes:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *     responses:
 *       "1000":
 *         description: 그룹 소속회원 조회 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.get("/members", group.getGroupMembers);


export default groupRouter;
