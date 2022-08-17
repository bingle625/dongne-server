import baseResponseStatus from "../../../config/baseResponseStatus";

const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const accountProvider = require("./finAccountProvider");
const accountService = require("./finAccountService");
const regexDate = /\d{4}-\d{2}-\d{2}/;

/**
 * API No. 7.3
 * API Name : 최근 4개 회계 조회 api
 * [GET] admin/finAccount/
 */

export const getFinAccount = async (req, res) => {
  const adminIdx = req.get("adminIdx");
  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getRecentFinAccount(adminIdxNum);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.4
 * API Name : 월별 회계 조회 api
 * [GET] admin/finAccount/month
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

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByMonth(adminIdxNum, year, month);
  return res.send(getFinAccountResult);
};

/**
 * API No. 7.5
 * API Name : 일별 회계 조회 api
 * [GET] admin/finAccount/day
 */
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

  if (!adminIdx) return res.send(errResponse(baseResponse.FINACCOUNT_ADMINIDX_EMPTY));
  if (!year) return res.send(errResponse(baseResponse.FINACCOUNT_YEAR_EMPTY));
  if (!month) return res.send(errResponse(baseResponse.FINACCOUNT_MONTH_EMPTY));
  if (!day) return res.send(errResponse(baseResponse.FINACCOUNT_DAY_EMPTY));

  const adminIdxNum = Number(adminIdx);
  const getFinAccountResult = await accountProvider.getFinAccountByDay(adminIdxNum, year, month, day);
  return res.send(getFinAccountResult);
};
