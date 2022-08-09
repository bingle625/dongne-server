const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");
const scheduleProvider = require("../Schedule/scheduleProvider");

exports.retrieveAttendList = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const attendListResult = await attendanceDao.selectAttendList(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, attendListResult);
  } catch (err) {
    console.log(err.response);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.retrieveAbsenceList = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const absenceListResult = await attendanceDao.selectAbsenceList(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, absenceListResult);
  } catch (err) {
    console.log(err.response);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

exports.retrieveAttendCode = async function (scheduleIdx) {
  try {
    // check Active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    if (scheduleStatusResult != "ACTIVE") {
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const connection = await pool.getConnection(async (conn) => conn);
    const attendCodeResult = await attendanceDao.selectAttendCode(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS, attendCodeResult[0].attendanceCode);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};
