import { ErrorRequestHandler, RequestHandler } from "express";

export interface IRequestHandlers {
  [key: string]: RequestHandler;
}
export interface IErrorRequestHandlers {
  [key: string]: ErrorRequestHandler;
}
