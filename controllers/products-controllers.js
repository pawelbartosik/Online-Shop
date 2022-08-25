const Product = require("../models/product-model");

function allProductsPage(req, res) {
  res.render("./products/all-products");
}

function detailPage(req, res) {
  const product = Product.findOne();
  console.log(product);
  res.render("./products/detail");
}

module.exports = {
  allProductsPage: allProductsPage,
  detailPage: detailPage,
};
