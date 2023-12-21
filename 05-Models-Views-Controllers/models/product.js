<<<<<<< HEAD
const products = [];
=======
const fs = require('fs');
const path = require('path');
>>>>>>> d16f10ae90399dba8ee0cb3000acab0a12d6221b

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
<<<<<<< HEAD
    products.push(this);
  }

  static fetchAll() {
    return products;
=======
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
>>>>>>> d16f10ae90399dba8ee0cb3000acab0a12d6221b
  }
};
