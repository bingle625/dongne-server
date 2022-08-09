const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");


// 그룹 추가 / Group Create - API 4.1
exports.createGroup = async function(adminIdx, groupName, groupIntroduction){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroup DB Error: ${error.message}`);


    try {
        const insertGroupParams = [adminIdx, groupName, groupIntroduction];
        const groupResult = await groupDao.insertGroup(connection, insertGroupParams);
        // Create Group's groupIdx
        const groupIdx = groupResult[0].insertId;
        return groupIdx;
        
    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 그룹 추가 / Group Members add - API 4.1
exports.createGroupMembers = async function(userIdx, createGroupResponse){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroupMembers DB Error: ${error.message}`);


    try {
        // One UserIdx INSERT
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const insertGroupMemberParams = [groupUserIdx, createGroupResponse];
            const groupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMemberParams);
        }

        return response(baseResponseStatus.SUCCESS, {addedGroup: createGroupResponse});
        
    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release();
    }
}

// 그룹 이름, 내용 수정 - API 4.3 -> Part 1
exports.editGroupInfo = async function (groupIdx, groupName, groupIntroduction){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌editGroupInfo DB Error: ${error.message}`);

    try {
        const editGroupInfoParams = [groupName, groupIntroduction, groupIdx];
        const editGroupInfoResult = await groupDao.editGroupInfo(connection, editGroupInfoParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 그룹 소속회원 삭제 - API 4.3 -> Part 2
exports.editGroupMembers = async function (groupIdx, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌editGroupMembers DB Error: ${error.message}`);

    try {
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const editGroupMembersParams = [groupIdx, groupUserIdx];
            const editGroupMembersResult = await groupDao.editGroupMembers(connection, editGroupMembersParams);
        }

        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// 그룹 소속회원 추가 - API 4.3 -> Part 3
exports.insertGroupMembers = async function (groupIdx, userIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌createGroupMembers DB Error: ${error.message}`);

    try {
        var groupUserIdx;
        for (groupUserIdx of userIdx){
            const insertGroupMembersParams = [groupUserIdx, groupIdx];
            const GroupMembersResult = await groupDao.insertGroupMembers(connection, insertGroupMembersParams);
        }

        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}


// 그룹 삭제 - API NO. 4.4
exports.deleteGroup = async function (groupIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        const GroupResult = await groupDao.editGroup(connection, groupIdx);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}
