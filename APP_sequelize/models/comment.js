const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,

        // createdAt , updatedAt 컬럼 자동 생성
        timestamps: false,

        //
        modelName: "Comment",
        tableName: "comments",

        // deletedAt 컬럼 자동 생성 => 삭제시 삭제일시 기입 실제삭제X
        paranoid: true,

        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  //기본키가 많은 값을 가진다. hasMany
  //외래키는 1개의 값에 속한다. belongsTo

  static associate(db) {
    // 아래 함수 해석 : 직역
    // 댓글 테이블의 한개 또는 여러개의 댓글은 유저 테이블의 한개의 유저에 속한다.
    // Comment belongs to User

    // 특히, 댓글 테이블의 컬럼 commenter는 유저 테이블의 아이디(targetKey)에 속한다.
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
}

module.exports = Comment;
