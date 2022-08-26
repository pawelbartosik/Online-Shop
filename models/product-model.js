const db = require("../data/database");
const mongodb = require("mongodb");

class Product {
  constructor(productData) {
    this.name = productData.name;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  static async findAll() {
    const products = await db.getDb().collection("products").find().toArray();

    return products.map(function (oneProduct) {
      return new Product(oneProduct);
    });
  }

  static async findOne(productId) {
    let id;
    try {
      id = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: id });

    if (!product) {
      const error = new Error("Could not find product with that id");
      error.code = 404;
      throw error;
    }

    return product;
  }

  static async deleteOne(productId) {
    let id;
    try {
      id = new mongodb.ObjectId(productId);
      await db.getDb().collection("products").deleteOne({ _id: id });
    } catch (error) {
      error.code = 404;
      throw error;
    }
    return;
  }

  async save() {
    const productData = {
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
