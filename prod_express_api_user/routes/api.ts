import express from "express";
import { getToken, test } from "../controllers/api";

const apiRouter = express.Router();

apiRouter.get("/test", test);

apiRouter.get("/token", getToken);

export default apiRouter;
