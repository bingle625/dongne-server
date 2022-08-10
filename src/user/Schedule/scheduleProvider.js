const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");

exports.retrieveScheduleList = async function (groupIdx, userIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const selectScheduleParams = [groupIdx, userIdx];
    // group, user validation
    const existUserResult = await scheduleDao.selectExistUser(
      connection,
      selectScheduleParams
    );
    if (existUserResult[0].success == 0) {
      connection.release();
      return errResponse(baseResponse.GROUP_USERIDX_EXIST);
    }

    const scheduleListResult = await scheduleDao.selectSchedule(
      connection,
      selectScheduleParams
    );
    connection.release();

    return response(baseResponse.SUCCESS, scheduleListResult);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.retrieveScheduleInfo = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
      connection,
      scheduleIdx
    );
    // scheduleIdx status validation
    if (scheduleStatusResult[0].status != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const scheduleInfoResult = await scheduleDao.selectScheduleInfo(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, scheduleInfoResult);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.checkScheduleStatus = async function (scheduleIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
    connection,
    scheduleIdx
  );
  connection.release();

  return scheduleStatusResult[0].status;
};

exports.checkUserExist = async function (groupIdx, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const selectExistParams = [groupIdx, userIdx];

  const userExistResult = await scheduleDao.selectExistUser(
    connection,
    selectExistParams
  );
  connection.release();

  return userExistResult[0].success;
};
