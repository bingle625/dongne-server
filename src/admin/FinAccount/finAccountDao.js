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

const modifyFinAccCategory = async (connection, finAccCategoryParams) => {
  const modifyFinAccCategoryQuery = `
        UPDATE FinAccountCategory
        SET categoryName = ?
        WHERE finAccountCategoryIdx = ?;
  `;
  const modifyFinAccResult = await connection.query(modifyFinAccCategoryQuery, finAccCategoryParams);
  return modifyFinAccResult;
};

const modifyFinAccount = async (connection, finAccCategoryParams) => {
  const modifyFinAccCategoryQuery = `
        UPDATE FinancialAccount
        SET finAccountCategoryIdx = ? , finAccountItem = ?, isProfit = ? , finAccountCost = ? , finAccountDate = ? , etc = ?
        WHERE finAccountIdx = ?;
  `;
  const modifyFinAccResult = await connection.query(modifyFinAccCategoryQuery, finAccCategoryParams);
  return modifyFinAccResult;
};

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

const retrieveFinAccountByDay = async (connection, adminIdxNum, year, month, day) => {
  const retrieveFinAccountByDayQuery = `
        SELECT c.categoryName,f.finAccountIdx,f.finAccountDate,f.isProfit,f.finAccountItem,f.finAccountCost
        FROM FinAccountCategory as c, (
              SELECT finAccountIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, finAccountCategoryIdx
              FROM FinancialAccount
              WHERE adminIdx = ? AND ((MONTH(finAccountDate) = ? AND YEAR(finAccountDate) = ?) AND DAY(finAccountDate) = ?)
            ) f
        WHERE c.finAccountCategoryIdx = f.finAccountCategoryIdx
  `;
  const retrieveFinAccountByDayQueryResult = await connection.query(retrieveFinAccountByDayQuery, [adminIdxNum, month, year, day]);
  return retrieveFinAccountByDayQueryResult;
};

module.exports = {
  insertFinAccount,
  insertFinAccCategory,
  modifyFinAccount,
  modifyFinAccCategory,
  retrieveFinAccount,
  retrieveFinAccountByMonth,
  retrieveFinAccountByDay
};
