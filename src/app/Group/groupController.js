const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const groupService = require("./groupService");
const groupProvider = require("./groupProvider");



/*
    API No. 0.0
    API Nanme: DB 테스트 API
    [GET] /group/db
*/
export const getDatabaseTest = async (req, res) => {
    const testUserResult = await groupProvider.retrieveUserList();
    return res.send(testUserResult);
  };

/*
    개발 노트 📝
    req Data's Validation : 형식적 Validation 처리 우선 // DB Validation 후 순위
    기본적인 Validation : req Data's not null and length
    Validation : req Data's Status
    Validation은 기본적인 Validation으로 API를 만들고 DB Validation을 수행
*/



/*
    API No. 4.1
    API Nanme: 그룹 추가
    [POST] /group
*/
export const postGroup = async (req, res) => {
    /*
        Body : userIdx, content, postImgUrls
    */
  const {adminIdx, groupName, groupIntroduction, userIdx} = req.body;

  // Group Create's Body Data Validation
  if (!adminIdx){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0 ){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (!groupName){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_EMPTY));
  } else if (groupName.length > 45){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_LENGHT));
  }

  if (!groupIntroduction){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_EMPTY));
  } else if (groupIntroduction.length > 200){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_LENGTH));
  }

  // adminIdx Status Validation ❌
  // TO DO : 그룹 생성 만든 후에 제작
  // Validation Point : valid adminIdx?


  // Group Create ➕ Transcation 추가필요
  // createGroupResponse = groupIdx
  const createGroupResponse = await groupService.createGroup(
      adminIdx,
      groupName,
      groupIntroduction
  );
  

  // Group Members add's Body Data Validation
  // TO DO : Group Create 만든 후 제작 ✅
  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if(!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }

    // groupUserIdx's Status Check(1) - User Table ❌
    // TO DO : Group Members add 만든 후 제작
    // Validation Point : add's userIdx valid user?
    /*
    const userStatus = await groupProvider.checkClubStatus(groupUserIdx);
    if (userStatus != "ACTIVE"){
        return res.send(errResponse(baseResponse.USER_USERIDX_STATUS));
    }
    */

    // groupUserIdx's Status Check(2) - GroupMembers Table ❌
    // API NO. 4.3 & API NO. 4.4 만든 후 제작
    // Validation Point : add's userIdx include this group?

    // groupUserIdx's joinned Club Check - ClubMemberTable (WHERE ID : adminIdx) ❌
    // 한줄요약 : "admin이 요청한 UserIdx가 Club에 속해있는가?" 에 대한 검사
    // LATER TO DO : 백엔드 회의 후 만들기 - 클라이언트 입장 유효한 Validation인가?
  }


  // Group Members add ➕ Transcation 추가필요
  const createGroupMembersResponse = await groupService.createGroupMembers(userIdx, createGroupResponse);

  return res.send(createGroupMembersResponse);


};

    /*
        API No. 4.2
        API Nanme: 그룹 조회
        Part 1 and Part 2
        [GET]
    */

/*
    API No. 4.2 - Part 1
    API Nanme: 그룹 이름, 내용조회
    [GET] /group/Info?groupIdx=
*/
export const getGroupInfo = async (req, res) => {
  /*
      Query String: group
  */
  const groupIdx = req.query.groupIdx;

  // validation
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  // Group Table Validation (status == ACTIVE)
  // TO DO : 모든 API를 만들고 후 순위로 작업 ❌ 
  /*
  const groupStatus = await groupProvider.checkGroupStatus(groupIdx);
  if (groupStatus != "ACTIVE"){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_STATUS));
  }
  */

  // 그룹 이름, 내용 조회
  const groupInfoResult = await groupProvider.retrieveGroupInfo(groupIdx);

  return res.send(response(baseResponse.SUCCESS, groupInfoResult));
};


/*
    API No. 4.2 - Part 2
    API Nanme: 그룹 소속회원 조회
    [GET] /group/members?groupIdx=
*/
export const getGroupMembers = async (req, res) => {
  /*
      Query String: group
  */
  const groupIdx = req.query.groupIdx;

  // validation
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  // Group Table Validation (status == ACTIVE)
  // TO DO : 모든 API를 만들고 후 순위로 작업 ❌ 
  /*
  const groupStatus = await groupProvider.checkGroupStatus(groupIdx);
  if (groupStatus != "ACTIVE"){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_STATUS));
  }
  */

  // 그룹 소속회원 조회
  const groupMembersResult = await groupProvider.retrieveGroupMembers(groupIdx);

  return res.send(response(baseResponse.SUCCESS, groupMembersResult));
};











