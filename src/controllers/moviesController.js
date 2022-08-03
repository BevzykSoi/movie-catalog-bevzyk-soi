const { Movie } = require("../models/index");

exports.search = async (req, res, next) => {
    try {
        let { query, page, perPage } = req.query;

        if (!page) {
            page = 1;
        } else {
            page = +page;
        }

        if (!perPage) {
            perPage = 12;
        } else {
            perPage = +perPage;
        }

        const searchFilter = {
            title: {
                $regex: query,
                $options: "i",
            }
        };

        const allMovies = await Movie.find(searchFilter, null, {
            limit: perPage,
            skip: (page - 1) * perPage,
        }).populate({
            path: "actors"
        });

        const moviesCount = await Movie.count(searchFilter);

        res.json({
            items: allMovies,
            count: moviesCount,
            pagesCount: Math.ceil(moviesCount / perPage),
            page,
            perPage
        });
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
        const movie = await Movie.findById(req.params.id).populate({
            path: "actors"
        });

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
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate({
            path: "actors"
        });

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
        const movie = await Movie.findByIdAndDelete(req.params.id).populate({
            path: "actors"
        });

        if (!movie) {
            res.status(404).send("Movie did not found!");
            return;
        }

        res.json(movie);
    } catch (error) {
        next(error);
    }
}

exports.addActor = async (req, res, next) => {
    try {
        const { actorId } = req.body;
        const { id } = req.params;

        const movie = await Movie.findByIdAndUpdate(id, {
            $addToSet: {
                actors: actorId,
            }
        }, {
            new: true,
        });

        res.json(movie);
    } catch (error) {
        next(error);
    }
}

exports.deleteActor = async (req, res, next) => {
    try {
        const { actorId } = req.body;
        const { id } = req.params;

        const movie = await Movie.findByIdAndUpdate(id, {
            $pull: {
                actors: actorId,
            }
        }, {
            new: true,
        });

        res.json(movie);
    } catch (error) {
        next(error);
    }
}