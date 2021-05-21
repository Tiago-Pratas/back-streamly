const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const watchListSchema = new Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'user'},
    movies: {type: mongoose.Types.ObjectId, ref:'movie'},
    tvShows: {type: mongoose.Types.ObjectId, ref: 'tvShow'},
    /* isAvailable: (si el user puede ver la peli teniendo en cuenta sus servicios suscritos y las pelis disponibles en ellos) */
}, {
    timestamps: true,
});

const WatchList = mongoose.model('WatchList', watchListSchema);

module.exports = WatchList;