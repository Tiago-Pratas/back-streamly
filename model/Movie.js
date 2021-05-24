const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title:{type: String, required: true},
    genres: [{type: String, required: true}],
    overwiew: {type: String, required: true},
    releaseDate: {type: Number, required: true},
    credits: [{name: {type: String, required: true}, role: {type: String, required: true}}],
    runtime: {type: Number, required: true},
    images: [{Poster:{type: String, required: true}, back:{type: String, required: true}}],
    providers: {type: String, required: true},
    popularity: {type: Number, required: true},
    trailer: {type: String, required: true},
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;