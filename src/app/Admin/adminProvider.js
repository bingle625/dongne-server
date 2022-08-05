const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const adminDao = require("./adminDao");
const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

exports.retrieveAdminList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);

  try {
    const testResult = await adminDao.selectAdmins(connection);
    connection.release();
    return response(baseResponseStatus.SUCCESS, testResult);
  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};

exports.emailCheck = async (email) => {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const emailCheckResult = await adminDao.selectAdminEmail(connection, email);
    connection.release();
    return emailCheckResult[0];
  } catch (error) {
    handleError(error);
    connection.release();
  }
};

exports.passwordCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await adminDao.selectAdminPassword(connection, email);
  connection.release();
  return passwordCheckResult[0];
};
