const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

const homePage = require("./routes/home.js").router;
const users = require("./routes/home.js").users;
const usersPage = require("./routes/users.js");

app.use(homePage);
app.use(usersPage);

app.listen(3000);
