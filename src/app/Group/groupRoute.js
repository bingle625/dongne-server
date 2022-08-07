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
// 그룹 이름, 내용 수정
// Path Variable & Body
groupRouter.patch("/info/:groupIdx", group.patchGroupInfo);

// 그룹 회원삭제
// Path Variable & Body
groupRouter.patch("/deleteMembers/:groupIdx", group.patchGroupMembers);

// 그룹 회원추가
// Path Variable & Body
groupRouter.post("/insertMembers/:groupIdx", group.postGroupMembers);

// 4.4 그룹 삭제
// TO DO : 6
// Path Variable
groupRouter.patch("/delete/:groupIdx", group.patchGroup);

export default groupRouter;
