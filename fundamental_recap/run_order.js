console.log("Hello World");

setTimeout(() => {
  console.log("timeout 1");
}, 0);

Promise.resolve().then(() => console.log("promise 2"));

setImmediate(() => {
  console.log("immediate 3");
});

process.nextTick(() => {
  console.log("nextTick 4");
});

console.log(
  "결과는 nextTick 1순위 실행 \n",
  "promise 2순위 \n",
  "immediate 3순윈 \n ",
  "timeout 4순위 \n"
);
