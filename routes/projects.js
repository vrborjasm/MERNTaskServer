const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

router.post('/', auth,
    [
        check('name', 'Nombre del proyectoes es necesario').not().isEmpty()
    ],
    projectsController.createProject);

router.get('/', auth, projectsController.getProjects);

router.put('/:id', auth,
    [
        check('name', 'Nombre del proyectoes es necesario').not().isEmpty()
    ],
    projectsController.editProject
);

router.delete('/:id', auth,
    projectsController.deleteProject
)

module.exports = router;