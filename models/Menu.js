const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: String,
  name: String,
  price: Number,
  image: String,
  veg: Boolean,
  description: String
});

module.exports = mongoose.model("Menu", menuSchema);
