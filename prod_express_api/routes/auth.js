const express = require("express");
// const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// 1. 카카오 로그인 버튼 클릭
// 2. 카카로 로그인 창으로 리다이렉트 함
// 3. 그창에서 로그인 성공여부를 kakao/callback으로 받음
// GET /auth/kakao
// router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
// router.get(
//   "/kakao/callback",
//   passport.authenticate("kakao", {
//     failureRedirect: `/error=카카오로그인 실패`,
//   }),
//   (req, res) => {
//     res.redirect("/"); // 성공 시에 /로 이동
//   }
// );

module.exports = router;
