const startNum = 2;
const range = 10000000;

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

console.time("prime");
const result = findPrimes(startNum, range);
console.timeEnd("prime");

console.log(result.length);

module.exports = { findPrimes };
