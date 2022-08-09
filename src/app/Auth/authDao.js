// groupIdx로 schedule 리스트 조회
async function selectSchedule(connection, groupIdx) {
  const selectScheduleQuery = `
  SELECT GS.scheduleIdx, GS.scheduleName, GS.date, p.groupName
  FROM GroupSchedule as GS
      left join (SELECT groupIdx, groupName
          FROM GroupList
          WHERE status='ACTIVE') p on p.groupIdx = GS.groupIdx
  WHERE GS.status='ACTIVE' and GS.groupIdx=?;
  `;

  const [scheduleRows] = await connection.query(selectScheduleQuery, groupIdx);
  return scheduleRows;
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

// scheduleIdx로 schedule 상세 조회
async function selectScheduleInfo(connection, scheduleIdx) {
  const selectScheduleInfoQuery = `
    SELECT scheduleIdx, date, init_time, attendanceCode, init_time, end_time, introduction, place
    FROM GroupSchedule
    WHERE status='ACTIVE' and scheduleIdx=?;
    `;

  const [scheduleInfo] = await connection.query(
    selectScheduleInfoQuery,
    scheduleIdx
  );
  return scheduleInfo;
}

// 스케줄 삭제
async function updateScheduleStatus(connection, scheduleIdx) {
  const updateScheduleStatusQuery = `
    UPDATE GroupSchedule
    SET status = 'INACTIVE'
    WHERE scheduleIdx = ?;`;

  const [updateScheduleStatusRow] = await connection.query(
    updateScheduleStatusQuery,
    scheduleIdx
  );
  return updateScheduleStatusRow;
}

module.exports = {
  selectSchedule,
  selectScheduleInfo,
  selectScheduleStatus,
  updateScheduleStatus,
};
