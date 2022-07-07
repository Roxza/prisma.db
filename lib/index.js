// # Roxza

const JsonDatabase = require("./structures/jsonProvider.js");
const sqliteDatabase = require("./structures/sqlProvider.js");
const YamlDatabase = require("./structures/yamlProvider.js");
const FireDatabase = require("./structures/firebaseProvider.js");
const MysqlDatabase = require("./structures/mysqlProvider.js");

module.exports = {
  JsonDatabase,
  sqliteDatabase,
  YamlDatabase,
  FireDatabase,
  MysqlDatabase
};
