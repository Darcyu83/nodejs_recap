import express from "express";
import { verifyToken } from "../middlewares/auth";
import { createToken, tokenTest, v1get } from "../controllers/v1";

const v1Router = express.Router();

v1Router.get("/token", createToken);
v1Router.get("/test", verifyToken, tokenTest);
// GET 4014/
v1Router.get("/", v1get);

export default v1Router;
