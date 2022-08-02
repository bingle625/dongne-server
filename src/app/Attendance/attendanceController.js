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
  const attendListResult = await attendanceProvider.retrieveAttendList(
    scheduleIdx
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
  const absenceListResult = await attendanceProvider.retrieveAbsenceList(
    scheduleIdx
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

  const attendCodeResult = await attendanceProvider.retrieveAttendCode(
    scheduleIdx
  );

  return res.send(attendCodeResult);
};
