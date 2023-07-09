const express = require("express");
const { apiLimiter, verifyToken } = require("../middlewares");
const {
  tokenTest,
  getMyPosts,
  getMyPostsByHashtag,
  createToken,
} = require("../controllers/v2");

const router = express.Router();

// POST / v2 / token;

router.post("/token", apiLimiter, createToken);

// GET /v2/test
router.get("/test", apiLimiter, verifyToken, tokenTest);

// GET /v2/posts/my
router.get("/posts/my", apiLimiter, verifyToken, getMyPosts);

// GET /v2/posts/hashtag/:title
router.get(
  "/posts/hashtag/:title",
  apiLimiter,
  verifyToken,
  getMyPostsByHashtag
);

module.exports = router;
