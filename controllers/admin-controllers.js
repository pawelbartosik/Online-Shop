const Product = require("../models/product-model");

async function adminProductsPage(req, res) {
  try {
    const products = await Product.findAll();
    res.render("./admin/admin-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
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

async function getUpdateProduct(req, res) {
  try {
    const product = await Product.findOne(req.params.id);
    res.render("./admin/update-product", { product: product });
    return;
  } catch (error) {
    next(error);
    return;
  }
}

function postUpdateProduct() {}

module.exports = {
  adminProductsPage: adminProductsPage,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  postUpdateProduct: postUpdateProduct,
};
