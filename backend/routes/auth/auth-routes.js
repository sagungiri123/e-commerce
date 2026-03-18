const express = require('express');

const {
    registerUser,
    loginUser,
    logoutUser,

} = require('../../controllers/auth/auth-controller');

const { authMiddleware, authorizeRoles } = require('../../middleware/authmiddleware');

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', authMiddleware, logoutUser);

router.get("/check-auth", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Authenticated", user: req.user });
});


module.exports = router;