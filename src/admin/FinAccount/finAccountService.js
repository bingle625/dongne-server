const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const accountDao = require("./finAccountDao");
const accountProvider = require("./finAccountProvider");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import authProvider from "../Auth/authProvider";
import "dotenv/config";
import { logger } from "../../../config/winston";

export const createFinAccount = async (adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccountInfo = [adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc];

    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo: finAcountCategoryIdx 상태 확인
    const categoryInfoRows = await accountProvider.categoryStatusCheck(finAccountCategoryIdx);
    console.log(finAccountCategoryIdx);
    if (categoryInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (categoryInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_DELETED);
    }
    const createAccountResult = await accountDao.insertFinAccount(connection, finAccountInfo);
    connection.release();
    return response(baseResponse.SUCCESS, createAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - createFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const createFinAccCategory = async (categoryName, adminIdx) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccCategoryInfo = [categoryName, adminIdx];
    //todo: admin 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    //todo: categoryName 중복 확인
    const categoryRows = await accountProvider.categoryDupCheck(adminIdx, categoryName);
    if (categoryRows.length !== 0) return errResponse(baseResponse.FINACCOUNT_CATEGORY_EXIST);
    const createAccCategoryResult = await accountDao.insertFinAccCategory(connection, finAccCategoryInfo);
    connection.release();
    return response(baseResponse.SUCCESS, createAccCategoryResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - createFinAccCategory Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const updateFinCategory = async (adminIdx, categroyIdx, categoryName) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccCategoryInfo = [categoryName, categroyIdx];
    //todo: admin 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    //todo: categoryName 중복 확인
    const categoryRows = await accountProvider.categoryDupCheck(adminIdx, categoryName);
    if (categoryRows.length !== 0 && categoryRows.finAccountCategoryIdx !== categroyIdx) {
      return errResponse(baseResponse.FINACCOUNT_CATEGORY_EXIST);
    }
    const updateAccCategoryResult = await accountDao.modifyFinAccCategory(connection, finAccCategoryInfo);
    connection.release();
    return response(baseResponse.SUCCESS, updateAccCategoryResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - updateFinCategory Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const updateFinAccount = async (accountIdx, adminIdx, finAccountCategoryIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, etc) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccountInfo = [finAccountCategoryIdx, finAccountItem, isProfit, finAccountCost, finAccountDate, etc, accountIdx];
    //todo: adminIdx 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }
    const finAccountInfoRows = await accountProvider.accountStatusCheck(accountIdx);
    if (finAccountInfoRows.length === 0) return errResponse(baseResponse.FINACCOUNT_NOT_EXIST);
    if (finAccountInfoRows[0].status === "DELETED") return errResponse(baseResponse.FINACCOUNT_ALREADY_DELETED);

    //todo: 카테고리 idx 존재하는 지 확인
    const updateFinAccountResult = await accountDao.modifyFinAccount(connection, finAccountInfo);
    connection.release();
    return response(baseResponse.SUCCESS, updateFinAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - updateFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};

export const deleteFinAccount = async (accountIdx, adminIdx) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccountInfo = [accountIdx];
    //todo: adminIdx 상태 확인
    const userInfoRows = await authProvider.statusCheckByIdx(adminIdx);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo: accountIdx 존재하는 지 확인
    const finAccountInfoRows = await accountProvider.accountStatusCheck(accountIdx);
    if (finAccountInfoRows.length === 0) return errResponse(baseResponse.FINACCOUNT_NOT_EXIST);
    if (finAccountInfoRows[0].status === "DELETED") return errResponse(baseResponse.FINACCOUNT_ALREADY_DELETED);

    const deleteFinAccountResult = await accountDao.deleteFinAccount(connection, finAccountInfo);
    connection.release();
    return response(baseResponse.SUCCESS, deleteFinAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - deleteFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
