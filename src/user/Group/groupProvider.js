const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");

// 그룹 리스트 조회 - API 5.1
exports.retrieveGroupList = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);

  try {
    const groupListResult = await groupDao.selectGroupList(connection, adminIdx);
    connection.release();
    return groupListResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};



// 그룹 이름, 내용 조회 - API 5.2 -> Part 1
exports.retrieveGroupInfo = async function (groupIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);
  
    //Try문 예외처리
    try {
      const groupInfoResult = await groupDao.selectGroupInfo(connection, groupIdx);
      connection.release();
      return groupInfoResult;
  
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.DB_ERRORS);
    }
  };

// 그룹 소속회원 조회 - API 5.2 -> Part 2
exports.retrieveGroupMembers = async function (groupIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupMembers DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupMembersResult = await groupDao.selectGroupMembers(connection, groupIdx);
    connection.release();
    return groupMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
  
};
