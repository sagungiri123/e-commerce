const express = require('express');

const {
    addProduct,
    fetchAllProducts,
    editProduct,
    deleteProduct,
} = require('../../controllers/admin/products-controller');
const { authMiddleware, authorizeRoles } = require('../../middleware/authmiddleware');

const router = express.Router();

// CREATE
router.post('/add-product', authMiddleware, authorizeRoles("admin"), addProduct);

// READ
router.get('/get-all-products', authMiddleware, authorizeRoles("admin"), fetchAllProducts);

// UPDATE
router.put('/update-product/:id', authMiddleware, authorizeRoles("admin"), editProduct);

// DELETE
router.delete('/delete-product/:id', authMiddleware, authorizeRoles("admin"), deleteProduct);

module.exports = router;



