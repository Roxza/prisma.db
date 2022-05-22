/* 
    Suitable for single page or small projects.
*/

const admin = require("firebase-admin");

class plasmaDatabase {
  constructor(data) {
    this.data = data;

    if (!this.data.service) throw new Error("You must specify a service");
    if (!this.data.collection) throw new Error("You must specify a collection");

    admin.initializeApp({
      credential: admin.credential.cert(this.data.service),
    });

    this.db = admin.firestore();
    this.collection = this.data.collection;
    this.on = this.constructor.on;
    this.set = this.constructor.set;
    this.get = this.constructor.get;
    this.fetch = this.constructor.get;
    this.has = this.constructor.has;
    this.delete = this.constructor.delete;
    this.push = this.constructor.push;
    this.add = this.constructor.add;
    this.subtract = this.constructor.subtract;
    this.math = this.constructor.math;
    this.type = this.constructor.type;
    this.size = this.constructor.size;
    this.clear = this.constructor.clear;
    this.destroy = this.constructor.clear;
    this.dataAll = this.constructor.dataAll;
  }

  static async on(f) {
    if (f === "ready") {
      return "ready";
    }
  }

  /**
   *
   * @param {string} key - The doc to set
   * @param {*} value - The value to set
   * @example db.set("count", "88");
   * @returns {any}
   */
  static async set(key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .set(value)
      .then(() => value);
  }
  /**
   *
   * @param {string} key - The doc to get
   * @example db.get("count");
   * @returns {any}
   */
  static async get(key) {
    if (!key) throw new Error("You must specify a key");
    if (!(await this.has(key))) throw new Error("Doc does not exist");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .get()
      .then((data) => data.data());
  }
  /**
   *
   * @param {string} key - The doc to check
   * @param {string} value - The value name to check
   * @example db.has("count");
   * @returns {boolean}}
   */
  static async has(key, value) {
    if (!key) throw new Error("You must specify a key");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .get()
      .then((data) =>
        value ? (data.data()[value] ? true : false) : data.exists
      );
  }
  /**
   * @param {string} key - The doc to delete
   * @param {string} value - The value name to delete
   * @example db.delete("count");
   * @returns {any}
   */
  static async delete(key, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!(await this.has(key))) throw new Error("Doc does not exist");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .update({
        [`${value}`]: admin.firestore.FieldValue.delete(),
      })
      .then(() => value);
  }
  /**
   * @param {string} key - The doc to push
   * @param {*} value - The value to push
   * @param {string} name - The value name to push
   * @example db.push("counts", "users", { name: "test" })
   * @returns {any}
   */
  static async push(key, name, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!name) throw new Error("You must specify a name");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .update({
        [`${name}`]: admin.firestore.FieldValue.arrayUnion(value),
      })
      .then(() => value);
  }
  /**
   * @param {string} key - The doc to add
   * @param {number} value - The value to add
   * @param {string} name - The value name to add
   * @example db.add("count", "like", 108);
   * @returns {any}
   */
  static async add(key, name, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!name) throw new Error("You must specify a name");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .update({
        [`${name}`]: admin.firestore.FieldValue.increment(value),
      })
      .then(() => value);
  }
  /**
   * @param {string} key - The doc to subtract
   * @param {number} value - The value to subtract
   * @param {string} name - The value name to subtract
   * @example db.subtract("count", "like", 108);
   * @returns {any}
   */
  static async subtract(key, name, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!name) throw new Error("You must specify a name");

    return await this.db
      .collection(this.collection)
      .doc(key)
      .update({
        [`${name}`]: admin.firestore.FieldValue.increment(-value),
      })
      .then(() => value);
  }
  /**
   * @param {string} key - The doc to math
   * @param {number} value - The value to math
   * @param {string} name - The value name to math
   * @param {"+" | "-" | "*" | "/" | "%"} operator - The operator to math
   * @example db.math("count", "like", "+" 108);
   * @returns {any}
   */
  static async math(key, name, operator, value) {
    if (!key) throw new Error("You must specify a key");
    if (!value) throw new Error("You must specify a value");
    if (!name) throw new Error("You must specify a name");
    if (!operator) throw new Error("You must specify a operator");
    if (!(await this.has(key))) throw new Error("Doc does not exist");
    if (!["+", "-", "*", "/", "%"].includes(operator))
      throw new Error("You must specify a valid operator");

    switch (operator) {
      case "+":
        return await this.db
          .collection(this.collection)
          .doc(key)
          .update({
            [`${name}`]: admin.firestore.FieldValue.increment(value),
          })
          .then(() => value);
      case "-":
        return await this.db
          .collection(this.collection)
          .doc(key)
          .update({
            [`${name}`]: admin.firestore.FieldValue.increment(-value),
          })
          .then(() => value);
      case "*":
        const result = await this.db
          .collection(this.collection)
          .doc(key)
          .get()
          .then((data) => data.data()[name] * value);

        return await this.db
          .collection(this.collection)
          .doc(key)
          .update({
            [`${name}`]: result,
          })
          .then(() => value);
      case "/":
        const result2 = await this.db
          .collection(this.collection)
          .doc(key)
          .get()
          .then((data) => data.data()[name] / value);
        return await this.db
          .collection(this.collection)
          .doc(key)
          .update({
            [`${name}`]: result2,
          })
          .then(() => value);
      case "%":
        const result3 = await this.db
          .collection(this.collection)
          .doc(key)
          .get()
          .then((data) => data.data()[name] % value);
        return await this.db

          .collection(this.collection)
          .doc(key)
          .update({
            [`${name}`]: result3,
          })
          .then(() => value);
    }
  }
  static type(key, name) {
    if (!key) throw new Error("You must specify a key");
    if (!name) throw new Error("You must specify a name");

    return this.db
      .collection(this.collection)
      .doc(key)
      .get()
      .then((data) =>
        Array.isArray(data.data()[name]) ? "array" : typeof data.data()[name]
      );
  }
  /**
   *
   * @param {*} doc  - The doc to get
   * @param {*} name  - The name of the doc to get
   * @example db.size("count", "users")
   * @example db.size()
   * @example db.size("count")
   * @returns {number}
   */
  static size(doc, name) {
    return doc
      ? this.db
          .collection(this.collection)
          .doc(doc)
          .get()
          .then((data) =>
            name ? data.data()[name].length : data.data().length
          )
      : this.db
          .collection(this.collection)
          .get()
          .then((data) => data.size);
  }
  /**
   * @example db.clear() - it will delete all doc.
   * @returns {any}
   */
  static async clear() {
    return await this.db
      .collection(this.collection)
      .get()
      .then((data) => {
        data.forEach((doc) => doc.ref.delete());
      });
  }
  static async dataAll() {
    return await this.db
      .collection(this.collection)
      .get()
      .then((data) => data.docs.map((doc) => doc.data()));
  }
}

module.exports = plasmaDatabase;
