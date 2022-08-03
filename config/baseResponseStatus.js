module.exports = {
  // Request SUCCESS
  SUCCESS: { isSuccess: true, code: 1000, message: "API 요청 성공" },

  // Request ERROR
  FAILURE: { isSuccess: false, code: 2000, message: "API 요청 실패" },

  SCHEDULE_SCHEDULEIDX_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "scheduleIdx를 입력해주세요.",
  },

  SCHEDULE_SCHEDULEIDX_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "scheduleIdx는 0보다 큰 값으로 입력해주세요.",
  },

  SCHEDULE_POST_PARAMS_EMPTY: {
    isSuccess: false,
    code: 2003,
    message: "파라미터를 모두 입력하세요.",
  },

  SCHEDULE_SCHEDULEDATE_EMPTY: {
    isSuccess: false,
    code: 2005,
    message: "스케줄 날짜를 입력하세요.",
  },

  SCHEDULE_INITTIME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "스케줄 시작시간을 입력하세요.",
  },

  SCHEDULE_ENDTIME_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "스케줄 종료시간을 입력하세요.",
  },

  SCHEDULE_INTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "스케줄 소개를 입력하세요.",
  },

  SCHEDULE_PLACE_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "스케줄 장소를 입력하세요.",
  },

  SCHEDULE_SCHEDULENAME_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "스케줄 이름을 입력하세요.",
  },

  SCHEDULE_INTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 2011,
    message: "스케줄 소개는 150자 이하로 입력가능합니다.",
  },

  SCHEDULE_PLACE_LENGTH: {
    isSuccess: false,
    code: 2012,
    message: "스케줄 장소는 50자 이하로 입력가능합니다.",
  },

  SCHEDULE_SCHEDULENAME_LENGTH: {
    isSuccess: false,
    code: 2013,
    message: "스케줄 이름은 100자 이하로 입력가능합니다.",
  },

  SCHEDULE_SCHEDULEDATE_VALID: {
    isSuccess: false,
    code: 2014,
    message: "스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요.",
  },

  SCHEDULE_INITTIME_VALID: {
    isSuccess: false,
    code: 2015,
    message:
      "스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.",
  },

  SCHEDULE_ENDTIME_VALID: {
    isSuccess: false,
    code: 2016,
    message:
      "스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요.",
  },

  GROUP_GROUPIDX_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "groupIdx를 입력해주세요.",
  },

  GROUP_GROUPIDX_LENGTH: {
    isSuccess: false,
    code: 2018,
    message: "groupIdx는 0보다 큰 값으로 입력해주세요.",
  },

  // Reponse ERROR
  SCHEDULE_STATUS_INACTIVE: {
    isSuccess: false,
    code: 3001,
    message: "이미 삭제된 스케줄입니다.",
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },
};
