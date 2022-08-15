import express from "express";
const finAccount = require("./finAccountController");
const adminfinAccountRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /admin/finAccount:
 *   post:
 *     tags: [admin 회계 관리]
 *     summary: admin 회계 생성 api
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: finAccountInfo
 *         description: 회계 정보 파라미터
 *         schema:
 *            type: object
 *            required:
 *              - adminIdx
 *              - finAccountCategoryIdx
 *              - finAccountItem
 *              - isProfit
 *              - finAccountCost
 *              - finAccountDate
 *              - etc
 *
 *            properties:
 *                  adminIdx:
 *                        default: 1
 *                        description: admin 인덱스
 *                        type: int
 *                  finAccountCategoryIdx:
 *                        default: 1
 *                        description: 카테고리 인덱스
 *                        type: int
 *                  finAccountItem:
 *                        default: 동아리 지원금
 *                        description: 회계 항목명
 *                        type: string
 *                  isProfit:
 *                        default: 1
 *                        description: 0: 비용(negative), 1: 수입(profit)
 *                        type: int
 *                  finAccountCost:
 *                        default: 200000
 *                        description: 회계 항목 금액
 *                        type: number
 *                  finAccountDate:
 *                        default: 2022-08-15
 *                        description: 회계 항목 날짜
 *                        type: string
 *                  etc:
 *                        default: 테스트테스트 아아
 *                        description: 회계 항목 비고
 *                        type: string
 *     responses:
 *       "1000":
 *         description: 그룹 추가 API 성공
 */
adminfinAccountRouter.post("/", finAccount.createFinAccount);

// api 7.2 회계 카테고리 생성 api
adminfinAccountRouter.post("/category", finAccount.createFinAccCategory);

//api 7.3 최근 회계 4개 조회 api
adminfinAccountRouter.get("/", finAccount.getFinAccount);

//api 7.4 월별 회계 조회 api
adminfinAccountRouter.get("/month", finAccount.getFinAccountMonthly);

//api 7.5 일자별 회계 조회 api
adminfinAccountRouter.get("/day", finAccount.getFinAccountDaily);

//api 7.6 회계 카테고리 수정
adminfinAccountRouter.patch("/category/:cId", finAccount.patchCategory);

//api 7.7 회계 항목 수정
adminfinAccountRouter.patch("/:fId", finAccount.patchFinAccount);

export default adminfinAccountRouter;
