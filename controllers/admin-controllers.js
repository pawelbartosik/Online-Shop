const Product = require("../models/product-model");

function adminProductsPage(req, res) {
  res.render("./admin/admin-products");
}

function getNewProduct(req, res) {
  res.render("./admin/new-product");
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  adminProductsPage: adminProductsPage,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
