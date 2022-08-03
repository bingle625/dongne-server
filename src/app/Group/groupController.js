const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const groupProvider = require("./groupProvider");




export const getDatabaseTest = async (req, res) => {
    const testUserResult = await groupProvider.retrieveUserList();
    return res.send(testUserResult);
  };
  