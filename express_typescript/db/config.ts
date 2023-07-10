import { Dialect, Sequelize } from "sequelize";

const dbUserNm = process.env.DB_USER_NAME as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbDatabase = process.env.DB_DATABASE as string;
const dbHost = process.env.DB_HOST as string;
const dbDialect = process.env.DB_DIALECT as Dialect;

const sequelizeConnection = new Sequelize({
  username: dbUserNm,
  password: dbPassword,
  database: dbDatabase,
  host: dbHost,
  dialect: dbDialect,
});

export default sequelizeConnection;
