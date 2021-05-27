const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controllers');



router.post('/providers', dataController.providerPost);

router.post('/favorites', dataController.favoritesPost);

router.post('/deletefavorites', async (req, res) => {
    return res.status(200).json('that was it for fucks sake');
});


console.log(router.stack);

module.exports = router;
