module.exports = {
  // Request SUCCESS
  SUCCESS: { isSuccess: true, code: 1000, message: "API 요청 성공" },

  // Request ERROR
  FAILURE: { isSuccess: false, code: 2000, message: "API 요청 실패" },

  SCHEDULE_SCHEDULEIDX_EMPTY: {
    isSuccess: false,
    code: 2001,
    message: "scheduleIdx를 입력해주세요."
  },

  SCHEDULE_SCHEDULEIDX_LENGTH: {
    isSuccess: false,
    code: 2002,
    message: "scheduleIdx는 0보다 큰 값으로 입력해주세요."
  },

  SCHEDULE_POST_PARAMS_EMPTY: {
    isSuccess: false,
    code: 2003,
    message: "파라미터를 모두 입력하세요."
  },

  SCHEDULE_SCHEDULEDATE_EMPTY: {
    isSuccess: false,
    code: 2005,
    message: "스케줄 날짜를 입력하세요."
  },

  SCHEDULE_INITTIME_EMPTY: {
    isSuccess: false,
    code: 2006,
    message: "스케줄 시작시간을 입력하세요."
  },

  SCHEDULE_ENDTIME_EMPTY: {
    isSuccess: false,
    code: 2007,
    message: "스케줄 종료시간을 입력하세요."
  },

  SCHEDULE_INTRODUCTION_EMPTY: {
    isSuccess: false,
    code: 2008,
    message: "스케줄 소개를 입력하세요."
  },

  SCHEDULE_PLACE_EMPTY: {
    isSuccess: false,
    code: 2009,
    message: "스케줄 장소를 입력하세요."
  },

  SCHEDULE_SCHEDULENAME_EMPTY: {
    isSuccess: false,
    code: 2010,
    message: "스케줄 이름을 입력하세요."
  },

  SCHEDULE_INTRODUCTION_LENGTH: {
    isSuccess: false,
    code: 2011,
    message: "스케줄 소개는 150자 이하로 입력가능합니다."
  },

  SCHEDULE_PLACE_LENGTH: {
    isSuccess: false,
    code: 2012,
    message: "스케줄 장소는 50자 이하로 입력가능합니다."
  },

  SCHEDULE_SCHEDULENAME_LENGTH: {
    isSuccess: false,
    code: 2013,
    message: "스케줄 이름은 100자 이하로 입력가능합니다."
  },

  SCHEDULE_SCHEDULEDATE_VALID: {
    isSuccess: false,
    code: 2014,
    message: "스케줄 날짜를 YYYY/MM/DD 또는 YYYY-MM-DD 형식으로 입력하세요."
  },

  SCHEDULE_INITTIME_VALID: {
    isSuccess: false,
    code: 2015,
    message: "스케줄 시작시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },

  SCHEDULE_ENDTIME_VALID: {
    isSuccess: false,
    code: 2016,
    message: "스케줄 종료시간을 YYYY/MM/DD HH:mm:ss 또는 YYYY-MM-DD HH:mm:ss 형식으로 입력하세요."
  },

  GROUP_GROUPIDX_EMPTY: {
    isSuccess: false,
    code: 2017,
    message: "groupIdx를 입력해주세요."
  },

  GROUP_GROUPIDX_LENGTH: {
    isSuccess: false,
    code: 2018,
    message: "groupIdx는 0보다 큰 값으로 입력해주세요."
  },

  // Reponse ERROR
  SCHEDULE_STATUS_INACTIVE: {
    isSuccess: false,
    code: 3001,
    message: "이미 삭제된 스케줄입니다."
  },

  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" },

  SIGNIN_PASSWORD_LENGTH: { isSuccess: false, code: 2026, message: "비밀번호의 길이는 8자리 이상으로 입력해주세요." },

  // Response error
  SIGNUP_REDUNDANT_EMAIL: { isSuccess: false, code: 3001, message: "중복된 이메일입니다." },
  SIGNUP_REDUNDANT_NICKNAME: { isSuccess: false, code: 3002, message: "중복된 닉네임입니다." },

  SIGNIN_EMAIL_WRONG: { isSuccess: false, code: 3003, message: "아이디가 잘못 되었습니다." },
  SIGNIN_PASSWORD_WRONG: { isSuccess: false, code: 3004, message: "비밀번호가 잘못 되었습니다." },
  SIGNIN_INACTIVE_ACCOUNT: { isSuccess: false, code: 3005, message: "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
  SIGNIN_WITHDRAWAL_ACCOUNT: { isSuccess: false, code: 3006, message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

  // Common
  TOKEN_EMPTY: { isSuccess: false, code: 2000, message: "JWT 토큰을 입력해주세요." },
  TOKEN_VERIFICATION_FAILURE: { isSuccess: false, code: 3000, message: "JWT 토큰 검증 실패" },
  TOKEN_VERIFICATION_SUCCESS: { isSuccess: true, code: 1001, message: "JWT 토큰 검증 성공" }, // ?

  //Request error
  SIGNUP_EMAIL_EMPTY: { isSuccess: false, code: 2001, message: "이메일을 입력해주세요." },
  SIGNUP_EMAIL_LENGTH: { isSuccess: false, code: 2002, message: "이메일은 30자리 미만으로 입력해주세요." },
  SIGNUP_EMAIL_ERROR_TYPE: { isSuccess: false, code: 2003, message: "이메일을 형식을 정확하게 입력해주세요." },
  SIGNUP_PASSWORD_EMPTY: { isSuccess: false, code: 2004, message: "비밀번호를 입력 해주세요." },
  SIGNUP_PASSWORD_LENGTH: { isSuccess: false, code: 2005, message: "비밀번호는 6~20자리를 입력해주세요." },
  SIGNUP_CLUBNAME_EMPTY: { isSuccess: false, code: 2008, message: "동아리 이름을 입력해주세요." },
  SIGNUP_EMAIL_EXIST: { isSuccess: false, code: 2009, message: "이미 존재하는 이메일입니다." },

  SIGNIN_EMAIL_EMPTY: { isSuccess: false, code: 2008, message: "이메일을 입력해주세요" },
  SIGNIN_EMAIL_LENGTH: { isSuccess: false, code: 2009, message: "이메일은 30자리 미만으로 입력해주세요." },
  SIGNIN_EMAIL_ERROR_TYPE: { isSuccess: false, code: 2010, message: "이메일을 형식을 정확하게 입력해주세요." },
  SIGNIN_PASSWORD_EMPTY: { isSuccess: false, code: 2011, message: "비밀번호를 입력 해주세요." },

  // ADMIN's errResponse
  ADMIN_ADMINIDX_EMPTY: { isSuccess: false, code: 2001, message: "adminIdx를 입력해주세요." },
  ADMIN_ADMINIDX_LENGTH: { isSuccess: false, code: 2002, message: "adminIdx를 0보다 큰 값을 입력해주세요." },
  ADMIN_ADMINIDX_STATUS: { isSuccess: false, code: 2003, message: "유효하지 않는 adminIdx입니다." },

  //USER's errResponse
  USER_USERIDX_EMPTY: { isSuccess: false, code: 3000, message: "userIdx를 입력해주세요." },
  USER_USERIDX_LENGTH: { isSuccess: false, code: 3001, message: "userIdx를 0보다 큰 값을 입력해주세요." },
  USER_USERIDX_STATUS: { isSuccess: false, code: 3002, message: "유효하지 않는 userIdx입니다." },

  //GROUP's errReponse
  GROUP_GROUPNAME_EMPTY: { isSuccess: false, code: 4001, message: "groupName을 입력해주세요." },
  GROUP_GROUPNAME_LENGTH: { isSuccess: false, code: 4002, message: "groupName를 45자 이내로 입력해주세요." },
  GROUP_GROUPINTRODUCTION_EMPTY: { isSuccess: false, code: 4003, message: "groupIntroduction을 입력해주세요." },
  GROUP_GROUPINTRODUCTION_LENGTH: { isSuccess: false, code: 4004, message: "groupIntroduction을 200자 이내로 입력해주세요." },
  GROUP_USERIDX_EMPTY: { isSuccess: false, code: 4005, message: "group에 추가/삭제할 userIdx를 입력해주세요." },
  GROUP_USERIDX_LENGTH: { isSuccess: false, code: 4006, message: "group에 추가/삭제할 userIdx를 0보다 큰 값을 입력해주세요." },
  GROUP_GROUPIDX_EMPTY: { isSuccess: false, code: 4007, message: "groupIdx를 입력해주세요." },
  GROUP_GROUPIDX_LENGTH: { isSuccess: false, code: 4008, message: "groupIdx를 0보다 큰 값을 입력해주세요." },

  //DB Error
  DB_ERRORS: { isSuccess: false, code: 5000, message: "데이터베이스 에러" }
};
