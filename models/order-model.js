const db = require("../data/database");
const mongodb = require("mongodb");

class Order {
  constructor(cart, userData, status = "pending", date, orderId) {
    this.productData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  save() {
    if (this.id) {
      const orderId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
    } else {
      const orderDocument = {
        productData: this.productData,
        userData: this.userData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderDocument);
    }
  }

  static transformOrder(order) {
    return new Order(
      order.productData,
      order.userData,
      order.status,
      order.date,
      order._id
    );
  }

  static ordersMap(orders) {
    return orders.map(this.transformOrder);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.ordersMap(orders);
  }

  static async findAllForUser(id) {
    const uid = new mongodb.ObjectId(id);

    const orders = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();

    return this.ordersMap(orders);
  }

  static async findById(id) {
    const order = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(id) });

    return this.transformOrder(order);
  }
}

module.exports = Order;
