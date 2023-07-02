const User = require("../models/user");

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    // 요청자인 내가 req.params.id를 팔로윙한다.
    // req.user.id가 followerId , req.params.id가 followingId
    if (user) {
      await user.addFollowing(parseInt(req.params.id, 10));
      res.send("success");
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
