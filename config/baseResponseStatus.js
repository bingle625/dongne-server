module.exports = {
  SUCCESS: { isSuccess: true, code: 1000, message: "성공" },

  
  FAILURE: { isSuccess: false, code: 2000, message: "실패" },

  // 에러 규칙 :

  // ADMIN's errResponse
  ADMIN_ADMINIDX_EMPTY: { isSuccess: false, code: 2001, message: "adminIdx를 입력해주세요."},
  ADMIN_ADMINIDX_LENGTH: {isSuccess: false, code: 2002, message: "adminIdx를 0보다 큰 값을 입력해주세요."},
  ADMIN_ADMINIDX_STATUS: {isSuccess: false, code: 2003, message: "유효하지 않는 adminIdx입니다."},



  //USER's errResponse
  USER_USERIDX_EMPTY: {isSuccess: false, code: 3000, message: "userIdx를 입력해주세요."},
  USER_USERIDX_LENGTH: {isSuccess: false, code: 3001, message: "userIdx를 0보다 큰 값을 입력해주세요."},
  USER_USERIDX_STATUS : {isSuccess: false, code: 3002, message: "유효하지 않는 userIdx입니다."},


  //GROUP's errReponse
  GROUP_GROUPNAME_EMPTY: {isSuccess: false, code: 4001, message: "groupName을 입력해주세요."},
  GROUP_GROUPNAME_LENGHT: {isSuccess: false, code: 4002, message: "groupName를 45바이트 이내로 입력해주세요."},
  GROUP_GROUPINTRODUCTION_EMPTY: {isSuccess: false, code: 4003, message: "groupIntroduction을 입력해주세요."},
  GROUP_GROUPINTRODUCTION_LENGTH: {isSuccess: false, code: 4004, message: "groupIntroduction을 200바이트 이내로 입력해주세요."},
  GROUP_USERIDX_EMPTY: {isSuccess: false, code: 4005, message: "group에 추가할 userIdx를 입력해주세요."},
  GROUP_USERIDX_LENGTH: {isSuccess: false, code: 4006, message: "group에 추가할 userIdx를 0보다 큰 값을 입력해주세요."},
  GROUP_GROUPIDX_EMPTY: {isSuccess: false, code: 4007, message: "groupIdx를 입력해주세요."},
  GROUP_GROUPIDX_LENGTH: {isSuccess: false, code: 4008, message: "groupIdx를 0보다 큰 값을 입력해주세요."},
  

  


  

};
