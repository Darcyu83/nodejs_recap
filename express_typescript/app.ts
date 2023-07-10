import express from "express";
import morgan from "morgan";
import indexRouter from "./api/routes";
import errorController from "./controllers/error";
import authRouter from "./api/routes/auth";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 4013);

app.use("/auth", authRouter);
app.use("/api/v1", indexRouter);

// 에러 핸들러
app.use(errorController.errorHandler);

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 대기 중`);
});
