const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const episodeSchema = new Schema({
    number: {type: Number, required: true},
    credits: [{name: {type: String, required: true}, role: {type:String, required: true}, guest: {type: Boolean}}],
    overwiew: {type: String, required: true},
    season: {type: mongoose.Types.ObjectId, ref: 'season'},
    name: {type: String, required: true},
    runtime: {type: Number, required: true },
}, {
    timestamps: true,
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
