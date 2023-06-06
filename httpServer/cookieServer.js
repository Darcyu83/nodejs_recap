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

const server = http.createServer(async (req, res) => {
  const cookies = cookieParser(req.headers.cookie);
  console.log(req.method, req.url, req.headers.cookie, cookies);

  if (req.url.startsWith("/login")) {
    const url = new URL(req.url, "http://localhost:8080");
    const name = url.searchParams.get("name");

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    res.writeHead(302, {
      Location: "/",
      "Set-Cookie": `name=${encodeURIComponent(
        name
      )}; Expires=${expires.toLocaleDateString()}; HttpOnly; Path=/`,
    });
    res.end();
    return;
  } else if (cookies?.name) {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(`${cookies.name}님 안녕하세요.`);
    return;
  } else {
    try {
      const data = await fs.readFile(
        path.join(__dirname, "html", "cookie.html")
      );
      res.writeHead(200, { "Conten-Type": "text/plain; charset=utf-8" });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
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
