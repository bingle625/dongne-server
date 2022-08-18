const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { pool } = require("../../../config/database");
const authDao = require("./authDao");
const authProvider = require("./authProvider");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
import "dotenv/config";
import { logger } from "../../../config/winston";

// const secret_config = require("../../../config/secret");

export const postSignIn = async function (email, password) {
  try {
    const emailRows = await authProvider.emailCheck(email);
    if (emailRows.length < 1) {
      return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);
    }

    const hashedPassword = await crypto.createHash("sha512").update(password).digest("hex");

    const passwordRows = await authProvider.passwordCheck(email);

    if (passwordRows[0].adminPwd !== hashedPassword) {
      return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
    }

    //todo: 계정 상태 확인
    // 계정 상태 확인
    const userInfoRows = await authProvider.statusCheck(email);
    if (userInfoRows[0].status === "INACTIVE") {
      return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
    } else if (userInfoRows[0].status === "DELETED") {
      return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
    }

    //todo jwt 토큰 만들기
    let token = jwt.sign(
      // 토큰의 내용 (payload)
      {
        adminId: userInfoRows[0].adminIdx
      },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "365d",
        subject: "Admin"
      }
    );

    // const token = "i have to make this";
    return response(baseResponse.SUCCESS, {
      userId: userInfoRows[0].adminIdx,
      jwt: token
    });
  } catch (err) {
    logger.error(`App - postSignIn Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  }
};

export const createAdmin = async (clubName, adminEmail, adminPwd, establishmentYear, clubRegion, clubIntroduction, clubWebLink, clubImgUrl) => {
  try {
    const hashedPassword = await crypto.createHash("sha512").update(adminPwd).digest("hex");
    const adminInfo = [clubName, adminEmail, hashedPassword, establishmentYear, clubRegion, clubIntroduction, clubWebLink, clubImgUrl];
    const connection = await pool.getConnection(async (conn) => conn);

    //이메일 중복 확인
    const emailStatus = await authDao.selectAdminEmail(connection, adminEmail);
    if (emailStatus[0].length > 0) {
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);
    }

    const createAdminResult = await authDao.insertAdminInfo(connection, adminInfo);
    connection.release();
    return response(baseResponse.SUCCESS, createAdminResult[0].insertId);
  } catch (err) {
    logger.error(`App - createAdmin Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  }
};
