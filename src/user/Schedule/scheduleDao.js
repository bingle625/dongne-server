// groupIdx로 schedule 리스트 조회
async function selectSchedule(connection, selectScheduleParams) {
  const selectScheduleQuery = `
    SELECT GS.scheduleIdx, GS.scheduleName, DATE_FORMAT(GS.scheduleDate, '%Y-%m-%d') as scheduleDate, p.groupName, u.attendanceStatus
    FROM GroupSchedule as GS
        left join (SELECT groupIdx, groupName
            FROM GroupList
            WHERE status='ACTIVE') p on p.groupIdx = GS.groupIdx
        left join(SELECT scheduleIdx, attendanceStatus, userIdx
                  FROM Attendance
                  WHERE status = 'ACTIVE') u on u.scheduleIdx = GS.scheduleIdx
    WHERE GS.status='ACTIVE' and GS.groupIdx=? and u.userIdx=?;
    `;
  const [scheduleRows] = await connection.query(
    selectScheduleQuery,
    selectScheduleParams
  );
  return scheduleRows;
}

// 그룹 userIdx가 있는지 확인
async function selectExistUser(connection, selectExistUserParams) {
  const selectExistUserQuery = `    
    SELECT EXISTS(
        SELECT groupMemIdx
        FROM GroupMembers
        WHERE groupIdx =? and userIdx = ?
           ) as success;
    `;
  const [userExistRow] = await connection.query(
    selectExistUserQuery,
    selectExistUserParams
  );

  return userExistRow;
}

// scheduleIdx 상태 체크
async function selectScheduleStatus(connection, scheduleIdx) {
  const selectScheduleStatusQuery = `
      SELECT status
      From GroupSchedule
      WHERE scheduleIdx=?;`;

  const [scheduleStatus] = await connection.query(
    selectScheduleStatusQuery,
    scheduleIdx
  );
  return scheduleStatus;
}

// scheduleIdx로 schedule 상세 보기
async function selectScheduleInfo(connection, scheduleIdx) {
  const selectScheduleInfoQuery = `
    SELECT scheduleIdx, DATE_FORMAT(scheduleDate, '%Y-%m-%d') as scheduleDate, attendanceCode, DATE_FORMAT(init_time, '%Y-%m-%d %T') as init_time, DATE_FORMAT(end_time, '%Y-%m-%d %T') as end_time, introduction, place
    FROM GroupSchedule
    WHERE status='ACTIVE' and scheduleIdx=?;
      `;

  const [scheduleInfo] = await connection.query(
    selectScheduleInfoQuery,
    scheduleIdx
  );
  return scheduleInfo;
}

module.exports = {
  selectSchedule,
  selectExistUser,
  selectScheduleInfo,
  selectScheduleStatus,
};
