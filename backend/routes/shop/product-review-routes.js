const express = require("express");

const {
    getAllProductReviews,
    getProductReviewById,
    addProductReview,
    updateProductReview,
    deleteProductReview
} = require("../../controllers/Shop/product-review-controller");
const { authMiddleware } = require('../../middleware/authmiddleware');

const router = express.Router();

// no authmiddleware, because Public route
router.get("/", getAllProductReviews);
router.get("/:id", getProductReviewById);
// Auth-only routes
router.post("/", authMiddleware, addProductReview);
router.put("/:id", authMiddleware, updateProductReview);
router.delete("/:id", authMiddleware, deleteProductReview);

module.exports = router;