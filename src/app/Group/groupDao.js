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

// 그룹 추가 / Group Members add - API NO. 4.1
async function insertGroupMembers(connection, insertGroupMemberParams){
  const insertGroupMemberQuery = `
  INSERT INTO GroupMembers(userIdx, groupIdx)
  VALUES (?, ?);
  `;

  const insertGroupMemberRow = await connection.query(insertGroupMemberQuery, insertGroupMemberParams);

  return insertGroupMemberRow;
};


// 그룹 이름, 내용 조회 - API NO. 4.2 -> Part 1
const selectGroupInfo = async (connection, groupIdx) => {
  // group status 예외처리 필요 -> 클라이언트에게 예외처리됨을 알려줘야되기 때문 //// 예외처리 방법은 두가지 방법 (My Thinking) ❌ 
    // 1. Controller에서 ACTIVE 예외처리
    // 2. Dao에서 정보를 가져오지 않으면 예외처리
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


// 그룹 소속회원 조회 - API NO. 4.2 -> Part 2
const selectGroupMembers = async (connection, groupIdx) => {

  const selectGroupMembersQuery = `
    SELECT name as 회원이름,
    userImgUrl as 회원프로필
    FROM GroupMembers
    JOIN User
    ON GroupMembers.userIdx = User.userIdx
    WHERE groupIdx = ? and User.status = "ACTIVE";   
      `;

  const [groupMembersRows] = await connection.query(selectGroupMembersQuery, groupIdx);

  return groupMembersRows;
};

  module.exports = { 
    selectUserPosts,
    insertGroup,
    insertGroupMembers,
    selectGroupInfo,
    selectGroupMembers,

    

  };