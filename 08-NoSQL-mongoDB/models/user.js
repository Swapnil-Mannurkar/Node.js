const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(username, email, cart) {
    this.name = username;
    this.email = email;
    this.cart = cart;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const db = getDb();
    const updatedCart = {
      items: [{ productId: new mongodb.ObjectId(product._id), quantity: 1 }],
    };
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) });
  }
}

module.exports = User;
