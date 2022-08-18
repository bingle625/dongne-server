const { pool } = require("../../../config/database");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { logger } = require("../../../config/winston");

const memberDao = require("./memberDao");
const memberProvider = require("./memberProvider");


// API NO. 4.1 - paging
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