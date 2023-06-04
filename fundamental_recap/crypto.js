const crypto = require("crypto");

console.log(
  "base 64 == abcdefgh",
  crypto.createHash("sha1").update("abcdefgh").digest("base64")
);
console.log(
  "base 64 == nopqrst",
  crypto.createHash("sha1").update("nopqrst").digest("base64")
);

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString("base64");
  console.log("salt:", salt);
  crypto.pbkdf2("abcdefgh", salt, 100000, 64, "sha512", (err, key) => {
    console.log("password:", key.toString("base64"));
    console.log("===================:");
  });
});

const algorithm = "aes-256-cbc";
const key = "abcdefghijklmnopqrstuvwxyz123456";
const iv = "1234567890123456";

const cipher = crypto.createCipheriv(algorithm, key, iv);
let ciphered = cipher.update("abcdefg", "utf8", "base64");

ciphered += cipher.final("base64");
console.log("암호화:", ciphered);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let deciphered = decipher.update(ciphered, "base64", "utf8");
deciphered += decipher.final("utf8");
console.log("복호화:", deciphered);
