const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

// !!!! 패스포트 로그인 전체 호출응답 흐름
// 1. /auth/login 라우터를 통해서 로그인 요청 들어옴
// 2. 라우터에서 passport.authenticate 메소드 호출
// 3. 로그인 전략(localStrategy) 수행
// 4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
// 5. req.login 메소드가 passport.serializeUser 호출
// 6. req.session에 사용자 아이디만 저장해서 세션 생성
// 7. express-session에 설정을 기준으로 브라우저 connect.sid 세션 쿠키 전송
// 8. 로그인 완료

// !!!! 패스포트 로그인 이후 호출응답 흐름
// 1. 요청들어옴
// 2. 요청 처리 라우터에 접근전에 passport.session 미들웨어가 passport.deserializeUser메소드 호출
// 3. connect.sid 세션 쿠키를 읽고 세션 객체를 찾아서 req.session으로 만듬
// 4. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
// 5. 조회된 사용자 정보를 req.user에 저장
// 6. 라우터에서 req.user 객체 사용가능
module.exports = () => {
  // 로그인할 때만 실행
  // req.session객체에 어떤 데이터를 저장할지 정하는 메소드
  // 매개변수로 user를 받고 done함수 두번째 인수로 유저아이디를 전달
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // done함수
  // 첫번째 인수는 에러 객체
  // 두번째 인수는 저장하고 싶은 데이터를 넣음.

  // deserializeUser는 매 요청에 실행
  // passport.session 미들웨거 이 메소드를 호출
  // done(err, id)의 두번째 인수 id가 deserializeUser의 인수로 들어옴

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user)) // req.user 객체로부터 값 호출 가능
      .catch((err) => done(err));
  });

  // deserializeUser 캐쉬하기 => 레디스 같은 데이터베이스에 사용자 정보를 캐싱

  local();
  // kakao();
};
