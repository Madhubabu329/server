const Cart = require("../models/Cart");

// Get cart for user
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, menuId, name, price, qty } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists
    const itemIndex = cart.items.findIndex(i => i.menuId === menuId);

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty;
    } else {
      cart.items.push({ menuId, name, price, qty });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Remove item from cart
exports.removeItem = async (req, res) => {
  try {
    const { userId, menuId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.menuId !== menuId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
};
