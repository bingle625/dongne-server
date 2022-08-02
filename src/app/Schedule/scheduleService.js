const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");
const scheduleProvider = require("./scheduleProvider");

exports.editScheduleStatus = async function (scheduleIdx) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );

    if (scheduleStatusResult != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.FAILURE); // baseResponse.SCHEDULE_STATUS_INACTIVE
    }

    const editScheduleStatusResult = await scheduleDao.updateScheduleStatus(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.FAILURE); // baseResponse.DB_ERROR
  } finally {
  }
};
