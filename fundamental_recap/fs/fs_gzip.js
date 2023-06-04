const zlib = require("zlib");
const fs = require("fs");
const { pipeline } = require("stream/promises");

const readStream = fs.createReadStream("./readMe.md");
const zlibStream = zlib.createGzip();

const writeStream = fs.createWriteStream("./readMe.md.gz");

readStream.pipe(zlibStream).pipe(writeStream);

const abort = new AbortController();
const abortSignal = abort.signal;

setTimeout(() => abort.abort(), 1); //1ms
const pipelineGo = async () =>
  await pipeline(
    fs.createReadStream("./readMe.md"),
    zlib.createGzip(),
    fs.createWriteStream("./readMe1.md.gz"),
    { signal: abortSignal }
  );

pipelineGo();
