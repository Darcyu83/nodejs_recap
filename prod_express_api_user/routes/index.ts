import express from "express";
import { getMyPosts, searchByHashtag, test } from "../controllers";

const indexRouter = express.Router();

indexRouter.get("/test", test);

indexRouter.get("/myposts", getMyPosts);
indexRouter.get("/search/hashtag", searchByHashtag);

export default indexRouter;
