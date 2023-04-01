const express = require("express");
//cookie-parser used for storing user in cookies (manual authentication)
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in connecting with server ${err}`);
  }
  console.log(`server is running on port ${port}`);
});
