const User = require("../models/user-model");
const authUtil = require("../util/authentication");
const validUtil = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      name: "",
      email: "",
      password: "",
      rpt_psw: "",
    };
  }
  res.render("./auth/signup", { inputData: sessionData });
}

async function signup(req, res) {
  const enteredData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rpt_psw: req.body.rpt_psw,
  };

  if (
    !validUtil.checkUserSignupInputs(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.rpt_psw
    )
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your inputs, password should be at least 8 characters long",
        ...enteredData,
      },
      function () {
        return res.redirect("/signup");
      }
    );
  }

  const user = new User(req.body.email, req.body.password, req.body.name);

  try {
    const existsAlready = await user.boolExistingUser();

    if (existsAlready) {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: "This user already exist, please login",
          email: user.email,
          password: user.password,
        },
        function () {
          res.redirect("/login");
        }
      );
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: "",
      password: "",
    };
  }

  res.render("./auth/login", { inputData: sessionData });
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.existingUser();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "We don't have user with this email",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
    return;
  }

  const isCorrectPassword = await user.comparePassword(existingUser.password);

  if (!isCorrectPassword) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: "Invalid password!",
        email: user.email,
        password: user.password,
      },
      function () {
        res.redirect("/login");
      }
    );
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
