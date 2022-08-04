const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const testProvider = require("./adminProvider");

/**
 * API No. 0.3
 * API Name : db 테스트 API
 * [GET] /test/db
 */
export const getDatabaseTest = async (req, res) => {
  const testAdminResult = await testProvider.retrieveAdminList();
  return res.send(testAdminResult);
};
