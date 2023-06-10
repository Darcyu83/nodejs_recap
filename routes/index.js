const express = require("express");

const router = express.Router();

router.get(
  "/",
  (req, res, next) => {
    return next("route");
    // res.send("Hello, Home");
    // next();
  },
  (req, res) => {
    res.send("실행 되나요? next(`route`)때문에 안되요! ");
  },
  (req, res) => {
    res.send("실행 되나요? next(`route`)때문에 안되요! ");
  },
  (req, res) => {
    res.send("실행 되나요? next(`route`)때문에 안되요! ");
  }
);

router.get("/", (req, res) => {
  res.render("index", { title: "yuds" });
});

module.exports = router;
