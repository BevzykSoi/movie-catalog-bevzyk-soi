const { Movie } = require("../models/index");

exports.search = async (req, res, next) => {
    try {
        const allMovies = await Movie.find();
        res.json(allMovies);
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            res.status(404).send("Movie did not found!");
            return;
        }

        res.json(movie);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!movie) {
            res.status(404).send("Movie did not found!");
            return;
        }

        res.json(movie);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);

        if (!movie) {
            res.status(404).send("Movie did not found!");
            return;
        }

        res.json(movie);
    } catch (error) {
        next(error);
    }
}