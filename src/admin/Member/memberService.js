const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const memberProvider = require("./memberProvider");
const res = require("express/lib/response");


// API NO. 3.1 - Paging's retrievePagingClubMemberList
exports.retrievePagingClubMemberList = async function (adminIdx, page, pageSize){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌retrievePagingClubMemberList DB Error: ${error.message}`);

    try {
        let start = 0;
        
        // Paging Validation
        if (page <= 0){
            page = 1;
        } else {
            start = (page - 1) * pageSize;
        }
        const totalDataCountResult = await memberProvider.retrieveTotalDataCount(adminIdx);
        // req.page's valid with retrieveData ?
        const lastPage = Math.ceil(totalDataCountResult[0].totalDataCount/ pageSize);
        if (page > lastPage){
            return errResponse(baseResponseStatus.PAGING_PAGE_WRONG);
        }

        // Paging 된 회원명단 리스트 조회
        const pagingRetrieveMemberListResult = await memberProvider.retrieveClubMemberList(adminIdx, start, pageSize);
        return pagingRetrieveMemberListResult;

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}



// 회원 삭제 - API NO. 3.3
exports.deleteMember = async function (userIdx, JWT_Token_adminIdx){
    const connection = await pool.getConnection(async (conn) => conn);
    const handleError = (error) => logger.error(`❌deleteGroup DB Error: ${error.message}`);

    try {
        const editMemberParams = [userIdx, JWT_Token_adminIdx];
        const editMemberResult = await memberDao.editMember(connection, editMemberParams);
        return response(baseResponseStatus.SUCCESS);

    } catch (error) {
        handleError(error);
        return errResponse(baseResponseStatus.DB_ERRORS);
    } finally {
        connection.release(); 
    }
}