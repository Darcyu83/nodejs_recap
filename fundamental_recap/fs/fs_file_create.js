const _fs = require("fs");
const fsPromises = _fs.promises;
const constants = _fs.constants;

// F_OK 파일 존재 여부
// W_OK 쓰기권한 체크
// R_OK 읽기권한 체크
fsPromises
  .access("./folder", constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject("이미 폴더가 있음");
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      console.log("폴더 없음 = ENOENT 에러는 dir을 생성하다.", err.code);
      return fsPromises.mkdir("./folder");
    }

    return Promise.reject(err);
  })
  .then(() => {
    console.log("폴더 만들기 성공했고 파일 만들기 시작");
    return fsPromises.open("./folder/file.js", "w");
  })
  .then((fd) => {
    console.log("빈 파일 만들기 성공", fd);
    return fsPromises.rename("./folder/file.js", "./folder/newFile.js");
  })
  .then(() => {
    console.log("이름 바꿨음");
  })
  .catch((err) => {
    console.log("마지막 catch erorr ==== ", err);
  });

// const fs = require("fs").promises;
// const constants = require("fs").constants;

// // // F_OK 파일 존재 여부
// // // W_OK 쓰기권한 체크
// // // R_OK 읽기권한 체크
// fs.access("./folder", constants.F_OK | constants.W_OK | constants.R_OK)
//   .then(() => {
//     return Promise.reject("이미 폴더 있음");
//   })
//   .catch((err) => {
//     if (err.code === "ENOENT") {
//       console.log("폴더 없음");
//       return fs.mkdir("./folder");
//     }
//     return Promise.reject(err);
//   })
//   .then(() => {
//     console.log("폴더 만들기 성공");
//     return fs.open("./folder/file.js", "w");
//   })
//   .then((fd) => {
//     console.log("빈 파일 만들기 성공", fd);
//     return fs.rename("./folder/file.js", "./folder/newfile.js");
//   })
//   .then(() => {
//     console.log("이름 바꾸기 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });
