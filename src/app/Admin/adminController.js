const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const adminProvider = require("./adminProvider");
const adminService = require("./adminService");

/**
 * API No. 0.3
 * API Name : db 테스트 API
 * [GET] /admin/db
 */
export const getDatabaseTest = async (req, res) => {
  const testAdminResult = await adminProvider.retrieveAdminList();
  return res.send(testAdminResult);
};
