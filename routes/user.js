const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.send(" get Hello, User merged");
  })
  .post((req, res) => {
    res.send(" post Hello, User merged");
  });

router.get("/", (req, res) => {
  res.send(" get Hello, User");
});

router.post("/", (req, res) => {
  res.send(" post Hello, User");
});

router.get("/likes", (req, res) => {
  res.send("좋아요 :: 111");
});

router.get("/info/:id", (req, res) => {
  console.log(req.params, req.query);
  //   res.send("Hello, User");

  res.send(`${req.params.id} 아`);
});

router.get("/:id", (req, res) => {
  console.log("req.params :: ", req.params, "\n", "req.query :: ", req.query);
});

module.exports = router;
