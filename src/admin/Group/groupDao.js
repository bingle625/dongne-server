// DB Test
const selectUserPosts = async (connection) => {
    const selectTestUserQuery = `
          SELECT *
          FROM User
          ;
        `;
    const [testResult] = await connection.query(selectTestUserQuery);
  
    return testResult;
  };
  
// 그룹 추가 / Group Create - API NO. 4.1
async function insertGroup(connection, insertGroupParams){
  const insertGroupQuery = `
  INSERT INTO GroupList(adminIdx, groupName, groupIntroduction)
  VALUES (?, ?, ?);
  `;

  const insertGroupRow = await connection.query(insertGroupQuery, insertGroupParams);

  return insertGroupRow;
};

// 그룹 추가 / Group Members add - API NO. 4.1 , API NO. 4.3 -> Part 3
async function insertGroupMembers(connection, insertGroupMemberParams){
  const insertGroupMemberQuery = `
  INSERT INTO GroupMembers(userIdx, groupIdx)
  VALUES (?, ?);
  `;

  const insertGroupMemberRow = await connection.query(insertGroupMemberQuery, insertGroupMemberParams);

  return insertGroupMemberRow;
};

// 그룹 리스트 조회 - API NO. 4.2
const selectGroupList = async (connection, adminIdx) => {
  const selectGroupListQuery = `
    SELECT
    groupName as "단체에 생성된 출결그룹"
    FROM GroupList
    WHERE adminIdx = ? and status = "ACTIVE"       
      `;

  const [groupListRows] = await connection.query(selectGroupListQuery, adminIdx);

  return groupListRows;
};


// 그룹 이름, 내용 조회 - API NO. 4.3 -> Part 1
const selectGroupInfo = async (connection, groupIdx) => {
  const selectGroupInfoQuery = `
    SELECT 
    groupName as 그룹이름,
    groupIntroduction as 활동내용
    FROM GroupList
    WHERE groupIdx = ? and status = "ACTIVE"       
      `;

  const [groupInfoRows] = await connection.query(selectGroupInfoQuery, groupIdx);

  return groupInfoRows;
};


// 그룹 소속회원 조회 - API NO. 4.3 -> Part 2
const selectGroupMembers = async (connection, groupIdx) => {

  const selectGroupMembersQuery = `
    SELECT name as 회원이름,
    userImgUrl as 회원프로필
    FROM GroupMembers
    JOIN User
    ON GroupMembers.userIdx = User.userIdx
    WHERE groupIdx = ? and User.status = "ACTIVE" and GroupMembers.status = "ACTIVE";   
      `;

  const [groupMembersRows] = await connection.query(selectGroupMembersQuery, groupIdx);

  return groupMembersRows;
};

// 그룹 이름, 내용 수정 - API NO. 4.4 -> Part 1
const editGroupInfo = async (connection, editGroupInfoParams) => {

  const updateGroupInfoQuery = `
    UPDATE GroupList
    SET groupName = ? , groupIntroduction = ?
    WHERE groupIdx = ?;
      `;

  const [updateGroupInfoRows] = await connection.query(updateGroupInfoQuery, editGroupInfoParams);
  return updateGroupInfoRows;
};

// 그룹 소속회원 삭제 - API NO. 4.4 -> Part 2
const editGroupMembers = async (connection, editGroupMembersParams) => {

  const updateGroupMembersQuery = `
    UPDATE GroupMembers
    SET status = "DELETED"
    WHERE groupIdx = ? and userIdx = ?;
      `;

  const [updateGroupMembersRows] = await connection.query(updateGroupMembersQuery, editGroupMembersParams);
  return updateGroupMembersRows;
};

// 그룹 삭제 - API NO. 4.5
const editGroup = async (connection, groupIdx) => {

  const updateGroupQuery = `
    UPDATE GroupList
    SET status = "DELETED"
    WHERE groupIdx = ?;
      `;

  const [updateGroupRows] = await connection.query(updateGroupQuery, groupIdx);
  return updateGroupRows;
};


  module.exports = { 
    selectUserPosts,
    insertGroup,
    insertGroupMembers,
    selectGroupList,
    selectGroupInfo,
    selectGroupMembers,
    editGroupInfo,
    editGroupMembers,
    editGroup,



    

  };