<br/>
<h1 align="center">Prisma Database</h1>
<h6 align="center">Developed with 💙 by Roxza</h6>
<h4 align="center">⚡ An easy, open source database</h6>

---

![npm version](https://badge.fury.io/js/prisma.db.svg)
![npm info](https://img.shields.io/npm/dt/prisma.db?color=39F4B6)

# 📦 Installation

```console
npm i prisma.db --save
yarn add prisma.db
```

# 🔮 Importing

```js
import {
  JsonDatabase,
  sqliteDatabase,
  YamlDatabase,
  FireDatabase,
} from "prisma.db"; // esm
const {
  JsonDatabase,
  sqliteDatabase,
  YamlDatabase,
  FireDatabase,
} = require("prisma.db"); // common
```

# ✨ Different uses

## Json

```js
const { JsonDatabase } = require("prisma.db");
const db = new JsonDatabase({ dbPath: "./db.json" });
```

## Sqlite

```js
const { sqliteDatabase } = require("prisma.db");
const db = new sqliteDatabase({ dbPath: "./db.sqlite", dbName: "db" });
```

## Yaml

```js
const { YamlDatabase } = require("prisma.db");
const db = new YamlDatabase({ dbPath: "./db.yaml" });
```

## Firebase

```js
// It is suitable for small projects.
const { FireDatabase } = require("prisma.db");
const db = new FireBase({
  service: require("./service.json"),
  collection: "data",
});
```

# 📝 Usage

```js
/* Database Set and Push Example */

db.set("hello", "world"); /* String: World */

db.set("posts", [{ id: 1 }]); /* Array: [{ id: 1 }] */

db.push("posts", { id: 2 }); /* Array: [{ id: 1 }, { id: 2 }] */

/* Database Example */

db.type("hello"); /* String: "string" */

db.size(); /* Number: 1 */

db.fetch("hello"); /* String: World */

db.get("posts"); /* Array: [{ id: 1 }, { id: 2 }] */

db.dataAll(); /* Object: { hello: "World", posts: [{ id: 1 }, { id: 2 }] } */

db.clear(); /* Object: {} */

db.destroy(); /* Object: {} */

/* Database Boolean Functions */

db.has("world"); /* Boolean: false */

db.has("posts"); /* Boolean: true */

/* Database Maths Functions */

db.set("a", 1);

db.add("a", 1); /* Number: 2 */

db.subtract("a", 1); /* Number: 1 */

db.math("a", "+", 12); /* Number: 13 */

db.math("a", "-", "1"); /* Number: 12 */

db.math("a", "*", "2"); /* Number: 24 */

db.math("a", "/", "2"); /* Number: 12 */

db.math("a", "%", "5"); /* Number: 1 */

// Firebase Usage

const { FireDatabase } = require("prisma.db");
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
```

## 📜 Multiple use

```js
const { JsonDatabase } = require("prisma.db");

const a = new JsonDatabase({ dbPath: "./a.json" });
const b = new JsonDatabase({ dbPath: "./b.json" });
const c = new JsonDatabase({ dbPath: "./c.json" });

a.set("a", 1); /* Number: 1 */
b.set("b", 2); /* Number: 2 */
c.set("c", 3); /* Number: 3 */
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Roxza/prisma.db/issues).

## 💌 License

Webscreen is **licensed** under the **[MIT License]**. The terms of the license are as follows:

    The MIT License (MIT)

    Copyright (c) 2022 - Roxza

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
