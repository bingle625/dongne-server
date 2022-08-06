const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");


// 그룹 추가 / Group Create - API 4.1
exports.createGroup = async function(adminIdx, groupName, groupIntroduction){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);


    try {
        const insertGroupParams = [adminIdx, groupName, groupIntroduction];
        const groupResult = await groupDao.insertGroup(connection, insertGroupParams);
        // Create Group's groupIdx
        const groupIdx = groupResult[0].insertId;
        return groupIdx;
        
    } catch (err) {
        handleError(error);
        return errResponse(baseResponseStatus.FAILURE);
    } finally {
        connection.release(); 
    }
}

// 그룹 추가 / Group Members add - API 4.1
exports.createGroupMembers = async function(userIdx, createGroupResponse){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌DB Error: ${error.message}`);


    try {
        // One UserIdx INSERT
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const insertGroupMemberParams = [groupUserIdx, createGroupResponse];
            const groupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMemberParams);
        }

        return response(baseResponseStatus.SUCCESS, {addedGroup: createGroupResponse});
        
    } catch (err) {
        handleError(error);
        return errResponse(baseResponseStatus.FAILURE);
    } finally {
        connection.release(); 
    }
}

