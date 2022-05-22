const get = require("lodash/get");
const set = require("lodash/set");

module.exports = function (db, params, options) {
  let fetched = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id);
  if (!fetched) {
    db.prepare(`INSERT INTO ${options.table} (ID,json) VALUES (?,?)`).run(
      params.id,
      "{}"
    );
    fetched = db
      .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
      .get(params.id);
  }
  if (params.ops.target) {
    fetched = JSON.parse(fetched.json);
    if (typeof fetched !== "object")
      throw new TypeError("Cannot push into a non-object.");
    let oldArray = get(fetched, params.ops.target);
    if (oldArray === undefined) oldArray = [];
    else if (!Array.isArray(oldArray))
      throw new TypeError("Cannot push into a non-array.");
    oldArray.push(params.data);
    params.data = set(fetched, params.ops.target, oldArray);
  } else {
    if (fetched.json === "{}") fetched.json = [];
    else fetched.json = JSON.parse(fetched.json);
    if (!Array.isArray(fetched.json)) throw new TypeError("Not an array.");
    fetched.json.push(params.data);
    params.data = fetched.json;
  }
  params.data = JSON.stringify(params.data);
  db.prepare(`UPDATE ${options.table} SET json = (?) WHERE ID = (?)`).run(
    params.data,
    params.id
  );
  let newData = db
    .prepare(`SELECT * FROM ${options.table} WHERE ID = (?)`)
    .get(params.id).json;
  if (newData === "{}") return null;
  else {
    newData = JSON.parse(newData);
    return newData;
  }
};
