// 출결 만들기
async function insertAttendance(connection, insertAttendanceParams) {
  const insertAttendanceQuery = `
  INSERT INTO Attendance(userIdx, scheduleIdx, attendanceStatus, createdAt, updatedAt, status)
  VALUES (?,?, 2, DEFAULT, DEFAULT, DEFAULT);
  `;
  const [insertAttendRows] = await connection.query(
    insertAttendanceQuery,
    insertAttendanceParams
  );
  return insertAttendRows;
}

// 출석한 회원 조회
async function selectAttendList(connection, scheduleIdx) {
  const selectAttendListQuery = `
    SELECT u.userIdx, u.name
    FROM User u
    right join (SELECT userIdx
               FROM Attendance
               WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=1) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE';
    `;

  const [attendRows] = await connection.query(
    selectAttendListQuery,
    scheduleIdx
  );
  return attendRows;
}

// 결석한 회원 조회
async function selectAbsenceList(connection, scheduleIdx) {
  const selectAbsenceListQuery = `
    SELECT u.userIdx, u.name
    FROM User u
    right join (SELECT userIdx
               FROM Attendance
               WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=0) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE';
    `;

  const [absenceRows] = await connection.query(
    selectAbsenceListQuery,
    scheduleIdx
  );
  return absenceRows;
}

// 출결 코드 조회
async function selectAttendCode(connection, scheduleIdx) {
  const selectAttendCodeQuery = `
    SELECT attendanceCode
    FROM GroupSchedule
    WHERE scheduleIdx = ?;
    `;

  const [attendCode] = await connection.query(
    selectAttendCodeQuery,
    scheduleIdx
  );

  return attendCode;
}

module.exports = {
  insertAttendance,
  selectAttendList,
  selectAbsenceList,
  selectAttendCode,
};
