import express from "express";
const auth = require("./authController");
const authRouter = express.Router();

/**
 
 * paths:
 *  /auth/login:
 *   post:
 *      requestBody:
 *          content:
 * 
 *     summary: admin 로그인
 *     parameters:
 *      - in: body
 *        name: adminUserInfo
 *        schema:
 *          type: object
 *          properties:
 *              AdminEmail:
 *                  type: string
 *              AdminPwd:
 *                  tpye:string
 *     responses:
 *       "1000":
 *         description: POST admin 로그인 API 성공
 *       "2000":
 *         description: 잘못된 파라메타 전달
 *       "2008":
 *         description: 빈 이메일
 *
 */
authRouter.post("/login", auth.login);

export default authRouter;
