const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});
    console.log("users::", users);
    res.render("mongoose", { users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
