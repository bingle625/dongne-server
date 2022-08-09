import express from "express";
const auth = require("./authController");
const authRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /auth/login:
 *   post:
 *     tags: [admin 로그인]
 *     summary: admin 로그인 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: adminInfo
 *         description: admin 로그인 정보  파라미터
 *         schema:
 *            type: object
 *            required:
 *              - AdminEmail
 *              - AdminPwd
 *            properties:
 *                  AdminEmail:
 *                        default: umcbingle@gmail.com
 *                        description: admin 이메일
 *                        type: string
 *                  AdminPwd:
 *                        default: umc12345678
 *                        description: admin 비밀번호
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 *       "2008":
 *         description: 이메일을 입력하세요
 *       "2009":
 *         description: 이메일은 30자리 미만으로 입력해주세요.
 *       "2010":
 *         description: 이메일을 형식을 정확하게 입력해주세요.
 *       "2011":
 *         description: 비밀번호를 입력 해주세요.
 *       "2026":
 *         description: 비밀번호의 길이는 8자리 이상으로 입력해주세요.
 *       "3003":
 *         description: 아이디가 잘못 되었습니다.
 *       "3004":
 *         description: 비밀번호가 잘못 되었습니다.
 *       "3005":
 *         description: 비활성화 된 계정입니다. 고객센터에 문의해주세요.
 *       "4000":
 *         description: 데이터 베이스 에러
 *
 */
authRouter.post("/login", auth.login);

export default authRouter;
