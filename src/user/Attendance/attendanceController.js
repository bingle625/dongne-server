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

  // response
  return response(baseResponse.SUCCESS);
};
