const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.verifyToken, authController.logout);
router.get('/user', authController.verifyToken, authController.getUser);

module.exports = router;