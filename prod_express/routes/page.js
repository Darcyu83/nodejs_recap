const express = require("express");
const pageController = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingList = [];

  next();
});

router.get("/profile", pageController.renderProfile);
router.get("/join", pageController.renderJoin);
router.get("/", pageController.renderMain);

module.exports = router;
