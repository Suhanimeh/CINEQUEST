
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET all movies
router.get("/", async (req, res) => {
    try {
        const requestedLimit = Number(req.query.limit) || 50;
        const limit = Math.min(Math.max(requestedLimit, 1), 100);
        console.log("Movie model collection:", Movie.collection.name);
        console.log("Total movies in collection:", await Movie.countDocuments());
        const movies = await Movie.find().limit(limit);

        res.status(200).json({
            success: true,
            count: movies.length,
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not retrieve movies"
        });
    }
});

// GET one movie by its dataset ID
router.get("/:id", async (req, res) => {
    try {
        const movieId = Number(req.params.id);

        if (!Number.isInteger(movieId)) {
            return res.status(400).json({
                success: false,
                message: "Movie ID must be a number"
            });
        }

        const movie = await Movie.findOne({ id: movieId });

        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Could not retrieve movie"
        });
    }
});

// POST a new movie
router.post("/", async (req, res) => {
    try {
        const { id, title, year, rating } = req.body;

        if (id === undefined || title === undefined) {
            return res.status(400).json({
                success: false,
                message: "Movie ID and title are required"
            });
        }

        if (!Number.isInteger(id) || typeof title !== "string" || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Movie ID must be a number and title must be a non-empty string"
            });
        }

        if (year !== undefined && typeof year !== "number") {
            return res.status(400).json({
                success: false,
                message: "Year must be a number"
            });
        }

        if (rating !== undefined && typeof rating !== "number") {
            return res.status(400).json({
                success: false,
                message: "Rating must be a number"
            });
        }

        const newMovie = await Movie.create(req.body);

        res.status(201).json({
            success: true,
            message: "Movie created successfully",
            data: newMovie
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A movie with this ID already exists"
            });
        }

        res.status(400).json({
            success: false,
            message: "Could not create movie",
            error: error.message
        });
    }
});

module.exports = router;
