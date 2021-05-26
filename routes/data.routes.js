const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controllers');



router.post('/set', dataController.providerPost);

router.post('/set-favorites', dataController.favoritesPost);


module.exports = router;
