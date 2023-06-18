const mongoose = require("mongoose");

const { Schema } = mongoose;

const {
  Types: { ObjectId },
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    reqruired: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// User => users
// Comment => comments 강제 개명된다
// 이거 그냥 명시해서 쓰자
module.exports = mongoose.model("Comment", commentSchema, "comments");
