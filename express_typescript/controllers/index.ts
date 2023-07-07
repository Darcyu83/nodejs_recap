import { RequestHandler } from "express";
import { IRequestHandlers } from "./types";
import { IResponseError } from "../routes/types";

const indexController: IRequestHandlers = {
  index: (req, res, next) => {
    res.json({ message: "indexController index middleware1" });
  },
  index2: (req, res, next) => {
    res.json({ message: "indexController index middleware2" });
  },
  error: (req, res, next) => {
    const error: IResponseError = new Error("하하 임의로 에러 냈음");
    error.status = 444;
    next(error);
  },
};

export default indexController;
