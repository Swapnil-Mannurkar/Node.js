const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: req.session.loggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("65906e278c55c23a5ca4b2c9")
    .then((user) => {
      req.session.loggedIn = true;
      req.session.user = user;
      res.redirect("/login");
    })
    .catch((err) => console.log(err));
};
