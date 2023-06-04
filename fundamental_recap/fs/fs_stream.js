const fs = require("fs");

const readStream = fs.createReadStream("./readMe.md", { highWaterMark: 16 });
const writeStream = fs.createWriteStream("./writePipeStream.md");

const data = [];

readStream.on("data", (chunk) => {
  data.push(chunk);
  console.log("data :", chunk, chunk.length);
});

readStream.on("end", () => {
  console.log("end", Buffer.concat(data));
  console.log("end", Buffer.concat(data).toString());
});
readStream.on("error", (err) => {
  console.log("error :", err);
});

//pipe
readStream.pipe(writeStream);
