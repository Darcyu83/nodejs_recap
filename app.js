console.log("Hello World");

setImmediate(() => {
  console.log("immediate 1");
});

setTimeout(() => {
  console.log("timeout 3");
}, 0);

Promise.resolve().then(() => console.log("promise 4"));

process.nextTick(() => {
  console.log("nextTick 2");
});

console.log("결과는 nextTick 2", "promise 4", "immediate 1 ", "timeout 4순위");
