const mongoose = require("mongoose");

const connect = async () => {
  if (process.env.NODE_ENV !== "production") {
    // 개발환경일 경우 콘솔에 생성하는 쿼리내용을 표시함.
    mongoose.set("debug", true);

    try {
      mongoose.connect("mongodb://yuds:yuds1983@localhost:27017/admin", {
        dbName: "nodejs_book",
        useNewUrlParser: true,
      });

      mongoose.connection.on("error", (error) => {
        console.log("몽고디비 연결 에러", error);
      });

      mongoose.connection.on("disconnected", () => {
        console.log("몽고디비 연결 종료 연결 재시도 ");
        connect();
      });
    } catch (error) {
      console.log("몽고 디비 커넥션 에러 ", error);
    }
  }

  //   // 몽고디비 연결
  //   mongoose.connect(
  //     "mongodb://root:yuds1983@localhost:27017/admin",
  //     {
  //       dbName: "nodejs_book",
  //       useNewUrlParser: true,
  //     },
  //     (error) => {
  //       if (error) {
  //         console.log("몽고디비 연결 에러 from mongoose ", error);
  //       } else {
  //         console.log("몽고디비 연결 성공 from mongoose ");
  //       }
  //     }
  //   );
};

module.exports = connect;
