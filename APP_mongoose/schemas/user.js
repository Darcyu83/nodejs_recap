const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// User => users
// Comment => comments 강제 개명된다
// 이거 그냥 명시해서 쓰자
module.exports = mongoose.model("User", userSchema, "users");
