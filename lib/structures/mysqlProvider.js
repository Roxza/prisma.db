/* 
    Suitable for single page or small projects. BETA
*/

const mysql = require("mysql");

class plasmaDatabase {
  constructor(data) {
    this.data = data;

    if (!this.data.host) throw new Error("You must specify a host");
    if (!this.data.user) throw new Error("You must specify a user");
    if (!this.data.password) throw new Error("You must specify a password");
    if (!this.data.database) throw new Error("You must specify a database");

    this.connection = mysql.createConnection({
      host: this.data.host,
      user: this.data.user,
      password: this.data.password,
      database: this.data.database
    });

    this.connection.connect(err => {
      if (err) throw new Error(err);
      if(this.data.debug) console.log("Connected to database");
    });

    this.tableSet = this.constructor.tableSet;
    this.tableList = this.constructor.tableList;
    this.tableDelete = this.constructor.tableDelete;
    this.set = this.constructor.set;
    this.fetch = this.constructor.fetch;
    this.get = this.constructor.fetch;
    this.has = this.constructor.has;
    this.delete = this.constructor.delete;
    this.push = this.constructor.errorFunction;
    this.add = this.constructor.errorFunction;
    this.math = this.constructor.errorFunction;
    this.type = this.constructor.errorFunction;
    this.subtract = this.constructor.errorFunction;
    this.dataAll = this.constructor.dataAll;
    this.destroy = this.constructor.destroy;
    this.clear = this.constructor.clear;
    this.size = this.constructor.size;
    this.update = this.constructor.update;
  }

  /**
   *
   * @example db.tableList();
   * @returns {any}
   */
  static async tableList() {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'",
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });
  }

  /**
   *
   * @param {string} sql - Table sql
   * @example db.tableSet(`CREATE TABLE IF NOT EXISTS...`);
   * @returns {any}
   */
  static async tableSet(sql) {
    const connection = await this.connection;
    await connection.query(sql);
    return true;
  }

    /**
   *
   * @param {string} table - Table name
   * @example db.tableDelete("users");
   * @returns {any}
   */
  static async tableDelete(table) {
    const connection = await this.connection;
    await connection.query(`DROP TABLE ${table}`);
    return true;
  }

  /**
   *
   * @param {string} key - The doc to set
   * @param {*} value - The value to set
   * @example db.set("users", { name: "Raphael" });
   * @returns {any}
   */
  static async set(table, value) {
    if (!table) throw new Error("You must specify a table");
    if (!value) throw new Error("You must specify a value");

      const connection = await this.connection;
      await connection.query(
        `INSERT INTO ${table} SET ?`,
        value
      )
      return value;
  }

  /**
   *
   * @param {string} table - Table name
   * @param {string} key - Key
   * @param {*} value - Value
   * @example db.fetch("users", "name", "Raphael");
   * @returns {any}
   */
  static async fetch(table, key, value) {
    if (!table) throw new Error("You must specify a table");
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    
    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [value], (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

    /**
   *
   * @param {string} table - Table name
   * @param {string} key - Key
   * @param {*} value - Value
   * @example db.has("users", "name", "Raphael");
   * @returns {boolean}
   */
  static async has(table, key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    
    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [value], (err, res) => {
        if (err) reject(err);
         resolve(res.length > 0 ? true : false);
      });
    });
  }

  /**
   *
   * @param {string} table - Table name
   * @param {string} key - Key
   * @param {*} value - Value
   * @example db.delete("users", "name", "Raphael");
   * @returns {boolean}
   */
  static async delete(table, key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    
    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`DELETE FROM ${table} WHERE ${key} = ?`, [value], (err, res) => {
        if (err) reject(err);
         resolve(results.affectedRows > 0 ? true : false);
      });
    });
  }

  /**
   *
   * @param {string} table - Table name
   * @param {string} key - Key
   * @param {*} value - Value
   * @param {*} data - new Data
   * @example db.update("users", "name", "Raphael" , { name: "Raffaello Sanzio", });
   * @returns {boolean}
   */
  static async update(table, key, value, data) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!data) throw new Error("You must specify a data");
    if (!table) throw new Error("You must specify a table");

    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`UPDATE ${table} SET ? WHERE ${key} = ?`, [data, value], (err, res) => {
        if (err) reject(err);
        const results = res.affectedRows > 0 ? true : false;
        resolve(results);
      });
    });
  }

    /**
   *
   * @param {string} table - Table name
   * @example db.dataAll("users");
   * @returns {boolean}
   */
  static async dataAll(table) {
    if (!table) throw new Error("You must specify a table");

    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  /**
   *
   * @param {string} table - Table name
   * @example db.destroy(); // Database connect is closed
   * @returns {boolean}
   */
  static async destroy() {
    const connection = await this.connection;
    await connection.end();
  }

  /**
   *
   * @param {string} table - Table name
   * @example db.clear("users");
   * @returns {boolean}
   */
  static async clear(table) {
    if (!table) throw new Error("You must specify a table");
    const connection = await this.connection;
    await connection.query(`DELETE FROM ${table}`);
  }

  /**
   *
   * @param {string} table - Table name
   * @example db.size("users");
   * @returns {boolean}
   */
  static async size(table) {
    if (!table) throw new Error("You must specify a table");
    const connection = await this.connection;
    return new Promise((resolve, reject) => {
      connection.query(`SELECT COUNT(*) AS size FROM ${table}`, (err, res) => {
        if (err) reject(err);
         resolve(res[0].size);
      });
    });
  }

  static async errorFunction() {
    return "Mysql does not support this functionality."
  }
}

module.exports = plasmaDatabase;
