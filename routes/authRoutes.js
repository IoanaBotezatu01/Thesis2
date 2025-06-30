const express = require('express');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.post('/register', authController.register );
router.post('/login', authController.login );
router.get('/user/:userId',verifyToken, authController.getUserById );

module.exports = router;