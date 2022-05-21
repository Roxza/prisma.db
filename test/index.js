const { FireDatabase } = require("../lib/index");
const db = new FireDatabase({
  service: require("./service.json"),
  collection: "test",
});

db.set("mars", { hello: "world" }); // returns { hello: "world" }
db.push("mars", "livings", { name: "test" }); // returns { name: "test" }

db.get("mars"); // returns { hello: "world" }
db.fetch("mars"); // returns { hello: "world" }

db.has("mars"); // returns true
db.has("mars", "livings"); // returns true

db.delete("mars", "livings"); // returns true
db.clear("mars"); // returns true
db.destroy("mars"); // returns true

db.dataAll(); // returns { mars: { hello: "world" } }

db.type("mars", "hello"); // returns "object"
db.type("mars", "livings"); // returns "array"

db.add("mars", "population", 1); // returns 1
db.subtract("mars", "population", 1); // returns 0
db.math("mars", "population", "*", 10); // returns 10

// parameters that you can use in the math function; * + - / %
