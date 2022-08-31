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

function increaseCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemData = cart.increaseItem(req.body.productId);
  req.session.cart = cart;
  res.json({
    message: "Item increased",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
      updatedItemQuantity: updatedItemData.updatedItemQuantity,
    },
  });
}

function decreaseCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemData = cart.decreaseItem(req.body.productId);
  req.session.cart = cart;
  res.json({
    message: "Item increased",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
      updatedItemQuantity: updatedItemData.updatedItemQuantity,
    },
  });
}

function removeCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemData = cart.removeItem(req.body.productId);
  req.session.cart = cart;
  res.json({
    message: "Item increased",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
      updatedItemQuantity: updatedItemData.updatedItemQuantity,
    },
  });
}

module.exports = {
  getCartPage: getCartPage,
  addCartItem: addCartItem,
  increaseCartItem: increaseCartItem,
  decreaseCartItem: decreaseCartItem,
  removeCartItem: removeCartItem,
};
