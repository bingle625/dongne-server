const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const authProvider = require("./authProvider");
const authService = require("./authService");

/**
 * API No. 2.1
 * API Name : 로그인 API
 * [POST] /auth/login
 */

exports.login = async (req, res) => {
  /*
    body: email, pwd
  */
  const { email, pwd } = req.body;
};
