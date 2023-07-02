const passport = require("passport");

const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

module.exports = () => {
  const clientID = process.env.KAKAO_PLATFORM_REST_API_KEY; // 카카오톡에서 발급해주는 아이디
  const callbackURL = "/auth/kakao/callback";
  passport.use(
    new KakaoStrategy(
      {
        clientID,
        callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile :: ", clientID, profile);

        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });

          console.log("exUser :: ", exUser);
          if (!exUser) {
            const newUser = await User.create({
              email: profile._json?.kakao_account?.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao",
            });

            console.log("newUser :: ", exUser, newUser);

            return done(null, newUser);
          }

          return done(null, exUser);
        } catch (error) {
          console.log("kakaoStrategy failed :: ", error);
          done(error);
        }
      }
    )
  );
};
