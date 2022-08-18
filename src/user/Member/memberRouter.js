import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

// 4.1 단체 모든 회원명단 리스트 조회 API
/**
 * @swagger
 * paths:
 *  /user/member?adminIdx={adminIdx}&page={page}&pageSize={pageSize}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 단체 모든 회원명단 리스트 조회 API
 *     parameters:
 *         - in: query
 *           name: adminIdx
 *           securitySchemes:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 단체 인덱스
 *         - in: query
 *           name: page
 *           securitySchemes:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 조회할 페이지 쪽 수
 *         - in: query
 *           name: pageSize
 *           securitySchemes:
 *              type: integer
 *           example: 5
 *           required: true
 *           description: 한 페이지에서 조회할 데이터 수
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "2001":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "2002":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "2003":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/", member.getClubMemberList);


// 4.2 회원 상세 조회 API
/**
 * @swagger
 * paths:
 *  /user/member/info?userIdx={userIdx}:
 *   get:
 *     tags: [USER 회원 명단]
 *     summary: 회원 상세 조회 API
 *     parameters:
 *         - in: query
 *           name: userIdx
 *           securitySchemes:
 *              type: integer
 *           example: 2
 *           required: true
 *           description: 유저 인덱스
 *     responses:
 *       "1000":
 *         description: 단체 모든 회원명단 리스트 조회 API 성공
 *       "3000":
 *         description: 파라미터(adminIdx)를 입력하세요.
 *       "3001":
 *         description: adminIdx는 0보다 큰 값으로 입력해주세요.
 *       "3002":
 *         description: 유효하지 않은 adminIdx입니다. (INACTIVE or DELETED)
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
memberRouter.get("/info", member.getMemberInfo);

export default memberRouter;
