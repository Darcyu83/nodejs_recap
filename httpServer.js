const http = require("http");

const fs = require("fs").promises;
const server = http.createServer(async (req, res) => {
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
});

server.listen(8080, () => {
  console.log("8080번 포트에서 서버 running");
});

server.on("error", (err) => {
  console.log("Error Occured :: ", err);
});
