const selectAdmins = async (connection) => {
  const selectTestUserQuery = `
        SELECT *
        FROM Admin
        ;
      `;
  const [testResult] = await connection.query(selectTestUserQuery);

  return testResult;
};

module.exports = { selectAdmins };
