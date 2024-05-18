require("dotenv").config();
const mongoose = require("mongoose");
const { DB_CONNECTION } = process.env;

mongoose.connect(DB_CONNECTION);
let db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connect Error!"));
db.once("open", () => {
  console.log("Database is Connected");
});

module.exports = db;
