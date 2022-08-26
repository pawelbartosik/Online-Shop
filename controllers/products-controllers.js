const Product = require("../models/product-model");

function allProductsPage(req, res) {
  res.render("./products/all-products");
}

async function detailPage(req, res) {
  try {
    const productFromDb = await Product.findOne(req.params.id);
    const product = new Product(productFromDb);
    res.render("./products/detail", { product: product });
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
