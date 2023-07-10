"use strict";

import fs from "fs";
import path from "path";
import sequelizeConnection from "../config";
import Sequelize from "sequelize";

let db: {
  [key: string]: any;
} = {};

const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelizeConnection,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelizeConnection;
db.Sequelize = Sequelize;

module.exports = db;
