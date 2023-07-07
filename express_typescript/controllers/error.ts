import express from "express";
import { IErrorRequestHandlers, IRequestHandlers } from "./types";
import { IResponseError } from "../routes/types";

const errorController: IErrorRequestHandlers = {
  errorHandler: (error: IResponseError, req, res, next) => {
    console.log("error 전달 받음 ==== ", error);

    res.status(error.status || 505);

    res.send({ code: error.status, message: error.message });
  },
};

export default errorController;
