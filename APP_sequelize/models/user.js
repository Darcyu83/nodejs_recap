const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      // id 컬럼은 자동 : 명시하지 않아도 됨
      {
        name: {
          type: Sequelize.STRING(20), // VARCHAR
          allowNull: false,
          unique: true,
        },

        age: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // TINYINT
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize,

        // timestamps 속성이 true이면 시퀄라이즈는 createdAt과 updatedAt 컬럼을 추가
        timestamps: false,

        // 시퀄라이즈 기본적으로 테이블명 / 컬럼명을 카멜케이스로 생성
        // true로 바꾸면 스네이크 케이스로 바꾸는 옵션
        underscored: false,

        // 모델네임 : 노드 프로젝트에서 참조
        modelName: "User",
        // 실제 데이터 베이스 테이블 이름
        tableName: "users",
        // true 설정하면 deletedAt 컬럼 생성됨 => 로우 삭제없이 지운 시각이 기록
        paranoid: true,

        // 아래 둘은 한글 입력을 위한 설정
        // charset: "utf8",
        // collate: "utf8_general_ci",

        // 한글 + 이모티콘
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  //기본키가 많은 값을 가진다. hasMany
  //외래키는 1개의 값에 속한다. belongsTo
  static associate(db) {
    // 아래 함수 해석 : 직역
    // 유저 테이블은 한명의 유저는 댓글 테이블의 여러 댓글과 관계를 가진다.
    // User has many of Comment
    // 특히, 댓글 테이블의 컬럼 commenter의 값의 원천은 유저 테이블의 아이디값이다.
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  }
}

module.exports = User;
