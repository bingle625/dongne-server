const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const attendanceService = require("./attendanceService");

/**
 * API No. 7.1
 * API Name : 출석코드 인증 API
 * [POST] /user/attendance/code
 */
exports.postAttendanceCode = async function (req, res) {
  // body : scheduleIdx, userIdx, attendanceCode
  const { scheduleIdx, userIdx, attendanceCode } = req.body;

  // validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  }
  if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  if (!attendanceCode) {
    return res.send(errResponse(baseResponse.ATTENDANCE_CODE_EMPTY));
  }

  // response
  const postAttendCodeResponse = await attendanceService.editAttendance(
    scheduleIdx,
    userIdx,
    attendanceCode
  );

  return res.send(postAttendCodeResponse);
};
