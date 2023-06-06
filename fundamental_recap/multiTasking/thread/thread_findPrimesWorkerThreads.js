const {
  isMainThread,
  workerData,
  parentPort,
  Worker,
} = require("worker_threads");

function findPrimes(start, range) {
  const primes = [];
  let isPrime = true;

  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = 2; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(i);
    }

    isPrime = true;
  }

  return primes;
}

const startNum = 2;
const range = 10000000;

let primesTotal = [];

if (isMainThread) {
  const threadCnt = 4;
  const threads = new Set();

  const portionPerThread = Math.floor((range - startNum) / threadCnt);
  console.time("prime");

  let _startNum = startNum;

  for (let i = 0; i < threadCnt - 1; i++) {
    threads.add(
      new Worker(__filename, {
        workerData: { start: _startNum, portionPerThread },
      })
    );
    _startNum += portionPerThread;
  }

  threads.add(
    new Worker(__filename, {
      workerData: { start: _startNum, portionPerThread: range - _startNum },
    })
  );

  for (let worker of threads) {
    worker.on("error", (err) => {
      throw err;
    });

    worker.on("message", (msg) => {
      console.log("message ==== ", msg);
      primesTotal = primesTotal.concat(msg);
    });

    worker.on("exit", () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd("prime");
        console.log(primesTotal.length);
      }
    });
  }
} else {
  console.log("workerData ==== ", workerData);
  const _primes = findPrimes(workerData.start, workerData.portionPerThread);

  parentPort.postMessage(_primes);
}

console.log("hehe ==== ", primesTotal.length);
// 664579;
