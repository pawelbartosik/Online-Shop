const { localsName } = require("ejs");
const Product = require("../models/product-model");
const Order = require("../models/order-model");

async function adminProductsPage(req, res, next) {
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

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findOne(req.params.id);
    res.render("./admin/update-product", { product: product });
    return;
  } catch (error) {
    next(error);
    return;
  }
}

async function deleteProduct(req, res, next) {
  try {
    await Product.deleteOne(req.params.id);
    res.redirect("/admin/products");
  } catch (error) {
    next(error);
    return;
  }
  return;
}

async function postUpdateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}

async function getAdminOrders(req, res, next) {
  try {
    const orders = await Order.findAll();
    res.render("./admin/admin-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
}

async function updateAdminOrders(req, res, next) {
  const orderId = req.params.id;
  const newStatus = req.body.newStatus;

  try {
    const order = await Order.findById(orderId);

    order.status = newStatus;
    await order.save();

    res.json({ message: "Order updated", newStatus: newStatus });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  adminProductsPage: adminProductsPage,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  postUpdateProduct: postUpdateProduct,
  deleteProduct: deleteProduct,
  getAdminOrders: getAdminOrders,
  updateAdminOrders: updateAdminOrders,
};
