const retrieveFinAccount = async (connection, adminIdx) => {
  const getFinAccountQuery = `
        SELECT c.categoryName,f.finAccountIdx,f.finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost
        FROM FinAccountCategory as c, (
            SELECT finAccountIdx, finAccountDate, isProfit, finAccountCategoryIdx, finAccountItem, finAccountCost
        FROM FinancialAccount
        WHERE adminIdx = ?
        ORDER BY finAccountDate DESC
        LIMIT 4
            ) f
        WHERE (c.finAccountCategoryIdx = f.finAccountCategoryIdx) and c.status = "ACTIVE"
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

const retrieveFinAccountByDay = async (connection, adminIdxNum, year, month, day) => {
  const retrieveFinAccountByDayQuery = `
        SELECT c.categoryName,f.finAccountIdx,f.finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost, f.etc
        FROM FinAccountCategory as c, (
              SELECT finAccountIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, finAccountCategoryIdx, etc
              FROM FinancialAccount
              WHERE adminIdx = ? AND ((MONTH(finAccountDate) = ? AND YEAR(finAccountDate) = ?) AND DAY(finAccountDate) = ?)
            ) f
        WHERE c.finAccountCategoryIdx = f.finAccountCategoryIdx
  `;
  const retrieveFinAccountByDayQueryResult = await connection.query(retrieveFinAccountByDayQuery, [adminIdxNum, month, year, day]);
  return retrieveFinAccountByDayQueryResult;
};

const selectCategory = async (connection, idx) => {
  const categoryInfoQuery = `
        SELECT categoryName 
        FROM FinAccountCategory
        WHERE finAccountCategoryIdx = ?; 
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [idx]);
  return categoryInfoResult;
};

const selectCategoryByName = async (connection, adminIdx, categoryName) => {
  const categoryInfoQuery = `
        SELECT finAccountCategoryIdx
        FROM FinAccountCategory
        WHERE (adminIdx = ? and categoryName=?) and status = "ACTIVE"; 
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [adminIdx, categoryName]);
  return categoryInfoResult;
};

const selectAdminAccountByIdx = async (connection, accountIdx) => {
  const categoryInfoQuery = `
        SELECT finAccountIdx, status
        FROM FinancialAccount
        WHERE finAccountIdx = ?; 
  `;
  const categoryInfoResult = await connection.query(categoryInfoQuery, [accountIdx]);
  return categoryInfoResult;
};

module.exports = {
  retrieveFinAccount,
  retrieveFinAccountByMonth,
  retrieveFinAccountByDay,
  selectCategory,
  selectCategoryByName,
  selectAdminAccountByIdx
};
