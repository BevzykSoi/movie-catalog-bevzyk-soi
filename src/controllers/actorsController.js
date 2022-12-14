const { Actor } = require("../models/index");

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
            name: {
                $regex: query,
                $options: "i",
            }
        };

        const allActors = await Actor.find(searchFilter, null, {
            limit: perPage,
            skip: (page - 1) * perPage,
        });

        const actorsCount = await Actor.count(searchFilter);

        res.json({
            items: allActors,
            count: actorsCount,
            pagesCount: Math.ceil(actorsCount / perPage),
            page,
            perPage,
        });
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const newActor = await Actor.create(req.body);
        res.status(201).json(newActor);
    } catch (error) {
        next(error);
    }
}

exports.getById = async (req, res, next) => {
    try {
        const actor = await Actor.findById(req.params.id);

        if (!actor) {
            res.status(404).send("Actor did not found!");
            return;
        }

        res.json(actor);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!actor) {
            res.status(404).send("Actor did not found!");
            return;
        }

        res.json(actor);
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const actor = await Actor.findByIdAndDelete(req.params.id);

        if (!actor) {
            res.status(404).send("Actor did not found!");
            return;
        }

        res.json(actor);
    } catch (error) {
        next(error);
    }
}