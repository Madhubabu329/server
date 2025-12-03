const Menu = require("../models/Menu");

exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await Menu.find({ restaurantId });
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json(error);
  }
};
