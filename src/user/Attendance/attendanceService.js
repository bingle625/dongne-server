const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");
const scheduleProvider = require("../../admin/Schedule/scheduleProvider");

exports.postAttendanceCode = async function (
  scheduleIdx,
  userIdx,
  attendanceCode
) {
  try {
    // check schedule active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    // check userIdx

    const postAttendCodeParams = [attendanceCode, scheduleIdx];
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};
