const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const groupDao = require("./groupDao");
const groupProvider = require("./groupProvider");
const res = require("express/lib/response");

// API 5.1 - Paging
exports.retrievePagingGroupList = async function (adminIdx, userIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
        // Validation Check's adminIdx Status
        const adminIdxStatus = await groupProvider.checkAdminIdxStatus(adminIdx, userIdx);
        if (adminIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.USER_ADMINIDX_STATUS)
        }

        let start = 0;
        // Paging Validation
        if (page <= 0){
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        const totalDataCountResult = await groupProvider.retrieveTotalDataCount(adminIdx);
        // req.page's valid with retrieveData ?
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }

        // Paging 된 회원명단 리스트 조회
        const pagingRetrieveGroupListResult = await groupProvider.retrieveGroupList(adminIdx, start, pageSize);
        return pagingRetrieveGroupListResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}

// API 5.2 - Paging
exports.retrievePagingGroupMembers = async function (groupIdx, adminIdx, userIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
        // Validation Check's adminIdx Status
        const adminIdxStatus = await groupProvider.checkAdminIdxStatus(adminIdx, userIdx);
        if (adminIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.USER_ADMINIDX_STATUS);
        }

        // Validation Check's groupIdx Status
        const groupIdxStatus = await groupProvider.checkGroupIdxStatus(groupIdx, adminIdx);
        if (groupIdxStatus[0]?.status != "ACTIVE"){
            return errResponse(baseResponseStatus.USER_GROUPIDX_STATUS);
        }
        

        let start = 0;
        // Paging Validation
        if (page <= 0){
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        const totalDataCountResult = await groupProvider.retrieveGroupMembersTotalDataCount(groupIdx, adminIdx);
        // req.page's valid with retrieveData ?
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }

        // Paging 된 회원명단 리스트 조회
        const pagingRetrieveGroupMembersResult = await groupProvider.retrieveGroupMembers(groupIdx, start, pageSize);
        return pagingRetrieveGroupMembersResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}