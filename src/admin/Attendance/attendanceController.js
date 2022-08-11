const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const attendanceProvider = require("./attendanceProvider");

/**
 * API No. 6.1
 * API Name : 출석한 회원 리스트 조회 API
 * [GET] /attendance/:scheduleIdx
 */
exports.getAttendance = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx, curPage
  const { adminIdx, curPage } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // admin validation
  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (curPage <= 0) {
    curPage = 1;
  }

  const attendListResult = await attendanceProvider.retrieveAttendList(
    scheduleIdx,
    curPage
  );
  return res.send(attendListResult);
};

/**
 * API No. 6.2
 * API Name : 결석한 회원 리스트 조회 API
 * [GET] /attendance/absence/:scheduleIdx
 */
exports.getAbsence = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx,curPage
  const { adminIdx, curPage } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  if (curPage <= 0) {
    curPage = 1;
  }

  const absenceListResult = await attendanceProvider.retrieveAbsenceList(
    scheduleIdx,
    curPage
  );
  return res.send(absenceListResult);
};

/**
 * API No. 6.3
 * API Name : 출석코드 API 조회
 * [GET] /attendance/code/:scheduleIdx
 */
exports.getAttendCode = async function (req, res) {
  // Path Variable : scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // body : adminIdx
  const { adminIdx } = req.body;
  // jwt : adminId
  const adminIdxFromJWT = req.verifiedToken.adminId;

  // adminIdx validation
  if (!adminIdx) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  } else if (adminIdx != adminIdxFromJWT) {
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_NOT_MATCH));
  }

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  const attendCodeResult = await attendanceProvider.retrieveAttendCode(
    scheduleIdx
  );

  return res.send(attendCodeResult);
};
