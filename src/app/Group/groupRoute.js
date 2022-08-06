import express from "express";
// import { getDatabaseTest } from "./groupController";
const group = require("./groupController");
const groupRouter = express.Router();

// Route Test
groupRouter.get("/db", group.getDatabaseTest);

// 4.1 그룹 추가
// TO DO : 3
// BODY
groupRouter.post("/", group.postGroup);


// 4.2 그룹 조회
// TO DO : 4
    // 그룹 이름, 내용 조회
    // Query String
groupRouter.get("/info", group.getGroupInfo);

    // 그룹 소속회원 조회
    // Query String
groupRouter.get("/members", group.getGroupMembers);

// 4.3 그룹 수정
// TO DO : 5


// 4.4 그룹 삭제
// TO DO : 6
//

export default groupRouter;