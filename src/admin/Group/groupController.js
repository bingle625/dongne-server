import { GROUP_GROUPINTRODUCTION_EMPTY } from "../../../config/baseResponseStatus";

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
    req Data's Validation : 형식적 Validation 처리 우선 ✅ // DB Validation 후 순위 ❌
    Validation (basic) : req Data's not null and length
    Validation (middle) : req Data's Status
    Validation은 Validation (basic)을 구성해 API를 만들고 작업 후 순위로 Validation (middle)을 구성
*/



/*
    API No. 4.1
    API Nanme: 그룹 추가
    [POST] /group
*/
export const postGroup = async (req, res) => {
    /*
        Body : adminIdx, groupName, groupIntroduction, userIdx
    */
  const {adminIdx, groupName, groupIntroduction, userIdx} = req.body;

  // Group Create's Body Data Validation (basic) ✅
  if (!adminIdx){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_EMPTY));
  } else if (adminIdx <= 0 ){
    return res.send(errResponse(baseResponse.ADMIN_ADMINIDX_LENGTH));
  }

  if (!groupName){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_EMPTY));
  } else if (groupName.length > 45){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_LENGTH));
  }

  if (!groupIntroduction){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_EMPTY));
  } else if (groupIntroduction.length > 200){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_LENGTH));
  }

  // Group Create's Body Data Validation (middle) ❌
  /*
    adminIdx's Status valid with Admin Table
    JWT's Token's adminIdx include req.adminIdx?
  */

  // Group Create ➕ Transcation 추가필요
  // createGroupResponse = groupIdx
  const createGroupResponse = await groupService.createGroup(
      adminIdx,
      groupName,
      groupIntroduction
  );
  

  
  // Group Members add's Body Data Validation (basic) ✅
  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if(!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }

    // Group Members add's Body Data Validation (middle) ❌
    /*
      groupUserIdx's Status valid with User Table ?
      JWT Token's adminIdx include req.groupUserIdx ?
      groupUserIdx's Status NULL or DELETED with GroupMembers Table ?
    */

  }

  
  // Group Members add ➕ Transcation 추가필요
  const createGroupMembersResponse = await groupService.createGroupMembers(userIdx, createGroupResponse);

  return res.send(createGroupMembersResponse);


};

    /*
        API No. 4.2
        API Nanme: 그룹 조회
        Part 1, Part 2
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

  // validation (basic) ✅
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
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
      Query String: groupIdx
  */
  const groupIdx = req.query.groupIdx;

  // validation (basic) ✅
  if(!groupIdx) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } 
  if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }


  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
  */

  // 그룹 소속회원 조회
  const groupMembersResult = await groupProvider.retrieveGroupMembers(groupIdx);

  return res.send(response(baseResponse.SUCCESS, groupMembersResult));
};




  /*
      API No. 4.3
      API Nanme: 그룹 수정
      Part 1, Part 2, Part 3
  */


/*
    API No. 4.3 - Part 1
    API Nanme: 그룹 이름, 내용 수정
    [PATCH] /group/info/:groupIdx
*/
export const patchGroupInfo = async (req, res) => {
  /*
      Body : groupName, groupIntroduction
      Path Variable: groupIdx
  */
  const groupIdx = req.params.groupIdx;
  const {groupName, groupIntroduction} = req.body;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  if (!groupName){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_EMPTY));
  } else if (groupName.length > 45){
    return res.send(errResponse(baseResponse.GROUP_GROUPNAME_LENGTH));
  }

  if (!groupIntroduction){
    return res.send(errResponse(baseResponse>GROUP_GROUPINTRODUCTION_EMPTY));
  } else if (groupIntroduction.length > 200){
    return res.send(errResponse(baseResponse.GROUP_GROUPINTRODUCTION_LENGTH));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
  */

  
  // 그룹 이름, 정보 수정
  const editGroupInfoResponse = await groupService.editGroupInfo(groupIdx, groupName, groupIntroduction);

  return res.send(editGroupInfoResponse);
}



/*
    API No. 4.3 - Part 2
    API Nanme: 그룹 소속회원 삭제
    [PATCH] /group/deleteMembers/:groupIdx
*/
export const patchGroupMembers = async (req, res) => {
  /*
      Body : userIdx [array type]
      Path Variable: groupIdx
  */
  const groupIdx = req.params.groupIdx;
  const {userIdx} = req.body;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if (!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
    + userIdx's Status valid with User Table ?
    + userIdx's Status in GroupMembers Table is ACTIVE ?
  */

  // 그룹 소속회원 삭제
  const editGroupMembersResponse = await groupService.editGroupMembers(groupIdx, userIdx);

  return res.send(editGroupMembersResponse);
}



/*
    API No. 4.3 - Part 3
    API Nanme: 그룹 소속회원 추가
    [POST] /group/insertMembers/:groupIdx
*/
export const postGroupMembers = async (req, res) => {
  /*
      Body : userIdx [array type]
      Path Variable: groupIdx
  */
  const groupIdx = req.params.groupIdx;
  const {userIdx} = req.body;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  var groupUserIdx;
  for (groupUserIdx of userIdx){
    if (!groupUserIdx){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_EMPTY));
    } else if (groupUserIdx <= 0){
      return res.send(errResponse(baseResponse.GROUP_USERIDX_LENGTH));
    }
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
    + userIdx's Status valid with User Table ?
    + userIdx's Status in GroupMembers Table is DELETED or NULL ?
    + userIdx's Status in ClubMembers Table is ACTIVE ?
  */

  // 그룹 소속회원 추가
  const createGroupMembersResponse = await groupService.insertGroupMembers(groupIdx, userIdx);

  return res.send(createGroupMembersResponse);
}




/*
    API No. 4.4
    API Nanme: 그룹 삭제
    [PATHCH] /group/delete/:groupIdx
*/
export const patchGroup = async (req, res) => {
  /*
      Path Variable: groupIdx
  */
  const groupIdx = req.params.groupIdx;
  
  // Validation (basic) ✅
  if (!groupIdx){
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_EMPTY));
  } else if (groupIdx <= 0) {
      return res.send(errResponse(baseResponse.GROUP_GROUPIDX_LENGTH));
  }

  // Validation (Middle) ❌ 
  /*
    + groupIdx's Status valid with GroupList Table ?
    + JWT Token's groupIdx include req.groupIdx ?
  */

  // 그룹 삭제
  const deleteGroupResponse = await groupService.deleteGroup(groupIdx);

  return res.send(deleteGroupResponse);
}

