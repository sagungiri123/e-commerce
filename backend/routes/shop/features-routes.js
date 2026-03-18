const express = require("express");

const {
    getFeatureImages,
    addFeatureImage,
    updateFeatureImage,
    deleteFeatureImage
} = require("../../controllers/Shop/features-controller");

const { authMiddleware, authorizeRoles } = require('../../middleware/authmiddleware');

const router = express.Router();

// no authmiddleware, because Public route
router.get("/", getFeatureImages);

// Admin-only route
router.post("/", authMiddleware, authorizeRoles("admin"), addFeatureImage);
router.put("/:id", authMiddleware, authorizeRoles("admin"), updateFeatureImage);
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteFeatureImage);

module.exports = router;
