function allProductsPage(req, res) {
  res.render("./products/all-products");
}

function detailPage(req, res) {
  res.render("./products/detail");
}

module.exports = {
  allProductsPage: allProductsPage,
  detailPage: detailPage,
};
