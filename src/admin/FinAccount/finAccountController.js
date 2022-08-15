const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const accountProvider = require("./finAccountProvider");
const accountService = require("./finAccountService");

/**
 * API No. 7.1
 * API Name : 회계 생성 api
 * [POST] admin/finAccount/
 */

export const createFinAccount = async (req, res) => {
  /*
    body: 
      - adminIdx
      - finAccountCategoryIdx
      - finAccountItem
      - isProfit : 0: 비용(negative), 1: 수입(profit)
      - finAccountCost
      - finAccountDate : DATE
      - etc : VARCHAR(200)
  */
  const { adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc } = req.body;

  //todo: admin 상태 확인

  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인

  //todo: isProfit 0과 1중 하나 맞는지 확인

  //todo: finAccountCost 범위 확인

  //todo: finAccountDate 형식 yyyy-mm-dd 맞는 지 확인

  //todo: finAccountItem 길이 확인

  const createFinAccountResult = await accountService.createFinAccount(adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc);
  return res.send(createFinAccountResult);
};

/**
 * API No. 7.2
 * API Name : 회계 카테고리 생성 api
 * [POST] admin/finAccount/category
 */

export const createFinAccCategory = async (req, res) => {
  /*
    body: 
      - categoryName
      - adminIdx
  */
  const { categoryName, adminIdx } = req.body;
  const createFinAccCategorytResult = await accountService.createFinAccCategory(categoryName, adminIdx);
  return res.send(createFinAccCategorytResult);
};

/**
 * API No. 7.3
 * API Name : 최근 4개 회계 조회 api
 * [GET] admin/finAccount/
 */

export const getFinAccount = async (req, res) => {
  const adminIdx = req.get("adminIdx");
  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getRecentFinAccount(adminIdxNum);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.3
 * API Name : 최근 4개 회계 조회 api
 * [GET] admin/finAccount/
 */

export const getFinAccountMonthly = async (req, res) => {
  /*
    query string: 
      - year
      - month
  */
  const adminIdx = req.get("adminIdx");
  const year = req.query.year;
  const month = req.query.month;

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByMonth(adminIdxNum, year, month);
  return res.send(getFinAccountResult);
  // console.log(req);
  // console.log(req.query);
  // return res.send(response(baseResponse.SUCCESS));
};

export const getFinAccountDaily = async (req, res) => {
  /*
    query string: 
      - year
      - month
      - day
  */
  const adminIdx = req.get("adminIdx");
  const year = req.query.year;
  const month = req.query.month;
  const day = req.query.day;

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByDay(adminIdxNum, year, month, day);
  return res.send(getFinAccountResult);
  // console.log(req);
  // console.log(req.query);
  // return res.send(response(baseResponse.SUCCESS));
};
