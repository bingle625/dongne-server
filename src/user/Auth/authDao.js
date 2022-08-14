//admin 이메일 조회
const selectUserEmail = async (connection, email) => {
  const selectUserEmailQuery = `
        SELECT userEmail
        From User
        WHERE userEmail =?
  `;
  const userEmailResult = await connection.query(selectUserEmailQuery, [email]);
  return userEmailResult;
};

//user 비밀번호 조회
const selectUserPassword = async (connection, email) => {
  const selectUserPasswordQuery = `
      SELECT userIdx, password
      FROM User
      WHERE userEmail = ?;
  `;
  const selectUserPasswordRow = await connection.query(selectUserPasswordQuery, email);
  return selectUserPasswordRow;
};

//admin 계정 상태 확인
const selectUserAccount = async (connection, email) => {
  const selectUserAccountQuery = `
      SELECT status, userIdx
      FROM User
      WHERE userEmail = ?;

  `;
  const selectUserAccountRow = await connection.query(selectUserAccountQuery, email);
  return selectUserAccountRow;
};

//admin 레코드 생성
const insertUserInfo = async (connection, insertUserInfoParams) => {
  const insertUserQuery = `
  INSERT INTO User(name, userEmail, password, phoneNum, school, birth, address, introduction, userImgUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const insertUserInfoRow = await connection.query(insertUserQuery, insertUserInfoParams);
  return insertUserInfoRow;
};

module.exports = {
  selectUserEmail,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount
};
