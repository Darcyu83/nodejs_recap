const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const User = require("./user");
const Post = require("./post");
const Hashtag = require("./hashtag");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

// db.User = User;
// db.Post = Post;
// db.Hashtag = Hashtag;

// User.initiate(sequelize);
// Post.initiate(sequelize);
// Hashtag.initiate(sequelize);

// User.associate(db);
// Post.associate(db);
// Hashtag.associate(db);

const basename = path.basename(__filename);
fs.readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회
  .filter((file) => {
    // 숨김파일, index.js js 확장자가 아닌파일을 필터링

    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    // 해당파일의 모델을 불러와서 init

    const model = require(path.join(__dirname, file));
    console.log(file, model.name);

    db[model.name] = model;
    model.initiate(sequelize);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 자동으로생성된 관계 테이블 접근

// db.sequelize.models.PostHashtag;
// db.sequelize.models.Follow;

module.exports = db;
