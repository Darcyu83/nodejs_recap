const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

const User = require("../models/user");

const usernameField = "email";
const passwordField = "password";
module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField,
        passwordField,
        passReqToCallback: false,
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
          if (!exUser)
            done(null, false, { message: "가입되지 않은 회원입니다." });

          const isPwdMatched = await bcrypt.compare(password, exUser.password);
          if (isPwdMatched) {
            done(null, exUser);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } catch (error) {
          console.log("LocalStrategy failed :: ", error);

          done(error);
        }
      }
    )
  );
};
