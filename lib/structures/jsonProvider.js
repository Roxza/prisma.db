const low = require("lowdb");
const lw = require("lowdb/adapters/FileSync");
const fs = require("fs");

class plasmaDatabase {
  constructor(data) {
    this.dbPath = data.dbPath || "./database.json";

    if (!this.dbPath) throw new Error("You must specify a file path");
    if (!this.dbPath.endsWith(".json"))
      throw new Error("You must specify a json file");

    /* Low DB*/
    this.db = low(new lw(this.dbPath));
    this.db.defaults({}).write();

    /* Funtions */

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
   * @param {string} key - The key to set
   * @param {*} value - The value to set
   * @example db.set("key", "value");
   * @returns {any}
   */
  static set(key, value) {
    if (!key) throw new Error("You must specify a key to set");
    if (!value) throw new Error("You must specify a value to set");
    try {
      this.db.set(key, value).write();
      return this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key - The key to push
   * @param {*} value - The value to push
   * @example db.push("key", "value");
   * @returns {any}
   */
  static push(key, value) {
    if (!key) throw new Error("You must specify a key to push");
    if (!value) throw new Error("You must specify a value to push");
    try {
      const data = this.db.get(key).value() || [];
      this.db.set(key, [...data, value]).write();
      return this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key - The key to get
   * @example db.get("key");
   * @returns {any}
   */
  static get(key) {
    if (!key) throw new Error("You must specify a key to get");
    try {
      return this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key - The key to check
   * @example db.has("key");
   * @returns {boolean}
   */
  static has(key) {
    if (!key) throw new Error("You must specify a key to check");
    try {
      return this.db.has(key) ? true : false;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to delete
   * @example db.delete("key");
   * @returns {any}
   */
  static delete(key) {
    if (!key) throw new Error("You must specify a key to delete");
    try {
      this.db.unset(file).write();
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to add
   * @param {number} value - The value to add
   * @example db.add("key", 1);
   * @returns {any}
   */
  static add(key, number) {
    if (!key) throw new Error("You must specify a key to add");
    if (!number) throw new Error("You must specify a number to add");
    try {
      if (this.db.has(key).value() === false)
        throw new Error("Key does not exist");
      if (typeof number !== "number")
        throw new Error(
          "I cannot perform operations because the data name you specified is not a number"
        );
      if (typeof this.db.get(key).value() !== "number")
        throw new TypeError(
          "I cannot perform operations because the data name you specified is not a number."
        );
      this.db.set(key, Math.floor(this.db.get(key).value() + number)).write();
      return this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to subtract
   * @param {number} number - The value to subtract
   * @example db.subtract("key", 1);
   * @returns {any}
   */
  static subtract(key, number) {
    if (!key) throw new Error("You must specify a key to subtract");
    if (!number) throw new Error("You must specify a number to subtract");
    try {
      if (this.db.has(key).value() === false)
        throw new Error("Key does not exist");
      if (typeof number !== "number")
        throw new Error(
          "I cannot perform operations because the data name you specified is not a number"
        );
      if (typeof this.db.get(key).value() !== "number")
        throw new TypeError(
          "I cannot perform operations because the data name you specified is not a number."
        );
      this.db.set(key, Math.floor(this.db.get(key).value() - number)).write();
      return this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to math
   * @param {"+" | "-" | "*" | "/" | "%"} operator - The operator to math
   * @param {number} number - The value to math
   * @returns {any}
   * @example db.math("test","/", 12);
   */
  static math(key, operator, number) {
    if (!key) throw new Error("You must specify a key to math");
    if (!operator) throw new Error("You must specify an operator to math");
    if (!number) throw new Error("You must specify a number to math");
    try {
      if (this.db.has(key).value() === false)
        throw new Error("Key does not exist");
      if (typeof number !== "number")
        throw new Error(
          "I cannot perform operations because the data name you specified is not a number"
        );
      if (typeof this.db.get(key).value() !== "number")
        throw new TypeError(
          "I cannot perform operations because the data name you specified is not a number."
        );
      if (operator === "+") {
        this.db.set(key, Math.floor(this.db.get(key).value() + number)).write();
        return this.db.get(key).value();
      } else if (operator === "-") {
        this.db.set(key, Math.floor(this.db.get(key).value() - number)).write();
        return this.db.get(key).value();
      } else if (operator === "*") {
        this.db.set(key, Math.floor(this.db.get(key).value() * number)).write();
        return this.db.get(key).value();
      } else if (operator === "/") {
        this.db.set(key, Math.floor(this.db.get(key).value() / number)).write();
        return this.db.get(key).value();
      } else if (operator === "%") {
        this.db.set(key, Math.floor(this.db.get(key).value() % number)).write();
        return this.db.get(key).value();
      } else {
        throw new Error(
          "I cannot perform operations because the operator you specified is not valid"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to type
   * @example db.type("key");
   * @returns {any}
   */
  static type(key) {
    if (!key) throw new Error("You must specify a key to type");
    try {
      if (Array.isArray(this.db.get(key).value())) return "array";
      else return typeof this.db.get(key).value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @returns {any}
   */
  static size() {
    try {
      return this.db.size().value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @returns {any}
   */
  static dataAll() {
    try {
      return this.db.value();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @returns {any}
   */
  static clear() {
    try {
      fs.writeFileSync(this.dbPath, "{}");
      return true;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @returns {any}
   */
  static destroy() {
    try {
      fs.unlinkSync(this.dbPath);
      return true;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = plasmaDatabase;
