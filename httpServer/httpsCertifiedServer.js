const https = require("https");

const fs = require("fs").promises;
const fsn = require("fs");

const server = https.createServer(
  // hppts
  // 인증서를 구입하면 pem이나 crt, 또는 key 확장자를 가진 파일들을 제공
  // 실제 서버에서는 80번 포트 대신 443번 포트를 사용
  {
    cert: fsn.readFileSync("도메인 인증서 경로 "),
    key: fs.readFileSync("도메인 비밀 키 경로"),
    ca: [
      fs.readFileSync("상위 인증서 경로"),
      fs.readFileSync("상위 인증서 경로"),
    ],
  },

  async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    //   res.write("<h1>Hello Node</h1>");
    //   res.end("<p>Hello Server!</p>");

    try {
      const data = await fs.readFile("./html/welcome.html");

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (error) {
      console.log("error ==== ", error);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.message);
    }
  }
);

server.listen(8080, () => {
  console.log("8080번 포트에서 서버 running");
});

server.on("error", (err) => {
  console.log("Error Occured :: ", err);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Handler ==== ", err);
});
