const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const attendanceDao = require("./attendanceDao");
const scheduleProvider = require("../Schedule/scheduleProvider");
const groupDao = require("../Group/groupDao");
const baseResponseStatus = require("../../../config/baseResponseStatus");

// paging 추가 ✅
exports.retrieveAttendList = async function (scheduleIdx, groupIdx, adminIdx, curPage) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);

    // Validation Check's groupIdx Status (middle)
    const groupIdxStatusParams = [adminIdx, groupIdx];
    const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    if (groupIdxStatus[groupIdxStatus.length - 1]?.status != "ACTIVE"){
      return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
    }

    const page_size = 10; // 페이지당 회원 수
    const countAttnedResult = await attendanceDao.countAttendList(
      connection,
      scheduleIdx
    );
    const totalAttend = countAttnedResult[0].count; // 전체 출석한 회원 수
    const totalPage = Math.ceil(totalAttend / page_size); // 전체 페이지 수
    const offset = (curPage - 1) * page_size; // 시작 번호

    // query param
    const selectAttendParams = [scheduleIdx, groupIdx, adminIdx, offset, page_size];
    // select attendance
    const attendListResult = await attendanceDao.selectAttendList(
      connection,
      selectAttendParams
    );
    connection.release();

    // result
    const result = {
      attendList: attendListResult,
      totalPage: totalPage,
      curPage: curPage,
    };
    return response(baseResponse.SUCCESS, result);
  } catch (err) {
    console.log(err.response);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
  }
};

// paging 추가 ✅
exports.retrieveAbsenceList = async function (scheduleIdx, groupIdx, adminIdx, curPage) {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    
    // Validation Check's groupIdx Status (middle)
    const groupIdxStatusParams = [adminIdx, groupIdx];
    const groupIdxStatus = await groupDao.selectGroupIdxStatus(connection, groupIdxStatusParams);
    if (groupIdxStatus[groupIdxStatus.length - 1]?.status != "ACTIVE"){
      return errResponse(baseResponseStatus.ADMIN_GROUPIDX_STATUS);
    }
    
    const page_size = 10; // 페이지당 회원수
    const countAbsenceResult = await attendanceDao.countAbsenceList(
      connection,
      scheduleIdx
    );
    const totalAbsence = countAbsenceResult[0].count; // 전체 결석한 회원 수
    const totalPage = Math.ceil(totalAbsence / page_size); // 전체 페이지 수
    const offset = (curPage - 1) * page_size;

    //query param
    const selectAbsenceParmas = [scheduleIdx, groupIdx, adminIdx, offset, page_size];
    // select AbsenceLisrt
    const absenceListResult = await attendanceDao.selectAbsenceList(
      connection,
      selectAbsenceParmas
    );
    connection.release();

    // result
    const result = {
      absenceList: absenceListResult,
      totalPage: totalPage,
      curPage: curPage,
    };
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
