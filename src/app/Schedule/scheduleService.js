const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");
const scheduleProvider = require("./scheduleProvider");

// exports.functionName = async function (param) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   connection.release();
// };

exports.editSchedule = async function (scheduleIdx, editScheduleParams) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    // check active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    if (scheduleStatusResult != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.FAILURE); // baseResponse.SCHEDULE_STATUS_INACTIVE
    }

    // edit date
    if (editScheduleParams.date !== undefined) {
      // date validation
      const editDateParams = [editScheduleParams.date, scheduleIdx];
      await scheduleDao.updateScheduleDate(connection, editDateParams);
    }
    // edit init_time
    if (editScheduleParams.init_time !== undefined) {
      // init_time validation
      const editInitTimeParams = [editScheduleParams.init_time, scheduleIdx];
      await scheduleDao.updateScheduleInitTime(connection, editInitTimeParams);
    }
    // edit end_time
    if (editScheduleParams.end_time !== undefined) {
      // end_time validation
      const editEndTimeParams = [editScheduleParams.end_time, scheduleIdx];
      await scheduleDao.updateScheduleEndTime(connection, editEndTimeParams);
    }
    // edit introduction
    if (editScheduleParams.introduction !== undefined) {
      // introduction validation
      const editIntroParams = [editScheduleParams.introduction, scheduleIdx];
      await scheduleDao.updateScheduleIntro(connection, editIntroParams);
    }
    // edit place
    if (editScheduleParams.place !== undefined) {
      // place validation
      const editPlaceParams = [editScheduleParams.place, scheduleIdx];
      await scheduleDao.updateSchedulePlace(connection, editPlaceParams);
    }
    // edit scheduleName
    if (editScheduleParams.scheduleName !== undefined) {
      // scheduleName validation
      const editNameParams = [editScheduleParams.scheduleName, scheduleIdx];
      await scheduleDao.updateScheduleName(connection, editNameParams);
    }

    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.FAILURE); // baseResponse.DB_ERROR
  } finally {
  }
};

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
