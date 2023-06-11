const express = require("express");
const router = express.Router();

const Comment = require("../models/comment");

router.route("/").post(async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });

    console.log(comment);
    res.status(201).json(comment);
  } catch (error) {
    console.error(err);
    next(err);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          comment: req.body.comment,
        },
        { where: { id: req.params.id } }
      );

      res.json(result);
    } catch (error) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } });
      res.json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

module.exports = router;
