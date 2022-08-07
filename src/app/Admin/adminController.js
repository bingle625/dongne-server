const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const adminProvider = require("./adminProvider");
const adminService = require("./adminService");
const regexEmail = require("regex-email");

/**
 * API No. 0.3
 * API Name : db 테스트 API
 * [GET] /admin/db
 */
export const getDatabaseTest = async (req, res) => {
  const testAdminResult = await adminProvider.retrieveAdminList();
  return res.send(testAdminResult);
};

/**
 * API No. 1.1
 * API Name : 회원가입
 * [POST] /admin/db
 */

export const postAdmin = async (req, res) => {
  const { clubName, AdminEmail, AdminPwd, establishmentYear, clubRegion, clubIntroduction, clubImgUrl } = req.body;
  //빈 값 체크

  if (!AdminEmail) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));
  } else if (AdminEmail.length > 255) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_LENGTH));
  } else if (!regexEmail.test(AdminEmail)) {
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
  }

  //password validation
  if (!AdminPwd) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_EMPTY));
  } else if (AdminPwd.length < 8) {
    return res.send(errResponse(baseResponse.SIGNUP_PASSWORD_LENGTH));
  }

  if (!clubName) return res.send(response(baseResponse.SIGNUP_CLUBNAME_EMPTY));
  // if (!clubIntroduction) return res.send(response(baseResponse.SIGNUP_BIRTHDATE_EMPTY));
  // if (!establishmentYear) return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));
  // if (!clubRegion) return res.send(response(baseResponse.SIGNUP_PHONENUMBER_EMPTY));

  const postAdminResult = await adminService.createAdmin(clubName, AdminEmail, AdminPwd, establishmentYear, clubRegion, clubIntroduction, clubImgUrl);
  return res.send(postAdminResult);
};
