const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const scheduleProvider = require("./scheduleProvider");

/**
 * API No. 6.1
 * API Name : 스케줄 리스트 조회 API
 * [GET] /user/schedule/list/
 */
exports.getSchedule = async function (req, res) {
  //  body : groupIdx, userIdx
  const { groupIdx, userIdx, curPage } = req.body;

  // groupIdx validation
  if (!groupIdx) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
    return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }
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
 * [GET] /user/schedule/
 */
exports.getScheduleInfo = async function (req, res) {
  // body : scheduleIdx, userIdx
  const { scheduleIdx, userIdx } = req.body;

  // scheduleIdx validation
  if (!scheduleIdx) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_EMPTY));
  } else if (scheduleIdx <= 0) {
    return res.send(errResponse(baseResponse.SCHEDULE_SCHEDULEIDX_LENGTH));
  }

  // Response
  const scheduleInfoResponse = await scheduleProvider.retrieveScheduleInfo(
    scheduleIdx
  );

  return res.send(scheduleInfoResponse);
};
