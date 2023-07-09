import dotenv from "dotenv";
import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import session from "express-session";
import indexRouter from "./routes";

import path from "path";
import v1Router from "./routes/v1";
import apiRouter from "./routes/api";

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 4013);
app.set("view engine", "html");
nunjucks.configure("views", { express: app, watch: true });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "yudscookie",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// 라우터
app.use("/api", apiRouter);
app.use("/v1", v1Router);
app.use("/", indexRouter);

app.use((req, res, next) => {
  const error: Error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
  return;
});

const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
  return;
};

app.use(errorHandler);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
