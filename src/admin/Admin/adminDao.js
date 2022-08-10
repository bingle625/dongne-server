const selectAdmins = async (connection) => {
  const selectTestUserQuery = `
        SELECT *
        FROM Admin
        ;
      `;
  const [testResult] = await connection.query(selectTestUserQuery);

  return testResult;
};

const selectAdminEmail = async (connection, email) => {
  const selectAdminEmailQuery = `
        SELECT AdminEmail
        From Admin
        WHERE AdminEmail =?
  `;
  const adminResult = await connection.query(selectAdminEmailQuery, [email]);
  return adminResult;
};

const selectAdminPassword = async (connection, email) => {
  const selectUserPasswordQuery = `
      SELECT adminIdx, AdminPwd
      FROM Admin
      WHERE AdminEmail = ?;
  `;
  const selectUserPasswordRow = await connection.query(selectUserPasswordQuery, email);
  return selectUserPasswordRow;
};

const selectAdminAccount = async (connection, email) => {
  const selectAdminAccountQuery = `
      SELECT status, adminIdx
      FROM Admin
      WHERE AdminEmail = ?;

  `;
  const selectAdminAccountRow = await connection.query(selectAdminAccountQuery, email);
  return selectAdminAccountRow;
};

const insertAdminInfo = async (connection, insertUserInfoParams) => {
  const insertUserQuery = `
  INSERT INTO Admin(clubName, AdminEmail, AdminPwd, establishmentYear, clubRegion,clubIntroduction,clubImgUrl)
  VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const insertUserInfoRow = await connection.query(insertUserQuery, insertUserInfoParams);
  return insertUserInfoRow;
};

module.exports = { selectAdmins, selectAdminEmail, selectAdminPassword, selectAdminAccount, insertAdminInfo };
