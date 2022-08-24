function adminProductsPage(req, res) {
  res.render("./admin/admin-products");
}

function getNewProduct(req, res) {
  res.render("./admin/new-product");
}

function createNewProduct(req, res) {
  console.log(req.body);
  console.log(req.file);

  res.redirect("/admin/products");
}

module.exports = {
  adminProductsPage: adminProductsPage,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
};
