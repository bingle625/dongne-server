const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const scheduleProvider = require("./scheduleProvider");

/**
 * API No. 6.1
 * API Name : 스케줄 리스트 조회 API
 * [GET] /user/schedule/list?groupIdx=#&userIdx=#&curPage=#
 */
exports.getSchedule = async function (req, res) {
  // query parameters
  const { groupIdx, userIdx, curPage } = req.query;

  // groupIdx validation
  if (!groupIdx) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }
  // userIdx validation
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }
  // curPage
  if (curPage <= 0) {
    curPage = 1;
  }

  // Response
  const scheduleListResponse = await scheduleProvider.retrieveScheduleList(
    groupIdx,
    userIdx,
    curPage
  );
  return res.send(scheduleListResponse);
};

/**
 * API No. 6.2
 * API Name : 스케줄 상세 조회 API
 * [GET] /user/schedule?scheduleIdx=#&userIdx=#
 */
exports.getScheduleInfo = async function (req, res) {
  // query parameters
  const { scheduleIdx, userIdx } = req.query;

  // scheduleIdx validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }
  // userIdx validation
  if (!userIdx) {
    return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
  } else if (userIdx <= 0) {
    return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
  }

  // Response
  const scheduleInfoResponse = await scheduleProvider.retrieveScheduleInfo(
    scheduleIdx
  );

  return res.send(scheduleInfoResponse);
};
