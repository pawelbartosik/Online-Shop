const Order = require("../models/order-model");
const User = require("../models/user-model");

async function getOrdersPage(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("./orders/all-orders", { orders: orders });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userData;
  try {
    userData = await User.findById(res.locals.uid);
  } catch (error) {
    next(error);
    return;
  }

  const order = new Order(cart, userData);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  res.redirect("/orders");
}

module.exports = {
  getOrdersPage: getOrdersPage,
  addOrder: addOrder,
};