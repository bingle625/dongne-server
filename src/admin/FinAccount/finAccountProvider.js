const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const accountDao = require("./finAccountDao");

export const emailCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const emailCheckResult = await authDao.selectAdminEmail(connection, email);
    connection.release();
    return emailCheckResult[0];
  } catch (error) {
    handleError(error);
    connection.release();
  }
};
