const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const scheduleDao = require("./scheduleDao");
const scheduleProvider = require("./scheduleProvider");

exports.postSchedule = async function (postScheduleParams) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    const insertScheduleResult = await scheduleDao.insertSchedule(
      connection,
      postScheduleParams
    );

    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR);
  }
};

exports.editSchedule = async function (scheduleIdx, editScheduleParams) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    // check active
    const scheduleStatusResult = await scheduleProvider.checkScheduleStatus(
      scheduleIdx
    );
    if (scheduleStatusResult != "ACTIVE") {
      connection.release();
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE); // baseResponse.SCHEDULE_STATUS_INACTIVE
    }

    // edit date
    if (editScheduleParams.scheduleDate !== undefined) {
      const editDateParams = [editScheduleParams.scheduleDate, scheduleIdx];
      const updateScheduleDateResult = await scheduleDao.updateScheduleDate(
        connection,
        editDateParams
      );
      console.log(updateScheduleDateResult);
    }
    // edit init_time
    if (editScheduleParams.init_time !== undefined) {
      const editInitTimeParams = [editScheduleParams.init_time, scheduleIdx];
      const updateInitTimeResult = await scheduleDao.updateScheduleInitTime(
        connection,
        editInitTimeParams
      );
    }
    // edit end_time
    if (editScheduleParams.end_time !== undefined) {
      const editEndTimeParams = [editScheduleParams.end_time, scheduleIdx];
      await scheduleDao.updateScheduleEndTime(connection, editEndTimeParams);
    }
    // edit introduction
    if (editScheduleParams.introduction !== undefined) {
      const editIntroParams = [editScheduleParams.introduction, scheduleIdx];
      const updateIntroResult = await scheduleDao.updateScheduleIntro(
        connection,
        editIntroParams
      );
      console.log(updateIntroResult);
    }
    // edit place
    if (editScheduleParams.place !== undefined) {
      const editPlaceParams = [editScheduleParams.place, scheduleIdx];
      await scheduleDao.updateSchedulePlace(connection, editPlaceParams);
    }
    // edit scheduleName
    if (editScheduleParams.scheduleName !== undefined) {
      const editNameParams = [editScheduleParams.scheduleName, scheduleIdx];
      await scheduleDao.updateScheduleName(connection, editNameParams);
    }

    connection.release();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR); // baseResponse.DB_ERROR
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
      return errResponse(baseResponse.SCHEDULE_STATUS_INACTIVE);
    }

    const editScheduleStatusResult = await scheduleDao.updateScheduleStatus(
      connection,
      scheduleIdx
    );
    connection.release();

    return response(baseResponse.SUCCESS);
  } catch (err) {
    console.log(err.message);
    return errResponse(baseResponse.DB_ERROR); // baseResponse.DB_ERROR
  } finally {
  }
};
