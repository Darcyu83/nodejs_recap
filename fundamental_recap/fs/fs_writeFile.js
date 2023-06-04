const fs = require("fs");
const fsPromises = require("fs").promises;

fs.writeFile("./writeMe.md", "여기에 내용을 입력함다!.", (err) => {
  if (err) {
    throw err;
  }

  fs.readFile("./writeMe.md", (err, data) => {
    if (err) {
      throw err;
    }

    console.log("writeMe text ==== ", data.toString());
  });
});

const writeStream = fs.createWriteStream("./writeStreamTest.md");
writeStream.write("이거 되나\n");
writeStream.write("=== 이거 되나2 \n");
writeStream.write("+++ 이거 되나3 \n");

writeStream.end();

// 파일 복사 Sync
const originalData = fs.readFileSync("./readMe.md");
fs.writeFileSync("./readMeCopied.md", originalData);

// 파일 복사 stream

const readStream = fs.createReadStream("./readMe.md");
const writeStreamPipe = fs.createWriteStream("./readMeCopiedStream.md");

readStream.pipe(writeStreamPipe);

readStream.on("end", () => {
  console.log(" read Stream ==== end", process.memoryUsage().rss);
});

readStream.on("data", (chunk) => {
  console.log(" read Stream ==== onGoing", chunk.toString());
});
