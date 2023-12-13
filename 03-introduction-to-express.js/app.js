const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const adminPage = require("./routes/admin");
const shopPage = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminPage);
app.use(shopPage);

app.listen(3000);
