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
        SELECT c.categoryName,f.finAccountCategoryIdx,f.finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost
        FROM FinAccountCategory as c, (
            SELECT finAccountIdx, finAccountDate, isProfit, finAccountCategoryIdx, finAccountItem, finAccountCost
        FROM FinancialAccount
        WHERE adminIdx = ?
        ORDER BY finAccountDate DESC
        LIMIT 4
            ) f
        WHERE c.finAccountCategoryIdx = f.finAccountCategoryIdx
  `;
  const getFinAccountQueryResult = await connection.query(getFinAccountQuery, adminIdx);
  return getFinAccountQueryResult;
};

const retrieveFinAccountByMonth = async (connection, adminIdxNum, year, month) => {
  const getFinAccountQuery = `
      SELECT finAccountIdx, finAccountItem, isProfit, finAccountCost, finAccountDate
      FROM FinancialAccount
      WHERE adminIdx = ? and (MONTH(finAccountDate) = ? AND YEAR(finAccountDate) = ?)
  `;
  const getFinAccountQueryResult = await connection.query(getFinAccountQuery, [adminIdxNum, month, year]);
  return getFinAccountQueryResult;
};
retrieveFinAccountByMonth;

module.exports = {
  insertFinAccount,
  insertFinAccCategory,
  retrieveFinAccount,
  retrieveFinAccountByMonth
};
