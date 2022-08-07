const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const crypto = require("crypto");
const adminDao = require("./adminDao");
const adminProvider = require("./adminProvider");

export const createAdmin = async (clubName, AdminEmail, AdminPwd, establishmentYear, clubRegion, clubIntroduction, clubImgUrl) => {
  try {
    const hashedPassword = await crypto.createHash("sha512").update(AdminPwd).digest("hex");
    const adminInfo = [clubName, AdminEmail, hashedPassword, establishmentYear, clubRegion, clubIntroduction, clubImgUrl];
    const connection = await pool.getConnection(async (conn) => conn);

    //이메일 중복 확인
    const emailStatus = await adminDao.selectAdminEmail(connection, AdminEmail);
    if (emailStatus[0].length > 0) {
      return errResponse(baseResponse.SIGNUP_EMAIL_EXIST);
    }
    //   const createAdminResult = "hello World";

    const createAdminResult = await adminDao.insertAdminInfo(connection, adminInfo);
    connection.release();
    return response(baseResponse.SUCCESS, createAdminResult[0].insertId);
  } catch (err) {
    logger.error(`App - createAdmin Service error: ${err.message}`);

    return errResponse(baseResponse.DB_ERROR);
  }
};
