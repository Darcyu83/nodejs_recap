const jwt = require("jsonwebtoken");
const { Domain, User } = require("../models");
const Post = require("../models/post");
const Hashtag = require("../models/hashtag");

exports.createToken = async (req, res, next) => {
  // const { clientSecret } = req.body;
  console.log("세션 테스트  createToken ===== 0 ");
  try {
    // const domain = await Domain.findOne({
    //   where: { clientSecret },
    //   include: { model: User, attribute: ["nick", "id"] },
    // });

    // if (!domain) {
    //   return res.status(401).json({
    //     code: 401,
    //     message: "등록되지 않은 도메인입니다. 도메인을 등록하세요.",
    //   });
    // }

    // const token = jwt.sign(
    //   { id: domain.User.id, nick: domain.User.nick },
    //   process.env.JWT_SECRET,
    //   { expiresIn: "1m", issuer: "dev_nodebird" }
    // );

    console.log("세션 테스트  createToken ===== 1 ");
    const token = jwt.sign(
      { id: "프리패스 토큰", nick: "프래패스 닉네임" },
      process.env.JWT_SECRET || "yudsjwt",
      { expiresIn: "1m", issuer: "dev_nodebird" }
    );

    console.log("세션 테스트  createToken ===== 2 ");
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다. from api",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ code: 501, message: "서버 에러" });
  }
};

exports.tokenTest = (req, res) => {
  res.json(res.locals.decoded);
};

exports.getMyPosts = (req, res) => {
  Post.findAll({ where: { userId: res.locals.decoded.id } })
    .then((posts) => {
      console.log("posts", posts);
      res.json({ code: 200, payload: posts });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ code: 500, message: "서버 에러" });
    });
};

exports.getMyPostsByHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({
      where: { title: req.params.title },
    });

    if (!hashtag) {
      return res
        .status(404)
        .json({ code: 404, message: "검색결과가 없습니다." });
    }

    const posts = await hashtag.getPosts();

    return res.json({ code: 200, payload: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ code: 500, message: "서버 에러" });
  }
};
