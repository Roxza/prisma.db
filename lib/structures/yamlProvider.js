const yaml = require("yaml");
const fs = require("fs");
const jsyaml = require("js-yaml");

class plasmaDatabase {
  constructor(data) {
    this.dbPath = data.dbPath || "./database.yaml";
    this.data = {};

    if (!this.dbPath) throw new Error("You must specify a file path");
    if (!this.dbPath.endsWith(".yaml"))
      throw new Error("You must specify a yaml file");

    if (!fs.existsSync(this.dbPath)) {
      fs.writeFileSync(this.dbPath, "", "utf-8");
    } else {
      this.save();
    }

    this.set = this.constructor.set;
    this.get = this.constructor.get;
    this.fetch = this.constructor.get;
    this.has = this.constructor.has;
    this.delete = this.constructor.delete;
    this.subtract = this.constructor.subtract;
    this.add = this.constructor.add;
    this.push = this.constructor.push;
    this.math = this.constructor.math;
    this.type = this.constructor.type;
    this.size = this.constructor.size;
    this.clear = this.constructor.clear;
    this.destroy = this.constructor.destroy;
    this.dataAll = this.constructor.dataAll;
  }

  save() {
    const savedData = jsyaml.load(fs.readFileSync(this.dbPath, "utf-8"));
    if (typeof savedData == "object") {
      this.data = savedData;
    }
  }

  saveFile() {
    fs.writeFileSync(this.dbPath, yaml.stringify(this.data, null, 4), "utf-8");
  }
  /**
   *
   * @param {string} key The key to set
   * @param {*} value  The value to set
   * @example db.set("key", "value");
   * @returns {any}
   */
  static set(key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    try {
      this.data[key] = value;
      this.saveFile();
      return this.data[key];
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key The key to get
   * @example db.get("key");
   * @returns {any}
   */
  static get(key) {
    if (!key) throw new Error("You must specify a key");
    try {
      return this.data[key];
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key The key to check
   * @example db.has("key");
   * @returns {any}
   */
  static has(key) {
    if (!key) throw new Error("You must specify a key");
    try {
      return Boolean(this.data[key]);
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key The key to delete
   * @example db.delete("key");
   * @returns {any}
   */
  static delete(key) {
    if (!key) throw new Error("You must specify a key");
    try {
      delete this.data[key];
      this.saveFile();
    } catch (error) {
      console.log(error);
    }
  }
  /**
   *
   * @param {string} key - The key to math
   * @param {"+" | "-" | "*" | "/" | "%"} operator - The operator to math
   * @param {number} number - The value to math
   * @returns {any}
   * @example db.math("test","/", 12);
   */
  static math(key, operator, number) {
    if (!key) throw new Error("You must specify a key");
    if (!operator) throw new Error("You must specify an operator");
    if (!number) throw new Error("You must specify a number");
    if (!Boolean(this.data[key])) throw new Error("Key does not exist");
    if (!["+", "-", "*", "/", "%"].includes(operator))
      throw new Error("You must specify a valid operator");
    if (typeof number != "number") throw new Error("You must specify a number");

    try {
      switch (operator) {
        case "+":
          this.data[key] += number;
          break;
        case "-":
          this.data[key] -= number;
          break;
        case "*":
          this.data[key] *= number;
          break;
        case "/":
          this.data[key] /= number;
          break;
        case "%":
          this.data[key] %= number;
          break;
      }
      this.saveFile();
      return this.data[key];
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to set
   * @example db.type("key");
   * @returns {any}
   */
  static type(key) {
    if (!key) throw new Error("You must specify a key");
    try {
      if (Array.isArray(this.data[key])) return "array";
      else return typeof this.data[key];
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @returns {any}
   */
  static size() {
    try {
      return Object.keys(this.data).length;
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * @param {string} key - The key to subtract
   * @param {number} value - The value to subtract
   * @example db.subtract("key", 1);
   * @returns {any}
   */
  static subtract(key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    try {
      if (!this.data[key]) this.data[key] = 0;
      this.data[key] -= value;
      this.saveFile();
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
  static add(key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    try {
      if (!this.data[key]) this.data[key] = 0;
      this.data[key] += value;
      this.saveFile();
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
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (Boolean(this.data[key])) {
      if (typeof this.data[key] == "object") {
        this.data[key].push(value);
        this.saveFile();
      } else {
        this.data[key] = [this.data[key], value];
        this.saveFile();
      }
    }
  }
  static clear() {
    try {
      this.data = {};
      this.saveFile();
    } catch (error) {
      console.log(error);
    }
  }
  static destroy() {
    try {
      fs.unlinkSync(this.dbPath);
    } catch (error) {
      console.log(error);
    }
  }
  static dataAll() {
    try {
      return Object.keys(this.data).map((key) => {
        return {
          key,
          data: this.data[key],
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = plasmaDatabase;
