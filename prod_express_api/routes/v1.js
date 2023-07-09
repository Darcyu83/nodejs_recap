const express = require("express");
const { verifyToken } = require("../middlewares");
const { createToken, tokenTest } = require("../controllers/v1");

const router = express.Router();

// POST /v1/token
router.post("/token", createToken);

// POST /v1/test
router.get("/test", verifyToken, tokenTest);

router.get("/", (req, res, next) => {
  console.log("v1get  from api ===== 0 ");
  return res.send("haha");
});

module.exports = router;
