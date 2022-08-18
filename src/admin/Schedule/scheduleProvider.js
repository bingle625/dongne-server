const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");

exports.retrieveScheduleList = async function (groupIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleListResult = await scheduleDao.selectSchedule(
      connection,
      groupIdx
    );
    connection.release();
    return response(baseResponse.SUCCESS, scheduleListResult);
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

exports.retrieveScheduleInfo = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleDao.selectScheduleStatus(
      connection,
      scheduleIdx
    );

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

// exports.functionName = async function (param) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     connection.release();
//   };
