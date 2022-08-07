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
