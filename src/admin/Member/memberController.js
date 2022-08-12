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
    [GET] /member?adminIdx=
*/
export const getClubMemberList = async (req, res) => {
  /*
      Query String: adminIdx
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
      return res.send(errResponse(baseResponse.JWT_TOKEN_DIFFERENT))
  }


  //paging
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 단체 모든 회원명단 리스트 조회 - Paging 적용
  const clubMemberListResult = await memberService.retrievePagingClubMemberList(adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};


/*
    API No. 3.2
    API Nanme: 회원 상세 조회 API
    [GET] /member?userIdx
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    // validation (middle) ❌
    /*
        userIdx's Status valid with User Table ? - 프론트진에서 의미가 있는지는 확인필요 아래와 동일논리
        JWT Token's adminIdx include req.userIdx ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯 -> 연습 삼아 만들어 봄.
    */
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }

    const tokenUserStatus = await memberProvider.checkTokenUserStatus(userIdx, JWT_Token_adminIdx);
    if (tokenUserStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.JWT_TOKEN_API_3_2));
    }




    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(userIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };


/*
    API No. 3.3
    API Nanme: 회원 삭제 API
    [PATCH] /member?userIdx=
*/
export const patchMember = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
    const JWT_Token_adminIdx = req.verifiedToken.adminId;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    // validation (middle) ❌
    /*
        userIdx's Status valid with User Table ? - 프론트진에서 의미가 있는지는 확인필요 아래와 동일논리
        JWT Token's adminIdx include req.userIdx as ACTIVE ? - 프론트에서 검증이 필요하다면, 만들어야 될 듯
    */
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }


    // 회원 삭제
    const deleteMemberResult = await memberService.deleteMember(userIdx, JWT_Token_adminIdx);
  
    return res.send(deleteMemberResult);
  };
