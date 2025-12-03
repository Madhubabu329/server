const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [
    {
      menuId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ]
});

module.exports = mongoose.model("Cart", cartSchema);
