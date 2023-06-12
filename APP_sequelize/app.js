const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const app = express();

const { sequelize } = require("./models");

app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
// nunjucks
app.set("view engine", "njk");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// db 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.log("데이터 베이스 연결 실패", err);
  });

// 미들웨어 설정
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 세션 설정 안함

// 라우터
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

// 마지막 미들웨어 : 찾는 라우터 없을 경우 여기로 도착
// 마지막 미들웨어 : 찾는 라우터 없을 경우 여기로 도착
app.use((req, res, next) => {
  const error = new Error(`${req.method}/${req.url} 라우터가 없습니다.`);

  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.err = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기 중`);
});
