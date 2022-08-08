import express from "express";
// import { getDatabaseTest } from "./groupController";
const group = require("./groupController");
const groupRouter = express.Router();

// Route Test
groupRouter.get("/db", group.getDatabaseTest);

// 4.1 그룹 추가
/**
 * @swagger
 * paths:
 *  /group:
 *   post:
 *     tags: [출석 그룹]
 *     summary: 그룹 추가 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           required:
 *              - adminIdx
 *              - groupName
 *              - groupIntroduction
 *              - userIdx
 *           schema:
 *              type: object
 *              properties:
 *                  adminIdx:
 *                      description: 단체 인덱스
 *                      type: integer
 *                  groupName:
 *                      description: 그룹 이름
 *                      type: string
 *                  groupIntroduction:
 *                      description: 그룹 소개
 *                      type: string
 *                  userIdx:
 *                      description: 유저 인덱스 배열
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 *       "2001":
 *         description: 파라미터 (adminIdx)를 입력하세요.
 *       "4001":
 *         description: 그룹 이름을 입력하세요.
 *       "4002":
 *         description: 그룹 이름은 45자 이하로 입력가능합니다.
 *       "4003":
 *         description: 그룹 소개를 입력하세요.
 *       "4004":
 *         description: 그룹 소개는 200자 이하로 입력가능합니다.
 *       "4005":
 *         description: 그룹에 추가할 userIdx를 입력하세요.
 *       "4006":
 *         description: 그룹에 추가할 userIdx를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.post("/", group.postGroup);

// 4.2 그룹 조회
// TO DO : 4
// 그룹 이름, 내용 조회 - part 1
// Query String
/**
 * @swagger
 * paths:
 *  /group/info?groupIdx=2:
 *   get:
 *     tags: [출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용) 조회 API
 *     parameters:
 *         - in: Query
 *           name: groupIdx
 *           schema:
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
 *  /group/members?groupIdx=11:
 *   get:
 *     tags: [출석 그룹]
 *     summary: 그룹 소속회원 조회 API
 *     parameters:
 *         - in: Query
 *           name: groupIdx
 *           schema:
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

// 4.3 그룹 수정
// TO DO : 5
// 그룹 이름, 내용 수정
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /group/info/:groupIdx:
 *   patch:
 *     tags: [출석 그룹]
 *     summary: 그룹 정보(그룹 이름, 내용) 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: Path
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           required:
 *              - groupName
 *              - groupIntroduction
 *           schema:
 *              type: object
 *              properties:
 *                  groupName:
 *                      description: 그룹 이름
 *                      type: string
 *                  groupIntroduction:
 *                      description: 그룹 소개
 *                      type: string
 *     responses:
 *       "1000":
 *         description: 그룹 정보(그룹 이름, 내용) 수정 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4001":
 *         description: 그룹 이름은 45자 이하로 입력가능합니다.
 *       "4002":
 *         description: 그룹 이름을 입력하세요.
 *       "4003":
 *         description: 그룹 소개를 입력하세요.
 *       "4004":
 *         description: 그룹 소개를 200자 이하로 입력가능합니다.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/info/:groupIdx", group.patchGroupInfo);

// 그룹 회원삭제
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /group/deleteMembers/:groupIdx:
 *   patch:
 *     tags: [출석 그룹]
 *     summary: 그룹 소속회원 삭제 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: Path
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           required:
 *              - userIdx
 *           schema:
 *              type: object
 *              properties:
 *                  userIdx:
 *                      description: 유저 인덱스 배열
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 그룹 소속회원 삭제 수정 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4005":
 *         description: 삭제할 유저 인덱스를 입력하세요.
 *       "4006":
 *         description: 삭제할 유저 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/deleteMembers/:groupIdx", group.patchGroupMembers);

// 그룹 회원추가
// Path Variable & Body
/**
 * @swagger
 * paths:
 *  /group/insertMembers/:groupIdx:
 *   post:
 *     tags: [출석 그룹]
 *     summary: 그룹 소속회원 추가 수정 API
 *     consumes:
 *         - application/json
 *     parameters:
 *         - in: Path
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *         - in: body
 *           name: group
 *           description: 그룹 파라미터
 *           required:
 *              - userIdx
 *           schema:
 *              type: object
 *              properties:
 *                  userIdx:
 *                      description: 유저 인덱스 배열
 *                      type: integer
 *     responses:
 *       "1000":
 *         description: 그룹 소속회원 추가 수정 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "4005":
 *         description: 추가할 유저 인덱스를 입력하세요.
 *       "4006":
 *         description: 추가할 유저 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.post("/insertMembers/:groupIdx", group.postGroupMembers);

// 4.4 그룹 삭제
// TO DO : 6
// Path Variable
/**
 * @swagger
 * paths:
 *  /group/delete/:groupIdx:
 *   patch:
 *     tags: [출석 그룹]
 *     summary: 그룹 삭제 API
 *     parameters:
 *         - in: Path
 *           name: groupIdx
 *           schema:
 *              type: integer
 *           example: 1
 *           required: true
 *           description: 그룹 인덱스
 *     responses:
 *       "1000":
 *         description: 그룹 삭제 API 성공
 *       "4007":
 *         description: 파라미터 (groupIdx)를 입력하세요.
 *       "4008":
 *         description: 그룹 인덱스를 0보다 큰 값으로 입력하세요.
 *       "5000":
 *         description: 데이터 베이스 에러
 *
 */
groupRouter.patch("/delete/:groupIdx", group.patchGroup);

export default groupRouter;
