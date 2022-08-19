const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const memberProvider = require("./memberProvider");
const memberService = require("./memberService");




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
    [GET] /member?adminIdx=&page=&pageSize=
*/
export const getClubMemberList = async (req, res) => {
  /*
      Query String: adminIdx, page, pageSize
  */
  const adminIdx = req.query.adminIdx;
  const JWT_Token_adminIdx = req.verifiedToken.adminId;

  // validation (basic) ✅
  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  // validation (middle) ✅
  /*
    adminIdx's Status valid with Admin Table ? - auth에서 이미 검증함.
    JWT Token's adminIdx include req.adminIdx ?
  */
  if(adminIdx != JWT_Token_adminIdx){
      return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
  }


  //paging ✅
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 단체 모든 회원명단 리스트 조회 - Paging 적용
  const clubMemberListResult = await memberService.retrievePagingClubMemberList(adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};


/*
    API No. 3.2
    API Nanme: 회원 상세 조회 API
    [GET] /member/info?userIdx=&adminIdx=
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx, adminIdx
    */
    const userIdx = req.query.userIdx;
    const adminIdx = req.query.adminIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if (adminIdx != JWT_Token_adminIdx){
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }

    // validation (middle) ✅
    /*
        userIdx's Status valid with User Table ? -> 프엔 개발자의 휴먼에러를 막기위해서 필요
        (대체)JWT Token's adminIdx include req.userIdx ? 
        (대체된 것) memberProvider Validation
    */

    /* -> memberProvider의 Validation으로 옮김.
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */

    /* -> memberProvider의 Validation으로 대체가능함.
    const tokenUserStatus = await memberProvider.checkTokenUserStatus(userIdx, JWT_Token_adminIdx);
    if (tokenUserStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.JWT_TOKEN_API_3_2));
    }
    */



    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(userIdx, JWT_Token_adminIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };


/*
    API No. 3.3
    API Nanme: 회원 삭제 API
    [PATCH] /member?userIdx=
*/
export const patchMember = async (req, res) => {
    /*
        Query String: userIdx, adminIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
    const adminIdx = req.query.adminIdx;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if (adminIdx != JWT_Token_adminIdx){
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }

    // validation (middle) ✅
    /*
        userIdx's Status valid with User Table ? - 프론트진에서 의미가 있는지는 확인필요 아래와 동일논리
        JWT Token's adminIdx include req.userIdx as ACTIVE ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
    */
    /*
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */

    // 회원 삭제
    const deleteMemberResult = await memberService.deleteMember(userIdx, adminIdx);
  
    return res.send(deleteMemberResult);
  };


/*
    API No. 3.4
    API Nanme: 동아리의 회원 팀/조 카테고리 추가 API
    [PATCH] /member/update/:adminIdx
*/
export const postClubTeam = async (req, res) => {
    /*
        Path Variable: adminIdx
        Body: teamName
    */
    const adminIdx = req.params.adminIdx;
    const {teamName} = req.body;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
    // validation (basic) ✅
    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if(!teamName) {
        return res.send(errResponse(baseResponse.ADMIN_TEAMNAME_EMPTY));
    }
    if (teamName.length > 40) {
        return res.send(errResponse(baseResponse.ADMIN_TEAMNAME_LENGTH));
    }

    if(JWT_Token_adminIdx != adminIdx) {
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    } 



    // validation (middle)
    /*
        별다른 validation이 필요없음.
    */

    // 동아리의 회원 팀/조 카테고리 추가하기
    const createClubTeamResult = await memberService.createClubTeam(adminIdx, teamName);
  
    return res.send(createClubTeamResult);
  };


/*
    API No. 3.5
    API Nanme: 동아리 소속회원 팀/조 카테고리 적용 API
    [PATCH] /member/update?userIdx=
*/
export const patchMemberClubTeam = async (req, res) => {
    /*
        query string: userIdx, adminIdx
        Body: teamName
    */
    const userIdx = req.query.userIdx;
    const adminIdx = req.query.adminIdx;
    const {clubTeamListIdx} = req.body;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;

    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    if(!adminIdx) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
    } 
    if (adminIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
    }

    if(!clubTeamListIdx) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBTEAMLISTIDX_EMPTY));
    }
    if (clubTeamListIdx <= 0) {
        return res.send(errResponse(baseResponse.ADMIN_CLUBTEAMLISTIDX_LENGTH));
    }

    if(JWT_Token_adminIdx != adminIdx) {
        return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT));
    }

    // validation (middle) ❌
    /*
        userIdx's include with adminIdx
        clubTeamListIdx's valid with clubTeamList Table
    */

    // 동아리의 소속회원 팀/조 카테고리 적용하기
    const updateMemberClubTeamResult = await memberService.updateMemberClubTeam(clubTeamListIdx, userIdx, adminIdx);
  
    return res.send(updateMemberClubTeamResult);
  };
