// user cart routes
const express = require("express");

// import controllers
const {
  addToCart,
  fetchCartItems,
  updateCartItemQty,
  deleteCartItem
} = require("../../controllers/Shop/cart-controller");

const { authMiddleware } = require('../../middleware/authmiddleware');

// router
const router = express.Router();

router.get("/get/:userId", authMiddleware, fetchCartItems);
router.post("/add", authMiddleware, addToCart);
router.put("/update-cart", authMiddleware, updateCartItemQty);
router.delete("/:userId/:productId", authMiddleware, deleteCartItem);


// export router
module.exports = router;
