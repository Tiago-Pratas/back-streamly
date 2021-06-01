const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    tvShow: {type: mongoose.Types.ObjectId, ref: 'tvShow'},
    episodes: [ { type: mongoose.Types.ObjectId, ref: 'episode' } ],
    name: {type: String, required: true},
    season: {type: Number, required: true},
}, {
    timestamps: true,
});

const Season = mongoose.model('Seasons', seasonSchema);

module.exports = Season;