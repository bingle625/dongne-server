const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const scheduleProvider = require("./scheduleProvider");
const scheduleService = require("./scheduleService");

/**
 * API No. 5.1
 * API Name : 스케줄 생성 API
 * [POST] /schedule
 */

/**
 * API No. 5.2
 * API Name : 스케줄 리스트 조회 API
 * [GET] /schedule/list/:groupIdx
 */
exports.getSchedule = async function (req, res) {
  // Path Variable: groupIdx
  const groupIdx = req.params.groupIdx;

  // validation

  const scheduleListResult = await scheduleProvider.retrieveScheduleList(
    groupIdx
  );
  return res.send(response(baseResponse.SUCCESS, scheduleListResult));
};

/**
 * API No. 5.3
 * API Name : 스케줄 상세 조회 API
 * [GET] /schedule/:scheduleIdx
 */

exports.getScheduleInfo = async function (req, res) {
  // Path Variable: scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  // validation

  const scheduleInfoResponse = await scheduleProvider.retrieveScheduleInfo(
    scheduleIdx
  );

  return res.send(scheduleInfoResponse);
};

/**
 * API No. 5.4
 * API Name : 스케줄 수정 API
 * [PATCH] /schedule/:scheduleIdx
 */
exports.patchSchedule = async function (req, res) {
  // path variable
  const scheduleIdx = req.params.scheduleIdx;
  // body : date, init_time, end_time, introduction, place, scheduleName
  const editScheduleParams = req.body;

  //validation

  const editScheduleResponse = await scheduleService.editSchedule(
    scheduleIdx,
    editScheduleParams
  );

  return res.send(editScheduleResponse);
};

/**
 * API No. 5.5
 * API Name : 스케줄 삭제 API
 * [PATCH] /schedule/:scheduleIdx/status
 */
exports.patchScheduleStatus = async function (req, res) {
  // Path Variable: scheduleIdx
  const scheduleIdx = req.params.scheduleIdx;
  //validation

  const editScheduleStatusResponse = await scheduleService.editScheduleStatus(
    scheduleIdx
  );
  return res.send(editScheduleStatusResponse);
};
