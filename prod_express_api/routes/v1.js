const express = require("express");
const { verifyToken, deprecated } = require("../middlewares");
const {
  createToken,
  tokenTest,
  getMyPosts,
  getMyPostsByHashtag,
} = require("../controllers/v1");

const router = express.Router();

router.use(deprecated);

// POST /v1/token
router.post("/token", createToken);

// POST /v1/test
router.get("/test", verifyToken, tokenTest);

// GET /v1/posts/my
router.get("posts/my", verifyToken, getMyPosts);

// GET /v1/posts/hashtag/:title
router.get("posts/hashtag/:title", verifyToken, getMyPostsByHashtag);

router.get("/", (req, res, next) => {
  console.log("v1get  from api ===== 0 ");
  return res.send("haha");
});

module.exports = router;
