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
const selectGroupList = async (connection, groupListPagingParams) => {
  const selectGroupListQuery = `
    SELECT
    groupName as "회원의 출결그룹",
    groupCategory as "그룹 카테고리"
    FROM GroupList
    WHERE adminIdx = ? and status = "ACTIVE"
    LIMIT ?, ?      
      `;

  const [groupListRows] = await connection.query(selectGroupListQuery, groupListPagingParams);

  return groupListRows;
};

// API NO. 5.1 - Paging's Total Data Count with GroupList
const selectTotalDataCount = async (connection, adminIdx) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM GroupList
    WHERE adminIdx = ?;
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, adminIdx);

  return totalDataCountRows;
};

// API NO. 5.1 - Validation Check's adminIdx Status
const selectAdminIdxStatus = async (connection, adminIdxStatusParams) => {
  const selectAdminIdxStatusQuery = `
    SELECT status
    FROM ClubMembers
    WHERE adminIdx = ? and userIdx = ?;
      `;

  const [adminIdxStatusRows] = await connection.query(selectAdminIdxStatusQuery, adminIdxStatusParams);

  return adminIdxStatusRows;
};

// 그룹 이름, 내용 조회 - API NO. 5.2 -> Part 1
const selectGroupInfo = async (connection, groupIdx) => {
  const selectGroupInfoQuery = `
    SELECT 
    groupName as 그룹이름,
    groupIntroduction as 활동내용,
    groupCategory as "그룹 카테고리"
    FROM GroupList
    WHERE groupIdx = ? and status = "ACTIVE"       
      `;

  const [groupInfoRows] = await connection.query(selectGroupInfoQuery, groupIdx);

  return groupInfoRows;
};

// API NO. 5.2 -> Part 1 - Validation Check's groupIdx Status
const selectGroupIdxStatus = async (connection, groupIdxStatusParams) => {
  const selectGroupIdxQuery = `
    SELECT
    status
    FROM GroupList
    WHERE groupIdx = ? and adminIdx = ?;
      `;

  const [groupIdxStatusRows] = await connection.query(selectGroupIdxQuery, groupIdxStatusParams);

  return groupIdxStatusRows;
};


// 그룹 소속회원 조회 - API NO. 5.2 -> Part 2
const selectGroupMembers = async (connection, groupMembersPagingParams) => {

  const selectGroupMembersQuery = `
  SELECT name as 회원이름,
  userImgUrl as 회원프로필
  FROM GroupMembers
  JOIN User
  ON GroupMembers.userIdx = User.userIdx
  JOIN ClubMembers
  on GroupMembers.userIdx = ClubMembers.userIdx
  WHERE groupIdx = ? and adminIdx = ? and User.status = "ACTIVE" and GroupMembers.status = "ACTIVE" and ClubMembers.status = "ACTIVE"
  LIMIT ?, ?;
      `;

  const [groupMembersRows] = await connection.query(selectGroupMembersQuery, groupMembersPagingParams);

  return groupMembersRows;
};

// API NO. 5.2 - Paging's Total Data Count with GroupMembers
const selectGroupMembersTotalDataCount = async (connection, groupIdx) => {
  const selectTotalDataCountQuery = `
  SELECT COUNT(groupIdx) as totalDataCount
  FROM GroupMembers
  WHERE groupIdx = ?;
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, groupIdx);

  return totalDataCountRows;
};

// API NO. 5.2 - select AdminIdx
const selectAdminIdx = async (connection, groupIdx) => {
  const selectAdminIdxQuery = `
    SELECT 
    adminIdx
    FROM GroupList
    WHERE groupIdx = ?      
      `;

  const [groupInfoRows] = await connection.query(selectAdminIdxQuery, groupIdx);

  return groupInfoRows;
};



  module.exports = { 
    selectUserPosts,
    selectGroupList,
    selectGroupInfo,
    selectGroupMembers,
    selectGroupMembersTotalDataCount,
    selectAdminIdx,
    selectTotalDataCount,
    selectAdminIdxStatus,
    selectGroupIdxStatus




    

  };