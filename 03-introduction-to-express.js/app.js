const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("always runs!");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("product page");
  res.send("<h1>This is a product page!</h1>");
});

app.use("/", (req, res, next) => {
  console.log("home page");
  res.send("<h1>Hello express.js world!</h1>");
});


app.listen(3000);
