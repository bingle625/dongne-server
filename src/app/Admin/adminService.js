const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const crypto = require("crypto");

const adminDao = require("./adminDao");
const adminProvider = require("./adminProvider");

exports.postSignIn = async (email, password) => {
  try {
    //이메일 여부 확인
    const emailRows = await adminProvider.emailCheck(email);
    console.log(emailRows);
    if (emailRows.length < 1) {
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
    }
    const selectEmail = emailRows[0].AdminEmail;

    const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");

    const passwordRows = await adminProvider.passwordCheck(selectEmail);
    if (passwordRows[0].AdminPwd !== hashedPassword) {
      console.log(passwordRows);
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    // todo: 계정 상태 확인
    // // 계정 상태 확인
    // const userInfoRows = await userProvider.accountCheck(email);

    // if (userInfoRows[0].status === "INACTIVE") {
    //   return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    // } else if (userInfoRows[0].status === "DELETED") {
    //   return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    // }

    //todo jwt 토큰 만들기
    const token = "i have to make this";
    return response(baseResponse.SUCCESS, {
      userId: passwordRows[0].adminIdx,
      jwt: token
    });
    return emailRows;
  } catch (error) {
    logger.error(`App - postSignIn Service error\n: ${error.message} \n${JSON.stringify(error)}`);
    return errResponse(baseResponse.DB_ERROR);
  }
};
