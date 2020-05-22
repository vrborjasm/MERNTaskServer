const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    try {

        const { project } = req.body;

        const projectExist = await Project.findById(project);
        if(!projectExist) {
            return res.status(404),json({msg: 'Proyecto no encontrado'})
        }

        if(projectExist.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        const task = new Task(req.body);
        await task.save();
        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getTasks = async (req, res) => {
    try {
        const { project } = req.query;

        const projectExist = await Project.findById(project);
        if(!projectExist) {
            return res.status(404),json({msg: 'Proyecto no encontrado'})
        }

        if(projectExist.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        const tasks = await Task.find({ project });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, state } = req.body;

        const taskExist = await Task.findById(req.params.id);

        if(!taskExist) {
            return res.status(404),json({msg: 'Tarea no encontrado'})
        }

        const projectExist = await Project.findById(project);

        if(projectExist.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        const updateTask = {};

        updateTask.name = name;

        updateTask.state = state;

        task = await Task.findOneAndUpdate({ _id: req.params.id }, updateTask, { new: true} );

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.query;

        const taskExist = await Task.findById(req.params.id);

        if(!taskExist) {
            return res.status(404),json({msg: 'Tarea no encontrado'})
        }

        const projectExist = await Project.findById(project);

        if(projectExist.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea eliminada'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }   
}