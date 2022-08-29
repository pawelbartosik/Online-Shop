const Product = require("../models/product-model");

async function allProductsPage(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("./products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

async function detailPage(req, res) {
  try {
    const productFromDb = await Product.findOne(req.params.id);
    res.render("./products/detail", { product: productFromDb });
    return;
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  allProductsPage: allProductsPage,
  detailPage: detailPage,
};
