import express from "express";
import { getMyPosts, renderMain, searchByHashtag, test } from "../controllers";

const indexRouter = express.Router();

indexRouter.get("/test", test);

indexRouter.get("/myposts", getMyPosts);
indexRouter.get("/search/hashtag", searchByHashtag);
indexRouter.get("/", renderMain);

export default indexRouter;
