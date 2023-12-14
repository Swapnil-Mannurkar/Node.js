const express = require("express");

const router = express.Router();

const users = [];

router.get("/", (req, res, next) => {
  res.render("home");
});

router.post("/", (req, res, next) => {
  users.push(req.body.user);
  res.redirect("/users");
});

exports.router = router;
exports.users = users;
