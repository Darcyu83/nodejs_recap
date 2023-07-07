const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },

        password: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        provider: {
          type: Sequelize.ENUM("local", "kakao"),
          allowNull: false,
          defaultValue: "local",
        },
        snsId: {
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true, // 데이터를 식제삭제하지 않고 deletedAt에 타임스탬프 저장
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  // User.gatPosts
  // User.addPosts

  // User table
  // userId || nick

  // Follow table
  // followerId(userId) || followingId(userId)
  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Domain);
    db.User.belongsToMany(db.User, {
      foreignKey: "followerId",
      as: "Followings", // user.getFollowings
      through: "Follow",
    });

    db.User.belongsToMany(db.User, {
      foreignKey: "followingId",
      as: "Followers", // user.getFollowers
      through: "Follow",
    });
  }
}

module.exports = User;
