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

// 미들웨어
// 스태틱 파일 위치 : 이미지, 아이콘, 파비콘 등
app.use("/", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("매 요청에 실행되는 미들웨어");
  next();
});

app.use("/", (req, res, next) => {
  console.log("app.use '/' 실행");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("app.get '/' 실행");
    // res.send("익스프레스 서버 첫 메시지");
    // res.sendFile(path.join(__dirname, "index.html"));
    // res.sendFile(path.join(__dirname, "/html/middleware_desc.html"));
    // res.sendFile(path.join(__dirname, "/html/middleware_usage_desc.html"));
    res.sendFile(path.join(__dirname, "/html/multer_upload.html"));

    // next();
    // next(new Error("이건 에러 처리 미들웨어로 바로감."));
  },
  (req, res) => {
    throw new Error(
      "바로 앞 미들웨어에서 next 된 후  에러 발생!! 에러 처리 미들웨어로 갑니다."
    );
  }
);

app.get("/upload", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/html/multer_upload.html"));
});

// 첨부파일 1개
// app.post("/upload", upload.single("image"), (req, res) => {
// input multiple 같은 name
app.post("/upload", upload.array("images"), (req, res) => {
  // input 태그 여러개 이름도 여러개 파일 업로드
  // app.post(
  //   "/upload",
  //   upload.fields([{ name: "image1" }, { name: "image2" }]),
  //   (req, res) => {
  // app.post("/upload", upload.none(), (req, res) => {  // 파일 없을때 req.body로 모두 담음 : 파일있으면 오류남

  // console.log("/upload === 1 ", req.file, req.body);
  console.log("/upload === 1 ", req.files, req.body);
  res.status(200).redirect("/");
});

app.use((err, req, res, next) => {
  console.error("에러 미들웨어:: ", err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});
