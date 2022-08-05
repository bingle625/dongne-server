const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const memberProvider = require("./memberProvider");




/*
    API No. 0.0
    API Nanme: DB 테스트 API
    [GET] /member/db
*/
export const getDatabaseTest = async (req, res) => {
    const testUserResult = await memberProvider.retrieveUserList();
    return res.send(testUserResult);
  };


/*
    API No. 3.1
    API Nanme: 단체 모든 회원명단 리스트 조회 API
    [GET] /member?adminIdx=
*/
export const getClubMemberList = async (req, res) => {
  /*
      Query String: adminIdx
  */
  const adminIdx = req.query.adminIdx;

  // validation
  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  // Admin Table Validation (status == ACTIVE)
  // TO DO : DB 조회 만들고 제작
  const clubStatus = await memberProvider.checkClubStatus(adminIdx);
  if (clubStatus != "ACTIVE"){
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_STATUS));
  }

  // 단체 모든 회원명단 리스트 조회
  const clubMemberListResult = await memberProvider.retrieveClubMemberList(adminIdx);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};

/*
    API No. 3.2
    API Nanme: 단체 내 특정 출석그룹 회원명단 리스트 조회 API
    [GET] /member?groupIdx=
*/




/*
    API No. 3.3
    API Nanme: 회원 상세 조회 API
    [GET] /member?userIdx
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
  
    // validation
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }
  
    // User Table Validation (status == ACTIVE)
    // Validation Point : User's joining the dongne website user?
    // TO DO : DB 상세 조회 제작 후 진행
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }

    // ClubMember Table Validation (status == ACTIVE)
    // userIdx가 단체에 속해있는지 확인해야 되나? (JWT 토큰의 adminIdx와 userIdx가 속해있는 adminIdx와 값이 같은 지 비교)
    // -> 내 생각 백엔드에서 많은 처리를 할수록 프론트에서 감당해야 할 처리가 줄어들음. + 보안 문제해결
    // Validation Point : User's joining the this Club?
    // LATER TO DO : User Table Validation 제작 후 진행 and JWT 구현완료 시 상의 후 필요하면 구현
    /*
    const clubUserStatus = await memberProvider.checkUserStatus(userIdx);
    if (clubUserStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.MEMBER_USERIDX_STATUS));
    }
    */  


    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(userIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };