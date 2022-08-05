const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const authProvider = require("./authProvider");
const authService = require("./authService");
const regexEmail = require("regex-email");
const regexPwd = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
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

  //email validation
  if (!email) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));
  } else if (email.length > 255) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_LENGTH));
  } else if (!regexEmail.test(email)) {
    return res.send(errResponse(baseResponse.SIGNIN_EMAIL_ERROR_TYPE));
  }

  //pwd validation
  if (!pwd) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_EMPTY));
  } else if (pwd.length < 8) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_LENGTH));
  } else if (!regexPwd.test(pwd)) {
    return res.send(errResponse(baseResponse.SIGNIN_PASSWORD_WRONG));
  }

  const signInResponse = await authService.postSignIn(email, pwd);
};
