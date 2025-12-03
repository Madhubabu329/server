const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  deliveryTime: Number,
  category: String
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
