const express = require("express");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});

      res.json(users);
    } catch (error) {
      console.log(error);
      next(erorr);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });

      console.log("user created::", user);
    } catch (error) {
      console.error(err);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      "commenter"
    );

    console.log(comments);
    res.json(comments);
  } catch (error) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
