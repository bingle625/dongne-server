//admin 이메일 조회
const insertFinAccount = async (connection, finAccountInfoParams) => {
  const insertFinAccountQuery = `
        INSERT INTO FinancialAccount(adminIdx, finAccountCategoryIdx, isProfit,finAccountItem, finAccountCost, finAccountDate, etc)
        VALUES (?, ?, ?, ?, ?, ?, ?);
  `;
  const createFinAccResult = await connection.query(insertFinAccountQuery, finAccountInfoParams);
  return createFinAccResult;
};

const insertFinAccCategory = async (connection, finAccCategoryParams) => {
  const insertFinAccCategoryQuery = `
        INSERT INTO FinAccountCategory(categoryName, adminIdx)
        VALUES (?, ?);
  `;
  const createFinAccResult = await connection.query(insertFinAccCategoryQuery, finAccCategoryParams);
  return createFinAccResult;
};

const retrieveFinAccount = async (connection, adminIdx) => {
  const getFinAccountQuery = `
        SELECT finAccountIdx, finAccountDate, isProfit, finAccountCategoryIdx,finAccountItem, finAccountCost
        FROM FinancialAccount
        WHERE adminIdx = ?
        ORDER BY finAccountDate DESC
        LIMIT 4
  `;
  const getFinAccountQueryResult = await connection.query(getFinAccountQuery, adminIdx);
  return getFinAccountQueryResult;
};

module.exports = {
  insertFinAccount,
  insertFinAccCategory,
  retrieveFinAccount
};
