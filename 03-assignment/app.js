const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
  res.send("<h1>USER PAGE!</h1>");
});

app.use("/", (req, res, next) => {
  res.send("<h1>HOME PAGE!</h1>");
});

app.listen(3000);
