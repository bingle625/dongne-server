const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");

// 그룹 이름, 내용 조회 - API 4.2 -> Part 1
exports.retrieveGroupInfo = async function (groupIdx) {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);
  
    //Try문 예외처리
    try {
      const groupInfoResult = await groupDao.selectGroupInfo(connection, groupIdx);
      connection.release();
      return groupInfoResult;
  
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.FAILURE);
    }
  };

// 그룹 소속회원 조회 - API 4.2 -> Part 2
exports.retrieveGroupMembers = async function (groupIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const groupMembersResult = await groupDao.selectGroupMembers(connection, groupIdx);
    connection.release();
    console.log(groupMembersResult);
    return groupMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
  
};
