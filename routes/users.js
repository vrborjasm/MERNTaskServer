const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');
const { check } = require('express-validator');

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'the password must contain at least 6 characters').isLength({ min: 6 })
    ],
    userController.createUser);

module.exports = router;