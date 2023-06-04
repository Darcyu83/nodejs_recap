const fsp = require("fs").promises;

fsp
  .copyFile("./file1.md", "./file2.md")
  .then(() => {
    console.log("복사 완료");
  })
  .catch((err) => {
    console.log(" 에러 남 ", err);
  });
