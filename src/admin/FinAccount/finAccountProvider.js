const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const accountDao = require("./finAccountDao");

export const getRecentFinAccount = async (adminIdxNum) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getRecentFinAccountResult = await accountDao.retrieveFinAccount(connection, adminIdxNum);
    connection.release();
    return response(baseResponse.SUCCESS, getRecentFinAccountResult[0]);
  } catch (error) {
    logger.error(`Admin - getRecentFinAccount Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const getFinAccountByMonth = async (adminIdxNum, year, month) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getMonthlyFinAccountResult = await accountDao.retrieveFinAccountByMonth(connection, adminIdxNum, year, month);
    connection.release();
    return response(baseResponse.SUCCESS, getMonthlyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByMonth Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const getFinAccountByDay = async (adminIdxNum, year, month, day) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const getDailyFinAccountResult = await accountDao.retrieveFinAccountByDay(connection, adminIdxNum, year, month, day);
    connection.release();
    return response(baseResponse.SUCCESS, getDailyFinAccountResult[0]);
  } catch (err) {
    logger.error(`Admin - getFinAccountByDay Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const categoryStatusCheck = async (idx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const categoryResult = await accountDao.selectCategory(connection, idx);
  connection.release();
  return categoryResult[0];
};

export const categoryDupCheck = async (adminIdx, categoryName) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const categoryResult = await accountDao.selectCategoryByName(connection, adminIdx, categoryName);
  connection.release();
  console.log(categoryResult[0]);
  return categoryResult[0];
};

export const accountStatusCheck = async (accountIdx) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAcountResult = await accountDao.selectAdminAccountByIdx(connection, accountIdx);
  connection.release();
  return userAcountResult[0];
};
