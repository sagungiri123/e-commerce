const Order = require("../../models/Order");
const Product = require("../../models/Product");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
    try {
        const { productId, userId, userName, reviewMessage, reviewValue } =
            req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            // orderStatus: "confirmed" || "delivered",
        });

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need to purchase product to review it.",
            });
        }

        const checkExistinfReview = await ProductReview.findOne({
            productId,
            userId,
        });

        if (checkExistinfReview) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this product!",
            });
        }

        const newReview = new ProductReview({
            productId,
            userId,
            userName,
            reviewMessage,
            reviewValue,
        });

        await newReview.save();

        const reviews = await ProductReview.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview =
            reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            totalReviewsLength;

        await Product.findByIdAndUpdate(productId, { averageReview });

        res.status(201).json({
            success: true,
            data: newReview,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const getAllProductReviews = async (req, res) => {
    try {
        const reviews = await ProductReview.find();
        res.status(200).json({
            success: true,
            data: reviews,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const getProductReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await ProductReview.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const updateProductReview = async (req, res) => {
    try {
        const { id, productId, userId, userName, reviewMessage, reviewValue } =
            req.body;

        const review = await ProductReview.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        review.productId = productId;
        review.userId = userId;
        review.userName = userName;
        review.reviewMessage = reviewMessage;
        review.reviewValue = reviewValue;

        await review.save();

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

    const deleteroductReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await ProductReview.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        await review.remove();

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

const deleteProductReview = async (req, res) => {
    try {
        const { productId, userId } = req.params;

        const review = await ProductReview.findOne({
            productId,
            userId,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        await review.remove();

        const reviews = await ProductReview.find({ productId });
        const totalReviewsLength = reviews.length;
        const averageReview =
            reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
            totalReviewsLength;

        await Product.findByIdAndUpdate(productId, { averageReview });

        res.status(200).json({
            success: true,
            data: review,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error",
        });
    }
};

module.exports = { addProductReview, getAllProductReviews, getProductReviewById, updateProductReview, deleteProductReview }; 