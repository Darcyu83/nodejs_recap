const express = require("express");
const morgan = require("morgan");
const nunjucks = require("nunjucks");
const path = require("path");
const app = express();

const dbConnect = require("./schemas");

const view_path = path.join(__dirname, "comm_views", "nunjucks");
app.set("port", process.env.PORT || 3000);
app.set("view engine", "njk");
// app.set("views", view_path);
nunjucks.configure(view_path, {
  express: app,
  watch: true,
});

dbConnect();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.locals.message = error.message;

  res.locals.error = process.env.NODE_ENV !== "production" ? error : {};

  res.status(error.status || 500);

  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}, 번 포트에서 대기 중`);
});
