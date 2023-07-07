import express from "express";
import { IResponseError } from "./types";

const indexRouter = express.Router();

indexRouter.get("/error ", (req, res, next) => {
  const error = new Error("메시지 전달 테스트");
  //   error.status = 404;

  res.status(403);
  next(error);

  return;
});

indexRouter.get("/", (req, res, next) => {
  return res.json({ yuds: true });
});

export default indexRouter;
