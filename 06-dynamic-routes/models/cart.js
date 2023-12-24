const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

let cart = { products: [], totalPrice: 0 };

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // Analyze the cart => Find existing product
      let existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      let existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += Number(productPrice);
      fs.writeFile(p, JSON.stringify(cart), (err) => {});
    });
  }

  static fetchCart(cb) {
    getProductsFromFile(cb);
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;

      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((product) => product.id === id);
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      updatedCart.totalPrice -= productPrice * productQty;

      // if (updatedCart.totalPrice < 0) updatedCart.totalPrice = 0;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {});
    });
  }
};
