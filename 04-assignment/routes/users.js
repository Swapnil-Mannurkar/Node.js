const express = require("express");

const router = express.Router();

const users = require("../routes/home").users;

router.get("/users", (req, res, next) => {
  res.render("users", { users });
});

module.exports = router;
