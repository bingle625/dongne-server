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

// 단체 모든 회원명단 리스트 조회 (SELECT) - API NO. 3.1
const selectClub = async (connection, clubMembersPagingParams) => {
    const selectClubMemberQuery = `
      SELECT name, userImgUrl
      FROM ClubMembers
      JOIN User
      ON ClubMembers.userIdx = User.userIdx
      WHERE adminIdx = ? and User.status = "ACTIVE"
      LIMIT ?, ?;
        `;

    const [clubMemberRows] = await connection.query(selectClubMemberQuery, clubMembersPagingParams);
  
    return clubMemberRows;
  };

// API NO. 3.1 - Admin status (SELECT)
const selectClubStatus = async (connection, adminIdx) => {
  const selectClubStatusQuery = `
      SELECT status
      FROM Admin
      WHERE adminIdx = ?;
      `;

  const [clubStatusRows] = await connection.query(selectClubStatusQuery, adminIdx);

  return clubStatusRows;
};

// API NO. 3.1 - Paging's Total Data Count
const selectTotalDataCount = async (connection, adminIdx) => {
  const selectTotalDataCountQuery = `
    SELECT COUNT(adminIdx) as totalDataCount
    FROM ClubMembers
    WHERE adminIdx = ?;
      `;

  const [totalDataCountRows] = await connection.query(selectTotalDataCountQuery, adminIdx);

  return totalDataCountRows;
};


// 회원 상세 조회 - API NO. 3.2
const selectMemberInfo = async (connection, userIdx) => {
  const selectMemberInfoQuery = `
  SELECT name as 이름,
  phoneNum as 전화번호,
  school as 학교,
  birth as 생년월일,
  address as 주소,
  introduction as 소개
  FROM User
  WHERE userIdx = ?
      `;

  const [memberInfoRows] = await connection.query(selectMemberInfoQuery, userIdx);

  return memberInfoRows;
};

// API NO. 3.2 - User Status Check
const selectUserStatus = async (connection, userIdx) => {
  const selectUserStatusQuery = `
      SELECT status
      FROM User
      WHERE userIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectUserStatusQuery, userIdx);

  return userStatusRows;
};

// API NO. 3.2 - Token User with adminIdx Status Check
const selectTokenUserStatus = async (connection, TokenUserStatusParams) => {
  const selectTokenUserStatusQuery = `
      SELECT status
      FROM ClubMembers
      WHERE userIdx = ? and adminIdx = ?;
      `;

  const [tokenUserStatusRows] = await connection.query(selectTokenUserStatusQuery, TokenUserStatusParams);

  return tokenUserStatusRows;
};

// 회원 삭제 - API NO. 3.3
const editMember = async (connection, editMemberParams) => {
  const selectUserStatusQuery = `
    UPDATE ClubMembers
    SET status = "DELETED"
    WHERE userIdx = ? and adminIdx = ?;
      `;

  const [userStatusRows] = await connection.query(selectUserStatusQuery, editMemberParams);

  return userStatusRows;
};


  module.exports = 
  { selectUserPosts,
    selectClub,
    selectClubStatus,
    selectTotalDataCount,
    selectMemberInfo,
    selectUserStatus,
    selectTokenUserStatus,
    editMember,


    
  };

  
  
