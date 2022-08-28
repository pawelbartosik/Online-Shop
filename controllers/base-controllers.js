function mainPage(req, res) {
  res.redirect("/products");
}

function render401(req, res) {
  res.status(401).render("./error/401");
}

function render403(req, res) {
  res.status(403).render("./error/403");
}

module.exports = {
  mainPage: mainPage,
  render401: render401,
  render403: render403,
};
