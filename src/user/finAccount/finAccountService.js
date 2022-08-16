const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const accountDao = require("./finAccountDao");
const accountProvider = require("./finAccountProvider");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import "dotenv/config";
import { logger } from "../../../config/winston";

export const createFinAccount = async (adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc) => {
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    const finAccountInfo = [adminIdx, finAccountCategoryIdx, isProfit, finAccountItem, finAccountCost, finAccountDate, etc];
    //todo: adminIdx 상태 확인
    //todo: finAcountCategoryIdx 상태 확인
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
    //todo: categoryName 중복 확인
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
    //todo: categoryName 중복 확인
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
    //todo: accountIdx 상태 확인
    //todo: adminIdx 상태 확인
    //todo: 카테고리 idx 존재하는 지 확인
    //todo: finAccountItem 길이 확인 ?
    //todo: finAccountcost 길이 확인 ?
    //todo: finAccountDate 형식 확인
    const updateFinAccountResult = await accountDao.modifyFinAccount(connection, finAccountInfo);
    connection.release();
    return response(baseResponse.SUCCESS, updateFinAccountResult[0].insertId);
  } catch (err) {
    logger.error(`Admin - updateFinAccount Service error: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
