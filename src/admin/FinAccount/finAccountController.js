const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const accountProvider = require("./finAccountProvider");
const accountService = require("./finAccountService");

/**
 * API No. 5.1
 * API Name : 회계 생성 api
 * [POST] admin/finAccount/
 */

export const createFinAccount = async (req, res) => {
  /*
    body: 
      - adminIdx
      - finAccountCategoryIdx
      - finAccountItem
      - isProfit : 0: 비용(negative), 1: 수입(profit)
      - finAccountCost
      - finAccountDate : DATE
      - etc : VARCHAR(200)
  */
  const { adminIdx, finAccountCategoryIdx, isProfit, finAccountCost, finAccountDate, etc } = req.body;

  //todo: admin 상태 확인

  //todo: 모든 파라미터 (etc 제외) 다 있는 지 확인

  //todo: isProfit 0과 1중 하나 맞는지 확인

  //todo: finAccountCost 범위 확인

  //todo: finAccountDate 형식 yyyy-mm-dd 맞는 지 확인

  const createFinAccountResult = await accountService.createFinAccount(adminIdx, finAccountCategoryIdx, isProfit, finAccountCost, finAccountDate, etc);
  return res.send(createFinAccountResult);
};
