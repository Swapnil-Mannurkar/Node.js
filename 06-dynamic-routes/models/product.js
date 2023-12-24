const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }

  static updateProduct(updatedProduct) {
    fs.readFile(p, (err, fileContent) => {
      let products = JSON.parse(fileContent);

      let existingProductIndex = products.findIndex(
        (product) => product.id === updatedProduct.id
      );

      let existingProduct = products[existingProductIndex];

      products[existingProductIndex] = updatedProduct;

      fs.writeFile(p, JSON.stringify(products), (err) => {});
    });
  }

  static removeProduct(prodId) {
    fs.readFile(p, (err, fileContent) => {
      let products = JSON.parse(fileContent);
      let product = products.find((product) => product.id === prodId);
      products = products.filter((product) => product.id !== prodId);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (!err) {
          Cart.deleteProduct(prodId, product.price);
        }
      });
    });
  }
};
