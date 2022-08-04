module.exports = {
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },
  FAILURE: { isSuccess: false, code: 2000, message: "실패" },

  SIGNIN_EMAIL_WRONG: { isSuccess: false, code: 3003, message: "아이디가 잘못 되었습니다." },
  SIGNIN_PASSWORD_WRONG: { isSuccess: false, code: 3004, message: "비밀번호가 잘못 되었습니다." },
  SIGNIN_INACTIVE_ACCOUNT: { isSuccess: false, code: 3005, message: "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
  SIGNIN_WITHDRAWAL_ACCOUNT: { isSuccess: false, code: 3006, message: "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

  SIGNIN_EMAIL_EMPTY: { isSuccess: false, code: 2008, message: "이메일을 입력해주세요" },
  SIGNIN_EMAIL_LENGTH: { isSuccess: false, code: 2009, message: "이메일은 30자리 미만으로 입력해주세요." },
  SIGNIN_EMAIL_ERROR_TYPE: { isSuccess: false, code: 2010, message: "이메일을 형식을 정확하게 입력해주세요." },
  SIGNIN_PASSWORD_EMPTY: { isSuccess: false, code: 2011, message: "비밀번호를 입력 해주세요." },
  //Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 4000, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 4001, message: "서버 에러" }
};
