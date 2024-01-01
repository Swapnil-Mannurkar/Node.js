exports.getLogin = (req, res, next) => {
  const loggedIn = req.get("Cookie").split("=")[1] == "true";

  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    isAuthenticated: loggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/login");
};
