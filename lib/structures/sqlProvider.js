const Database = require("better-sqlite3");
const fs = require("fs");

class plasmaDatabase {
  constructor(data) {
    this.dbPath = data.dbPath || "./database.sqlite";
    this.dataName = data.dbName || "data";
    this.db = new Database(this.dbPath);

    if (!this.dbPath) throw new Error("You must specify a file path");
    if (!this.dbPath.endsWith(".sqlite"))
      throw new Error("You must specify a sqlite file");

    this.set = this.constructor.set;
    this.get = this.constructor.get;
    this.fetch = this.constructor.get;
    this.has = this.constructor.has;
    this.delete = this.constructor.delete;
    this.push = this.constructor.push;
    this.add = this.constructor.add;
    this.math = this.constructor.math;
    this.type = this.constructor.type;
    this.size = this.constructor.size;
    this.subtract = this.constructor.subtract;
    this.dataAll = this.constructor.dataAll;
    this.destroy = this.constructor.destroy;
    this.clear = this.constructor.clear;
  }

  /**
   *
   * @param {string} key The key to set
   * @param {*} value  The value to set
   * @example db.set("key", "value");
   * @returns {any}
   */
  static set(key, value, ops) {
    if (!key) throw new Error("You must specify a key to set");
    if (!value) throw new Error("You must specify a value to set");
    return arbitrate(
      "set",
      { id: key, data: value, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   *
   * @param {string} key The key to get
   * @example db.get("key");
   * @returns {any}
   */
  static get(key, ops) {
    if (!key) throw new Error("You must specify a key to get");
    return arbitrate(
      "fetch",
      { id: key, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   *
   * @param {string} key The key to check
   * @example db.has("key");
   * @returns {any}
   */
  static has(key, ops) {
    if (!key) throw new Error("You must specify a key to check");
    return arbitrate(
      "has",
      { id: key, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   *
   * @param {string} key The key to delete
   * @example db.delete("key");
   * @returns {any}
   */
  static delete(key, ops) {
    if (!key) throw new Error("You must specify a key to delete");
    return arbitrate(
      "delete",
      { id: key, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   * @param {string} key - The key to add
   * @param {number} value - The value to add
   * @example db.add("key", 1);
   * @returns {any}
   */
  static add(key, value, ops) {
    if (!key) throw new Error("You must specify a key to add");
    if (!value) throw new Error("You must specify a value to add");
    return arbitrate(
      "add",
      { id: key, data: value, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   * @param {string} key - The key to subtract
   * @param {number} value - The value to subtract
   * @example db.subtract("key", 1);
   * @returns {any}
   */
  static subtract(key, value, ops) {
    if (!key) throw new Error("You must specify a key to subtract");
    if (!value) throw new Error("You must specify a value to subtract");
    return arbitrate(
      "subtract",
      { id: key, data: value, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  /**
   *
   * @param {string} key - The key to push
   * @param {*} value - The value to push
   * @example db.push("key", "value");
   * @returns {any}
   */
  static push(key, value, ops) {
    if (!key) throw new Error("You must specify a key to push");
    if (!value) throw new Error("You must specify a value to push");
    return arbitrate(
      "push",
      { id: key, data: value, ops: ops || {} },
      this.db,
      this.dataName
    );
  }
  static dataAll(ops) {
    return arbitrate(
      "dataAll",
      { ops: ops || {} },
      this.db,
      this.dataName,
      this.dataName
    );
  }
  static math(key, operator, number, ops) {
    return {};
  }
  static type(key, ops) {
    return {};
  }
  static size(key, ops) {
    return {};
  }
  static clear() {
    fs.writeFileSync(this.dbPath, "");
    return true;
  }
  static destroy() {
    fs.unlinkSync(this.dbPath);
    return true;
  }
}

/* Arbitrate */

function arbitrate(method, params, db, dataName) {
  let options = {
    table: dataName || "data",
  };

  db.prepare(
    `CREATE TABLE IF NOT EXISTS ${options.table} (ID TEXT, json TEXT)`
  ).run();

  if (params.ops.target && params.ops.target[0] === ".")
    params.ops.target = params.ops.target.slice(1);
  if (params.data && params.data === Infinity)
    throw new TypeError(
      `You cannot set Infinity into the database @ ID: ${params.id}`
    );

  if (params.stringify) {
    try {
      params.data = JSON.stringify(params.data);
    } catch (e) {
      throw new TypeError(
        `Please supply a valid input @ ID: ${params.id}\nError: ${e.message}`
      );
    }
  }

  if (params.id && params.id.includes(".")) {
    let unparsed = params.id.split(".");
    params.id = unparsed.shift();
    params.ops.target = unparsed.join(".");
  }

  const methods = {
    set: require("./methods/set.js"),
    fetch: require("./methods/fetch.js"),
    has: require("./methods/has.js"),
    delete: require("./methods/delete.js"),
    push: require("./methods/push.js"),
    add: require("./methods/add.js"),
    subtract: require("./methods/subtract.js"),
    dataAll: require("./methods/dataAll.js"),
  };

  return methods[method](db, params, options);
}

module.exports = plasmaDatabase;
