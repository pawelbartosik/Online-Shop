const db = require("../data/database");

class Product {
  constructor(productData) {
    this.name = productData.name;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
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
