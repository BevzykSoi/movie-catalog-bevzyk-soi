const { Actor } = require("../models/index");

exports.search = async (req, res, next) => {
    try {
        const allActors = await Actor.find();
        res.json(allActors);
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const newActor = Actor.create(req.body);
        res.status(201).json(newActor);
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
}