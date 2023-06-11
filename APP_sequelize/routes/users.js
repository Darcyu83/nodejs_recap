const express = require("express");

const router = express.Router();

const db = require("../models");

const User = require("../models/user");
const Comment = require("../models/comment");

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({
        limit: 10,
        offset: 0,
        attributes: ["id", "name", "age", "married", "created_at"],
      });

      res.json(users);
    } catch (error) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });

      console.log(user);
      res.status(201).json(user);
    } catch (error) {
      console.error(err);
      next(err);
    }
  });

router.get(`/:id/comments`, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      },
    });

    console.log("comments ==== ", JSON.stringify(comments));
    res.json(comments);
  } catch (error) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
