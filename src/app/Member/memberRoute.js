import express from "express";
// import  {getDatabaseTest, getClubMemberList} from "./memberController";
const member = require("./memberController");

const memberRouter = express.Router();

// Route Test
memberRouter.get("/db", member.getDatabaseTest);

// 3.1 단체 모든 회원명단 리스트 조회 API
// TO DO : 1
// Query String
memberRouter.get("/", member.getClubMemberList);


// 3.3 회원 상세 조회 API
//TO DO : 2
// Query String
memberRouter.get("/info", member.getMemberInfo);

export default memberRouter;
