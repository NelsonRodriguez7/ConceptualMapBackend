const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/authController');
const hashPassword = require('../middlewares/hashPassword');

router.post('/register', hashPassword, registerUser);

router.post('/login', loginUser);

module.exports = router;
