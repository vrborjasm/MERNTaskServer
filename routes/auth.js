const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

router.post('/', 
    authController.authUser);

router.get('/', auth, authController.userAuth);

module.exports = router;