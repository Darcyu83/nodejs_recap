process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러 === ", err);
});

const intervalId = setInterval(() => {
  throw new Error("터져라 서버 !");
}, 3000);

setTimeout(() => {
  console.log("서버 아직 살아있음.");
}, 1000);
