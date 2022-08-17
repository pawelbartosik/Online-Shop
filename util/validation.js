function isEmpty(value) {
  return !value || value.trim() === "";
}

function checkUserLoginInputs(email, password) {
  return (
    !isEmpty(email) &&
    email.includes("@") &&
    !isEmpty(password) &&
    password.trim().length > 7
  );
}

function checkUserSignupInputs(name, email, password, rptPassword) {
  return (
    checkUserLoginInputs(email, password) &&
    !isEmpty(name) &&
    !isEmpty(rptPassword) &&
    password === rptPassword
  );
}

module.exports = {
  checkUserLoginInputs: checkUserLoginInputs,
  checkUserSignupInputs: checkUserSignupInputs,
};
