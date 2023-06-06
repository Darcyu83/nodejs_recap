const cluster = require("cluster");

const http = require("http");

const numCPUs = require("os").cpus().length;

if (cluster.isMaster) {
  console.log("마스터 프로세스 아이디: ", process.pid);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);

    console.log(`워커를 새로 등록합니다.`);
    cluster.fork();
  });
} else {
  const server = http.createServer(async (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Hello Node!</h1>");
    res.end("<p>Hello Cluster!</p>");

    setTimeout(() => {
      // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
      process.exit(1);
    }, 1000);
  });

  server.listen(8080, () => {
    console.log(
      `${process.pid}번 워커 실행:: 8080번 포트에서 서버 대기 중입니다`
    );
  });
}
