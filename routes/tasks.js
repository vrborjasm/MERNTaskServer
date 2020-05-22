const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/', auth,
    [
        check('name', 'El nombre es obligatorio').not().isEmpty()
    ],
    tasksController.createTask
);

router.get('/', auth, tasksController.getTasks);

router.put('/:id', auth, tasksController.updateTask);

router.delete('/:id', auth, tasksController.deleteTask);

module.exports = router;