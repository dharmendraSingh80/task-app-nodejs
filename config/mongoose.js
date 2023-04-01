const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/test-db");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "error in connecting with db"));

db.once("open", function () {
  console.log("connected to db");
});

module.exports = db;
