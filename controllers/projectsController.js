const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    try {
        const project = new Project(req.body);
        project.author = req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({author: req.user.id}).sort({ createDate: -1});
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.editProject = async (req, res) => {
    
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    const {name} = req.body;
    const editProject = {};

    if(name) {
        editProject.name = name;
    }

    try {
        let project = await Project.findById(req.params.id);
        
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        if(project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        project = await Project.findByIdAndUpdate({ _id: req.params.id}, {$set: editProject }, {new: true});

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        
        if(!project) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        if(project.author.toString() !== req.user.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        project = await Project.findOneAndRemove({ _id: req.params.id});
        res.json({msg: 'Proyecto eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}