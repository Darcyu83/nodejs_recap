const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const beTargeted = {};
const cookieParser = (cookiestr = "") => {
  return cookiestr
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce((target, [K, V]) => {
      // console.log(target, K, V);
      target[K] = V;
      return target;
    }, beTargeted);
};

const session = {};
const server = http.createServer(async (req, res) => {
  const cookies = cookieParser(req.headers.cookie);
  console.log(req.method, req.url, req.headers.cookie, cookies);

  if (req.url.startsWith("/login")) {
    const url = new URL(req.url, "http://localhost:8080");
    const name = url.searchParams.get("name");

    const sessionId = Date.now();

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 15);

    session[sessionId] = { name, expires };
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `sessionId=${sessionId}; Expires=${expires.toLocaleDateString()}; HttpOnly; Path=/`,
    });
    res.end();
    return;
  } else if (
    cookies.sessionId &&
    session[cookies.sessionId]?.expires > new Date()
  ) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${session[cookies.sessionId].name}님 안녕하세요.`);
    return;
  } else if (
    cookies.sessionId &&
    session[cookies.sessionId]?.expires < new Date()
  ) {
    delete session[cookies.sessionId];
    res.writeHead(302, {
      Location: "/",
      // "Set-Cookie": `sessionId=${sessionId}; Expires=${expires.toLocaleDateString()}; HttpOnly; Path=/`,
    });
    res.end();
  } else {
    try {
      const data = await fs.readFile(
        path.join(__dirname, "html", "cookie.html")
      );
      res.writeHead(200, { "Conten-Type": "text/plain; charset=utf-8" });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(error.message);
      return;
    }
  }
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
