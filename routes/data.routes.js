const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controllers');
const User = require('../model/User');

router.post('/providers', dataController.providerPost);

router.post('/favorites', dataController.favoritesPost);

router.post('/deletefavorites', async (req, res, next) => {
    try {
        const updateUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { $pull: { id_medias: req.body.id } },
            { new: true }
        );

        console.log(req.body.id, updateUser.id_medias.length);

        return res.status(200).json(updateUser);

    } catch (err) {
        next(err);
    }
});


console.log(router.stack);

module.exports = router;
