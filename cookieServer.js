const http = require("http");
const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  res.writeHead(200, { "Set-Cookie": "mycookie=test" });
  res.end("Hello Cookie");
});

server.listen(8080, () => {
  console.log("8080번 포트에서 서버 대기 중입니다");
});
server.on("error", (err) => {
  console.log("restFrontServer ==== Error Occured :: ", err);
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Handler ==== ", err);
});
