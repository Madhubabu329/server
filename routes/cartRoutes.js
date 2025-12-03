const express = require("express");
const router = express.Router();
const { getCart, addToCart, removeItem } = require("../controllers/cartController");

router.get("/:userId", getCart);
router.post("/add", addToCart);
router.post("/remove", removeItem);

module.exports = router;
