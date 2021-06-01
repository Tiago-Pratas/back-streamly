const express = require('express');
const router = express.Router();
const setController = require('../controllers/set.controllers');
const User = require('../model/User');

router.post('/providers', setController.providerPost);

router.post('/favorites', setController.favoritesPost);

router.post('/delete-favorites', async (req, res, next) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { $pull: { id_medias: req.body.id } },
            { new: true }
        );

        console.log(req.body.id, updateUser.id_medias.length);

        return res.json(updatedUser);

    } catch (err) {
        return next(err);
    }
});


console.log(router.stack);

module.exports = router;
