const http = require("http");

const fs = require("fs").promises;
const path = require("path");

const users = {};

const server = http.createServer(async (req, res) => {
  try {
    const htmlFolerPath = path.join(__dirname, "html");
    console.log(req.method, req.url, htmlFolerPath);

    if (req.method === "GET") {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
      });

      switch (req.url) {
        case "/":
          let home = await fs.readFile(
            path.join(htmlFolerPath, "restFront.html")
          );
          res.end(home);
          break;
        case "/about":
          let about = await fs.readFile(path.join(htmlFolerPath, "about.html"));

          res.end(about);
          break;

        case "/users":
          res.end(JSON.stringify(users));
          break;

        default:
          try {
            const notFound = await fs.readFile(
              path.join(htmlFolerPath, req.url)
            );
            return res.end(notFound);
          } catch (error) {
            res.writeHead(404);
            return res.end("Not Found");
          }
      }
    } else if (req.method === "POST") {
      switch (req.url) {
        case "/user":
          let body = "";
          // 요청의 body를 stream형식으로 받음
          req.on("data", (chunk) => {
            body += chunk;
          });
          req.on("end", () => {
            console.log("유저 등록 body ", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
            res.end("등록 성공");
          });
          return;
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];
        let body = "";

        req.on("data", (chunk) => {
          console.log("PUT chunk ", chunk.toString());
          body += chunk;
        });

        req.on("end", () => {
          console.log("PUT 본문(body): ", body);

          users[key] = JSON.parse(body).name;

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          res.end(JSON.stringify(users));
        });
        return;
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/user/")) {
        const key = req.url.split("/")[2];

        delete users[key];
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(JSON.stringify(users));
        return;
      }
    }
  } catch (error) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(err.message);
  } finally {
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
