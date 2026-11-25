
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String
    },
    genres: {
        type: [String],
        default: []
    },
    year: {
        type: Number
    },
    rating: {
        type: Number
    },
    director: {
        type: String
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed
    },
    imageUrl: {
        type: String
    },
    imageAlt: {
        type: String
    },
    imageSource: {
        type: String
    },
    imageCreditUrl: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Movie", movieSchema, "movie");