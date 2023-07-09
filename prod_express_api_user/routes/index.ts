import express from "express";
import { test } from "../controllers";

const indexRouter = express.Router();

indexRouter.get("/test", test);

export default indexRouter;
