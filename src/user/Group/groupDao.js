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

  

// 그룹 리스트 조회 - API NO. 5.1
const selectGroupList = async (connection, adminIdx) => {
  const selectGroupListQuery = `
    SELECT
    groupName as "회원의 출결그룹"
    FROM GroupList
    WHERE adminIdx = ? and status = "ACTIVE"       
      `;

  const [groupListRows] = await connection.query(selectGroupListQuery, adminIdx);

  return groupListRows;
};

// 그룹 이름, 내용 조회 - API NO. 5.2 -> Part 1
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


// 그룹 소속회원 조회 - API NO. 5.2 -> Part 2
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



  module.exports = { 
    selectUserPosts,
    selectGroupList,
    selectGroupInfo,
    selectGroupMembers,



    

  };