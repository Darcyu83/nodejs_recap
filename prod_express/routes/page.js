const express = require("express");
const pageController = require("../controllers/page");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings.map((f) => f.id) || [];
  next();
});

router.get("/profile", isLoggedIn, pageController.renderProfile);
router.get("/join", isNotLoggedIn, pageController.renderJoin);
router.get("/", pageController.renderMain);

router.get("/hashtag", pageController.renderHashtag);
module.exports = router;
