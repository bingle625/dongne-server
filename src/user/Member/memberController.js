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
    API No. 4.1
    API Nanme: 단체 모든 회원명단 리스트 조회 API
    [GET] /member?adminIdx=
*/
export const getClubMemberList = async (req, res) => {
  /*
      Query String: adminIdx
  */
  const adminIdx = req.query.adminIdx;

  // validation (basic) ✅
  if(!adminIdx) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } 
  if (adminIdx <= 0) {
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  // validation (middle) ❌
  /*
    adminIdx's Status valid with Admin Table ? 
    JWT Token's userIdx and req.adminIdx by ClubMembers Table is status "ACTIVE" ? (WHERE ID)
  */

  const clubStatus = await memberProvider.checkClubStatus(adminIdx);
  if (clubStatus != "ACTIVE"){
      return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_STATUS));
  }

  //paging
  const page = parseInt(req.query.page);
  const pageSize = parseInt(req.query.pageSize);
  if(!page || !pageSize){
      return res.send(errResponse(baseResponse.PAGING_PARAMS_EMPTY));
  }


  // 단체 모든 회원명단 리스트 조회
  const clubMemberListResult = await memberService.retrievePagingClubMemberList(adminIdx, page, pageSize);

  return res.send(response(baseResponse.SUCCESS, clubMemberListResult));
};


/*
    API No. 4.2
    API Nanme: 회원 상세 조회 API
    [GET] /member/info?userIdx
*/
export const getMemberInfo = async (req, res) => {
    /*
        Query String: userIdx
    */
    const userIdx = req.query.userIdx;
  
    // validation (basic) ✅
    if(!userIdx) {
        return res.send(errResponse(baseResponse.USER_USERIDX_EMPTY));
    } 
    if (userIdx <= 0) {
        return res.send(errResponse(baseResponse.USER_USERIDX_LENGTH));
    }

    // validation (middle) ❌
    /*
        userIdx's Status valid with User Table ?
        JWT Token's userIdx and req.userIdx by ClubMembers Table is status "ACTIVE" ? (WHERE ID)
    */
    const userStatus = await memberProvider.checkUserStatus(userIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }


    // 회원 상세 조회
    const memberInfoResult = await memberProvider.retrieveMemberInfo(userIdx);
  
    return res.send(response(baseResponse.SUCCESS, memberInfoResult));
  };