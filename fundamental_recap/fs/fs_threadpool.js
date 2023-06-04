// thread pool : 비동기 메소드들은 백르라운드에서 실행되고
// 실행 후에는 다시 메인 스레드의 콜백 함수나 프로미스의 then부분이 실행됨
// 백그라운드에서 동시에 처리되는데 스레드 풀이 가능하게 해줌

// 기본적으로 fs, crypto, zlib, dns.lookup 등이 있음

// 예제

const crypto = require("crypto");

const pass = "pass";
const salt = "salt";
const start = Date.now();

for (let i = 0; i < 10; i++) {
  crypto.pbkdf2(pass, salt, 1000000, 128, "sha512", () => {
    console.log(`${i}:: 암호화 done`, Date.now() - start);
  });
}
