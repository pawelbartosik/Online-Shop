class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + product.price;
        this.items[i] = cartItem;

        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }

  increaseItem(productId) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId) {
        const cartItem = { ...item };
        cartItem.quantity = item.quantity + 1;
        cartItem.totalPrice = item.totalPrice + item.product.price;
        this.items[i] = cartItem;
        this.totalQuantity++;
        this.totalPrice += item.product.price;
        return {
          updatedItemPrice: cartItem.totalPrice,
          updatedItemQuantity: cartItem.quantity,
        };
      }
    }
  }

  decreaseItem(productId) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId) {
        const cartItem = { ...item };
        cartItem.quantity = item.quantity - 1;
        cartItem.totalPrice = item.totalPrice - item.product.price;
        this.items[i] = cartItem;
        this.totalQuantity--;
        this.totalPrice -= item.product.price;
        return {
          updatedItemPrice: cartItem.totalPrice,
          updatedItemQuantity: cartItem.quantity,
        };
      }
    }
  }

  removeItem(productId) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId) {
        this.items.splice(i, 1);
        this.totalQuantity -= item.quantity;
        this.totalPrice -= item.totalPrice;
        return { updatedItemPrice: 0, updatedItemQuantity: 0 };
      }
    }
  }
}

module.exports = Cart;
