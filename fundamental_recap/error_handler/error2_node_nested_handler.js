const fs = require("fs");
const fsp = require("fs").promises;

const intervalId = setInterval(() => {
  fs.unlink("./no_file.js", (err) => {
    if (err) {
      console.log("이거슨 삭제 대상 파일이 없을 때 나오는 에러 ==== 1", err);
      clearInterval(intervalId);
    }
  });
}, 1000);

const intervalId_promises = setInterval(() => {
  fsp
    .unlink("./no_file.js", (err) => {
      if (err) {
        console.log(
          "이거슨 삭제 대상 파일이 없을 때 나오는 에러 ==== 프로미스는 파일없으면 이거 실행안됨",
          err
        );
        //   clearInterval(intervalId_promises);
      }
    })
    .catch((err) => {
      console.log(
        "이거슨 삭제 대상 파일이 없을 때 나오는 에러 ==== 프로미스 사용할때 catch 안쓰면 서버 터짐  ",
        err
      );
    });
}, 1000);
