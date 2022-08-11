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

// 출석한 회원 수 조회
async function countAttendList(connection, scheduleIdx) {
  const countAttendListQuery = `
    SELECT COUNT(*) as count
    FROM User u
      right join (SELECT userIdx
                 FROM Attendance
                 WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=1) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE';
  `;

  const [countAttendRows] = await connection.query(
    countAttendListQuery,
    scheduleIdx
  );
  return countAttendRows;
}

// 출석한 회원 조회
async function selectAttendList(connection, selectAttendParams) {
  const selectAttendListQuery = `
    SELECT u.userIdx, u.name
    FROM User u
      right join (SELECT userIdx
                 FROM Attendance
                 WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=1) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE'
    LIMIT ?, ?;
    `;

  const [attendRows] = await connection.query(
    selectAttendListQuery,
    selectAttendParams
  );
  return attendRows;
}

// 결석한 회원수 조회
async function countAbsenceList(connection, scheduleIdx) {
  const countAbsenceListQuery = `
    SELECT COUNT(*) as count
    FROM User u
      right join (SELECT userIdx
                 FROM Attendance
                 WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=0) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE';
  `;

  const [countAbsenceRows] = await connection.query(
    countAbsenceListQuery,
    scheduleIdx
  );
  return countAbsenceRows;
}

// 결석한 회원 조회
async function selectAbsenceList(connection, selectAbsenceParmas) {
  const selectAbsenceListQuery = `
    SELECT u.userIdx, u.name
    FROM User u
      right join (SELECT userIdx
                 FROM Attendance
                 WHERE scheduleIdx =? and status = 'ACTIVE' and attendanceStatus=0) p on p.userIdx = u.userIdx
    WHERE u.status = 'ACTIVE'
    LIMIT ?, ?;
    `;

  const [absenceRows] = await connection.query(
    selectAbsenceListQuery,
    selectAbsenceParmas
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
  countAttendList,
  selectAbsenceList,
  countAbsenceList,
  selectAttendCode,
};
