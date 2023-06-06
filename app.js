const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res, next) => {
  res.send("익스프레스 서버 첫 메시지");
});

app.listen(app.get("port"), () => {
  console.log(`${app.get("port")}번 포트에서 대기중`);
});
