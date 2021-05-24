const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const tvShowSchema = new Schema({
    name: {type: String, required: true},
    seasons: {type: String, required: true},
    episodes: {type: String, required: true},
    started: {type: String, required: true},
    ended: {type: String, required: true},
    providers: [ { type: mongoose.Types.ObjectId, ref: 'provider' } ],
    language: {type: String, required: true},
    tagline: {type: String, required: true},
    image: [{poster: {type: String, required: true}, back: {type: String, required: true}}],
    popularity: {type: Number, required: true},
    networks: [{name: {type: String, required: true}, logo: {type: String, required: true}, country: {type: String, required: true}}],
}, {
    timestamps: true,
});

const TvShow = mongoose.model('TvShow', tvShowSchema);

module.exports = TvShow;

