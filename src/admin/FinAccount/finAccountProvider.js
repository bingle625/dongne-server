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
    connection.release();
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
    connection.release();
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
    connection.release();
    logger.error(`Admin - getFinAccountByDay Provider error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
getFinAccountByDay;
