import express from "express";
import { getDatabaseTest, postAdmin } from "./adminController";

const adminRouter = express.Router();

// adminRouter.get("/db", getDatabaseTest);

/**
 * @swagger
 * paths:
 *  /admin:
 *   post:
 *     tags: [admin 회원가입]
 *     summary: admin 회원가입 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: adminInfo
 *         description: admin 회원가입 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - clubName
 *              - AdminEmail
 *              - AdminPwd
 *              - clubImgUrl
 *            properties:
 *                  clubName:
 *                        default: 빙글빙글
 *                        description: 동아리 이름
 *                        type: string
 *                  AdminEmail:
 *                        default: dongdong@gmail.com
 *                        description: admin 이메일
 *                        type: string
 *                  AdminPwd:
 *                        default: dong12345
 *                        description: admin 비밀번호
 *                        type: string
 *                  establishmentYear:
 *                        default: 2022-08-10
 *                        description: 동아리 설립년도 YYYY-MM-DD format
 *                        type: string
 *                  clubRegion:
 *                        default: 서울,경기
 *                        description: 동아리 활동 지역
 *                        type: string
 *                  clubIntroduction:
 *                        default: 동그라미를 그리는 동아리입니다.
 *                        description: 동아리 소개
 *                        type: string
 *                  clubImgUrl:
 *                        description: 동아리 사진
 *                        type: string
 *
 *
 *
 *
 *     responses:
 *       "1000":
 *         description: API 성공
 *       "2001":
 *         description: 이메일을 입력해주세요.
 *       "2002":
 *         description: 이메일은 30자리 미만으로 입력해주세요.
 *       "2003":
 *         description: 이메일을 형식을 정확하게 입력해주세요.
 *       "2004":
 *         description: 비밀번호를 입력 해주세요.
 *       "2005":
 *         description: 비밀번호는 8~20자리를 입력해주세요.
 *       "2008":
 *         description: 동아리 이름을 입력해주세요
 *       "3001":
 *         description: 이미 존재하는 이메일입니다.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
adminRouter.post("/", postAdmin);

export default adminRouter;
