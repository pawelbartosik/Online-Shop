const User = require("../models/user-model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
  res.render("./auth/signup");
}

async function signup(req, res) {
  const user = new User(req.body.email, req.body.password, req.body.name);

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("./auth/login");
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.existingUser();

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const isCorrectPassword = await user.comparePassword(existingUser.password);

  if (!isCorrectPassword) {
    res.redirect("/login");
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.deleteUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
