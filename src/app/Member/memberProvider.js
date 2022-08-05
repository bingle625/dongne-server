const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");

// DB Test
exports.retrieveUserList = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);
  
    try {
      const testResult = await memberDao.selectUserPosts(connection);
      connection.release();
      return response(baseResponseStatus.SUCCESS, testResult);
    } catch (error) {
      handleError(error);
      connection.release();
      return errResponse(baseResponseStatus.FAILURE);
    }
  };

// 단체 모든 회원명단 리스트 조회 - API NO. 3.1
exports.retrieveClubMemberList = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const clubMemberResult = await memberDao.selectClub(connection, adminIdx);
    connection.release();
    return clubMemberResult;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};

// API NO. 3.1 - AdminIdx Status Check
exports.checkClubStatus = async function (adminIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const clubStatus = await memberDao.selectClubStatus(connection, adminIdx);
    connection.release();
    return clubStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};

// 회원 상세 조회 - API NO. 3.3
exports.retrieveMemberInfo = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const memberInfo = await memberDao.selectMemberInfo(connection, userIdx);
    connection.release();
    return memberInfo;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};

// API NO. 3.3 - User Status Check
exports.checkUserStatus = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);

  //Try문 예외처리
  try {
    const userStatus = await memberDao.selectUserStatus(connection, userIdx);
    connection.release();
    return userStatus[0].status;

  } catch (error) {
    handleError(error);
    connection.release();
    return errResponse(baseResponseStatus.FAILURE);
  }
};