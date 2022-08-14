function allProductsPage(req, res) {
  res.render("./products/all-products");
}

module.exports = {
  allProductsPage: allProductsPage,
};
