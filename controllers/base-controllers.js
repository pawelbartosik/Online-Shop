function mainPage(req, res) {
  res.redirect("/products");
}

module.exports = {
  mainPage: mainPage,
};
