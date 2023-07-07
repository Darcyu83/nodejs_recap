const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

//회원가입
exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { email } });

    if (exUser) {
      return res.redirect("/join?error=exist");
    }

    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.redirect("/");
  } catch (error) {
    console.log("join failed :: ", error);
    return next(error);
  }
};

//로그인
exports.login = (req, res, next) => {
  // authenticate 성공하면 req 객체에 login/logout 메소드를 추가함.
  // req.login은 passport.serializeUser를 호출하고
  // req.login 메소드의 인수 user객체를 serializeUser에 넘겨준다.
  // passport.serializeUser((user, done) => { done(null, user.id); });

  // req.logout
  passport.authenticate("local", (authError, user, infoMsg) => {
    // info = {message: ''}
    if (authError) {
      console.log("authentication failed :: ", authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?error=${infoMsg.message}`);
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.log("login failed :: ", loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

//로그아웃
exports.logout = (req, res, next) => {
  // req.user와 req.session 객체를 제거
  req.logout(() => {
    res.redirect("/");
  });
};
