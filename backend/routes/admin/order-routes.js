const express = require('express');

const {
    getAllOrdersOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
} = require('../../controllers/admin/order-controller');
const { authMiddleware, authorizeRoles } = require('../../middleware/authmiddleware');

const router = express.Router();

router.get('/orders', authMiddleware, authorizeRoles("admin"), getAllOrdersOfAllUsers);

router.get('/orders/:orderId', authMiddleware, authorizeRoles("admin"), getOrderDetailsForAdmin);

router.put('/orders/:orderId/status', authMiddleware, authorizeRoles("admin"), updateOrderStatus);

module.exports = router;
