import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import router from "./routes";
import indexRouter from "./routes";
import { IResponseError } from "./routes/types";

const app = express();

app.set("port", process.env.PORT || 3013);
app.use(morgan("dev"));

app.use("/", indexRouter);

// app.use((req, res, next) => {
//   const error: IResponseError = new Error(
//     `${req.method} ${req.url} 라우터가 없습니다.`
//   );
//   error.status = 404;
//   next(error);
// });

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const _error = error as IResponseError;
  //   res.status(_error.status || 500);
  res.send(`${_error.status} :: ${error.message}`);
  return;
});

export default app;
