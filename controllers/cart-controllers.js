const Product = require("../models/product-model");

function getCartPage(req, res) {
  res.render("./cart/cart");
}

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findOne(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    newTotalItems: cart.totalQuantity,
  });
}

module.exports = {
  getCartPage: getCartPage,
  addCartItem: addCartItem,
};
