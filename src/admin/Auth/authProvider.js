const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const authDao = require("./authDao");

// exports.functionName = async function (param) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     connection.release();
//   };
