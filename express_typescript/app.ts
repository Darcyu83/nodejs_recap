import express from "express";
import morgan from "morgan";
import indexRouter from "./routes";
import errorController from "./controllers/error";
import authRouter from "./routes/auth";

const app = express();

app.use(morgan("dev"));

app.set("port", process.env.PORT || 4013);

app.use("/index", indexRouter);
app.use("/auth", authRouter);

// 에러 핸들러
app.use(errorController.errorHandler);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 대기 중`);
});
