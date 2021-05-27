const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controllers');


router.post('/set-favorites', dataController.favoritesPost);

router.post('/delete-favorites', dataController.deleteFavoritePost);

router.post('/set', dataController.providerPost);

module.exports = router;
