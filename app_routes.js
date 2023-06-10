const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const fs = require("fs");

const checkIfFolderExisting = () => {
  const folderPath = path.resolve(__dirname, "uploads");
  try {
    fs.readdirSync(folderPath);
  } catch (error) {
    console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
    fs.mkdirSync(folderPath);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

// 환경변수 설정
dotenv.config();

// 라우터's
const homeRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express();
app.set("port", process.env.PORT || 8080);

// 업로드 폴더 체크 및 생성
checkIfFolderExisting();

// 미들웨어 추가
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
);

// 스태틱 파일 위치 : 이미지, 아이콘, 파비콘 등
app.use("/", express.static(path.join(__dirname, "public")));

// 라우터
app.use("/", homeRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  console.log("매 요청에 실행되는 미들웨어 === 없는 주소일 경우");
  res.status(404).send("Not Found");
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  console.error("에러 미들웨어:: ", err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});
