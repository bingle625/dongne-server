//admin 이메일 조회
const insertFinAccount = async (connection, finAccountInfoParams) => {
  const insertFinAccountQuery = `
        INSERT INTO FinancialAccount(adminIdx, finAccountCategoryIdx, isProfit, finAccountCost, finAccountDate, etc)
        VALUES (?, ?, ?, ?, ?, ?);
  `;
  const createFinAccResult = await connection.query(insertFinAccountQuery, finAccountInfoParams);
  return createFinAccResult;
};

module.exports = {
  insertFinAccount
};
