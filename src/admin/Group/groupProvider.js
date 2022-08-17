const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");

// 그룹 리스트 조회 - API 4.2
exports.retrieveGroupList = async function (adminIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupInfo DB Error: ${error.message}`);

  try {
    const groupListPagingParams = [adminIdx, start, pageSize];
    const groupListResult = await groupDao.selectGroupList(connection, groupListPagingParams);
    connection.release();
    return groupListResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};

// API 4.2 - Paging's totalDataCount (4.2에서 조회하는 Data 갯수 조회)
exports.retrieveTotalDataCount = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountResult = await groupDao.selectTotalDataCount(connection, adminIdx);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};


// 그룹 이름, 내용 조회 - API 4.3 -> Part 1
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

// 그룹 소속회원 조회 - API 4.3 -> Part 2
exports.retrieveGroupMembers = async function (groupIdx, start, pageSize) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveGroupMembers DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const adminIdx = await groupDao.selectAdminIdx(connection, groupIdx);
    const groupMembersPagingParams = [groupIdx, adminIdx[0].adminIdx, start, pageSize];
    const groupMembersResult = await groupDao.selectGroupMembers(connection, groupMembersPagingParams);
    connection.release();
    return groupMembersResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
  
};

// API 4.3 - Paging's totalDataCount (4.3에서 조회하는 Data 갯수 조회)
exports.retrieveGroupMembersTotalDataCount = async function (groupIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌retrieveTotalDataCount DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const totalDataCountResult = await groupDao.selectGroupMembersTotalDataCount(connection, groupIdx);
    connection.release();
    return totalDataCountResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.DB_ERRORS);
  }
};