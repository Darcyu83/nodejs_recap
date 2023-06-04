const fsp = require("fs").promises;

fsp
  .readdir("./folder")
  .then((dir) => {
    console.log("폴더 dir 파일리스트 ==== ", dir);
    return fsp.unlink("./folder/newFile.js"); // 파일 삭제
  })
  .then(() => {
    console.log("파일 삭제성공");
    return fsp.rmdir("./folder");
  })
  .then(() => {
    console.log("폴더 삭제 완료 ");
  })
  .catch((err) => {
    console.err(err);
  });
