
const User = require('../model/User');

const favoritesPost = async (req, res, next) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { $push: { id_medias: req.body.id } },
            { new: true }
        );

        return res.json(updateUser);
    } catch (err) {
        next(err);
    }
};

const providerPost = async (req, res, next) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { $push: { id_providers: req.body.id } },
            { new: true }
        );

        return res.json(updateUser);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    favoritesPost,
    providerPost,
};
